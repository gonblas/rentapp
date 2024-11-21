from fastapi import APIRouter, HTTPException, Query, status, Cookie
from typing import Annotated
from sqlalchemy import func
from app.database import db_dependency
from app.models import Building, Neighborhood, User, Property, Image
from app.schemas.buildings import BuildingsResponse, BuildingResponse, BuildingPost, BuildingFilterParams
from app.schemas.properties import PropertyFilterParams, PropertiesResponse
from app.utils.auth import auth_dependency, get_current_user
from app.utils.search import get_building_filters, get_property_filters
from app.utils.parser import parse_buildings_response, parse_building_response, parse_properties_response

router = APIRouter(
    prefix="/building",
    tags=["buildings"],
)

# filters buildings
@router.get(
            "/",
            response_model=BuildingsResponse,
            status_code=status.HTTP_200_OK,
            summary="Returns a list of buildings that match the filters"
            )
def read_buildings(db: db_dependency, filters: Annotated[BuildingFilterParams, Query()]):

    property_filters, building_filters = get_building_filters(filters)

    # get buildings that have properties that match the filters
    filtered_properties = (
        db.query(Property.building_id)
        .filter(*property_filters)
        .distinct()
        .subquery()
    )

    query = (
        db.query(
            Building,
            Neighborhood.name.label("neighborhood_name"),
        )
        .join(filtered_properties, Building.id == filtered_properties.c.building_id)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
        .filter(*building_filters)
        .group_by(Building.id)
    )

    buildings = query.all()

    if buildings is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Buildings not found")

    return parse_buildings_response(buildings)

# 
@router.get(
            "/{building_id}/properties",
            response_model=PropertiesResponse,
            status_code=status.HTTP_200_OK,
            summary="Returns a list of properties of a building that match the filters"
            )
def read_building_properties(building_id: int, db: db_dependency, filters : Annotated[PropertyFilterParams, Query()]):

    building = db.query(Building).filter(Building.id == building_id, Building.approved == True).first()

    if building is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")

    filters = get_property_filters(filters)

    query = (
        db.query(
            Property,
            User,
            Building.address,
            func.group_concat(Image.url).label('images')  
        )
        .join(User, Property.publisher_id == User.id)
        .join(Building, Property.building_id == Building.id)
        .outerjoin(Image, Property.id == Image.property_id)
        .group_by(Property.id, User.id)
        .filter(Property.building_id == building_id, *filters)
    )

    properties = query.all()

    if properties is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Properties not found")

    return {
        "properties" : parse_properties_response(properties)
    }

@router.get(
            "/{building_id}",
            response_model=BuildingResponse,
            status_code=status.HTTP_200_OK,
            summary="Returns a building info"
            )
def read_building(building_id: int, db : db_dependency, token : Annotated[str,Cookie()] = None):

    try:
        user = get_current_user(db, token)
    except:
        user = None

    query = (
        db.query(Building, Neighborhood.name)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
    )

    if user:
        my_user = db.query(User).filter(User.id == user.id).first()
    
    if user and my_user.is_admin:
        building = query.filter(Building.id == building_id).first()
    else:
        building = query.filter(Building.id == building_id, Building.approved == True).first()

    if building is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")
    
    return parse_building_response(building)

@router.get(
            "/search/",
            response_model=BuildingResponse,
            status_code=status.HTTP_200_OK,
            summary="Returns a building info by address, if it is approved or the user is the publisher"
            )
def search_building(db: db_dependency, address : Annotated[str, Query()], user : auth_dependency = None):

    query = (
        db.query(Building, Neighborhood.name)
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
        .filter(Building.address == address, (Building.publisher_id == user.id) | (Building.approved == True))
    )

    building = query.first()

    if building is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")

    return parse_building_response(building)

@router.post(
            "/",
            response_model=BuildingResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Creates a new building"
            )
async def create_building(building: BuildingPost, db: db_dependency, user: auth_dependency):

    if db.query(Building).filter(Building.address == building.address, Building.approved == True).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Building already exists")
    
    neighborhood = db.query(Neighborhood).filter(Neighborhood.id == building.neighborhood_id).first()

    if neighborhood is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Neighborhood not found")

    new_building = Building(
        address=building.address,
        publisher_id=user.id,
        approved=False,
        neighborhood_id=building.neighborhood_id,
        floors=building.floors,
        apartments_per_floor=building.apartments_per_floor,
        elevator=building.elevator,
        pool=building.pool,
        gym=building.gym,
        terrace=building.terrace,
        bike_rack=building.bike_rack,
        laundry=building.laundry
    )

    db.add(new_building)
    db.commit()
    db.refresh(new_building)

    return parse_building_response((new_building, neighborhood.name))