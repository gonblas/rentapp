import React from "react"
import BuildingFullView from "./BuildingFullView"
import ValidationButtons from "../components/ValidationButtons"
import { Container } from "@mui/material"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Typography } from "@mui/material"

function AdminPropertyView() {
  const { buildingId } = useParams()
  const [building, setBuilding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://localhost:8000/property/${buildingId}`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (!response.ok) {
          setError("No se encontró la propiedad con el ID especificado.")
          setBuilding(null)
        } else {
          const data = await response.json()
          setBuilding(data)
        }
      } catch (error) {
        setError("Failed to fetch property data.")
        console.log(error)
        setBuilding(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [buildingId])

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
      <BuildingFullView />
      <ValidationButtons
        object={building}
        endpoint="http://localhost:8000/admin/property"
      />
    </Container>
  )
}

export default AdminPropertyView
