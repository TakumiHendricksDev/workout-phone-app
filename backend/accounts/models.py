from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    first_name: str = Field(max_length=50, default=None)
    last_name: str = Field(max_length=50, default=None)
    hashed_password: str = Field(max_length=256, default=None)
    email: str = Field(max_length=50, default=None, index=True)
    is_active: bool = Field(default=True)

class UserLogin(SQLModel):
    email: str
    password: str

class UserRegister(SQLModel):
    email: str
    password: str
    confirm_password: str

class Token(SQLModel):
    access_token: str
    token_type: str
    expires_in: int