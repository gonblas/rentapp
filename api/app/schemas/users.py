from pydantic import BaseModel

class UserLogin(BaseModel):
    email : str
    password : str

class UserSignUp(BaseModel):
    name : str
    email : str
    is_real_estate : bool
    password : str
    is_real_estate: bool
    phone_number: str
    has_phone_number: bool
    whatsapp_number: str
    has_whatsapp_number: bool
    avatar: str

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