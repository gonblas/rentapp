from pydantic import BaseModel, Field
from .properties import PaginationInfo

class BuildingResponse(BaseModel):
    id: int
    approved: bool
    address: str
    neighborhood_id: int
    neighborhood_name: str
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

class BuildingPost(BaseModel):
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

class BuildingFilterParams(BaseModel):
    min_rental_value: float = Field(
        0, alias="min_rental_value", title="Minimum rental value", ge=0
    )
    max_rental_value: float = Field(
        None, alias="max_rental_value", title="Maximum rental value", ge=0
    )
    min_expenses_value: float = Field(
        0, alias="min_expenses_value", title="Minimum expenses value", ge=0
    )
    max_expenses_value: float = Field(
        None, alias="max_expenses_value", title="Maximum expenses value", ge=0
    )
    rooms: int = Field(
        None, alias="rooms", title="Number of rooms", ge=0
    )
    balconies: int = Field(
        None, alias="balconies", title="Number of balconies", ge=0
    )
    backyard: bool = Field(
        None, alias="backyard", title="Has backyard"
    )
    garage: bool = Field(
        None, alias="garage", title="Has garage"
    )
    pet_friendly: bool = Field(
        None, alias="pet_friendly", title="Pet friendly"
    )
    location: str = Field(
        None, alias="location", title="Location"
    )
    # buildings filters
    address: str = Field(
        None, alias="address", title="Building address"
    )
    neighborhood_id: int = Field(
        None, alias="neighborhood_id", title="Neighborhood ID"
    )
    floors: int = Field(
        None, alias="floors", title="Number of floors", ge=0
    )
    apartments_per_floor: int = Field(
        None, alias="apartments_per_floor", title="Number of apartments per floor", ge=0
    )
    elevator: bool = Field(
        None, alias="elevator", title="Has elevator"
    )
    pool: bool = Field(
        None, alias="pool", title="Has pool"
    )
    gym: bool = Field(
        None, alias="gym", title="Has gym"
    )
    terrace: bool = Field(
        None, alias="terrace", title="Has terrace"
    )
    bike_rack: bool = Field(
        None, alias="bike_rack", title="Has bike rack"
    )
    laundry: bool = Field(
        None, alias="laundry", title="Has laundry"
    )