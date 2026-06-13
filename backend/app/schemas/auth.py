from pydantic import BaseModel, Field

from app.models.user import UserRole


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=190)
    password: str = Field(min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=190)
    password: str = Field(min_length=1, max_length=128)


class GoogleSyncRequest(BaseModel):
    email: str = Field(min_length=3, max_length=190)
    name: str = Field(min_length=1, max_length=120)


class SeedAdminRequest(BaseModel):
    email: str = Field(min_length=5, max_length=190)
    password: str = Field(min_length=6, max_length=128)
    name: str = Field(min_length=2, max_length=120)


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: UserRole


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
