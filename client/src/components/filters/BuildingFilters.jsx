import React, { useEffect, useMemo, useState } from "react"
import ShowFilter from "./ShowFilter"
import axios from "axios"
import { Autocomplete, FormControl, TextField } from "@mui/material"
import Grid from "@mui/material/Grid2"

function BuildingFilters({ filters, setFilters }) {
  const services = [
    "Ascensor",
    "Pileta",
    "Gimnasio",
    "Terraza",
    "Lavadero",
    "Bicicletero",
  ]

  const [neighborhoods, setNeighborhoods] = useState([])

  const fetchNeighborhoodsList = useMemo(
    () => async () => {
      try {
        const response = await axios.get(
          "https://cc210ef425fe.sn.mynetname.net/neighborhood/",
        )
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
    <Grid container spacing={2}>
      <ShowFilter
        name="services"
        label="Servicios"
        type="multiselect"
        filters={filters}
        setFilters={setFilters}
        scope="building"
        options={services.map((service) => ({
          value: service,
          label: service,
        }))}
      />
      <ShowFilter
        name="floors"
        label="Cantidad de Pisos"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="building"
      />
      <ShowFilter
        name="apartmentsPerFloor"
        label="Departamentos por piso"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="building"
      />
      <FormControl sx={{ width: "98%", pt: "15px" }}>
        <Autocomplete
          disablePortal
          autoComplete
          value={filters.building.neighborhood_name || null}
          noOptionsText="Sin resultados"
          options={[
            ...neighborhoods.map((neighborhood) => ({
              value: neighborhood.id,
              label: neighborhood.name,
            })),
          ]}
          sx={{ width: "100%" }}
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
                },
              }}
            />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              setFilters((prev) => ({
                ...prev,
                building: {
                  ...prev.building,
                  neighborhood_id: newValue.value,
                  neighborhood_name: newValue.label,
                },
              }))
            } else {
              setFilters((prev) => ({
                ...prev,
                building: {
                  ...prev.building,
                  neighborhood_id: null,
                  neighborhood_name: null,
                },
              }))
            }
          }}
        />
      </FormControl>
    </Grid>
  )
}

export default BuildingFilters
