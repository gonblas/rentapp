from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
import bcrypt
from ..database import db_dependency
from ..models import User
from ..schemas.users import UserSignUp, User as UserSchema

router = APIRouter()

#TODO: it must me protected with JWT
@router.get("/users/{user_id}", response_model=UserSchema)
def read_user(user_id: int, db : db_dependency):

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")


    return UserSchema(**user.__dict__)


#TODO: It must receive a form with the user data
@router.post("/users", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
def create_user(user: UserSignUp, db: db_dependency):

    if check_user_exists(user, db):
        raise HTTPException(status_code=404, detail="User already exists")

    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), salt)

    new_user = User(
        name=user.name,
        email=user.email,
        is_real_estate=user.is_real_estate,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()

    user_created = db.query(User).filter(User.email == user.email).first()
    del user_created.password

    return UserSchema(**user_created.__dict__)


#check if the user already exists
def check_user_exists(user: UserSignUp, db: db_dependency):
    return db.query(User).filter(User.email == user.email).first()