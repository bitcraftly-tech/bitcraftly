from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.models.user import User, UserRole
from app.schemas.auth import AuthResponse, LoginRequest, SignupRequest, UserResponse
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
