import Grid from "@mui/material/Grid2"
import React from "react"
import ShowFilter from "./ShowFilter"
import axios from "axios"
import { useEffect, useState, useMemo } from "react"

function PropertyFilters({ filters, setFilters }) {
  const [neighborhoods, setNeighborhoods] = useState([])

  const fetchNeighborhoodsList = useMemo(
    () => async () => {
      try {
        const response = await axios.get("http://localhost:8000/neighborhood/")
        setNeighborhoods(
          response.data.neighborhoods.map((neighborhood) => neighborhood.name),
        )
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
        name="neighborhood"
        label="Barrio"
        type="select"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={neighborhoods.map((neighborhood) => ({
          value: neighborhood,
          label: neighborhood,
        }))}
      />
      <ShowFilter
        name="RentPrice"
        label="Precio de Alquiler"
        type="slider"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={{
          min: 0,
          max: 500000,
          step: 50,
        }}
      />
      <ShowFilter
        name="Expenses"
        label="Expensas"
        type="slider"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={{
          min: 0,
          max: 500000,
          step: 50,
        }}
      />
      <ShowFilter
        name="rooms"
        label="Ambientes"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="surface"
        label="Superficie"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="balconies"
        label="Balcónes"
        type="number"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="hasBackyard"
        label="Patio"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="hasGarage"
        label="Cochera"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="petfriendly"
        label="Apto mascotas"
        type="checkbox"
        filters={filters}
        setFilters={setFilters}
        scope="property"
      />
      <ShowFilter
        name="location"
        label="Orientación"
        type="select"
        filters={filters}
        setFilters={setFilters}
        scope="property"
        options={[
          { value: "front", label: "Frente" },
          { value: "inside", label: "Interno" },
          { value: "back", label: "Contrafrente" },
        ]}
      />
    </Grid>
  )
}

export default PropertyFilters