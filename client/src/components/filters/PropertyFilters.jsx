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

  const handleOnChange = (event) => {
    const { name, value, checked } = event.target
    const fieldsWithCheckedValues = ["hasBackyard", "hasBalcony", "petfriendly"]
    // For all other fields
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: fieldsWithCheckedValues.includes(name) ? checked : value,
    }))
  }

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="hasBackyard"
        label="Patio"
        type="checkbox"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="hasBalcony"
        label="Balcón"
        type="checkbox"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="ambients"
        label="Ambientes"
        type="number"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="surface"
        label="Superficie"
        type="number"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="position"
        label="Orientación"
        type="select"
        filters={filters}
        handleOnChange={handleOnChange}
        options={[
          { value: "north", label: "Frente" },
          { value: "south", label: "Interno" },
          { value: "east", label: "Contrafrente" },
        ]}
      />
    </Grid>
  )
}

export default PropertyFilters
