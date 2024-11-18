from datetime import datetime, timedelta, timezone
import os
from fastapi import APIRouter, Depends, HTTPException, status, Cookie, Form, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated
from ..database import db_dependency
import jwt
from passlib.context import CryptContext
from ..models import User, Property, Image
from ..schemas.users import UserResponse
from ..bucket import upload_avatar
from ..schemas.properties import PropertyResponse, PropertiesResponse
from .property import parse_properties_response
from sqlalchemy import func

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

secret_key = os.getenv("TOKEN_SECRET_KEY")
algorithm = os.getenv("TOKEN_ENCRYPTION_ALGORITHM")
expire_time = os.getenv("TOKEN_EXPIRE_MINUTES")

auth_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds = 12, #salt
    deprecated="auto"
)

@router.post("/signin", response_model=UserResponse, status_code=status.HTTP_200_OK)
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
        content=parse_user_response(usr)
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

def parse_user_response(user : User):
    return(
        {
            "id" :user.id,
            "name" :user.name,
            "email":user.email,
            "is_real_estate":user.is_real_estate,
            "phone_number":user.phone_number,
            "has_phone_number":user.has_phone_number,
            "whatsapp_number":user.whatsapp_number,
            "has_whatsapp_number":user.has_whatsapp_number,
            "avatar" :user.avatar
        }
    )


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

    if avatar is None:
        avatar_url = ""
    else:
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


    return parse_user_response(user_created)


@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
def read_user( db : db_dependency, token : Annotated[str | None, Cookie()] = None):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
        
    #this already checks the timestamp and the signature
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
    except jwt.PyJWTError:
        raise credentials_exception

    email = payload.get("email")

    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return parse_user_response(user)

@router.get("/publications", response_model=PropertiesResponse, status_code=status.HTTP_200_OK)
def read_user_publications( db : db_dependency, token : Annotated[str | None, Cookie()] = None):

        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
            
        #this already checks the timestamp and the signature
        try:
            payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        except jwt.PyJWTError:
            raise credentials_exception
    
        email = payload.get("email")
    
        user = db.query(User).filter(User.email == email).first()
    
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
    
        query = (
            db.query(
                Property,
                User,
                func.group_concat(Image.url).label('images')  
            )
            .join(User, Property.publisher_id == User.id)
            .outerjoin(Image, Property.id == Image.property_id)
            .group_by(Property.id, User.id)
        )

        all_properties = query.filter(Property.publisher_id == user.id).all()

        total_records = len(all_properties)
        total_pages = total_records // 10 + 1

        if all_properties is None:
            raise HTTPException(status_code=404, detail="No properties found")
    
        return(
            {
                "properties":parse_properties_response(all_properties),
                "pagination":{
                    "total_records": total_records,
                    "total_pages": total_pages,
                }

            }
        )