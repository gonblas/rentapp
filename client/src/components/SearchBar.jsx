import React from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FilterList from "./filters/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"
import SearchContext from "./SearchContext"
import { useContext } from "react"

function SearchBar() {
  const navigate = useNavigate()
  const { filters, setFilters, setBuildings } = useContext(SearchContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    const URLdata = new URLSearchParams()

    // Conditionally add each parameter if the value is not empty, null, or undefined
    if (filters.property.neighborhood)
      URLdata.append("neighborhood_id", filters.property.neighborhood)
    if (filters.property.minRentPrice !== null)
      URLdata.append("min_rental_value", filters.property.minRentPrice)
    if (filters.property.maxRentPrice !== null)
      URLdata.append("max_rental_value", filters.property.maxRentPrice)
    if (filters.property.minExpenses !== null)
      URLdata.append("min_expenses_value", filters.property.minExpenses)
    if (filters.property.maxExpenses !== null)
      URLdata.append("max_expenses_value", filters.property.maxExpenses)
    if (filters.property.rooms !== null)
      URLdata.append("rooms", filters.property.rooms)
    if (filters.property.surface !== null)
      URLdata.append("square_meters", filters.property.surface)
    if (filters.property.balconies !== null)
      URLdata.append("balconies", filters.property.balconies)
    if (filters.property.hasBackyard !== null)
      URLdata.append("backyard", filters.property.hasBackyard)
    if (filters.property.hasGarage !== null)
      URLdata.append("garage", filters.property.hasGarage)
    if (filters.property.petfriendly !== null)
      URLdata.append("pet_friendly", filters.property.petfriendly)
    if (filters.property.location)
      URLdata.append("location", filters.property.location)
    if (filters.building.floors !== null)
      URLdata.append("floors", filters.building.floors)
    if (filters.building.apartmentsPerFloor !== null)
      URLdata.append(
        "apartments_per_floor",
        filters.building.apartmentsPerFloor,
      )

    // Add services only if the service is selected (truthy)
    if (filters.building.services.includes("Ascensor"))
      URLdata.append("elevator", true)
    if (filters.building.services.includes("Pileta"))
      URLdata.append("pool", true)
    if (filters.building.services.includes("Gimnasio"))
      URLdata.append("gym", true)
    if (filters.building.services.includes("Terraza"))
      URLdata.append("terrace", true)
    if (filters.building.services.includes("Bicicletero"))
      URLdata.append("bike_rack", true)
    if (filters.building.services.includes("Lavadero"))
      URLdata.append("laundry", true)

    fetch("http://localhost:8000/property/?" + URLdata, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
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
    </Container>
  )
}

export default SearchBar
