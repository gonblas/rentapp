import React from "react"
import { Container } from "@mui/material"
import Property from "../components/Property"

const property = {
  id: 0,
  description:
    "Hermoso departamento en alquiler en la zona de Sta. Ana. Lugar espacioso y luminoso, con balcón y vista al río. Ideal para parejas o familias pequeñas.",
  location: {
    address: "Av. Siempre Viva 742",
    neighborhood_id: 12,
  },
  features: {
    rental_value: 350000,
    expenses_value: 28000,
    rooms: 2,
    square_meters: 120,
    location: "Frente",
    balconies: 1,
    backyard: true,
    garage: true,
    pet_friendly: false,
  },
  publisher: {
    publisher_id: 0,
    is_real_estate: true,
    avatar: "string",
    contact: {
      email: "gonzacapo@gmail.com",
      phone_number: "2214562134",
      has_phone_number: true,
      whatsapp_number: "2215439088",
      has_whatsapp_number: true,
    },
  },
  building_id: 90,
  images: [
    "https://images.unsplash.com/photo-1728326475125-3b4b62b8d2e6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676321688612-4451a8721435?q=80&w=1407&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb3BlcnRpZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1722492559309-8f235c08975d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1731114103697-c3a21192181c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704580615544-ffb922e61f27?q=80&w=1518&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1731657936504-dedca41448a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1728326475125-3b4b62b8d2e6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676321688612-4451a8721435?q=80&w=1407&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb3BlcnRpZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1722492559309-8f235c08975d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1731114103697-c3a21192181c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1704580615544-ffb922e61f27?q=80&w=1518&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1731657936504-dedca41448a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
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
