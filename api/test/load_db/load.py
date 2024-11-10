from app.database import engine, get_db
from app.models import Neighborhood, Building, User, Property, Base
import pandas as pd

#create tables
Base.metadata.create_all(bind=engine)

session = next(get_db())

def load_csv_to_db(csv_path, model):
    data = pd.read_csv(csv_path)
    records = data.to_dict(orient='records')
    session.bulk_insert_mappings(model, records)
    session.commit()

# load_csv_to_db("./test/load_db/neighborhoods.csv", Neighborhood)
# load_csv_to_db("./test/load_db/users.csv", User)
# load_csv_to_db("./test/load_db/buildings.csv", Building)
# load_csv_to_db("./test/load_db/properties.csv", Property)

print("Datos cargados exitosamente.")
