from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from ..database import db_dependency
from ..models import Property, User, Image
from sqlalchemy import func
from ..schemas.properties import FilterParams, PropertiesResponse, PropertyResponse

router = APIRouter()

@router.get("/properties/", response_model=PropertiesResponse)
def read_properties(filter_params: Annotated[FilterParams, Query()], db: db_dependency):
    filters=[]

    filters.append(Property.approved == True)

    if filter_params.neighborhood_id:
        filters.append(Property.neighborhood_id == filter_params.neighborhood_id)
    if filter_params.type:
        filters.append(Property.type == filter_params.type)
    if filter_params.min_rental_value:
        filters.append(Property.rental_value >= filter_params.min_rental_value)
    if filter_params.max_rental_value:
        filters.append(Property.rental_value <= filter_params.max_rental_value)
    if filter_params.min_expenses_value:
        filters.append(Property.expenses_value >= filter_params.min_expenses_value)
    if filter_params.max_expenses_value:
        filters.append(Property.expenses_value <= filter_params.max_expenses_value)
    if filter_params.rooms:
        filters.append(Property.rooms == filter_params.rooms)
    if filter_params.square_meters:
        filters.append(Property.square_meters == filter_params.square_meters)
    if filter_params.balconies:
        filters.append(Property.balconies == filter_params.balconies)
    if filter_params.backyard is not None:
        filters.append(Property.backyard == filter_params.backyard)
    if filter_params.garage is not None:
        filters.append(Property.garage == filter_params.garage)
    if filter_params.pet_friendly is not None:
        filters.append(Property.pet_friendly == filter_params.pet_friendly)
    if filter_params.location:
        filters.append(Property.location == filter_params.location)
    if filter_params.building_id:
        filters.append(Property.building_id == filter_params.building_id)

    query = (
        db.query(
            Property,
            User.is_real_estate,
            User.avatar,
            func.group_concat(Image.url).label('images')  
        )
        .join(User, Property.publisher_id == User.id)
        .outerjoin(Image, Property.id == Image.property_id)
        .group_by(Property.id, User.is_real_estate)
    )

    all_properties = query.filter(*filters).all()
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


@router.get("/properties/{property_id}", response_model=PropertyResponse)
def read_property(property_id: int, db: db_dependency):

    query = (
    db.query(
        Property,
        User.is_real_estate,
        User.avatar,
        func.group_concat(Image.url).label('images')  
    )
    .join(User, Property.publisher_id == User.id)
    .outerjoin(Image, Property.id == Image.property_id)
    .group_by(Property.id, User.is_real_estate)
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
    property, is_real_estate, avatar, images = property
    return {
        "id": property.id,
        "description": property.description,
        "contact": {
            "phone": property.phone,
            "email": property.email,
        },
        "location": {
            "address": property.address,
            "neighborhood_id": property.neighborhood_id,
        },
        "features": {
            "type": property.type,
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
            "is_real_estate": is_real_estate,
            "avatar": avatar,
        },
        "building_id": property.building_id,
        "images": images.split(',') if images else [],
    }
