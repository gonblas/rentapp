import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function BuildingFilters({ filters, setFilters }) {
  const services = [
    "Ascensor",
    "Pileta",
    "Gimnasio",
    "Terraza",
    "Lavadero",
    "Bicicletero",
  ]

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="services"
        label="Servicios"
        type="multiselect"
        filters={filters}
        setFilters={setFilters}
        scope="building"
        options={services.map((service) => ({
          value: service,
          label: service,
        }))}
      />
      <ShowFilter
        name="floors"
        label="Cantidad de Pisos"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="building"
      />
      <ShowFilter
        name="apartmentsPerFloor"
        label="Departamentos por piso"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="building"
      />
    </Grid>
  )
}

export default BuildingFilters
