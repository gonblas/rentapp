from fastapi import APIRouter, HTTPException, status
from sqlalchemy import func
from typing import List
from app.models import User, Property, Image, Building, Neighborhood
from app.utils.auth import auth_dependency, user_is_admin
from app.database import db_dependency
from app.routers.property import parse_properties_response
from app.schemas.properties import PropertyResponse
from app.schemas.buildings import BuildingsResponse
from app.routers.building import parse_buildings_response

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

@router.get("/property/pending", status_code=status.HTTP_200_OK, response_model=List[PropertyResponse])
def list_pending_properties(db : db_dependency, user : auth_dependency):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

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

    all_properties = query.filter(Property.approved == False).all()

    if all_properties is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Properties not found")

    return parse_properties_response(all_properties)

@router.get("/building/pending", status_code=status.HTTP_200_OK, response_model=BuildingsResponse)
def list_pending_buildings(db : db_dependency, user : auth_dependency):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    query = (
        db.query(
            Building,
            Neighborhood.name
        )
        .join(Neighborhood, Building.neighborhood_id == Neighborhood.id)
    )

    all_buildings = query.filter(Building.approved == False).all()

    if all_buildings is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Buildings not found")

    return parse_buildings_response(all_buildings)

@router.put("/property/{property_id}/approve", status_code=status.HTTP_200_OK)
def approve_property(db : db_dependency, user : auth_dependency, property_id : int):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    property = db.query(Property).filter(Property.id == property_id and Property.approved == False).first()

    if property is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")

    property.approved = True
    db.commit()
    db.refresh(property)

    return {"detail": f"Property {property_id} approved"}

@router.delete("/property/{property_id}/reject", status_code=status.HTTP_200_OK)
def reject_property(db : db_dependency, user : auth_dependency, property_id : int):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    property = db.query(Property).filter(Property.id == property_id and Property.approved == False).first()

    if property is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    
    images = db.query(Image).filter(Image.property_id == property_id).all()
    for image in images:
        db.delete(image)

    db.delete(property)
    db.commit()

    return {"detail": f"Property {property_id} rejected"}

@router.put("/building/{building_id}/approve", status_code=status.HTTP_200_OK)
def approve_building(db : db_dependency, user : auth_dependency, building_id : int):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    building = db.query(Building).filter(Building.id == building_id and Building.approved == False).first()

    if building is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")

    building.approved = True
    db.commit()
    db.refresh(building)

    return {"detail": f"Building {building_id} approved"}

@router.delete("/building/{building_id}/reject", status_code=status.HTTP_200_OK)
def reject_building(db : db_dependency, user : auth_dependency, building_id : int):

    if not user_is_admin(user):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    building = db.query(Building).filter(Building.id == building_id and Building.approved == False).first()

    if building is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Building not found")

    properties = db.query(Property).filter(Property.building_id == building_id).all()

    if properties is not None:
        for property in properties:
            images = db.query(Image).filter(Image.property_id == property.id).all()
            for image in images:
                db.delete(image)
            db.delete(property)

    db.commit()

    db.delete(building)
    db.commit()

    return {"detail": f"Building {building_id} rejected"}