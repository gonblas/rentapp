import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useContext } from "react"
import PublishBuildingContext from "./PublishBuildingContext"
import GoogleMaps from "../GoogleMaps"
import FormHelperText from "@mui/material/FormHelperText"

function SelectLocation() {
  const { errors, handleOnChange } = useContext(PublishBuildingContext)
  return (
    <>
      <FormControl>
        <FormControl error={errors[0].building_address.hasError}>
          <FormLabel>Ubicación del edificio</FormLabel>
          <GoogleMaps handleOnChange={handleOnChange} />
          <FormHelperText>
            {errors[0].building_address.hasError &&
              errors[0].building_address.message}
          </FormHelperText>
        </FormControl>
      </FormControl>
    </>
  )
}

export default SelectLocation
