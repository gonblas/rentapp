import React, { useState, useEffect, useCallback } from "react"
import ListContainer from "./ListContainer"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import PropertyCard from "./cards/PropertyCard"
import BuildingCard from "./cards/BuildingCard"
import ValidationButtons from "./ValidationButtons"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

function PendingApprovals() {
  const [showList, setShowList] = useState("apartment")
  const [data, setData] = useState([]) // Data to store fetched information
  const [loading, setLoading] = useState(false) // For managing loading state
  const [error, setError] = useState(null) // For handling errors

  // Memoize fetchData function to avoid unnecessary re-renders
  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    const endpoint =
      showList === "apartment"
        ? "http://localhost:8000/admin/property/pending"
        : "http://localhost:8000/admin/building/pending"

    fetch(endpoint, {
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
        setData(data) // Update the state with fetched data
      })
      .catch((error) => {
        setError(error.message) // Set error state in case of failure
      })
      .finally(() => {
        setLoading(false) // Stop loading when done
      })
  }, [showList]) // `showList` is the dependency for `fetchData`

  // Fetch data when showList changes
  useEffect(() => {
    fetchData() // Fetch data when `showList` changes
  }, [fetchData]) // `fetchData` is now part of the dependency array

  // Helper function to render apartments
  const renderApartments = () => {
    if (!Array.isArray(data)) {
      return <Typography>No data available for properties.</Typography>
    }

    return data.map((item) => (
      <Container key={item.id} sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Property card on the left side */}
          <PropertyCard property={item} />

          {/* Validation buttons below the card and aligned to the right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              mt: 1,
            }}
          >
            <ValidationButtons
              object={item}
              endpoint="http://localhost:8000/admin/property"
              refetchData={fetchData} // Pass refetchData as a prop
            />
          </Box>
        </Box>
      </Container>
    ))
  }

  // Helper function to render buildings
  const renderBuildings = () => {
    if (!data?.buildings) {
      return <Typography>No buildings data available.</Typography>
    }

    return data.buildings.map((item) => (
      <Container key={item.id} sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Property card on the left side */}
          <BuildingCard building={item} />

          {/* Validation buttons below the card and aligned to the right */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              mt: 1,
            }}
          >
            <ValidationButtons
              object={item}
              endpoint="http://localhost:8000/admin/building"
              refetchData={fetchData} // Pass refetchData as a prop
            />
          </Box>
        </Box>
      </Container>
    ))
  }

  return (
    <ListContainer>
      <ToggleButtonGroup
        color="primary"
        value={showList}
        exclusive
        onChange={(event, newShowList) =>
          newShowList && setShowList(newShowList)
        }
        aria-label="List of pending approvals"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          boxShadow: "none",
          mb: "auto",
        }}
      >
        <ToggleButton
          value="apartment"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "primary.dark",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          Departamento
        </ToggleButton>
        <ToggleButton
          value="buildings"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "primary.dark",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          Edificios
        </ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
        {showList === "apartment" ? "Departamentos" : "Edificios"} Pendientes
      </Typography>

      {loading ? (
        <Typography>Cargando...</Typography> // Show loading message while fetching
      ) : error ? (
        <Typography color="error">Error: {error}</Typography> // Show error message if any
      ) : showList === "apartment" ? (
        renderApartments() // Render apartments
      ) : (
        renderBuildings() // Render buildings
      )}
    </ListContainer>
  )
}

export default PendingApprovals
