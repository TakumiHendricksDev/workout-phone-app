import os
from typing import Annotated
from dotenv import load_dotenv
from fastapi import Header, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from jose import jwt, JWTError

from backend.accounts.models import User
from db import engine
load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.environ.get("SECRET_KEY", "")
ALGORITHM = os.environ.get("ALGORITHM", "")

def get_session():
    with Session(engine) as session:
        yield session

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = session.exec(
        select(User).where(User.email == email)
    ).first()
    if user is None:
        raise credentials_exception
    return user

SessionDep = Annotated[Session, Depends(get_session)]