from fastapi import FastAPI
from .routers import building, neighborhood, property, user
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

# Crear las tablas en la base de datos
# Base.metadata.create_all(bind=engine)

app = FastAPI()

# Incluir los routers
app.include_router(property.router)
app.include_router(user.router)
# app.include_router(building.router)
# app.include_router(neighborhoods.router)

# app.include_router(users.router)
# app.include_router(properties.router)
# app.include_router(images.router)