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
      neighborhood: "",
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

    const formData = new FormData(event.target)
    // {
    //   search: event.target.search.value,
    //   ...filters.property,
    //   ...filters.building,
    // }
    // formData.append("search", event.target.search.value)
    formData.append("neighborhood", filters.property.neighborhood)
    formData.append("minRentPrice", filters.property.minRentPrice)
    formData.append("maxRentPrice", filters.property.maxRentPrice)
    formData.append("minExpenses", filters.property.minExpenses)
    formData.append("maxExpenses", filters.property.maxExpenses)
    formData.append("rooms", filters.property.rooms)
    formData.append("surface", filters.property.surface)
    formData.append("balconies", filters.property.balconies)
    formData.append("hasBackyard", filters.property.hasBackyard)
    formData.append("hasGarage", filters.property.hasGarage)
    formData.append("petfriendly", filters.property.petfriendly)
    formData.append("location", filters.property.location)
    formData.append("services", filters.building.services)
    formData.append("floors", filters.building.floors)
    formData.append("apartmentsPerFloor", filters.building.apartmentsPerFloor)
    formData.append("hasElevator", filters.building.hasElevator)

    console.log("Submitted data:", formData.entries)

    console.log("Submitted data:", formData)

    fetch("http://localhost:8000/search/", {
      method: "POST",
      body: formData,
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
      {/* Form wrapper */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "10px",
        }}
      >
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
      </form>
    </Container>
  )
}

export default SearchBar
