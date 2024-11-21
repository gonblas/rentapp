from fastapi import APIRouter, HTTPException, status
from app.database import db_dependency
from app.models import Neighborhood
from app.schemas.neighborhoods import NeighborhoodResponse, NeighborhoodsResponse
from app.utils.parser import parse_neighborhood_response, parse_neighborhoods_response

router = APIRouter(
    prefix="/neighborhood",
    tags=["neighborhood"],
)

@router.get(
            "/",
            response_model=NeighborhoodsResponse,
            status_code=status.HTTP_200_OK,
            summary="Get all neighborhoods",
            )
def read_neighborhoods(db : db_dependency):
    neighborhoods = db.query(Neighborhood).all()

    if not neighborhoods:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No neighborhoods found")

    return parse_neighborhoods_response(neighborhoods)
        

@router.get(
            "/{neighborhood_id}",
            response_model=NeighborhoodResponse,
            status_code=status.HTTP_200_OK,
            summary="Get neighborhood by id",
            )
def read_neighborhood(neighborhood_id: int, db : db_dependency):
    neighborhood = db.query(Neighborhood).filter(Neighborhood.id == neighborhood_id).first()

    if neighborhood is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Neighborhood not found")
    
    return parse_neighborhood_response(neighborhood)
