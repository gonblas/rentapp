import { Typography } from "@mui/material"
import React, { useState, useEffect, useCallback } from "react"
import PropertyCard from "../components/cards/PropertyCard"
import CenteredContainer from "../components/CenteredContainer"
import ListContainer from "../components/ListContainer"
import Pagination from "@mui/material/Pagination"

function MyProperties() {
  const [properties, setProperties] = useState([]) // properties to store fetched information
  const [loading, setLoading] = useState(false) // For managing loading state
  const [error, setError] = useState(null) // For handling errors
  const [paginationData, setPaginationData] = useState({
    total_records: 0,
    total_pages: 0,
    current_page: 1,
  }) // For pagination

  const fetchData = useCallback((page) => {
    setLoading(true)
    setError(null)
    fetch(`http://localhost:8000/property/list/?page=${page}`, {
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
          setProperties(data.properties)
          setPaginationData(data.paging)
        } else {
          console.error("Unexpected data format:", data)
          setError("Unexpected data format from the server.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchData(paginationData.current_page)
  }, [fetchData, paginationData.current_page])

  useEffect(() => {
    console.log("Page updated:", paginationData.current_page)
  }, [paginationData])

  const handleChange = (event, value) => {
    setPaginationData((prevData) => ({
      ...prevData,
      current_page: value,
    }))
  }

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
        {paginationData.total_pages > 1 && (
          <Pagination
            count={paginationData.total_pages}
            page={paginationData.current_page}
            onChange={handleChange}
            sx={{
              mx: "auto!important",
              mt: 8,
              mb: 12,
            }}
          />
        )}
      </ListContainer>
    </CenteredContainer>
  )
}

export default MyProperties
