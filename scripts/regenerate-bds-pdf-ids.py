#!/usr/bin/env python3
"""Regenerate affected BDS PDFs — targeted PyMuPDF redaction with layout-safe inserts."""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
STORAGE = ROOT / "storage" / "documents" / "internal"
BACKUP = ROOT / "storage" / "documents" / ".regeneration-backup"
OUTPUT = ROOT / "storage" / "documents" / ".regeneration-output"
MANIFEST = BACKUP / "manifest.json"

EM_DASH = "\u2014"


@dataclass
class SpanFilter:
    page: int  # 0-indexed
    old: str
    new: str
    y_min: float
    y_max: float
    x_min: float = 0.0
    x_max: float = 600.0


@dataclass
class PagePhraseReplacement:
    page: int
    old: str
    new: str
    y_min: float
    y_max: float
    x_min: float = 0.0
    x_max: float = 600.0


@dataclass
class DocJob:
    official_id: str
    rel_path: str
    new_title_prefix: str
    replacements: list[tuple[str, str]] = field(default_factory=list)
    span_replacements: list[SpanFilter] = field(default_factory=list)
    page_phrase_replacements: list[PagePhraseReplacement] = field(default_factory=list)


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def int_to_rgb(color: int) -> tuple[float, float, float]:
    return (((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255)


def span_at_rect(page: fitz.Page, rect: fitz.Rect) -> dict | None:
    clip = rect + (-2, -2, 2, 2)
    for block in page.get_text("dict")["blocks"]:
        if "lines" not in block:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                if fitz.Rect(span["bbox"]).intersects(clip):
                    return span
    return None


def insert_at_rect(page: fitz.Page, rect: fitz.Rect, text: str, span: dict | None) -> None:
    font_size = span["size"] if span else 7.0
    color = int_to_rgb(span["color"]) if span else (0.28, 0.33, 0.42)
    inserted = page.insert_textbox(
        rect,
        text,
        fontname="helv",
        fontsize=font_size,
        color=color,
        align=fitz.TEXT_ALIGN_LEFT,
    )
    if inserted < 0:
        page.insert_text((rect.x0, rect.y1 - 1.5), text, fontname="helv", fontsize=font_size, color=color)


def replace_phrase_on_page(page: fitz.Page, old: str, new: str, *, y_min: float | None = None, y_max: float | None = None, x_min: float | None = None, x_max: float | None = None) -> int:
    if old == new or not old or "\n" in old:
        return 0
    rects = page.search_for(old)
    if not rects:
        return 0
    styles: list[tuple[fitz.Rect, dict | None]] = []
    for rect in rects:
        if y_min is not None and rect.y0 < y_min:
            continue
        if y_max is not None and rect.y0 > y_max:
            continue
        if x_min is not None and rect.x0 < x_min:
            continue
        if x_max is not None and rect.x0 > x_max:
            continue
        styles.append((rect, span_at_rect(page, rect)))
    if not styles:
        return 0
    for rect, _ in styles:
        page.add_redact_annot(rect, fill=(1, 1, 1))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
    for rect, span in styles:
        insert_at_rect(page, rect, new, span)
    return len(styles)


def replace_spans(page: fitz.Page, sf: SpanFilter) -> int:
    targets: list[dict] = []
    for block in page.get_text("dict")["blocks"]:
        if "lines" not in block:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                if span["text"] != sf.old:
                    continue
                x0, y0, _, _ = span["bbox"]
                if not (sf.y_min <= y0 <= sf.y_max and sf.x_min <= x0 <= sf.x_max):
                    continue
                targets.append(span)
    if not targets:
        return 0
    saved = [(fitz.Rect(s["bbox"]), s) for s in targets]
    for rect, _ in saved:
        page.add_redact_annot(rect, fill=(1, 1, 1))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
    for rect, span in saved:
        insert_at_rect(page, rect, sf.new, span)
    return len(saved)


def apply_replacements(doc: fitz.Document, job: DocJob) -> int:
    changes = 0
    for old, new in job.replacements:
        for page in doc:
            changes += replace_phrase_on_page(page, old, new)
    for sf in job.span_replacements:
        changes += replace_spans(doc[sf.page], sf)
    for pr in job.page_phrase_replacements:
        changes += replace_phrase_on_page(
            doc[pr.page], pr.old, pr.new, y_min=pr.y_min, y_max=pr.y_max, x_min=pr.x_min, x_max=pr.x_max
        )
    return changes


def build_jobs() -> list[DocJob]:
    tpl: list[DocJob] = []
    tpl_specs = [
        ("BDS-TPL-002", "templates/BDS-TPL-002_Business_and_Commercial_Templates_Pack_v1.0.pdf", "BDS-TPL-001", "BDS-TPL-002 — Bitcraftly Business & Commercial Templates Pack v1.0"),
        ("BDS-TPL-003", "templates/BDS-TPL-003_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf", "BDS-TPL-002", "BDS-TPL-003 — Bitcraftly Project Delivery & Operations Templates Pack v1.0"),
        ("BDS-TPL-004", "templates/BDS-TPL-004_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf", "BDS-TPL-003", "BDS-TPL-004 — Bitcraftly Technology, Security & Privacy Templates Pack v1.0"),
        ("BDS-TPL-005", "templates/BDS-TPL-005_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf", "BDS-TPL-004", "BDS-TPL-005 — Bitcraftly Finance, Billing & Procurement Templates Pack v1.0"),
        ("BDS-TPL-006", "templates/BDS-TPL-006_People_and_Workforce_Templates_Pack_v1.0.pdf", "BDS-TPL-005", "BDS-TPL-006 — Bitcraftly People & Workforce Templates Pack v1.0"),
        ("BDS-TPL-007", "templates/BDS-TPL-007_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf", "BDS-TPL-006", "BDS-TPL-007 — Bitcraftly Quality, CAPA & Continuity Templates Pack v1.0"),
        ("BDS-TPL-008", "templates/BDS-TPL-008_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf", "BDS-TPL-007", "BDS-TPL-008 — Bitcraftly Governance, Risk & Master Registers Pack v1.0"),
    ]
    for oid, rel, old, title in tpl_specs:
        tpl.append(
            DocJob(
                official_id=oid,
                rel_path=rel,
                new_title_prefix=title,
                replacements=[
                    (f"{old} | INTERNAL | VERSION 1.0", f"{oid} | INTERNAL | VERSION 1.0"),
                    (f"{old} is the authoritative internal", f"{oid} is the authoritative internal"),
                ],
                span_replacements=[
                    SpanFilter(page=0, old=old, new=oid, y_min=280, y_max=330, x_min=65, x_max=130),
                ],
            )
        )

    return [
        DocJob(
            official_id="BDS-GOV-002",
            rel_path="governance/BDS-GOV-002_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf",
            new_title_prefix="BDS-GOV-002 — Bitcraftly Corporate Governance & Decision Authority Standard v1.0",
            replacements=[
                ("BDS-GOV-001 | INTERNAL | VERSION 1.0", "BDS-GOV-002 | INTERNAL | VERSION 1.0"),
                (
                    "BDS-GOV-001 is the authoritative internal standard for corporate governance and decision authority at Bitcraftly. Material",
                    "BDS-GOV-002 is the authoritative internal standard for corporate governance and decision authority at Bitcraftly. Material",
                ),
            ],
            span_replacements=[
                SpanFilter(page=0, old="BDS-GOV-001", new="BDS-GOV-002", y_min=310, y_max=335, x_min=65, x_max=130),
                SpanFilter(page=8, old="BDS-GOV-002", new="BDS-GOV-003", y_min=580, y_max=610, x_min=55, x_max=120),
            ],
            page_phrase_replacements=[
                PagePhraseReplacement(page=9, old="BDS-GOV-002", new="BDS-GOV-003", y_min=115, y_max=135, x_min=100, x_max=140),
            ],
        ),
        DocJob(
            official_id="BDS-GOV-003",
            rel_path="governance/BDS-GOV-003_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf",
            new_title_prefix="BDS-GOV-003 — Bitcraftly Decision, Approval & Escalation Procedure v1.0",
            replacements=[
                ("BDS-GOV-001 / BDS-OPS-001 / BDS-LEG-001", "BDS-GOV-002 / BDS-OPS-001 / BDS-LEG-001"),
                (
                    "governance principles in BDS-GOV-001 into repeatable operational steps.",
                    "governance principles in BDS-GOV-002 into repeatable operational steps.",
                ),
                ("BDS-GOV-002 | INTERNAL | VERSION 1.0", "BDS-GOV-003 | INTERNAL | VERSION 1.0"),
                (
                    "BDS-GOV-002 is the authoritative internal procedure for material decisions, approvals and escalations at Bitcraftly.",
                    "BDS-GOV-003 is the authoritative internal procedure for material decisions, approvals and escalations at Bitcraftly.",
                ),
            ],
            span_replacements=[
                SpanFilter(page=0, old="BDS-GOV-002", new="BDS-GOV-003", y_min=310, y_max=335, x_min=65, x_max=130),
                SpanFilter(page=10, old="BDS-GOV-001", new="BDS-GOV-002", y_min=130, y_max=160, x_min=55, x_max=120),
            ],
            page_phrase_replacements=[
                PagePhraseReplacement(page=10, old="BDS-TPL-001", new="BDS-TPL-002", y_min=490, y_max=510, x_min=100, x_max=140),
            ],
        ),
        *tpl,
    ]


def cover_document_id(doc: fitz.Document) -> str | None:
    page = doc[0]
    for block in page.get_text("dict")["blocks"]:
        if "lines" not in block:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                text = span["text"].strip()
                if re.fullmatch(r"BDS-[A-Z]+-\d{3}", text):
                    y0 = span["bbox"][1]
                    if 280 <= y0 <= 335:
                        return text
    cover = page.get_text()
    match = re.search(r"Document ID\s*\n\s*(BDS-[A-Z]+-\d{3})", cover)
    return match.group(1) if match else None


def span_exists(page: fitz.Page, text: str, y_min: float, y_max: float, x_min: float = 0, x_max: float = 600) -> bool:
    for block in page.get_text("dict")["blocks"]:
        if "lines" not in block:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                span_text = span["text"]
                if span_text != text and not span_text.startswith(f"{text}{EM_DASH}") and not span_text.startswith(
                    f"{text} "
                ):
                    continue
                x0, y0, _, _ = span["bbox"]
                if y_min <= y0 <= y_max and x_min <= x0 <= x_max:
                    return True
    return False


def section_heading_count(text: str) -> int:
    return len(re.findall(r"\n\d+\.\s+[A-Z]", text))


def validate_pdf(doc: fitz.Document, job: DocJob, old_self: str | None, before_text: str) -> dict:
    full = "".join(p.get_text() for p in doc)
    cover_id = cover_document_id(doc)
    footer_hits = sum(
        1 for p in doc if f"{job.official_id} | INTERNAL | VERSION 1.0" in p.get_text()
    )
    wrong: list[str] = []
    if old_self:
        if f"{old_self} | INTERNAL | VERSION 1.0" in full:
            wrong.append(f"{old_self} footer/header")
        if cover_id == old_self:
            wrong.append(f"{old_self} cover id")
        if f"{old_self} is the authoritative internal" in full:
            wrong.append(f"{old_self} approval self-ref")

    layout_issues: list[str] = []
    if section_heading_count(full) != section_heading_count(before_text):
        layout_issues.append("section heading count changed")
    if job.official_id == "BDS-GOV-003":
        p11 = doc[10]
        if not span_exists(p11, "BDS-GOV-002", 130, 160, 55, 120):
            layout_issues.append("related documents table missing BDS-GOV-002 row")
        if f"{job.official_id} is the authoritative internal procedure" not in p11.get_text():
            layout_issues.append("approval statement missing on page 11")
        if not span_exists(p11, "BDS-TPL-002", 490, 510, 100, 130):
            layout_issues.append("next controlled document missing BDS-TPL-002")
    if job.official_id == "BDS-GOV-002":
        p9 = doc[8]
        if not span_exists(p9, "BDS-GOV-003", 580, 610, 55, 120):
            layout_issues.append("related documents missing BDS-GOV-003 row")
        if not span_exists(doc[9], "BDS-GOV-003", 115, 135, 100, 130):
            layout_issues.append("next controlled document missing BDS-GOV-003")

    return {
        "cover_id": cover_id,
        "footer_hits": footer_hits,
        "expected_id": job.official_id,
        "wrong_self_remaining": wrong,
        "layout_issues": layout_issues,
        "metadata_title": doc.metadata.get("title"),
        "valid": (
            cover_id == job.official_id
            and not wrong
            and not layout_issues
            and footer_hits >= doc.page_count - 1
        ),
    }


def regenerate(job: DocJob, src: Path, dest: Path, old_self: str | None) -> dict:
    before_doc = fitz.open(src)
    before_pages = before_doc.page_count
    before_size = src.stat().st_size
    before_text = "".join(p.get_text() for p in before_doc)
    before_text_len = len(before_text)
    before_doc.close()

    doc = fitz.open(src)
    changes = apply_replacements(doc, job)
    meta = doc.metadata or {}
    meta["title"] = job.new_title_prefix
    meta["subject"] = job.new_title_prefix
    doc.set_metadata(meta)
    dest.parent.mkdir(parents=True, exist_ok=True)
    doc.save(dest, garbage=4, deflate=True)
    doc.close()

    after = fitz.open(dest)
    validation = validate_pdf(after, job, old_self, before_text)
    result = {
        "official_id": job.official_id,
        "filename": src.name,
        "changes": changes,
        "before_pages": before_pages,
        "after_pages": after.page_count,
        "before_size": before_size,
        "after_size": dest.stat().st_size,
        "before_text_len": before_text_len,
        "after_text_len": len("".join(p.get_text() for p in after)),
        **validation,
    }
    after.close()
    return result


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    jobs = build_jobs()
    old_self_map = {
        "BDS-GOV-002": "BDS-GOV-001",
        "BDS-GOV-003": "BDS-GOV-002",
        "BDS-TPL-002": "BDS-TPL-001",
        "BDS-TPL-003": "BDS-TPL-002",
        "BDS-TPL-004": "BDS-TPL-003",
        "BDS-TPL-005": "BDS-TPL-004",
        "BDS-TPL-006": "BDS-TPL-005",
        "BDS-TPL-007": "BDS-TPL-006",
        "BDS-TPL-008": "BDS-TPL-007",
    }

    BACKUP.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)

    manifest: dict = {"created_at": datetime.now(timezone.utc).isoformat(), "files": [], "results": []}

    for job in jobs:
        src = STORAGE / Path(job.rel_path.replace("/", "\\"))
        if not src.exists():
            print(f"MISSING {src}", file=sys.stderr)
            return 1
        backup_path = BACKUP / src.name
        if not backup_path.exists():
            shutil.copy2(src, backup_path)
        manifest["files"].append(
            {
                "official_id": job.official_id,
                "filename": src.name,
                "backup_path": str(backup_path.relative_to(ROOT)),
                "sha256_before": sha256(backup_path),
                "size_before": backup_path.stat().st_size,
            }
        )

    all_ok = True
    for job in jobs:
        backup_path = BACKUP / Path(job.rel_path).name
        out = OUTPUT / backup_path.name
        result = regenerate(job, backup_path, out, old_self_map.get(job.official_id))
        manifest["results"].append(result)
        print(
            f"{job.official_id}: valid={result['valid']} cover={result['cover_id']} "
            f"footers={result['footer_hits']}/{result['after_pages']} "
            f"layout={result['layout_issues']} wrong={result['wrong_self_remaining']}"
        )
        if not result["valid"]:
            all_ok = False
            continue
        dest = STORAGE / Path(job.rel_path.replace("/", "\\"))
        shutil.copy2(out, dest)
        for entry in manifest["files"]:
            if entry["official_id"] == job.official_id:
                entry["sha256_after"] = sha256(dest)
                entry["size_after"] = dest.stat().st_size

    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return 0 if all_ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
