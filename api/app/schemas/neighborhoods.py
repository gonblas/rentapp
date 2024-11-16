from pydantic import BaseModel
from typing import List

class NeighborhoodResponse(BaseModel):
    id : int
    name : str

class NeighborhoodsResponse(BaseModel):
    neighborhoods : list[NeighborhoodResponse]