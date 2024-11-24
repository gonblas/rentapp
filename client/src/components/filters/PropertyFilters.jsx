import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function PropertyFilters({ filters, setFilters }) {
  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="hasBackyard"
        label="Patio"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="hasGarage"
        label="Cochera"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="petfriendly"
        label="Apto mascotas"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="location"
        label="Orientación"
        type="select"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={[
          { value: "front", label: "Frente" },
          { value: "back", label: "Contrafrente" },
          { value: "internal", label: "Interno" },
          { value: "lateral", label: "Lateral" },
        ]}
      />
      <ShowFilter
        name="rooms"
        label="Ambientes"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="balconies"
        label="Balcones"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="RentPrice"
        label="Precio de Alquiler"
        type="slider"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={{
          min: 0,
          max: 500000,
          step: 50,
        }}
      />
      <ShowFilter
        name="Expenses"
        label="Expensas"
        type="slider"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={{
          min: 0,
          max: 500000,
          step: 50,
        }}
      />
    </Grid>
  )
}

export default PropertyFilters
