from fastapi import APIRouter, HTTPException
from ..database import db_dependency
from ..models import Building

router = APIRouter()

@router.get("/buildings/")
def read_buildings(db : db_dependency):
    buildings = db.query(Building).all()

    if buildings is None:
        raise HTTPException(status_code=404, detail="Buildings not found")

    return buildings

@router.get("/buildings/{building_id}")
def read_building(building_id: int, db : db_dependency):
    building = db.query(Building).filter(Building.id == building_id).first()

    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    
    return building