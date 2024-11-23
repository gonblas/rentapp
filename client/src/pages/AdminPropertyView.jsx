import React from "react"
import PropertyFullView from "./PropertyFullView"
import ValidationButtons from "../components/ValidationButtons"
import { Container } from "@mui/material"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Typography } from "@mui/material"

function AdminPropertyView() {
  const { propertyId } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://cc210ef425fe.sn.mynetname.net/property/${propertyId}`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (!response.ok) {
          setError("No se encontró la propiedad con el ID especificado.")
          setProperty(null)
        } else {
          const data = await response.json()
          setProperty(data)
        }
      } catch (error) {
        setError("Failed to fetch property data.")
        console.log(error)
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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <PropertyFullView />
      <ValidationButtons object={property} type="property" />
    </Container>
  )
}

export default AdminPropertyView
