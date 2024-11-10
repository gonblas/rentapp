from pydantic import BaseModel

class UserLogin(BaseModel):
    email : str
    password : str

class UserSignUp(BaseModel):
    name : str
    email : str
    is_real_estate : bool
    password : str

class UserInDB(UserSignUp):
    id: int

class User(BaseModel):
    id: int
    name : str
    email : str
    is_real_estate : bool
