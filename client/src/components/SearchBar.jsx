import React from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FilterList from "./filters/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"

function SearchBar() {
  const navigate = useNavigate()
  const [filters, setFilters] = React.useState({
    property: {
      neighborhood: 0,
      minRentPrice: 0,
      maxRentPrice: 0,
      minExpenses: 0,
      maxExpenses: 0,
      rooms: 0,
      surface: 0,
      balconies: 0,
      hasBackyard: false,
      hasGarage: false,
      petfriendly: false,
      location: "",
    },
    building: {
      services: [],
      floors: 0,
      apartmentsPerFloor: 0,
      hasElevator: false,
    },
  })
  console.log("Filters:", filters)
  const handleSubmit = (event) => {
    event.preventDefault()

    const URLdata = new URLSearchParams({
      neighborhood_id: filters.property.neighborhood,
      min_rental_value: filters.property.minRentPrice,
      max_rental_value: filters.property.maxRentPrice,
      min_expenses_value: filters.property.minExpenses,
      max_expenses_value: filters.property.maxExpenses,
      rooms: filters.property.rooms,
      square_meters: filters.property.surface,
      balconies: filters.property.balconies,
      backyard: filters.property.hasBackyard,
      garage: filters.property.hasGarage,
      pet_friendly: filters.property.petfriendly,
      location: filters.property.location,
      // {gym, pool, terrace, laundry, elevator, bike_rack} = filters.building.services,
      floors: filters.building.floors,
      apartmentsPerFloor: filters.building.apartmentsPerFloor,
      hasElevator: filters.building.hasElevator,
    })

    fetch("http://localhost:8000/property/" + URLdata, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
        navigate("/search", { state: { data } })
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
      }}
    >
      {/* Form wrapper
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      > */}
      <TextField
        id="search"
        name="search"
        label="Search field"
        type="search"
        sx={{
          flexGrow: 1,
        }}
      />
      <FilterList
        filters={filters}
        setFilters={setFilters}
        style={{
          flexShrink: 0,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "10px",
        }}
      >
        <SearchIcon />
      </Button>
      {/* </form> */}
    </Container>
  )
}

export default SearchBar
