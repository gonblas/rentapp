import { Typography } from "@mui/material"
import FormHeader from "../FormHeader"
import { FormControl, FormLabel, TextField } from "@mui/material"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Container from "@mui/material/Container"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import FormHelperText from "@mui/material/FormHelperText"
import Autocomplete from "@mui/material/Autocomplete"

function Subtitle({ children }) {
  return (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "semibold",
        marginTop: 2,
        marginBottom: 1,
      }}
    >
      {children}
    </Typography>
  )
}

function Characteristics() {
  const { formData, errors, handleOnChange } = useContext(
    PublishPropertyContext,
  )

  const positions = ["Frente", "Contrafrente", "Interno", "Lateral"]

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        gap: 2,
      }}
    >
      <FormHeader
        title="Características"
        description="Agrega características detalladas para describir mejor el inmueble que estás publicando. No son obligatorias, pero ayudan a los usuarios a encontrar tu inmueble más fácilmente."
      />
      <Subtitle>Descripción</Subtitle>

      <FormControl>
        <TextField
          id="description"
          name="description"
          placeholder="Escribe tu descripción aquí"
          value={formData.description}
          onChange={(e) => handleOnChange(e)}
          error={errors.description.hasError}
          helperText={errors.description.message}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
      </FormControl>

      <Subtitle>Precio</Subtitle>

      <FormControl variant="outlined">
        <FormLabel htmlFor="rental_value">Valor de alquiler</FormLabel>
        <OutlinedInput
          id="rental_value"
          name="rental_value"
          placeholder="Ej: 10000"
          value={formData.rental_value}
          onChange={(e) => handleOnChange(e)}
          error={errors.rental_value.hasError}
          helperText={errors.rental_value.message}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          fullWidth
        />
      </FormControl>

      <FormControl variant="outlined">
        <FormLabel htmlFor="expenses_value">Expensas</FormLabel>
        <OutlinedInput
          id="expenses_value"
          name="expenses_value"
          placeholder="Ej: 5000"
          value={formData.expenses_value}
          onChange={(e) => handleOnChange(e)}
          error={errors.expenses_value.hasError}
          helperText={errors.expenses_value.message}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <Subtitle>Caracteristicas importantes</Subtitle>
      <FormControl>
        <FormLabel htmlFor="rooms">Habitaciones</FormLabel>
        <TextField
          id="rooms"
          name="rooms"
          placeholder="Ej: 3"
          value={formData.rooms}
          onChange={(e) => handleOnChange(e)}
          error={errors.rooms.hasError}
          helperText={errors.rooms.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="square_meters">Superficie</FormLabel>
        <TextField
          id="square_meters"
          name="square_meters"
          placeholder="Ej: 100"
          value={formData.square_meters}
          onChange={(e) => handleOnChange(e)}
          error={errors.square_meters.hasError}
          helperText={errors.square_meters.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl error={errors.location.hasError} >
        <FormLabel htmlFor="location">Ubicación en el edificio</FormLabel>
        <Autocomplete
          disablePortal
          autoComplete
          value={formData.location}
          noOptionsText="Sin resultados"
          options={positions}
          sx={{ height: "40px!important" }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(event, newValue) => {
            handleOnChange(
              {
                target: { name: "location", value: newValue },
              },
              0,
            )
          }}
        />
        <FormHelperText>
          {errors.location.hasError && errors.location.message}
        </FormHelperText>
      </FormControl>

      <Subtitle>Caracteristicas extra</Subtitle>
      <FormControl>
        <FormLabel htmlFor="balconies">Balcones</FormLabel>
        <TextField
          id="balconies"
          name="balconies"
          placeholder="Ej: 1"
          value={formData.balconies}
          onChange={(e) => handleOnChange(e)}
          error={errors.balconies.hasError}
          helperText={errors.balconies.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "75%",
          gap: 2,
          py: 4,
        }}
      >
        <FormControlLabel
          id="backyard"
          control={
            <Checkbox
              checked={formData.backyard}
              onChange={(e) => handleOnChange(e)}
              name="backyard"
            />
          }
          label="Patio"
        />
        <FormControlLabel
          id="garage"
          control={
            <Checkbox
              checked={formData.garage}
              onChange={(e) => handleOnChange(e)}
              name="garage"
            />
          }
          label="Garage"
        />
        <FormControlLabel
          id="pet_friendly"
          control={
            <Checkbox
              checked={formData.pet_friendly}
              onChange={(e) => handleOnChange(e)}
              name="pet_friendly"
            />
          }
          label="Apto mascotas"
        />
      </Container>
    </Container>
  )
}

export default Characteristics
