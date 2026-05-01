from typing import Annotated, Optional

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.models.tenant import Tenant
from app.models.user import User, UserRole
from app.core.config import settings
from app.services.security import verify_access_token

DBSession = Annotated[Session, Depends(get_db_session)]


def get_current_tenant(request: Request) -> Tenant:
    tenant = getattr(request.state, "tenant", None)
    if tenant is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tenant not found for current subdomain",
        )
    return tenant


CurrentTenant = Annotated[Tenant, Depends(get_current_tenant)]


def get_optional_current_user(request: Request, db: DBSession) -> Optional[User]:
    auth_header = request.headers.get("authorization", "")
    if not auth_header.lower().startswith("bearer "):
        return None
    token = auth_header.split(" ", 1)[1].strip()
    payload = verify_access_token(token, settings.auth_secret)
    if not payload:
        return None
    user_sub = payload.get("sub")
    if not user_sub:
        return None
    try:
        user_id = int(user_sub)
    except (TypeError, ValueError):
        return None
    return db.query(User).filter(User.id == user_id).first()


def get_current_user(request: Request, db: DBSession) -> User:
    user = get_optional_current_user(request, db)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
OptionalCurrentUser = Annotated[Optional[User], Depends(get_optional_current_user)]


def require_roles(*allowed_roles: UserRole):
    def _role_guard(current_user: CurrentUser) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return current_user

    return _role_guard
