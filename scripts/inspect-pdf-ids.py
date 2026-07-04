"""Inspect BDS ID occurrences in affected PDFs — diagnostic only."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
STORAGE = ROOT / "storage" / "documents" / "internal"

AFFECTED = [
    ("BDS-GOV-002", "governance/BDS-GOV-002_Bitcraftly_Corporate_Governance_Decision_Authority_Standard_v1.0.pdf", "BDS-GOV-001", "BDS-GOV-002"),
    ("BDS-GOV-003", "governance/BDS-GOV-003_Bitcraftly_Decision_Approval_Escalation_Procedure_v1.0.pdf", "BDS-GOV-002", "BDS-GOV-003"),
    ("BDS-TPL-002", "templates/BDS-TPL-002_Business_and_Commercial_Templates_Pack_v1.0.pdf", "BDS-TPL-001", "BDS-TPL-002"),
    ("BDS-TPL-003", "templates/BDS-TPL-003_Project_Delivery_and_Operations_Templates_Pack_v1.0.pdf", "BDS-TPL-002", "BDS-TPL-003"),
    ("BDS-TPL-004", "templates/BDS-TPL-004_Technology_Security_and_Privacy_Templates_Pack_v1.0.pdf", "BDS-TPL-003", "BDS-TPL-004"),
    ("BDS-TPL-005", "templates/BDS-TPL-005_Finance_Billing_and_Procurement_Templates_Pack_v1.0.pdf", "BDS-TPL-004", "BDS-TPL-005"),
    ("BDS-TPL-006", "templates/BDS-TPL-006_People_and_Workforce_Templates_Pack_v1.0.pdf", "BDS-TPL-005", "BDS-TPL-006"),
    ("BDS-TPL-007", "templates/BDS-TPL-007_Quality_CAPA_and_Continuity_Templates_Pack_v1.0.pdf", "BDS-TPL-006", "BDS-TPL-007"),
    ("BDS-TPL-008", "templates/BDS-TPL-008_Governance_Risk_and_Master_Registers_Pack_v1.0.pdf", "BDS-TPL-007", "BDS-TPL-008"),
]

PATTERNS = [
    re.compile(r"^BDS-[A-Z]+-\d{3} \| INTERNAL \| VERSION", re.M),
    re.compile(r"Document ID\s+BDS-[A-Z]+-\d{3}"),
    re.compile(r"Parent Documents\s+(.{0,120})"),
]


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    for label, rel, old_id, new_id in AFFECTED:
        path = STORAGE / rel.replace("/", "\\")
        doc = fitz.open(path)
        meta = doc.metadata
        print(f"\n=== {label} ===")
        print(f"pages={doc.page_count} size={path.stat().st_size}")
        print(f"meta title={meta.get('title')} subject={meta.get('subject')} keywords={meta.get('keywords')}")
        full = "".join(page.get_text() for page in doc)
        for pid in re.findall(r"BDS-[A-Z]+-\d{3}", full):
            pass
        counts: dict[str, int] = {}
        for m in re.finditer(r"BDS-[A-Z]+-\d{3}", full):
            counts[m.group(0)] = counts.get(m.group(0), 0) + 1
        print("ID counts:", counts)
        print(f"old self {old_id} count:", counts.get(old_id, 0))
        for i, page in enumerate(doc):
            text = page.get_text()
            if old_id in text:
                for line in text.splitlines():
                    if old_id in line:
                        print(f"  p{i+1}: {line.strip()[:140]}")
        doc.close()


if __name__ == "__main__":
    main()
