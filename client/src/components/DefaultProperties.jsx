import React, { useState, useEffect, useCallback } from "react"
import PropertyCard from "../components/cards/PropertyCard"
import CenteredContainer from "../components/CenteredContainer"
import ListContainer from "../components/ListContainer"
import { Typography, Pagination, Container } from "@mui/material"

function MyProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paginationData, setPaginationData] = useState({
    total_records: 0,
    total_pages: 0,
    current_page: 1,
  })

  const fetchData = useCallback((page) => {
    setLoading(true)
    setError(null)
    fetch(`https://cc210ef425fe.sn.mynetname.net/property/list?page=${page}`, {
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
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              defaultPage={1}
              count={paginationData.total_pages}
              page={paginationData.current_page}
              onChange={handleChange}
              size="large"
              sx={{
                mx: "auto!important",
                px: "auto!important",
                color: "primary",
                mt: 8,
                mb: 12,
              }}
            />
          </Container>
        )}
      </ListContainer>
    </CenteredContainer>
  )
}

export default MyProperties
