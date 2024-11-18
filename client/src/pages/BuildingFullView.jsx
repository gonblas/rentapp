import React from "react"
import { Container } from "@mui/material"
import BuildingHeader from "../components/BuildingHeader"

const building = {
  id: 0,
  address: "Avenida Segurola al 4300 y Calle Habana",
  neighborhood_id: 12,
  floors: 10,
  apartments_per_floor: 4,
  elevator: true,
  pool: true,
  gym: true,
  terrace: true,
  bike_rack: true,
  laundry: true,
}

const BuildingFullView = () => {
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
      <BuildingHeader building={building}></BuildingHeader>
    </Container>
  )
}

export default BuildingFullView
