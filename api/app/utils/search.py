from app.schemas.buildings import BuildingFilterParams
from app.schemas.properties import PropertyFilterParams
from app.models import Property, Building


def get_building_filters(filter_params: BuildingFilterParams):
    property_filters=[]
    building_filters=[]

    property_filters.append(Property.approved == True)
    building_filters.append(Building.approved == True)

    if filter_params.min_rental_value:
        property_filters.append(Property.rental_value >= filter_params.min_rental_value)
    if filter_params.max_rental_value:
        property_filters.append(Property.rental_value <= filter_params.max_rental_value)
    if filter_params.min_expenses_value:
        property_filters.append(Property.expenses_value >= filter_params.min_expenses_value)
    if filter_params.max_expenses_value:
        property_filters.append(Property.expenses_value <= filter_params.max_expenses_value)
    if filter_params.rooms:
        property_filters.append(Property.rooms == filter_params.rooms)
    if filter_params.balconies:
        property_filters.append(Property.balconies == filter_params.balconies)
    if filter_params.backyard is not None:
        property_filters.append(Property.backyard == filter_params.backyard)
    if filter_params.garage is not None:
        property_filters.append(Property.garage == filter_params.garage)
    if filter_params.pet_friendly is not None:
        property_filters.append(Property.pet_friendly == filter_params.pet_friendly)
    if filter_params.location:
        property_filters.append(Property.location == filter_params.location)
    # # building filters
    if filter_params.neighborhood_id:
        building_filters.append(Building.neighborhood_id == filter_params.neighborhood_id)
    if filter_params.floors:
        building_filters.append(Building.floors == filter_params.floors)
    if filter_params.apartments_per_floor:
        building_filters.append(Building.apartments_per_floor == filter_params.apartments_per_floor)
    if filter_params.elevator is not None:
        building_filters.append(Building.elevator == filter_params.elevator)
    if filter_params.pool is not None:
        building_filters.append(Building.pool == filter_params.pool)
    if filter_params.gym is not None:
        building_filters.append(Building.gym == filter_params.gym)
    if filter_params.terrace is not None:
        building_filters.append(Building.terrace == filter_params.terrace)
    if filter_params.bike_rack is not None:
        building_filters.append(Building.bike_rack == filter_params.bike_rack)
    if filter_params.laundry is not None:
        building_filters.append(Building.laundry == filter_params.laundry)
    
    return property_filters, building_filters

def get_property_filters(filter_params : PropertyFilterParams):

    filters = []

    filters.append(Property.approved == True)

    if filter_params.min_rental_value:
        filters.append(Property.rental_value >= filter_params.min_rental_value)
    if filter_params.max_rental_value:
        filters.append(Property.rental_value <= filter_params.max_rental_value)
    if filter_params.min_expenses_value:
        filters.append(Property.expenses_value >= filter_params.min_expenses_value)
    if filter_params.max_expenses_value:
        filters.append(Property.expenses_value <= filter_params.max_expenses_value)
    if filter_params.rooms:
        filters.append(Property.rooms == filter_params.rooms)
    if filter_params.balconies:
        filters.append(Property.balconies == filter_params.balconies)
    if filter_params.backyard is not None:
        filters.append(Property.backyard == filter_params.backyard)
    if filter_params.garage is not None:
        filters.append(Property.garage == filter_params.garage)
    if filter_params.pet_friendly is not None:
        filters.append(Property.pet_friendly == filter_params.pet_friendly)
    if filter_params.location:
        filters.append(Property.location == filter_params.location)

    return filters