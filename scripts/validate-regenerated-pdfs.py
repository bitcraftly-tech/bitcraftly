#!/usr/bin/env python3
"""Final validation for regenerated BDS PDFs and document registry."""
from __future__ import annotations

import hashlib
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
STORAGE = ROOT / "storage" / "documents" / "internal"
BACKUP = ROOT / "storage" / "documents" / ".regeneration-backup"
PUBLIC = ROOT / "public" / "documents" / "public"
DOWNLOADS = Path(
    r"C:\Users\uidev\Downloads\Bitcraftly_Official_38_Documents_Complete\Bitcraftly_Official_38_Documents"
)

AFFECTED = [
    ("BDS-GOV-002", "governance/BDS-GOV-002_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf", "BDS-GOV-001"),
    ("BDS-GOV-003", "governance/BDS-GOV-003_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf", "BDS-GOV-002"),
    ("BDS-TPL-002", "templates/BDS-TPL-002_Business_and_Commercial_Templates_Pack_v1.0.pdf", "BDS-TPL-001"),
    ("BDS-TPL-003", "templates/BDS-TPL-003_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf", "BDS-TPL-002"),
    ("BDS-TPL-004", "templates/BDS-TPL-004_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf", "BDS-TPL-003"),
    ("BDS-TPL-005", "templates/BDS-TPL-005_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf", "BDS-TPL-004"),
    ("BDS-TPL-006", "templates/BDS-TPL-006_People_and_Workforce_Templates_Pack_v1.0.pdf", "BDS-TPL-005"),
    ("BDS-TPL-007", "templates/BDS-TPL-007_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf", "BDS-TPL-006"),
    ("BDS-TPL-008", "templates/BDS-TPL-008_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf", "BDS-TPL-007"),
]


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def cover_id(doc: fitz.Document) -> str | None:
    page = doc[0]
    for block in page.get_text("dict")["blocks"]:
        if "lines" not in block:
            continue
        for line in block["lines"]:
            for span in line["spans"]:
                text = span["text"].strip()
                if text.startswith("BDS-") and len(text) == 11:
                    y0 = span["bbox"][1]
                    if 280 <= y0 <= 335:
                        return text
    return None


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    all_pdfs = list(STORAGE.rglob("*.pdf"))
    print(f"storage PDF count: {len(all_pdfs)}")
    print(f"public PDF count: {len(list(PUBLIC.glob('*.pdf')))}")

    ok = True
    for official, rel, old_self in AFFECTED:
        path = STORAGE / rel.replace("/", "\\")
        backup = BACKUP / path.name
        doc = fitz.open(path)
        cid = cover_id(doc)
        footers = sum(1 for p in doc if f"{official} | INTERNAL | VERSION 1.0" in p.get_text())
        full = "".join(p.get_text() for p in doc)
        bad = []
        if cid != official:
            bad.append(f"cover={cid}")
        if f"{old_self} | INTERNAL | VERSION 1.0" in full:
            bad.append(f"old footer {old_self}")
        if f"{old_self} is the authoritative internal" in full:
            bad.append(f"old approval {old_self}")
        meta = doc.metadata.get("title", "")
        if official not in meta:
            bad.append("metadata title")
        status = "OK" if not bad and footers >= doc.page_count - 1 else "FAIL"
        if status == "FAIL":
            ok = False
        print(f"{official}: {status} cover={cid} footers={footers}/{doc.page_count} meta={meta[:50]!r} issues={bad}")
        doc.close()
        if not backup.exists():
            print(f"  backup missing: {backup.name}")
            ok = False

    if DOWNLOADS.exists():
        dl_hashes = {p.name: sha256(p) for p in DOWNLOADS.glob("*.pdf")}
        print(f"Downloads source files: {len(dl_hashes)} (unchanged check skipped - read-only)")
    else:
        print("Downloads source folder not found (skipped)")

    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
