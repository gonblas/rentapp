#Properties
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

# Buildings

def parse_building_response(data:dict):

    building, neighborhood_name = data

    return {
        "id": building.id,
        "address": building.address,
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
        response.append(parse_building_response(building))
    return {
        "buildings": response
    }

# Neighborhoods

def parse_neighborhood_response(neighborhood : dict):
    return {
        "id": neighborhood.id,
        "name": neighborhood.name
    }

def parse_neighborhoods_response(neighborhoods : list):
    return {
        "neighborhoods": [parse_neighborhood_response(neighborhood) for neighborhood in neighborhoods]
    }

# Users

def parse_user_response(user : dict):
    return(
        {
            "id" :user.id,
            "name" :user.name,
            "is_real_estate":user.is_real_estate,
            "avatar":user.avatar,
            "contact_info":{
                "email":user.email,
                "phone_number":user.phone_number,
                "has_phone_number":user.has_phone_number,
                "whatsapp_number":user.whatsapp_number,
                "has_whatsapp_number":user.has_whatsapp_number,
            },
        }
    )

