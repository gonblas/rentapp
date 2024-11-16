from pydantic import BaseModel
from typing import Annotated
from fastapi import File, UploadFile, Form

class UserSignIn(BaseModel):
    email : Annotated[str, Form()]
    password : Annotated[str, Form()]

class UserSignUp(BaseModel):
    name : Annotated[str, Form()]
    email : Annotated[str, Form()]
    is_real_estate : Annotated[bool, Form()]
    password : Annotated[str, Form()]
    phone_number: Annotated[str, Form()]
    has_phone_number: Annotated[bool, Form()]
    whatsapp_number: Annotated[str, Form()]
    has_whatsapp_number: Annotated[bool, Form()]
    avatar: Annotated[UploadFile, File()]

class UserInDB(UserSignUp):
    id: int

class User(BaseModel):
    id: int
    name : str
    email : str
    is_real_estate : bool

class UserResponse(BaseModel):
    id: int
    name : str
    email : str
    is_real_estate : bool
    phone_number: str
    has_phone_number: bool
    whatsapp_number: str
    has_whatsapp_number: bool
    avatar: str