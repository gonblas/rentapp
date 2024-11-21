from typing import Annotated
from fastapi import APIRouter, HTTPException, Query, Depends, status
from sqlalchemy import func
from app.database import db_dependency
from app.models import Property, User, Image, Building, Neighborhood
from app.schemas.properties import PublicationResponse, SearchResponse, PropertyResponse, PropertiesResponse, PropertiesListResponse
from app.utils.parser import parse_publication_response, parse_properties_response
from app.utils.auth import auth_dependency

router = APIRouter(
    prefix="/property",
    tags=["properties"],
)

#return list of properties
@router.get(
        "/list",
        response_model=PropertiesListResponse,
        status_code=status.HTTP_200_OK,
        summary="List of properties to be displayed on the homepage",
        )
def read_properties_list(db: db_dependency, page: Annotated[int, Query()] = 1):

    if page < 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid page number")

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
    )

    all_properties = query.all()

    if not all_properties:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Properties not found")

    total_records = len(all_properties)
    total_pages = total_records // 10 + 1
    current_page = page 

    properties = all_properties[(page-1)*10:page*10]

    return {
        "properties": parse_properties_response(properties),
        "paging": {
            "total_records": total_records,
            "total_pages": total_pages,
            "current_page": current_page
        }
    }

# publication info, opcional login
@router.get(
        "/{property_id}",
        response_model=PublicationResponse,
        status_code=status.HTTP_200_OK,
        summary="Full property publication information",
        )
def read_property(property_id: int, db: db_dependency):

    query = (
    db.query(
        Property,
        User,
        Building,
        Neighborhood.name,
        func.group_concat(Image.url).label('images')  
    )
    .join(User, Property.publisher_id == User.id)
    .outerjoin(Image, Property.id == Image.property_id)
    .join(Building, Property.building_id == Building.id)
    .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
    .group_by(Property.id, User.id)
    )

    property = query.filter(Property.id == property_id, Property.approved == True).first()

    if not property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")

    return parse_publication_response(property)