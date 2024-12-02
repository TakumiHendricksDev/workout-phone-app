import os
from datetime import datetime, timedelta
from typing import List, Annotated

from jose import jwt
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlmodel import select
from passlib.context import CryptContext

from .models import User, UserRegister, UserLogin, Token, LoggedInUser
from ..dependencies import SessionDep

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY", "")
ALGORITHM = os.environ.get("ALGORITHM", "")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 480)
access_token_expires_minutes = int(ACCESS_TOKEN_EXPIRE_MINUTES)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=access_token_expires_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/register", response_model=User)
async def register_user(user: UserRegister, session: SessionDep):
    if user.password != user.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match",
        )
    user_in_db = session.exec(select(User).where(User.email == user.email)).first()
    if user_in_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        first_name="",
        last_name="",
        is_active=True,
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.post("/login", response_model=LoggedInUser)
async def login_user(user: UserLogin, session: SessionDep):
    user_in_db = session.exec(select(User).where(User.email == user.email)).first()
    if not user_in_db or not verify_password(user.password, user_in_db.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    access_token_expires = timedelta(minutes=access_token_expires_minutes)
    access_token = create_access_token(
        data={"sub": user_in_db.email}, expires_delta=access_token_expires
    )
    token = Token(access_token=access_token, token_type="bearer", expires_in=access_token_expires_minutes)

    return LoggedInUser(
        id=user_in_db.id,
        email=user_in_db.email,
        first_name=user_in_db.first_name,
        last_name=user_in_db.last_name,
        is_active=user_in_db.is_active,
        token_object=token
    )

@router.get("/", response_model=List[User], response_model_exclude={"hashed_password"})
async def get_users(session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100) -> List[User]:
    return session.exec(select(User).offset(offset).limit(limit)).all()