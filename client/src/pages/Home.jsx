import React from "react"
import PropertyCard from "../components/PropertyCard"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import SearchBar from "../components/SearchBar"

const properties = [
  {
    description: "Departamento luminoso en Palermo",
    contact: {
      phone: "1144444444",
      email: "contacto@example.com",
      whatsapp_enabled: true,
    },
    location: {
      address: "Avenida Scalabrini Ortiz 1550",
      neighborhood_id: 1,
      location: "front",
    },
    features: {
      type: "apartment",
      rental_value: 150000,
      expenses_value: 30000,
      rooms: 2,
      square_meters: 60,
      balconies: 1,
      patio: true,
      garage: true,
      pet_friendly: true,
    },
    publisher: {
      publisher_id: 1,
      is_real_estate: false,
      avatar:
        "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/3.jpeg",
      name: "Juan Perez",
    },
    building_id: 1,
    images: [
      "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-1.jpg",
      "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-2.jpg",
    ],
  },
  {
    description: "Casa espaciosa en Caballito",
    contact: {
      phone: "1188888888",
      email: "venta@example.com",
      whatsapp_enabled: false,
    },
    location: {
      address: "Avenida Rivadavia 5400",
      neighborhood_id: 5,
      location: "front",
    },
    features: {
      type: "house",
      rental_value: 2500,
      expenses_value: 450,
      rooms: 4,
      square_meters: 180,
      balconies: 1,
      patio: true,
      garage: true,
      pet_friendly: true,
    },
    publisher: {
      publisher_id: 2,
      is_real_estate: true,
      avatar: "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/avatars/2.jpg",
      name: "Geronimo Benavidez",
    },
    building_id: 3,
    images: [
      "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-1.jpg",
      "https://rentapp-bucket.s3.sa-east-1.amazonaws.com/images/2-2.jpg",
    ],
  },
]

const Home = () => {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          px: "50px!important",
        }}
      >
        <SearchBar />
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            mb: 3,
          }}
        >
          {" "}
          Propiedades Sugeridas
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            p: "0px!important",
            pb: "100px!important",
            width: "100%!important",
            margin: "0px!important",
          }}
        >
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Container>
      </Container>
    </div>
  )
}

export default Home
