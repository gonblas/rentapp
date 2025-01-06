import React, { useEffect, useContext, useState, useMemo } from "react"
import PublishBuildingContext from "./PublishBuildingContext"
import GoogleMaps from "../GoogleMaps"
import axios from "axios"
import {
  FormHelperText,
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material"

function SelectLocation() {
  const { errors, handleOnChange, formData } = useContext(
    PublishBuildingContext,
  )
  const [neighborhoods, setNeighborhoods] = useState([])

  const fetchNeighborhoodsList = useMemo(
    () => async () => {
      try {
        const response = await axios.get(
          "https://cc210ef425fe.sn.mynetname.net/neighborhood/",
        )
        setNeighborhoods(response.data.neighborhoods)
      } catch (error) {
        console.error("Error al obtener los barrios:", error)
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
            { value: null, label: "Ingresá un barrio" },
            ...neighborhoods.map((neighborhood) => ({
              value: neighborhood.id,
              label: neighborhood.name,
            })),
          ]}
          sx={{ width: "auto" }}
          renderInput={(params) => (
            <TextField {...params} label="Ingresá un Barrio" fullWidth />
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
