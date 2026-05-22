from __future__ import annotations

import re
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

ALLOWED_RESUME_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_RESUME_MIME = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
MAX_RESUME_BYTES = 5 * 1024 * 1024


def uploads_root() -> Path:
    backend_dir = Path(__file__).resolve().parents[2]
    root = backend_dir / "uploads" / "applications"
    root.mkdir(parents=True, exist_ok=True)
    return root


def sanitize_filename(name: str) -> str:
    base = Path(name).name
    cleaned = re.sub(r"[^A-Za-z0-9._-]", "_", base).strip("._")
    return cleaned[:180] or "resume.pdf"


async def save_resume(application_id: int, upload: UploadFile) -> tuple[str, str, str | None, int]:
    if not upload.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume file is required.")

    original = sanitize_filename(upload.filename)
    ext = Path(original).suffix.lower()
    if ext not in ALLOWED_RESUME_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume must be PDF, DOC, or DOCX.",
        )

    content = await upload.read()
    size = len(content)
    if size == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume file is empty.")
    if size > MAX_RESUME_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume must be 5 MB or smaller.",
        )

    mime = upload.content_type if upload.content_type in ALLOWED_RESUME_MIME else None
    stored = f"{application_id}_{uuid.uuid4().hex}{ext}"
    folder = uploads_root() / str(application_id)
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / stored
    path.write_bytes(content)

    return original, stored, mime, size


def resume_path(application_id: int, stored_name: str) -> Path:
    path = uploads_root() / str(application_id) / stored_name
    if not path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume file not found.")
    return path
