from datetime import datetime, timedelta, timezone
import os
from fastapi import APIRouter, Depends, HTTPException, status, Cookie, Form
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from typing import Annotated
from ..database import db_dependency
import jwt
from passlib.context import CryptContext
from ..models import User
from ..schemas.users import UserSignUp, UserResponse

router = APIRouter()

secret_key = os.getenv("TOKEN_SECRET_KEY")
algorithm = os.getenv("TOKEN_ENCRYPTION_ALGORITHM")
expire_time = os.getenv("TOKEN_EXPIRE_MINUTES")

auth_context = CryptContext(
    schemes=["bcrypt"],
    default = "bcrypt",
    bcrypt__rounds = 12, #salt
    deprecated="auto"
)

@router.post("/login")
def login(email: Annotated[str, Form()], password : Annotated[str, Form()], db: db_dependency):

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not check_user_password(password, user.password):
        raise HTTPException(status_code=404, detail="Invalid password")

    payload = {
        "user_id": user.id,
        "email": user.email,
        "is_real_estate": user.is_real_estate,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=int(expire_time))
    }
    token = jwt.encode(payload, secret_key, algorithm=algorithm)

    response = JSONResponse(
        content={
            "user_id" : user.id,
            "email": user.email,
            "is_real_estate": user.is_real_estate,
            "avatar" : user.avatar
        }
    )

    response.set_cookie(key="token",
                        httponly=True,
                        samesite="strict",
                        value=token
                        )

    return response


def check_user_password(plain_password : str, hashed_password : str):
    return auth_context.verify(plain_password, hashed_password)


#TODO: it must me protected with JWT
@router.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db : db_dependency):

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")


    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_real_estate": user.is_real_estate,
        "phone_number": user.phone_number,
        "has_phone_number": user.has_phone_number,
        "whatsapp_number": user.whatsapp_number,
        "has_whatsapp_number": user.has_whatsapp_number,
        "avatar": user.avatar
    }



#TODO: It must receive a form with the user data
# @router.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
# def create_user(user: UserSignUp, db: db_dependency):

#     if check_user_exists(user, db):
#         raise HTTPException(status_code=404, detail="User already exists")

#     salt = bcrypt.gensalt()
#     hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), salt)

#     new_user = User(
#         name=user.name,
#         email=user.email,
#         is_real_estate=user.is_real_estate,
#         password=hashed_password.decode('utf-8')

#     )

#     db.add(new_user)
#     db.commit()

#     user_created = db.query(User).filter(User.email == user.email).first()
#     del user_created.password

#     return UserSchema(**user_created.__dict__)


#check if the user already exists
def check_user_exists(user: UserSignUp, db: db_dependency):
    return db.query(User).filter(User.email == user.email).first()