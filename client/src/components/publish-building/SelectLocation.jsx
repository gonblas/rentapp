import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useContext } from "react"
import PublishBuildingContext from "./PublishBuildingContext"
import GoogleMaps from "../GoogleMaps"
import FormHelperText from "@mui/material/FormHelperText"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useEffect, useState, useMemo } from "react"
import axios from "axios"

function SelectLocation() {
  const { errors, handleOnChange, formData } = useContext(
    PublishBuildingContext,
  )
  const [neighborhoods, setNeighborhoods] = useState([])

  const fetchNeighborhoodsList = useMemo(
    () => async () => {
      try {
        const response = await axios.get("https://cc210ef425fe.sn.mynetname.net/neighborhood/")
        setNeighborhoods(response.data.neighborhoods)
      } catch (error) {
        console.log("Error al obtener los barrios:", error)
      }
    },
    [],
  )

  useEffect(() => {
    fetchNeighborhoodsList()
  }, [fetchNeighborhoodsList])

  return (
    <>
      <FormControl>
        <FormControl>
          <FormLabel sx={{ pb: "20px" }}>Ubicación del edificio</FormLabel>
          <GoogleMaps
            handleOnChange={handleOnChange}
            value={formData.address}
          />
          <FormHelperText sx={{ color: "error.main" }}>
            {errors.address.hasError && errors.address.message}
          </FormHelperText>
        </FormControl>
      </FormControl>
      <FormControl sx={{ pt: "30px" }}>
        <FormLabel sx={{ pb: "20px" }}>Barrio</FormLabel>
        <Autocomplete
          disablePortal
          autoComplete
          value={formData.neighborhood}
          noOptionsText="Sin resultados"
          options={[
            { value: null, label: "Ingresá barrio" },
            ...neighborhoods.map((neighborhood) => ({
              value: neighborhood.id,
              label: neighborhood.name,
            })),
          ]}
          sx={{ width: "auto" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ingresá un Barrio"
              fullWidth
              sx={{
                height: "48px",
                ".MuiInputBase-root": {
                  height: "48px",
                  color: "black",
                },
                ".MuiInputLabel-root": {
                  color: "black",
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
          )}
          onChange={(event, newValue) => {
            handleOnChange({
              target: { name: "neighborhood_id", value: newValue.value },
            })
            handleOnChange({
              target: { name: "neighborhood", value: newValue.label },
            })
          }}
          onInputChange={(event, inputValue) => {
            // Si el usuario borra el texto manualmente, limpia el estado
            if (inputValue === "") {
              handleOnChange({
                target: { name: "neighborhood_id", value: null },
              })
              handleOnChange({
                target: { name: "neighborhood", value: "" },
              })
            }
          }}
        />
        <FormHelperText sx={{ color: "error.main" }}>
          {errors.neighborhood_id.hasError && errors.neighborhood_id.message}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default SelectLocation
