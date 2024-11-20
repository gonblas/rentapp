from datetime import datetime
from fastapi import APIRouter, HTTPException, status, Form, File, UploadFile
from fastapi.responses import JSONResponse
from typing import Annotated
from ..database import db_dependency
from ..models import User, Property, Image, Building
from ..schemas.users import UserResponse
from ..bucket import upload_avatar
from ..schemas.properties import PropertyResponse, PropertiesResponse
from .property import parse_properties_response
from sqlalchemy import func
from .auth import auth_dependency, auth_context, generate_user_token

router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.post("/signin", response_model=UserResponse, status_code=status.HTTP_200_OK)
def login(email: Annotated[str,Form()],password: Annotated[str,Form()], db: db_dependency):

    usr = db.query(User).filter(User.email == email).first()

    if usr is None:
        raise HTTPException(status_code=404, detail="User not found")

    if not check_user_password(password, usr.password):
        raise HTTPException(status_code=404, detail="Invalid password")

    token = generate_user_token(usr.id, usr.email, usr.is_real_estate)

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
            "is_real_estate":user.is_real_estate,
            "avatar":user.avatar,
            "contact_info":{
                "email":user.email,
                "phone_number":user.phone_number,
                "has_phone_number":user.has_phone_number,
                "whatsapp_number":user.whatsapp_number,
                "has_whatsapp_number":user.has_whatsapp_number,
            },
        }
    )


@router.post("/signup/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
                db: db_dependency,
                name: Annotated[str, Form()],
                email: Annotated[str, Form()],
                password: Annotated[str, Form()],
                is_real_estate: Annotated[bool, Form()],
                phone_number: Annotated[str, Form()],
                has_phone_number: Annotated[bool, Form()],
                whatsapp_number: Annotated[str, Form()],
                has_whatsapp_number: Annotated[bool, Form()],
                avatar: Annotated[UploadFile, File()] = None
                ):
    
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


# returns the user logged in
@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
def read_user( db : db_dependency, user : auth_dependency = None):

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return parse_user_response(user)

# returns all properties from a user
@router.get("/publications", response_model=PropertiesResponse, status_code=status.HTTP_200_OK)
def read_user_publications( db : db_dependency, user : auth_dependency = None):

        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        query = (
            db.query(
                Property,
                User,
                Building.address,
                func.group_concat(Image.url).label('images')  
            )
            .join(User, Property.publisher_id == User.id)
            .join(Building, Property.building_id == Building.id)
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

@router.get("/logout", status_code=status.HTTP_200_OK)
def logout():
    response = JSONResponse(
        content={"message":"User logged out"}
    )

    response.delete_cookie(key="token")

    return response