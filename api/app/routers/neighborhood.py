from fastapi import APIRouter, HTTPException
from ..database import db_dependency
from ..models import Neighborhood
from ..schemas.neighborhoods import NeighborhoodResponse, NeighborhoodsResponse

router = APIRouter()

@router.get("/neighborhoods/", response_model=NeighborhoodsResponse)
def read_neighborhoods(db : db_dependency):
    neighborhoods = db.query(Neighborhood).all()

    if not neighborhoods:
        raise HTTPException(status_code=404, detail="Neighborhoods not found")

    return {
        "neighborhoods": neighborhoods
    }

@router.get("/neighborhoods/{neighborhood_id}", response_model=NeighborhoodResponse)
def read_neighborhood(neighborhood_id: int, db : db_dependency):
    neighborhood = db.query(Neighborhood).filter(Neighborhood.id == neighborhood_id).first()

    if neighborhood is None:
        raise HTTPException(status_code=404, detail="Neighborhood not found")
    
    return {
        "id": neighborhood.id,
        "name": neighborhood.name
    }