from pydantic import BaseModel
from typing import List

class GetNeighborhoodResponse(BaseModel):
    id : int
    name : str

class GetNeighborhoodsResponse(BaseModel):
    neighborhoods : list[GetNeighborhoodResponse]