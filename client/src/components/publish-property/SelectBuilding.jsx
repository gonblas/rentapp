import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"

function SelectBuilding({ formData, handleOnChange, errors }) {
  return (
    <FormControl>
      <FormControl>
        <FormLabel htmlFor="number">Número de Teléfono</FormLabel>
        <TextField
          id="building_id"
          name="building_id"
          placeholder="0"
          value={formData.building_ig}
          onChange={(e) => handleOnChange(e, 0)}
          error={errors.building_id.hasError}
          helperText={errors.building_id.message}
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
