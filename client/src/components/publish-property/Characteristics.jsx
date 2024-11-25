import { Typography } from "@mui/material"
import FormHeader from "../FormHeader"
import {
  FormControl,
  FormLabel,
  TextField,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Container,
  Autocomplete,
} from "@mui/material"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"

function Subtitle({ children }) {
  return (
    <Typography
      variant="h6"
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

  const positions = [
    { value: null, label: "Ingrese la ubicación" },
    { value: "front", label: "Frente" },
    { value: "back", label: "Contrafrente" },
    { value: "internal", label: "Interno" },
    { value: "side", label: "Lateral" },
  ]

  const position = positions.find((p) => p.value === formData.location)

  const handleNumberChange = (event) => {
    const { name, value } = event.target
    let newValue = value === "" || Number(value) < 1 ? null : Number(value)

    if (name === "balconies" || name === "expenses_value") {
      newValue = value === "" || Number(value) < 0 ? null : Number(value)
    }
    handleOnChange({
      target: {
        name,
        value: newValue,
      },
    })
  }

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
          onChange={handleOnChange}
          error={errors.description.hasError}
          helperText={errors.description.message}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{
            height: "102px",
            pb: "190px!important",
            ".MuiInputBase-root": {
              height: "292px",
              color: "black",
            },
            ".MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "& .MuiInputBase-input": {
              padding: "10px",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, -17px) scale(0.75)",
              padding: "0 4px",
              color: "black",
            },
          }}
        />
      </FormControl>

      <Subtitle>Precio</Subtitle>

      <FormControl variant="outlined">
        <FormLabel htmlFor="rental_value">Valor de alquiler</FormLabel>
        <OutlinedInput
          id="rental_value"
          name="rental_value"
          placeholder="Ej: 10000"
          value={formData.rental_value || ""}
          onChange={handleNumberChange}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          type="number"
          fullWidth
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.rental_value.hasError && errors.rental_value.message}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined">
        <FormLabel htmlFor="expenses_value">Expensas</FormLabel>
        <OutlinedInput
          id="expenses_value"
          name="expenses_value"
          placeholder="Ej: 5000"
          value={formData.expenses_value || ""}
          onChange={handleNumberChange}
          endAdornment={<InputAdornment position="end">$</InputAdornment>}
          type="number"
          sx={{
            "& input[type='number']::-webkit-outer-spin-button, & input[type='number']::-webkit-inner-spin-button":
              {
                "-webkit-appearance": "none",
                margin: 0,
              },
            "& input[type='number']": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.expenses_value.hasError && errors.expenses_value.message}
        </FormHelperText>
      </FormControl>

      <Subtitle>Características importantes</Subtitle>
      <FormControl>
        <FormLabel htmlFor="rooms">Habitaciones</FormLabel>
        <TextField
          id="rooms"
          name="rooms"
          placeholder="Ej: 3"
          value={formData.rooms || ""}
          onChange={handleNumberChange}
          type="number"
          variant="outlined"
          fullWidth
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.rooms.hasError && errors.rooms.message}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="square_meters">Superficie (en m²)</FormLabel>
        <TextField
          id="square_meters"
          name="square_meters"
          placeholder="Ej: 100"
          value={formData.square_meters || ""}
          onChange={handleNumberChange}
          type="number"
          variant="outlined"
          fullWidth
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.square_meters.hasError && errors.square_meters.message}
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="location">Ubicación en el edificio</FormLabel>
        <Autocomplete
          disablePortal
          autoComplete
          value={position}
          noOptionsText="Sin resultados"
          options={positions}
          sx={{ height: "40px!important" }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(event, newValue) => {
            handleOnChange({
              target: { name: "location", value: newValue.value },
            })
          }}
          onInputChange={(event, inputValue) => {
            if (inputValue === "") {
              handleOnChange({
                target: { name: "location", value: null },
              })
            }
          }}
        />
        <FormHelperText sx={{ pt: 2, color: "error.main" }}>
          {errors.location.hasError && errors.location.message}
        </FormHelperText>
      </FormControl>

      <Subtitle>Características extra</Subtitle>
      <FormControl>
        <FormLabel htmlFor="balconies">Balcones</FormLabel>
        <TextField
          id="balconies"
          name="balconies"
          placeholder="Ej: 1"
          value={formData.balconies || ""}
          onChange={handleNumberChange}
          type="number"
          variant="outlined"
          fullWidth
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.balconies.hasError && errors.balconies.message}
        </FormHelperText>
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
