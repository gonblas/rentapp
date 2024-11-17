import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function BuildingFilters({ filters, setFilters }) {
  const services = ["Pileta", "Gimnasio", "Terraza", "Baulera", "Lavadero"]

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="hasGarage"
        label="Garage"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="hasElevator"
        label="Ascensor"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
      />
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
      <ShowFilter
        name="floors"
        label="Pisos"
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
        name="expenses"
        label="Expensas"
        type="slider"
        filters={filters}
        setFilters={setFilters}
        options={{
          min: 0,
          max: 500000,
          step: 50,
        }}
      />
    </Grid>
  )
}

export default BuildingFilters
