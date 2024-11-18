from fastapi import APIRouter, HTTPException, status
from ..database import db_dependency
from ..models import Neighborhood
from ..schemas.neighborhoods import NeighborhoodResponse, NeighborhoodsResponse

router = APIRouter(
    prefix="/neighborhood",
    tags=["neighborhood"],
)

@router.get("/", response_model=NeighborhoodsResponse)
def read_neighborhoods(db : db_dependency):
    neighborhoods = db.query(Neighborhood).all()

    if not neighborhoods:
        raise HTTPException(status_code=404, detail="Neighborhoods not found")

    return parse_neighborhoods_response(neighborhoods)
        

@router.get("/{neighborhood_id}", response_model=NeighborhoodResponse, status_code=status.HTTP_200_OK)
def read_neighborhood(neighborhood_id: int, db : db_dependency):
    neighborhood = db.query(Neighborhood).filter(Neighborhood.id == neighborhood_id).first()

    if neighborhood is None:
        raise HTTPException(status_code=404, detail="Neighborhood not found")
    
    return parse_neighborhood_response(neighborhood)

def parse_neighborhood_response(neighborhood : dict):
    return {
        "id": neighborhood.id,
        "name": neighborhood.name
    }

def parse_neighborhoods_response(neighborhoods : list):
    return {
        "neighborhoods": [parse_neighborhood_response(neighborhood) for neighborhood in neighborhoods]
    }