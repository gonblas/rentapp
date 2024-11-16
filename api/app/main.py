from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import building, neighborhood, property, user
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

# Crear las tablas en la base de datos
# Base.metadata.create_all(bind=engine)

app = FastAPI()

# allow any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(property.router)
app.include_router(user.router)
# app.include_router(building.router)
# app.include_router(neighborhoods.router)