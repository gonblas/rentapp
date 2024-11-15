import Grid from "@mui/material/Grid2"
import FormControlLabel from "@mui/material/FormControlLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Checkbox from "@mui/material/Checkbox"
import React from "react"

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
      <FormControlLabel
        id="hasGarage"
        control={
          <Checkbox
            checked={filters.hasGarage}
            onChange={handleOnChange}
            name="hasGarage"
          />
        }
        label="Garage"
        labelPlacement="end"
      />
      <FormControlLabel
        id="hasElevator"
        control={
          <Checkbox
            checked={filters.hasElevator}
            onChange={handleOnChange}
            name="hasElevator"
          />
        }
        label="Ascensor"
        labelPlacement="end"
      />
      <FormControl>
        <FormLabel>Servicios</FormLabel>
        <Grid container direction="row" spacing={1}>
          {services.map((service) => (
            <Grid item key={service}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.services.includes(service)}
                    onChange={handleOnChange}
                    name="services"
                    value={service} // Set the value for each checkbox
                  />
                }
                label={service}
                labelPlacement="end"
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="neighborhood">Barrio</FormLabel>
        <Select
          id="neighborhood"
          name="neighborhood"
          value={filters.neighborhood || ""}
          onChange={handleOnChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Seleccionar...</em>
          </MenuItem>
          <MenuItem value="st-ana">St. Ana</MenuItem>
          <MenuItem value="el-peligro">El Peligro</MenuItem>
          <MenuItem value="altos-lorenzo">Altos de San Lorenzo</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="floors">Pisos</FormLabel>
        <TextField
          id="floors"
          name="floors"
          type="number"
          value={filters.floors}
          onChange={handleOnChange}
          slotProps={{ min: 1 }}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="apartmentsPerFloor">
          Departamentos por piso
        </FormLabel>
        <TextField
          id="apartmentsPerFloor"
          name="apartmentsPerFloor"
          type="number"
          value={filters.apartmentsPerFloor}
          onChange={handleOnChange}
          slotProps={{ min: 1 }} // Set the minimum value here
        />
      </FormControl>
    </Grid>
  )
}

export default BuildingFilters
