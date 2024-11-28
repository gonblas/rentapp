from datetime import datetime
from typing import Annotated, List
from fastapi import APIRouter, HTTPException, Query, Depends, status, Cookie, UploadFile, File, Form
from sqlalchemy import func
from app.database import db_dependency
from app.models import Property, User, Image, Building, Neighborhood
from app.schemas.properties import PublicationResponse, SearchResponse, PropertyResponse, PropertiesResponse, PropertiesListResponse, CreatePropertyRequest
from app.utils.parser import parse_publication_response, parse_properties_response
from app.utils.auth import auth_dependency, get_current_user
from app.utils.bucket import upload_property_images, delete_property_images

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
def read_property(property_id: int, db: db_dependency, token : Annotated[str, Cookie()] = None):

    try:
        user = get_current_user(db, token)
    except:
        user = None

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

    if user:
        my_user = db.query(User).filter(User.id == user.id).first()

    if user and my_user.is_admin:
        property = query.filter(Property.id == property_id).first()
    else:
        property = query.filter(Property.id == property_id, Property.approved == True).first()

    if not property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")

    return parse_publication_response(property)

@router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        summary="Create a new property publication",
        )
async def create_property(
    request : Annotated[CreatePropertyRequest, Depends(CreatePropertyRequest.as_form)],
    db: db_dependency,
    user: auth_dependency
    ):

    building = db.query(Building).filter(Building.id == request.building_id).first()

    if not building:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")

    new_property = Property(
        publication_date = datetime.now(),
        approved = False,
        description = request.description,
        rental_value = request.rental_value,
        expenses_value = request.expenses_value,
        rooms = request.rooms,
        square_meters = request.square_meters,
        balconies = request.balconies,
        backyard = request.backyard,
        garage = request.garage,
        pet_friendly = request.pet_friendly,
        location = request.location,
        publisher_id = user.id,
        building_id = request.building_id
    )

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    urls = upload_property_images(request.images, new_property.id)

    for url in urls:
        new_image = Image(
            property_id = new_property.id,
            url = url
        )
        db.add(new_image)
    db.commit()

    return {
        "status": f"Property {new_property.id} created"
    }

@router.delete(
        "/{property_id}",
        status_code=status.HTTP_200_OK,
        summary="Delete a property publication",
        )
def delete_property(property_id: int, db: db_dependency, user: auth_dependency):
    
        property = db.query(Property).filter(Property.id == property_id).first()
    
        if not property:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    
        if property.publisher_id != user.id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

        images = db.query(Image).filter(Image.property_id == property_id).all()
        #delete images from s3
        delete_property_images([image.url for image in images], property_id)

        for image in images:
            db.delete(image)
        db.commit()
    
        db.delete(property)
        db.commit()
    
        return {
            "status": f"Property {property_id} deleted"
        }