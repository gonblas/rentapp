import { useContext } from "react"
import FormHeader from "../FormHeader"
import PublishBuildingContext from "./PublishBuildingContext"
import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import Grid from "@mui/material/Grid2"

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
    PublishBuildingContext,
  )

  const handleNumberChange = (event) => {
    const { name, value } = event.target
    const newValue = value === "" || Number(value) < 1 ? null : Number(value)

    handleOnChange({
      target: {
        name,
        value: newValue,
      },
    })
  }

  return (
    <>
      <FormHeader
        title="Características"
        description="Agrega características detalladas para describir mejor el edificio que estás publicando."
      />
      <Subtitle>Características Generales</Subtitle>
      <FormControl>
        <FormLabel htmlFor="floors">Cantidad de pisos</FormLabel>
        <TextField
          id="floors"
          name="floors"
          placeholder="Ej: 3"
          value={formData.floors || ""}
          onChange={handleNumberChange}
          error={errors.floors.hasError}
          helperText={errors.floors.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <FormControl sx={{ py: "20px" }}>
        <FormLabel htmlFor="apartments_per_floor">
          Departamentos por piso
        </FormLabel>
        <TextField
          id="apartments_per_floor"
          name="apartments_per_floor"
          placeholder="Ej: 2"
          value={formData.apartments_per_floor || ""}
          onChange={handleNumberChange}
          error={errors.apartments_per_floor.hasError}
          helperText={errors.apartments_per_floor.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <Subtitle>Servicios</Subtitle>
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          py: 3,
        }}
      >
        <FormControlLabel
          id="elevator"
          control={
            <Checkbox
              checked={formData.elevator}
              onChange={(e) => handleOnChange(e)}
              name="elevator"
            />
          }
          label="Ascensor"
        />
        <FormControlLabel
          id="pool"
          control={
            <Checkbox
              checked={formData.pool}
              onChange={(e) => handleOnChange(e)}
              name="pool"
            />
          }
          label="Piscina"
        />
        <FormControlLabel
          id="gym"
          control={
            <Checkbox
              checked={formData.gym}
              onChange={(e) => handleOnChange(e)}
              name="gym"
            />
          }
          label="Gimnasio"
        />
        <FormControlLabel
          id="terrace"
          control={
            <Checkbox
              checked={formData.terrace}
              onChange={(e) => handleOnChange(e)}
              name="terrace"
            />
          }
          label="Terraza"
        />
        <FormControlLabel
          id="bike_rack"
          control={
            <Checkbox
              checked={formData.bike_rack}
              onChange={(e) => handleOnChange(e)}
              name="bike_rack"
            />
          }
          label="Bicicletero"
        />
        <FormControlLabel
          id="laundry"
          control={
            <Checkbox
              checked={formData.laundry}
              onChange={(e) => handleOnChange(e)}
              name="laundry"
            />
          }
          label="Lavandería"
        />
      </Grid>
    </>
  )
}

export default Characteristics
