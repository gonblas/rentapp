from fastapi import Cookie, Depends, HTTPException
from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
import os
from passlib.context import CryptContext
from app.database import db_dependency
from app.models import User

secret_key = os.getenv("TOKEN_SECRET_KEY")
algorithm = os.getenv("TOKEN_ENCRYPTION_ALGORITHM")
expire_time = os.getenv("TOKEN_EXPIRE_MINUTES")

auth_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds = 12, #salt
    deprecated="auto"
)

credentials_exception = HTTPException(
    status_code=401,
    detail="Invalid credentials",
)

def generate_user_token(user_id : int, email : str, is_real_estate : bool):
    payload = {
        "user_id": user_id,
        "email": email,
        "is_real_estate": is_real_estate,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=int(expire_time))
    }
    return jwt.encode(payload, secret_key, algorithm)
    
def get_current_user(db : db_dependency, token: str = Cookie(None)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        user = db.query(User).filter(User.email == payload.get("email")).first()
        if user is None:
            raise credentials_exception
        return user
    except jwt.PyJWTError:
        raise credentials_exception

def user_is_admin(user : User):
    return user.is_admin

auth_dependency = Annotated[User, Depends(get_current_user)]