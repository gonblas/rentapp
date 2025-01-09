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
          setError("No se encontró la propiedad con el ID especificado.")
          setBuilding(null)
        } else {
          const data = await response.json()
          setBuilding(data)
        }
      } catch (error) {
        setError("Failed to fetch property data.")
        console.error(error)
        setBuilding(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBuilding()
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
      <BuildingFullView isAdmin={true} />
      <ValidationButtons object={building} type="building" />
    </Container>
  )
}

export default AdminPropertyView
