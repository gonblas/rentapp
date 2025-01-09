import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Typography } from "@mui/material"
import BuildingHeader from "../components/BuildingHeader"
import PropertyCard from "../components/cards/PropertyCard"
import SearchContext from "../components/SearchContext"
import AdminContext from "../components/AdminContext"
import AlertContainer from "../components/AlertContainer" // Import AlertContainer

function BuildingFullView({ isAdmin = false }) {
  const { buildingId } = useParams() // Get the building ID from the URL
  const { filters } = useContext(isAdmin ? AdminContext : SearchContext)
  const [properties, setProperties] = useState([])
  const [building, setBuilding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBuilding = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://localhost:8000/building/${buildingId}`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (!response.ok) {
          if (response.status === 404) {
            setError("Building not found.")
          } else {
            setError("An error occurred while fetching the building.")
          }
          setBuilding(null)
        } else {
          const data = await response.json()
          setBuilding(data)
        }
      } catch (error) {
        console.error("Error:", error)
        setError("Failed to fetch building data.")
        setBuilding(null)
      } finally {
        setLoading(false)
      }
    }

    if (!isAdmin) {
      const URLdata = new URLSearchParams()

      // Add filters conditionally
      if (filters.property.building_id)
        URLdata.append("building_id", filters.property.building_id)
      if (filters.property.minRentPrice !== null)
        URLdata.append("min_rental_value", filters.property.minRentPrice)
      if (filters.property.maxRentPrice !== null)
        URLdata.append("max_rental_value", filters.property.maxRentPrice)
      if (filters.property.minExpenses !== null)
        URLdata.append("min_expenses_value", filters.property.minExpenses)
      if (filters.property.maxExpenses !== null)
        URLdata.append("max_expenses_value", filters.property.maxExpenses)
      if (filters.property.rooms !== null)
        URLdata.append("rooms", filters.property.rooms)
      if (filters.property.balconies !== null)
        URLdata.append("balconies", filters.property.balconies)
      if (filters.property.hasBackyard) URLdata.append("backyard", true)
      if (filters.property.hasGarage) URLdata.append("garage", true)
      if (filters.property.petfriendly) URLdata.append("pet_friendly", true)
      if (filters.property.location)
        URLdata.append("location", filters.property.location)

      fetch(
        `http://localhost:8000/building/${buildingId}/properties?` + URLdata,
        {
          method: "GET",
        },
      )
        .then((response) => response.json())
        .then((data) => setProperties(data.properties))
        .catch((error) => console.error("Error:", error))
    }

    fetchBuilding()
  }, [buildingId, filters, isAdmin]) // Add filters as a dependency to the useEffect

  if (loading) {
    return <Typography>Cargando...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!building) {
    return (
      <Typography>
        No se encontró el edificio con el ID especificado.
      </Typography>
    )
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        px: "0px!important",
      }}
    >
      <BuildingHeader building={building} />

      <Typography variant="h5" sx={{ mr: "auto", pb: "25px" }}>
        Propiedades en este edificio
      </Typography>
      {properties && properties.length > 0 ? (
        <>
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              linkName="/property-full-view"
            />
          ))}
        </>
      ) : (
        <AlertContainer message="No hay propiedades registradas" /> // Use AlertContainer to display the message
      )}
    </Container>
  )
}

export default BuildingFullView
