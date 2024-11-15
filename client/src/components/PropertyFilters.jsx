import Grid from "@mui/material/Grid2"
import FormControlLabel from "@mui/material/FormControlLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import Checkbox from "@mui/material/Checkbox"
import React from "react"

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
      {" "}
      <Grid item xs={1}>
        <FormControlLabel
          id="hasBackyard"
          control={
            <Checkbox
              checked={filters.hasBackyard}
              onChange={handleOnChange}
              name="hasBackyard"
            />
          }
          label="Patio"
          labelPlacement="end"
        />
      </Grid>
      <Grid item xs={1}>
        <FormControlLabel
          id="hasBalcony"
          control={
            <Checkbox
              checked={filters.hasBalcony}
              onChange={handleOnChange}
              name="hasBalcony"
            />
          }
          label="Balcón"
          labelPlacement="end"
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl>
          <FormLabel htmlFor="ambients">Ambientes</FormLabel>
          <TextField
            id="ambients"
            name="ambients"
            type="number"
            value={filters.ambients}
            onChange={handleOnChange}
            slotProps={{ min: 1 }} // Set the minimum value here
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl>
          <FormLabel htmlFor="surface">Superficie</FormLabel>
          <TextField
            id="surface"
            name="surface"
            type="number"
            value={filters.surface}
            onChange={handleOnChange}
            slotProps={{ min: 1 }} // Set the minimum value here
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <FormLabel htmlFor="position">Orientación</FormLabel>
          <Select
            id="position"
            name="position"
            value={filters.position || ""}
            onChange={handleOnChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            <MenuItem value="north">Frente</MenuItem>
            <MenuItem value="south">Interno</MenuItem>
            <MenuItem value="east">Contrafrente</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default PropertyFilters
