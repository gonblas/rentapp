from fastapi import APIRouter, HTTPException
from ..database import db_dependency
from ..models import Neighborhood

router = APIRouter()

@router.get("/neighborhoods/")
def read_neighborhoods(db : db_dependency):
    return db.query(Neighborhood).all()

@router.get("/neighborhoods/{neighborhood_id}")
def read_neighborhood(neighborhood_id: int, db : db_dependency):
    neighborhood = db.query(Neighborhood).filter(Neighborhood.id == neighborhood_id).first()

    if neighborhood is None:
        raise HTTPException(status_code=404, detail="Neighborhood not found")
    
    return neighborhood