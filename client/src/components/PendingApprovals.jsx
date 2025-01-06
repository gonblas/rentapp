import React, { useState, useEffect, useCallback, useContext } from "react"
import ListContainer from "./ListContainer"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import PropertyCard from "./cards/PropertyCard"
import BuildingCard from "./cards/BuildingCard"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import AdminContext from "./AdminContext"
import AlertContainer from "./AlertContainer"

function PendingApprovals() {
  const { showList, setShowList } = useContext(AdminContext) // Get context values
  const [data, setData] = useState([]) // Data to store fetched information
  const [loading, setLoading] = useState(false) // For managing loading state
  const [error, setError] = useState(null) // For handling errors

  // Fetch data based on selected list type (apartments or buildings)
  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    const endpoint =
      showList === "apartment"
        ? "https://cc210ef425fe.sn.mynetname.net/admin/property/pending"
        : "https://cc210ef425fe.sn.mynetname.net/admin/building/pending"

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
        setData(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [showList])

  // Fetch data when showList changes
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Helper function to render apartments
  const renderApartments = () => {
    if (!data.properties || data.properties.length === 0) {
      return <AlertContainer message="No hay departamentos a validar" />
    }

    return data.properties.map((item) => (
      <Container key={item.id} sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Property card */}
          <PropertyCard property={item} linkName="/admin-property-view" />
        </Box>
      </Container>
    ))
  }

  // Helper function to render buildings
  const renderBuildings = () => {
    if (!data.buildings || data.buildings.length === 0) {
      return <AlertContainer message="No hay edificios a validar" />
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
          {/* Building card */}
          <BuildingCard building={item} linkName="/admin-building-view" />
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
          Departamentos
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
