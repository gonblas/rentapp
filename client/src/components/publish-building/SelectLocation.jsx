import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useContext } from "react"
import PublishBuildingContext from "./PublishBuildingContext"
import GoogleMaps from "../GoogleMaps"
import FormHelperText from "@mui/material/FormHelperText"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

function SelectLocation() {
  const { errors, handleOnChange, formData } = useContext(
    PublishBuildingContext,
  )
  const [neighborhoods, setNeighborhoods] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/neighborhood/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los barrios")
        }
        return response.json()
      })
      .then((data) => {
        setNeighborhoods(
          data.neighborhoods.map((neighborhood) => neighborhood.name),
        )
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return (
    <>
      <FormControl>
        <FormControl error={errors.address.hasError}>
          <FormLabel>Ubicación del edificio</FormLabel>
          <GoogleMaps
            handleOnChange={handleOnChange}
            value={formData.address}
          />
          <FormHelperText>
            {errors.address.hasError &&
              errors.address.message}
          </FormHelperText>
        </FormControl>
      </FormControl>
      <FormControl sx={{ pt: "30px" }} error={errors.neighborhood.hasError}>
        <FormLabel>Barrio</FormLabel>
        <Autocomplete
          disablePortal
          autoComplete
          value={formData.neighborhood}
          noOptionsText="Sin resultados"
          options={neighborhoods}
          sx={{ width: "auto" }}
          renderInput={(params) => <TextField {...params} />}
          onChange={(event, newValue) => {
            handleOnChange(
              {
                target: { name: "neighborhood", value: newValue },
              },
              0,
            )
          }}
        />
        <FormHelperText>
          {errors.neighborhood.hasError && errors.neighborhood.message}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default SelectLocation
