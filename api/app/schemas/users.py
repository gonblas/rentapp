from pydantic import BaseModel
from typing import Annotated
from fastapi import File, UploadFile, Form

class UserLoginRequest(BaseModel):
    email : Annotated[str, Form()]
    password : Annotated[str, Form()]

class UserSignUpRequest(BaseModel):
    name : Annotated[str, Form()]
    email : Annotated[str, Form()]
    is_real_estate : Annotated[bool, Form()]
    password : Annotated[str, Form()]
    phone_number: Annotated[str, Form()]
    has_phone_number: Annotated[bool, Form()]
    whatsapp_number: Annotated[str, Form()]
    has_whatsapp_number: Annotated[bool, Form()]
    avatar: Annotated[UploadFile, File()]


class ContactInfo(BaseModel):
    email : str
    phone_number: str
    has_phone_number: bool
    whatsapp_number: str
    has_whatsapp_number: bool

class GetUserResponse(BaseModel):
    id: int
    name : str
    is_real_estate : bool
    is_admin : bool
    avatar: str
    contact: ContactInfo
