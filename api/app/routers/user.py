from datetime import datetime, timedelta, timezone
import os
from fastapi import APIRouter, Depends, HTTPException, status, Cookie, Form, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated
from ..database import db_dependency
import jwt
from passlib.context import CryptContext
from ..models import User
from ..schemas.users import UserResponse
from ..bucket import upload_avatar

router = APIRouter()

secret_key = os.getenv("TOKEN_SECRET_KEY")
algorithm = os.getenv("TOKEN_ENCRYPTION_ALGORITHM")
expire_time = os.getenv("TOKEN_EXPIRE_MINUTES")

auth_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds = 12, #salt
    deprecated="auto"
)

@router.post("/signin", response_model=UserResponse, status_code=status.HTTP_200_OK, )
def login(email: Annotated[str,Form()],password: Annotated[str,Form()], db: db_dependency):

    usr = db.query(User).filter(User.email == email).first()

    if usr is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not check_user_password(password, usr.password):
        raise HTTPException(status_code=404, detail="Invalid password")

    payload = {
        "user_id": usr.id,
        "email": usr.email,
        "is_real_estate": usr.is_real_estate,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=int(expire_time))
    }
    token = jwt.encode(payload, secret_key, algorithm=algorithm)

    response = JSONResponse(
        content={
            "id" : usr.id,
            "name" : usr.name,
            "email": usr.email,
            "is_real_estate": usr.is_real_estate,
            "phone_number": usr.phone_number,
            "has_phone_number": usr.has_phone_number,
            "whatsapp_number": usr.whatsapp_number,
            "has_whatsapp_number": usr.has_whatsapp_number,
            "avatar" : usr.avatar
        }
    )

    response.set_cookie(key="token",
                        httponly=True,
                        samesite="lax",
                        value=token
                        )

    return response


def check_user_password(plain_password : str, hashed_password : str):
    return auth_context.verify(plain_password, hashed_password)
    

def check_user_exists(email:str, db: db_dependency):
    return db.query(User).filter(User.email == email).first()


@router.post("/signup/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
                name: Annotated[str, Form()],
                email: Annotated[str, Form()],
                password: Annotated[str, Form()],
                is_real_estate: Annotated[bool, Form()],
                birth_date: Annotated[datetime, Form()],
                phone_number: Annotated[str, Form()],
                has_phone_number: Annotated[bool, Form()],
                whatsapp_number: Annotated[str, Form()],
                has_whatsapp_number: Annotated[bool, Form()],
                avatar: Annotated[UploadFile, File()],
                db: db_dependency):
    
        if check_user_exists(email, db):
            raise HTTPException(status_code=404, detail="User already exists")
        
        hashed_password = auth_context.hash(password)

        avatar_url = upload_avatar(avatar)

        if avatar_url is None:
            raise HTTPException(status_code=404, detail="Error uploading avatar")

        new_user = User(
            name=name,
            email=email,
            is_real_estate=is_real_estate,
            password=hashed_password,
            phone_number=phone_number,
            has_phone_number=has_phone_number,
            whatsapp_number=whatsapp_number,
            has_whatsapp_number=has_whatsapp_number,
            avatar=avatar_url
        )
    
        db.add(new_user)
        db.commit()
    
        user_created = db.query(User).filter(User.email == email).first()
        del user_created.password
    

        return(
            {
            "id" :user_created.id,
            "name" :user_created.name,
            "email":user_created.email,
            "is_real_estate":user_created.is_real_estate,
            "phone_number":user_created.phone_number,
            "has_phone_number":user_created.has_phone_number,
            "whatsapp_number":user_created.whatsapp_number,
            "has_whatsapp_number":user_created.has_whatsapp_number,
            "avatar" :user_created.avatar
            }
        )



# #TODO: it must me protected with JWT
# @router.get("/users/{user_id}", response_model=UserResponse)
# def read_user(user_id: int, db : db_dependency):

#     user = db.query(User).filter(User.id == user_id).first()

#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")


#     return {
#         "id": user.id,
#         "name": user.name,
#         "email": user.email,
#         "is_real_estate": user.is_real_estate,
#         "phone_number": user.phone_number,
#         "has_phone_number": user.has_phone_number,
#         "whatsapp_number": user.whatsapp_number,
#         "has_whatsapp_number": user.has_whatsapp_number,
#         "avatar": user.avatar
#     }



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
