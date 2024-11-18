import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import GoogleMaps from "../GoogleMaps"

function SelectBuilding() {
  const { formData, errors, handleOnChange } = useContext(
    PublishPropertyContext,
  )
  return (
    <FormControl>
      <GoogleMaps handleOnChange={handleOnChange} />
    </FormControl>
  )
}

export default SelectBuilding
