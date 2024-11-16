import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function PropertyFilters() {
  const [filters, setFilters] = React.useState({
    ambients: 0,
    surface: 0,
    hasBackyard: false,
    hasBalcony: false,
    position: "",
    rentPrice: 0,
    petfriendly: false,
  })

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="hasBackyard"
        label="Patio"
        type="checkbox"
        filters={filters}
        // searchFilters={searchFilters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="hasBalcony"
        label="Balcón"
        type="checkbox"
        filters={filters}
        // searchFilters={searchFilters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="ambients"
        label="Ambientes"
        type="number"
        filters={filters}
        // searchFilters={searchFilters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="surface"
        label="Superficie"
        type="number"
        filters={filters}
        // searchFilters={searchFilters}
        setFilters={setFilters}
      />
      <ShowFilter
        name="position"
        label="Orientación"
        type="select"
        filters={filters}
        // searchFilters={searchFilters}
        setFilters={setFilters}
        options={[
          { value: "north", label: "Frente" },
          { value: "south", label: "Interno" },
          { value: "east", label: "Contrafrente" },
        ]}
      />
      <ShowFilter
        name="rentPrice"
        label="Precio de Alquiler"
        type="slider"
        filters={filters}
        // searchFilters={searchFilters}
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

export default PropertyFilters
