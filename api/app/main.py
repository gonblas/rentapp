from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import building, neighborhood, property, user, admin
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

app = FastAPI()

# allow any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost:3000","http://localhost:5173","http://localhost:5174","http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(property.router)
app.include_router(user.router)
app.include_router(building.router)
app.include_router(neighborhood.router)
app.include_router(admin.router)