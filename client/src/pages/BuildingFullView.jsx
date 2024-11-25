import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Container, Typography } from "@mui/material"
import BuildingHeader from "../components/BuildingHeader"
import PropertyCard from "../components/cards/PropertyCard"
import SearchContext from "../components/SearchContext"
import AdminContext from "../components/AdminContext"

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
          `https://cc210ef425fe.sn.mynetname.net/building/${buildingId}`,
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

      // Conditionally add each parameter if the value is not empty, null, or undefined
      if (filters.property.building_id) {
        URLdata.append("building_id", filters.property.building_id)
      }
      if (filters.property.minRentPrice !== null) {
        URLdata.append("min_rental_value", filters.property.minRentPrice)
      }
      if (filters.property.maxRentPrice !== null) {
        URLdata.append("max_rental_value", filters.property.maxRentPrice)
      }
      if (filters.property.minExpenses !== null) {
        URLdata.append("min_expenses_value", filters.property.minExpenses)
      }
      if (filters.property.maxExpenses !== null) {
        URLdata.append("max_expenses_value", filters.property.maxExpenses)
      }
      if (filters.property.rooms !== null) {
        URLdata.append("rooms", filters.property.rooms)
      }
      if (filters.property.balconies !== null) {
        URLdata.append("balconies", filters.property.balconies)
      }
      if (filters.property.hasBackyard) {
        // Send only if true
        URLdata.append("backyard", true)
      }
      if (filters.property.hasGarage) {
        // Send only if true
        URLdata.append("garage", true)
      }
      if (filters.property.petfriendly) {
        // Send only if true
        URLdata.append("pet_friendly", true)
      }
      if (filters.property.location) {
        URLdata.append("location", filters.property.location)
      }

      fetch(
        `https://cc210ef425fe.sn.mynetname.net/building/${buildingId}/properties?` + URLdata,
        {
          method: "GET",
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data)
          setProperties(data.properties)
        })
        .catch((error) => {
          console.error("Error:", error)
        })
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
      {properties && properties.length > 0 && (
        <Typography variant="h5" sx={{ mr: "auto", pb: "25px" }}>
          Propiedades en este edificio
        </Typography>
      )}
      {properties && properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            linkName="/property-full-view"
          />
        ))
      ) : !isAdmin ? (
        <Typography>No hay propiedades en este edificio</Typography>
      ) : (
        " "
      )}
    </Container>
  )
}

export default BuildingFullView
