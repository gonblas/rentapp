from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import func
from app.database import db_dependency
from app.models import Property, User, Image, Building, Neighborhood
from app.schemas.properties import FilterParams, PublicationResponse, SearchResponse, PropertyResponse, PropertiesResponse, PropertiesListResponse
from app.utils.search import get_filters

router = APIRouter(
    prefix="/property",
    tags=["properties"],
)

# search for buildings and properties
@router.get("/", response_model=SearchResponse)
def read_properties(filter_params: Annotated[FilterParams, Query()], db: db_dependency):

    property_filters, building_filters = get_filters(filter_params)

    filtered_properties = (
        db.query(Property)
        .filter(*property_filters)
        .subquery()
    )

    query = (
        db.query(
            Building,
            filtered_properties.c.id.label('property_id'),
            filtered_properties.c.description,
            filtered_properties.c.rental_value,
            filtered_properties.c.expenses_value,
            filtered_properties.c.rooms,
            filtered_properties.c.square_meters,
            filtered_properties.c.location,
            filtered_properties.c.balconies,
            filtered_properties.c.backyard,
            filtered_properties.c.garage,
            filtered_properties.c.pet_friendly,
            User,
            Neighborhood.name,
            func.group_concat(Image.url).label('images'),
        )
        .join(filtered_properties, Building.id == filtered_properties.c.building_id)
        .join(User, Building.publisher_id == User.id) 
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id) 
        .outerjoin(Image, filtered_properties.c.id == Image.property_id) 
        .filter(*building_filters)  
        .group_by(Building.id, filtered_properties.c.id)
    )

    list = query.all()

    return parse_search_response(list)


#return list of properties
@router.get("/list", response_model=PropertiesListResponse)
def read_properties_list(db: db_dependency, page: Annotated[int, Query()] = 1):

    if page < 1:
        raise HTTPException(status_code=400, detail="Invalid page number")

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
        raise HTTPException(status_code=404, detail="Properties not found")

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


# publication info
@router.get("/{property_id}", response_model=PublicationResponse)
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
        raise HTTPException(status_code=404, detail="Property not found")

    return parse_publication_response(property)


def parse_properties_response(properties : dict):
    response=[]
    for property in properties:
        response.append(parse_property_response(property))
    return response


# card response
def parse_property_response(property : dict):
    property, user, address, images = property
    return {
        "id": property.id,
        "description": property.description,
        "address": address,
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
            "name" : user.name,
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
        "images": images.split(',') if images else [],
    }

def parse_publication_response(publication : dict):
    property, user, building, neighborhood_name, images = publication
    return ({
        "id": property.id,
        "description": property.description,
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
            "name" : user.name,
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
        "building": {
            "id": building.id,
            "address": building.address,
            "neighborhood_name": neighborhood_name,
            "floors": building.floors,
            "apartments_per_floor": building.apartments_per_floor,
            "elevator": building.elevator,
            "pool": building.pool,
            "gym": building.gym,
            "terrace": building.terrace,
            "bike_rack": building.bike_rack,
            "laundry": building.laundry,
        },
        "images": images.split(',') if images else [],
    })


def parse_search_response(results):
    buildings = {}
    for result in results:
        building, property_id, description, rental_value, expenses_value, rooms, square_meters, location, balconies, backyard, garage, pet_friendly,user,neighborhood_name, images = result
        
        if building.id not in buildings:
            buildings[building.id] = {
                "id": building.id,
                "address": building.address,
                "neighborhood_name": neighborhood_name,
                "floors": building.floors,
                "apartments_per_floor": building.apartments_per_floor,
                "elevator": building.elevator,
                "pool": building.pool,
                "gym": building.gym,
                "terrace": building.terrace,
                "bike_rack": building.bike_rack,
                "laundry": building.laundry,
                "properties": []
            }
        
        buildings[building.id]["properties"].append({
            "id": property_id,
            "description": description,
            "features": {
                "rental_value": rental_value,
                "expenses_value": expenses_value,
                "rooms": rooms,
                "square_meters": square_meters,
                "location": location,
                "balconies": balconies,
                "backyard": backyard,
                "garage": garage,
                "pet_friendly": pet_friendly,
            },
            "publisher":{
                "publisher_id": user.id,
                "name": user.name,
                "is_real_estate": user.is_real_estate,
                "avatar": user.avatar,
                "contact": {
                    "email": user.email,
                    "phone_number": user.phone_number,
                    "has_phone_number": user.has_phone_number,
                    "whatsapp_number": user.whatsapp_number,
                    "has_whatsapp_number": user.has_whatsapp_number,
                }
            },
            "images": images.split(',') if images else []
        })
    
    return SearchResponse(buildings=list(buildings.values()))
