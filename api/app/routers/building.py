from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Annotated
from ..database import db_dependency
from ..models import Building, Neighborhood, User
from ..schemas.buildings import BuildingsResponse, BuildingResponse
from fastapi import Cookie
from . import auth

router = APIRouter(
    prefix="/building",
    tags=["buildings"],
)

# returns all buildings that are approved
@router.get("/", response_model=BuildingsResponse, status_code=status.HTTP_200_OK)
def read_buildings(db: db_dependency):

    query=(
        db.query(Building, Neighborhood.name)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
        .filter(Building.approved == True)
    )

    buildings = query.all()

    if buildings is None:
        raise HTTPException(status_code=404, detail="Buildings not found")

    return parse_buildings_response(buildings)

# returns a building by id, only if it is approved
@router.get("/{building_id}", response_model=BuildingResponse, status_code=status.HTTP_200_OK)
def read_building(building_id: int, db : db_dependency):

    query = (
        db.query(Building, Neighborhood.name)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
        .filter(Building.id == building_id, Building.approved == True)
    )

    building = query.first()

    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    
    return parse_building_response(building)

# returns a building by address, only if it is approved or the user is the publisher
@router.get("/search/", response_model=BuildingResponse, status_code=status.HTTP_200_OK)
def search_building(db: db_dependency, address : Annotated[str, Query()], user : User = Depends(auth.get_current_user)):

    query = (
        db.query(Building, Neighborhood.name)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
        .filter(Building.address == address)
    )
    if user:
        query = query.filter(Building.publisher_id == user.id or Building.approved == True)
    else:
        query = query.filter(Building.approved == True)

    building = query.first()

    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")

    return parse_building_response(building)


def parse_building_response(data:dict):

    building, neighborhood_name = data

    return {
        "id": building.id,
        "address": building.address,
        "publisher_id": building.publisher_id,
        "approved": building.approved,
        "neighborhood_id": building.neighborhood_id,
        "neighborhood_name": neighborhood_name,
        "floors": building.floors,
        "apartments_per_floor": building.apartments_per_floor,
        "elevator": building.elevator,
        "pool": building.pool,
        "gym": building.gym,
        "terrace": building.terrace,
        "bike_rack": building.bike_rack,
        "laundry": building.laundry
    }

def parse_buildings_response(buildings:dict):

    response = []
    for building in buildings:
        response.append(parse_building_response(buildings))
    return response