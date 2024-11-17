import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"

function SelectBuilding() {
  const { formData, errors, handleOnChange } = useContext(
    PublishPropertyContext,
  )
  return (
    <FormControl>
      <FormControl>
        {errors[0].building_id.hasError && <h1>hay un error</h1>}
        <FormLabel htmlFor="number">Número de Teléfono</FormLabel>
        <TextField
          id="building_id"
          name="building_id"
          placeholder="0"
          value={formData[0].building_ig}
          onChange={(e) => handleOnChange(e, 0)}
          error={errors[0].building_id.hasError}
          helperText={errors[0].building_id.message}
          variant="outlined"
          type="number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          fullWidth
        />
      </FormControl>
    </FormControl>
  )
}

export default SelectBuilding
