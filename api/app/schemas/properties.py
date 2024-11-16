from typing import List
from pydantic import BaseModel, Field

#query params for filtering properties
class FilterParams(BaseModel):
    neighborhood_id: int = Field(
        None, alias="neighborhood_id", title="Neighborhood ID"
    )
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
    square_meters: int = Field(
        None, alias="square_meters", title="Square meters", ge=0
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
    limit: int = Field(
        10, alias="limit", title="Limit of postings", ge=0
    )
    offset: int = Field(
        0, alias="offset", title="Offset of postings", ge=0
    )

class LocationInfo(BaseModel):
    address: str
    neighborhood_id: int

class Features(BaseModel):
    rental_value: float
    expenses_value: float
    rooms: int
    square_meters: int
    location: str
    balconies: int
    backyard: bool
    garage: bool
    pet_friendly: bool

class ContactInfo(BaseModel):
    email : str
    phone_number: str
    has_phone_number: bool
    whatsapp_number: str
    has_whatsapp_number: bool

class PublisherInfo(BaseModel):
    publisher_id: int
    is_real_estate: bool
    avatar : str
    contact: ContactInfo

class PaginationInfo(BaseModel):
    total_records: int
    total_pages: int

class PropertyResponse(BaseModel):
    id : int
    description: str
    location: LocationInfo
    features: Features
    publisher: PublisherInfo
    building_id: int
    images: List[str]

class PropertiesResponse(BaseModel):
    properties: List[PropertyResponse]
    pagination: PaginationInfo