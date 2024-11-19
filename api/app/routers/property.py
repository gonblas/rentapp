from typing import Annotated
from fastapi import APIRouter, HTTPException, Query
from ..database import db_dependency
from ..models import Property, User, Image, Building, Neighborhood
from sqlalchemy import func
from ..schemas.properties import FilterParams, PublicationResponse, SearchResponse, PropertyResponse

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

        
def get_filters(filter_params: FilterParams):
    property_filters=[]
    building_filters=[]

    property_filters.append(Property.approved == True)
    building_filters.append(Building.approved == True)

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
    # # building filters
    if filter_params.neighborhood_id:
        building_filters.append(Building.neighborhood_id == filter_params.neighborhood_id)
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
    property, user, images = property
    return {
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