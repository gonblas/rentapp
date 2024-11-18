import { Typography } from "@mui/material"
import FormHeader from "../FormHeader"
import { FormControl, FormLabel, TextField } from "@mui/material"
import { useContext } from "react"
import PublishBuildingContext from "./PublishBuildingContext"
import { Checkbox, FormControlLabel } from "@mui/material"

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
    PublishBuildingContext,
  )

  return (
    <>
      <FormHeader
        title="Características"
        description="Agrega características detalladas para describir mejor el edificio que estás publicando."
      />
      <Subtitle>Características</Subtitle>
      <FormControl>
        <FormLabel htmlFor="floors">Cantidad de pisos</FormLabel>
        <TextField
          id="floors"
          name="floors"
          placeholder="Ej: 3"
          value={formData[1].floors}
          onChange={(e) => handleOnChange(e, 1)}
          error={errors[1].floors.hasError}
          helperText={errors[1].floors.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="apartments_per_floor">
          Apartamentos por piso
        </FormLabel>
        <TextField
          id="apartments_per_floor"
          name="apartments_per_floor"
          placeholder="Ej: 2"
          value={formData[1].apartments_per_floor}
          onChange={(e) => handleOnChange(e, 1)}
          error={errors[1].apartments_per_floor.hasError}
          helperText={errors[1].apartments_per_floor.message}
          type="number"
          variant="outlined"
          fullWidth
        />
      </FormControl>
      <FormControlLabel
        id="elevator"
        control={
          <Checkbox
            checked={formData[1].elevator}
            onChange={(e) => handleOnChange(e, 1)}
            name="elevator"
          />
        }
        label="Ascensor"
      />
      <FormControlLabel
        id="pool"
        control={
          <Checkbox
            checked={formData[1].pool}
            onChange={(e) => handleOnChange(e, 1)}
            name="pool"
          />
        }
        label="Piscina"
      />
      <FormControlLabel
        id="gym"
        control={
          <Checkbox
            checked={formData[1].gym}
            onChange={(e) => handleOnChange(e, 1)}
            name="gym"
          />
        }
        label="Gimnasio"
      />
      <FormControlLabel
        id="terrace"
        control={
          <Checkbox
            checked={formData[1].terrace}
            onChange={(e) => handleOnChange(e, 1)}
            name="terrace"
          />
        }
        label="Terraza"
      />
      <FormControlLabel
        id="bike_rack"
        control={
          <Checkbox
            checked={formData[1].bike_rack}
            onChange={(e) => handleOnChange(e, 1)}
            name="bike_rack"
          />
        }
        label="Estacionamiento de bicicletas"
      />
      <FormControlLabel
        id="laundry"
        control={
          <Checkbox
            checked={formData[1].laundry}
            onChange={(e) => handleOnChange(e, 1)}
            name="laundry"
          />
        }
        label="Lavandería"
      />
    </>
  )
}

export default Characteristics
