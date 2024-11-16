from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Date, Enum, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import null


Base = declarative_base()

class Neighborhood(Base):
    __tablename__ = 'neighborhoods'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))

class Building(Base):
    __tablename__ = 'buildings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    address = Column(String(255))
    neighborhood_id = Column(Integer, ForeignKey('neighborhoods.id'))
    floors = Column(Integer)
    apartments_per_floor = Column(Integer)
    elevator = Column(Boolean)
    pool = Column(Boolean)
    gym = Column(Boolean)
    terrace = Column(Boolean)
    bike_rack = Column(Boolean)
    laundry = Column(Boolean)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    is_real_estate = Column(Boolean, default=False)
    email = Column(String(100), unique=True)
    password = Column(String(100))
    phone_number = Column(String(20))
    has_phone_number = Column(Boolean, default=False)
    whatsapp_number = Column(String(20))
    has_whatsapp_number = Column(Boolean, default=False)
    avatar = Column(String(255))

class Property(Base):
    __tablename__ = 'properties'

    id = Column(Integer, primary_key=True, autoincrement=True)
    publication_date = Column(Date)
    approved = Column(Boolean, default=False)
    description = Column(Text)
    address = Column(String(255))
    neighborhood_id = Column(Integer, ForeignKey('neighborhoods.id'))
    rental_value = Column(Float)
    expenses_value = Column(Float)
    rooms = Column(Integer)
    square_meters = Column(Integer)
    balconies = Column(Integer)
    backyard = Column(Boolean)
    garage = Column(Boolean)
    pet_friendly = Column(Boolean)
    location = Column(Enum('front', 'back', 'internal', 'n/a'))
    publisher_id = Column(Integer, ForeignKey('users.id'))
    building_id = Column(Integer, ForeignKey('buildings.id'))

class Image(Base):
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'))
    url = Column(String(255), unique=True)