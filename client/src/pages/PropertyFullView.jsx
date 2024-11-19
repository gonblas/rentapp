import React from "react"
import { Container } from "@mui/material"
import Property from "../components/property-page/Property"

const property = {
  id: 0,
  description:
    "Hermoso departamento en alquiler en Palermo. Muy espacioso y luminoso. Cuenta con dos habitaciones, dos baños, dos balcones y una cocina muy amplia. El edificio cuenta con laundry y bicicletero. Ademas, la zona es muy tranquila y segura. Se permiten mascotas y el departamento tiene vista al frente.",
  features: {
    rental_value: 300000,
    expenses_value: 25000,
    rooms: 2,
    square_meters: 110,
    location: "Frente",
    balconies: 2,
    backyard: true,
    garage: false,
    pet_friendly: true,
  },
  publisher: {
    publisher_id: 0,
    name: "Daniel Gomez",
    is_real_estate: false,
    avatar: null,
    contact: {
      email: "danigomezcapo@gmail.com",
      phone_number: "2213459089",
      has_phone_number: true,
      whatsapp_number: "2213433009",
      has_whatsapp_number: true,
    },
  },
  building: {
    id: 0,
    address: "Av. Santa Fe 1234",
    neighborhood_name: "Caballito",
    floors: 2,
    apartments_per_floor: 2,
    elevator: true,
    pool: false,
    gym: true,
    terrace: false,
    bike_rack: true,
    laundry: true,
  },
  images: [
    "https://picsum.photos/900/300?random",
    "https://picsum.photos/800/300?random",
    "https://picsum.photos/300/300?random",
    "https://picsum.photos/100/100?random",
  ],
}
const PropertyFullView = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
      }}
    >
      <Property property={property}></Property>
    </Container>
  )
}

export default PropertyFullView
