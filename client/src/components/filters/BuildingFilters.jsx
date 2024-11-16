import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"

function BuildingFilters() {
  const services = ["Pileta", "Gimnasio", "Terraza", "Baulera", "Lavadero"]
  const [filters, setFilters] = React.useState({
    services: [],
    hasGarage: false,
    neighborhood: "",
    expenses: 0,
    floors: 0,
    apartmentsPerFloor: 0,
    hasElevator: false,
  })

  const handleOnChange = (event) => {
    const { name, value, checked } = event.target
    const fieldsWithCheckedValues = ["hasGarage", "hasElevator"]

    if (name === "services") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        services: checked
          ? [...prevFilters.services, value]
          : prevFilters.services.filter((service) => service !== value),
      }))
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: fieldsWithCheckedValues.includes(name) ? checked : value,
      }))
    }
  }

  return (
    <Grid container spacing={2}>
      <ShowFilter
        name="hasGarage"
        label="Garage"
        type="checkbox"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="hasElevator"
        label="Ascensor"
        type="checkbox"
        filters={filters}
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="services"
        label="Servicios"
        type="multiselect"
        filters={filters}
        handleOnChange={handleOnChange}
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
        handleOnChange={handleOnChange}
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
        handleOnChange={handleOnChange}
      />
      <ShowFilter
        name="apartmentsPerFloor"
        label="Departamentos por piso"
        type="number"
        filters={filters}
        handleOnChange={handleOnChange}
      />
    </Grid>
  )
}

export default BuildingFilters
