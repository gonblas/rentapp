import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import GoogleMaps from "../GoogleMaps"
import FormHelperText from "@mui/material/FormHelperText"

function SelectBuilding() {
  const { errors, handleOnChange } = useContext(PublishPropertyContext)
  return (
    <FormControl>
      <FormControl error>
        <FormLabel>Ubicación del edificio</FormLabel>
        <GoogleMaps handleOnChange={handleOnChange} />
        <FormHelperText>
          {errors[0].building_id.hasError && errors[0].building_id.message}
        </FormHelperText>
      </FormControl>
    </FormControl>
  )
}

export default SelectBuilding
