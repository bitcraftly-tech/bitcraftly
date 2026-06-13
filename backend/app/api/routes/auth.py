import secrets

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.models.user import User, UserRole
from app.schemas.auth import AuthResponse, GoogleSyncRequest, LoginRequest, SeedAdminRequest, SignupRequest, UserResponse
from app.core.config import settings
from app.services.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db_session)) -> AuthResponse:
    existing_user = db.query(User).filter(User.email == payload.email.lower()).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered.")

    user = User(
        name=payload.name.strip(),
        email=payload.email.lower(),
        password_hash=hash_password(payload.password),
        role=UserRole.USER,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(
        {"sub": str(user.id), "email": user.email, "role": user.role.value},
        settings.auth_secret,
        expires_in_seconds=settings.access_token_expire_seconds,
    )
    return AuthResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, name=user.name, email=user.email, role=user.role),
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db_session)) -> AuthResponse:
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    access_token = create_access_token(
        {"sub": str(user.id), "email": user.email, "role": user.role.value},
        settings.auth_secret,
        expires_in_seconds=settings.access_token_expire_seconds,
    )
    return AuthResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, name=user.name, email=user.email, role=user.role),
    )


@router.post("/google-sync", response_model=AuthResponse)
def google_sync(
    payload: GoogleSyncRequest,
    db: Session = Depends(get_db_session),
    x_auth_google_sync_secret: str | None = Header(None, alias="x-auth-google-sync-secret"),
) -> AuthResponse:
    """Called by NextAuth after Google OAuth (server-side only). Upserts user and returns API JWT + role."""
    expected = settings.AUTH_GOOGLE_SYNC_SECRET
    if not expected or not x_auth_google_sync_secret or x_auth_google_sync_secret != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        placeholder = secrets.token_urlsafe(32)
        user = User(
            name=payload.name.strip() or email.split("@")[0],
            email=email,
            password_hash=hash_password(placeholder),
            role=UserRole.USER,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(
        {"sub": str(user.id), "email": user.email, "role": user.role.value},
        settings.auth_secret,
        expires_in_seconds=settings.access_token_expire_seconds,
    )
    return AuthResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, name=user.name, email=user.email, role=user.role),
    )


@router.post("/seed-admin", response_model=AuthResponse)
def seed_admin(
    payload: SeedAdminRequest,
    db: Session = Depends(get_db_session),
    x_auth_google_sync_secret: str | None = Header(None, alias="x-auth-google-sync-secret"),
) -> AuthResponse:
    """Idempotent admin bootstrap — protected by AUTH_GOOGLE_SYNC_SECRET."""
    expected = settings.AUTH_GOOGLE_SYNC_SECRET
    if not expected or not x_auth_google_sync_secret or x_auth_google_sync_secret != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.name = payload.name.strip()
        user.password_hash = hash_password(payload.password)
        user.role = UserRole.ADMIN
        user.is_active = True
    else:
        user = User(
            name=payload.name.strip(),
            email=email,
            password_hash=hash_password(payload.password),
            role=UserRole.ADMIN,
            is_active=True,
        )
        db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(
        {"sub": str(user.id), "email": user.email, "role": user.role.value},
        settings.auth_secret,
        expires_in_seconds=settings.access_token_expire_seconds,
    )
    return AuthResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, name=user.name, email=user.email, role=user.role),
    )
