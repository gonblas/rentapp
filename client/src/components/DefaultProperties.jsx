import { Typography } from "@mui/material"
import React, { useState, useEffect, useCallback } from "react"
import PropertyCard from "../components/cards/PropertyCard"
import CenteredContainer from "../components/CenteredContainer"
import ListContainer from "../components/ListContainer"
import Button from "@mui/material/Button"

function MyProperties() {
  const [properties, setProperties] = useState([]) // properties to store fetched information
  const [loading, setLoading] = useState(false) // For managing loading state
  const [error, setError] = useState(null) // For handling errors
  const [page, setPage] = useState(1) // For handling pagination

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetch(`http://localhost:8000/property/list/?${page}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`,
          )
        }
        return response.json()
      })
      .then((data) => {
        console.log("Success:", data)
        if (Array.isArray(data.properties)) {
          setProperties(data.properties) // Update the state with fetched properties
        } else {
          console.error("Unexpected data format:", data)
          setError("Unexpected data format from the server.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        setError(error.message) // Set error state in case of failure
      })
      .finally(() => {
        setLoading(false) // Stop loading when done
      })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData, page])

  useEffect(() => {
    console.log("Page updated:", page)
  }, [page])

  return (
    <CenteredContainer>
      <ListContainer>
        <Typography variant="h5" component="h1" gutterBottom sx={{ py: 4 }}>
          Propiedades sugeridas
        </Typography>
        {loading && <Typography>Cargando propiedades...</Typography>}
        {error && <Typography>Error: {error}</Typography>}

        {!loading && !error && properties.length > 0
          ? properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                linkName="/property-full-view"
              />
            ))
          : !loading &&
            !error && <Typography>No hay propiedades disponibles</Typography>}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setPage(page + 1)
          }}
          sx={{
            display: "block",
            mx: "auto",
            mb: 12,
            mt: 4,
          }}
        >
          Cargar más
        </Button>
      </ListContainer>
    </CenteredContainer>
  )
}

export default MyProperties
