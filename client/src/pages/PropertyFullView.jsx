import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Typography } from "@mui/material"
import Property from "../components/property-page/Property"

function PropertyFullView() {
  const { propertyId } = useParams() // Get the property ID from the URL
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://localhost:8000/property/${propertyId}`,
          {
            method: "GET",
          },
        )

        // If the response is not OK (status 200-299), handle the error
        if (!response.ok) {
          if (response.status === 404) {
            setError("No se encontró la propiedad con el ID especificado.")
          } else {
            setError("An error occurred while fetching the property.")
          }
          setProperty(null)
        } else {
          const data = await response.json()
          setProperty(data)
        }
      } catch (error) {
        console.error("Error:", error)
        setError("Failed to fetch property data.")
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  if (loading) {
    return <Typography>Cargando...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!property) {
    return (
      <Typography>
        No se encontró la propiedad con el ID especificado.
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
      }}
    >
      <Property property={property} />
    </Container>
  )
}

export default PropertyFullView
