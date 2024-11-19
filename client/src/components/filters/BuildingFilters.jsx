import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function BuildingFilters({ filters, setFilters }) {
  const services = [
    "Garaje",
    "Ascensor",
    "Pileta",
    "Gimnasio",
    "Terraza",
    "Lavadero",
  ]

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="services"
        label="Servicios"
        type="multiselect"
        filters={filters}
        setFilters={setFilters}
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
      />
      <ShowFilter
        name="apartmentsPerFloor"
        label="Departamentos por piso"
        type="number"
        filters={filters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="neighborhood"
        label="Barrio"
        type="select"
        filters={filters}
        setFilters={setFilters}
        options={[
          { value: "st-ana", label: "St. Ana" },
          { value: "el-peligro", label: "El Peligro" },
          { value: "altos-lorenzo", label: "Altos de San Lorenzo" },
        ]}
      />
    </Grid>
  )
}

export default BuildingFilters
