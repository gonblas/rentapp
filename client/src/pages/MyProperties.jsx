import { Typography } from "@mui/material"
import React, { useState, useEffect, useCallback } from "react"
import PropertyCard from "../components/cards/PropertyCard"
import CenteredContainer from "../components/CenteredContainer"
import ListContainer from "../components/ListContainer"
import AlertContainer from "../components/AlertContainer" // Import AlertContainer

function MyProperties() {
  const [properties, setProperties] = useState([]) // Properties to store fetched information
  const [loading, setLoading] = useState(false) // For managing loading state
  const [error, setError] = useState(null) // For handling errors

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    fetch("http://localhost:8000/user/publications", {
      method: "GET",
      credentials: "include", // Include cookies with the request
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
        if (Array.isArray(data.properties)) {
          setProperties(data.properties)
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
  }, [fetchData])

  return (
    <CenteredContainer>
      <ListContainer>
        <Typography variant="h5" component="h1" gutterBottom sx={{ py: 4 }}>
          Mis propiedades
        </Typography>
        {loading && <Typography>Cargando propiedades...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}

        {!loading && !error && properties.length > 0
          ? properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                linkName="/property-full-view"
              />
            ))
          : !loading &&
            !error && (
              <AlertContainer message="No hay propiedades publicadas." /> // Display message with AlertContainer
            )}
      </ListContainer>
    </CenteredContainer>
  )
}

export default MyProperties
