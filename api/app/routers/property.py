from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from ..database import db_dependency
from ..models import Property, User, Image, Building
from sqlalchemy import func
from ..schemas.properties import FilterParams, PropertiesResponse, PropertyResponse

router = APIRouter(
    prefix="/properties",
    tags=["properties"],
)

@router.get("/", response_model=PropertiesResponse)
def read_properties(filter_params: Annotated[FilterParams, Query()], db: db_dependency):

    property_filters, building_filters = get_filters(filter_params)

    query = (
        db.query(
            Property,
            User,
            func.group_concat(Image.url).label('images')  
        )
        .join(User, Property.publisher_id == User.id)
        .outerjoin(Image, Property.id == Image.property_id)
        .join(Building, Property.building_id == Building.id)
        .group_by(Property.id, User.id)
    )


    all_properties = query.filter(*property_filters, *building_filters).all()
    properties = all_properties[filter_params.offset:filter_params.offset + filter_params.limit]

    if not properties:
        raise HTTPException(status_code=404, detail="Properties not found")

    total_records = len(all_properties)
    total_pages = total_records // filter_params.limit + 1

    response=parse_properties_response(properties)

    return {
        "properties": response,
        "pagination":{
            "total_records": total_records,
            "total_pages": total_pages,
        }
    }

def get_filters(filter_params: FilterParams):
    property_filters=[]
    building_filters=[]

    property_filters.append(Property.approved == True)

    if filter_params.neighborhood_id:
        property_filters.append(Property.neighborhood_id == filter_params.neighborhood_id)
    if filter_params.min_rental_value:
        property_filters.append(Property.rental_value >= filter_params.min_rental_value)
    if filter_params.max_rental_value:
        property_filters.append(Property.rental_value <= filter_params.max_rental_value)
    if filter_params.min_expenses_value:
        property_filters.append(Property.expenses_value >= filter_params.min_expenses_value)
    if filter_params.max_expenses_value:
        property_filters.append(Property.expenses_value <= filter_params.max_expenses_value)
    if filter_params.rooms:
        property_filters.append(Property.rooms == filter_params.rooms)
    if filter_params.square_meters:
        property_filters.append(Property.square_meters == filter_params.square_meters)
    if filter_params.balconies:
        property_filters.append(Property.balconies == filter_params.balconies)
    if filter_params.backyard is not None:
        property_filters.append(Property.backyard == filter_params.backyard)
    if filter_params.garage is not None:
        property_filters.append(Property.garage == filter_params.garage)
    if filter_params.pet_friendly is not None:
        property_filters.append(Property.pet_friendly == filter_params.pet_friendly)
    if filter_params.location:
        property_filters.append(Property.location == filter_params.location)
    # # buildings filters
    if filter_params.floors:
        building_filters.append(Building.floors == filter_params.floors)
    if filter_params.apartments_per_floor:
        building_filters.append(Building.apartments_per_floor == filter_params.apartments_per_floor)
    if filter_params.elevator is not None:
        building_filters.append(Building.elevator == filter_params.elevator)
    if filter_params.pool is not None:
        building_filters.append(Building.pool == filter_params.pool)
    if filter_params.gym is not None:
        building_filters.append(Building.gym == filter_params.gym)
    if filter_params.terrace is not None:
        building_filters.append(Building.terrace == filter_params.terrace)
    if filter_params.bike_rack is not None:
        building_filters.append(Building.bike_rack == filter_params.bike_rack)
    if filter_params.laundry is not None:
        building_filters.append(Building.laundry == filter_params.laundry)
    
    return property_filters, building_filters


@router.get("/{property_id}", response_model=PropertyResponse)
def read_property(property_id: int, db: db_dependency):

    query = (
    db.query(
        Property,
        User,
        func.group_concat(Image.url).label('images')  
    )
    .join(User, Property.publisher_id == User.id)
    .outerjoin(Image, Property.id == Image.property_id)
    # .group_by(Property.id, User.is_real_estate)
    )

    property = query.filter(Property.id == property_id).first()

    if not property:
        raise HTTPException(status_code=404, detail="Property not found")

    response = parse_property_response(property)

    return response


def parse_properties_response(properties : dict):
    response=[]
    for property in properties:
        response.append(parse_property_response(property))
    return response


def parse_property_response(property : dict):
    property, user, images = property
    return {
        "id": property.id,
        "description": property.description,
        "location": {
            "address": property.address,
            "neighborhood_id": property.neighborhood_id,
        },
        "features": {
            "rental_value": property.rental_value,
            "expenses_value": property.expenses_value,
            "rooms": property.rooms,
            "square_meters": property.square_meters,
            "location": property.location,
            "balconies": property.balconies,
            "backyard": property.backyard,
            "garage": property.garage,
            "pet_friendly": property.pet_friendly,
        },
        "publisher": {
            "publisher_id": property.publisher_id,
            "is_real_estate": user.is_real_estate,
            "avatar": user.avatar,
            "contact": {
                "email" : user.email,
                "phone_number": user.phone_number,
                "has_phone_number": user.has_phone_number,
                "whatsapp_number": user.whatsapp_number,
                "has_whatsapp_number": user.has_whatsapp_number,
            }
        },
        "building_id": property.building_id,
        "images": images.split(',') if images else [],
    }