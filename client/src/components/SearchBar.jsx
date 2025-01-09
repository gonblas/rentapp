import React, { useContext } from "react"
import Container from "@mui/material/Container"
import { Button } from "@mui/material"
import FilterList from "./filters/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"
import SearchContext from "./SearchContext"
import GoogleMaps from "./GoogleMaps"

function SearchBar() {
  const navigate = useNavigate()
  const { filters, setFilters, setBuildings } = useContext(SearchContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    const URLdata = new URLSearchParams()

    const filterMapping = {
      neighborhood_id: filters.building?.neighborhood_id,
      min_rental_value: filters.property?.minRentPrice,
      max_rental_value: filters.property?.maxRentPrice,
      min_expenses_value: filters.property?.minExpenses,
      max_expenses_value: filters.property?.maxExpenses,
      rooms: filters.property?.rooms,
      balconies: filters.property?.balconies,
      backyard: filters.property?.hasBackyard ? true : null,
      garage: filters.property?.hasGarage ? true : null,
      pet_friendly: filters.property?.petfriendly ? true : null,
      location: filters.property?.location,
      address: filters.building?.address,
      floors: filters.building?.floors,
      apartments_per_floor: filters.building?.apartmentsPerFloor,
    }

    Object.entries(filterMapping).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        URLdata.append(key, value)
      }
    })

    const serviceMapping = {
      Ascensor: "elevator",
      Pileta: "pool",
      Gimnasio: "gym",
      Terraza: "terrace",
      Bicicletero: "bike_rack",
      Lavadero: "laundry",
    }


    console.log("http://localhost:8000/building/?" + URLdata)
    fetch("http://localhost:8000/building/?" + URLdata, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBuildings(data)
        navigate("/search")
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        py: "80px",
        px: "0px!important",
        gap: "10px",
        height: "48px",
      }}
    >
      <Container sx={{ width: "100%", height: "48px", p: "0px!important" }}>
        <GoogleMaps
          handleOnChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              building: {
                ...prev.building,
                address: e.target.value,
              },
            }))
          }}
          value={filters.building.address}
        />
      </Container>
      <FilterList
        filters={filters}
        setFilters={setFilters}
        sx={{
          flexShrink: 0,
          height: "48px",
          display: "flex",
          alignItems: "center",
        }}
      />

      <Button
        type="submit"
        variant="contained"
        aria-label="search"
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingX: "16px",
        }}
      >
        <SearchIcon />
      </Button>
    </Container>
  )
}

export default SearchBar
