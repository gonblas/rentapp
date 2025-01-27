from typing import List
from pydantic import BaseModel, Field
from fastapi import Form
from fastapi import UploadFile

#query params for filtering properties
class PropertyFilterParams(BaseModel):

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
    id: int
    name : str
    is_real_estate: bool
    avatar : str
    contact: ContactInfo

class BuildingInfo(BaseModel):
    id : int
    address : str
    neighborhood_name : str
    floors : int
    apartments_per_floor : int
    elevator: bool
    pool: bool
    gym: bool
    terrace: bool
    bike_rack: bool
    laundry: bool

# publicacion
class PublicationResponse(BaseModel):
    id : int
    description : str
    features : Features
    publisher : PublisherInfo
    building : BuildingInfo
    images : List[str]

class PropertyResponse(BaseModel):
    id : int
    description: str
    address: str
    features: Features
    publisher: PublisherInfo
    images: List[str]

class PropertyListResponse(BaseModel):
    id : int
    description: str
    address: str
    features: Features
    publisher: PublisherInfo
    images: List[str]

class BuildingSearch(BaseModel):
    id : int
    address : str
    neighborhood_name : str
    floors : int
    apartments_per_floor : int
    elevator: bool
    pool: bool
    gym: bool
    terrace: bool
    bike_rack: bool
    laundry: bool
    properties : List[PropertyResponse]

class PaginationInfo(BaseModel):
    total_records: int
    total_pages: int
    current_page: int

class SearchResponse(BaseModel):
    buildings : List[BuildingSearch]

class PropertiesResponse(BaseModel):
    properties : List[PropertyResponse]

class PropertiesListResponse(BaseModel):
    properties : List[PropertyListResponse]
    paging: PaginationInfo

class CreatePropertyRequest(BaseModel):
    description : str
    rental_value : float
    expenses_value : float
    rooms : int
    square_meters : int
    balconies : int
    backyard : bool
    garage : bool
    pet_friendly : bool
    location : str
    building_id : int
    images : List[UploadFile]

    @classmethod
    def as_form(
        cls,
        description : str = Form(...),
        rental_value : float = Form(...),
        expenses_value : float = Form(...),
        rooms : int = Form(...),
        square_meters : int = Form(...),
        balconies : int = Form(...),
        backyard : bool = Form(...),
        garage : bool = Form(...),
        pet_friendly : bool = Form(...),
        location : str = Form(...),
        building_id : int = Form(...),
        images : List[UploadFile] = Form(...)
    ):
        return cls(
            description=description,
            rental_value=rental_value,
            expenses_value=expenses_value,
            rooms=rooms,
            square_meters=square_meters,
            balconies=balconies,
            backyard=backyard,
            garage=garage,
            pet_friendly=pet_friendly,
            location=location,
            building_id=building_id,
            images=images
        )