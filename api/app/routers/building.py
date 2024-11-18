from fastapi import APIRouter, HTTPException, Query, status
from typing import Annotated
from ..database import db_dependency
from ..models import Building
from ..schemas.buildings import BuildingsResponse, BuildingResponse

router = APIRouter(
    prefix="/building",
    tags=["buildings"],
)

@router.get("/", response_model=BuildingsResponse, status_code=status.HTTP_200_OK)
def read_buildings(db: db_dependency):
    buildings = db.query(Building).all()

    if buildings is None:
        raise HTTPException(status_code=404, detail="Buildings not found")

    return buildings

@router.get("/{building_id}", response_model=BuildingResponse, status_code=status.HTTP_200_OK)
def read_building(building_id: int, db : db_dependency):
    building = db.query(Building).filter(Building.id == building_id).first()

    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    
    return parse_building_response(building)

@router.get("/search/", response_model=BuildingResponse, status_code=status.HTTP_200_OK)
def search_building(db: db_dependency, address : Annotated[str, Query()]):
    building = db.query(Building).filter(Building.address == address).first()

    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    
    return parse_building_response(building)


def parse_building_response(building : dict):
    return {
        "id": building.id,
        "address": building.address,
        "neighborhood_id": building.neighborhood_id,
        "floors": building.floors,
        "apartments_per_floor": building.apartments_per_floor,
        "elevator": building.elevator,
        "pool": building.pool,
        "gym": building.gym,
        "terrace": building.terrace,
        "bike_rack": building.bike_rack,
        "laundry": building.laundry
    }

def parse_buildings_response(buildings : dict):
    response=[]
    for building in buildings:
        response.append(parse_building_response(building))
    return response