from pydantic import BaseModel
from .properties import PaginationInfo

class BuildingResponse(BaseModel):
    id: int
    address: str
    neighborhood_id: int
    floors: int
    apartments_per_floor: int
    elevator: bool
    pool: bool
    gym: bool
    terrace: bool
    bike_rack: bool
    laundry: bool

class BuildingsResponse(BaseModel):
    buildings: list[BuildingResponse]