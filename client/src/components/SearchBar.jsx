import React, { useContext } from "react"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
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

    // Conditionally add each parameter if the value is not empty, null, or undefined
    if (filters.property.neighborhood_id) {
      URLdata.append("neighborhood_id", filters.building.neighborhood_id)
    }
    if (filters.property.minRentPrice !== null) {
      URLdata.append("min_rental_value", filters.property.minRentPrice)
    }
    if (filters.property.maxRentPrice !== null) {
      URLdata.append("max_rental_value", filters.property.maxRentPrice)
    }
    if (filters.property.minExpenses !== null) {
      URLdata.append("min_expenses_value", filters.property.minExpenses)
    }
    if (filters.property.maxExpenses !== null) {
      URLdata.append("max_expenses_value", filters.property.maxExpenses)
    }
    if (filters.property.rooms !== null) {
      URLdata.append("rooms", filters.property.rooms)
    }
    if (filters.property.balconies !== null) {
      URLdata.append("balconies", filters.property.balconies)
    }
    if (filters.property.hasBackyard) {
      URLdata.append("backyard", true)
    }
    if (filters.property.hasGarage) {
      URLdata.append("garage", true)
    }
    if (filters.property.petfriendly) {
      URLdata.append("pet_friendly", true)
    }
    if (filters.property.location) {
      URLdata.append("location", filters.property.location)
    }
    if (filters.building.address) {
      URLdata.append("address", filters.building.address)
    }
    if (filters.building.floors !== null) {
      URLdata.append("floors", filters.building.floors)
    }
    if (filters.building.apartmentsPerFloor !== null) {
      URLdata.append(
        "apartments_per_floor",
        filters.building.apartmentsPerFloor,
      )
    }

    // Add services only if the service is selected (truthy)
    if (filters.building.services.includes("Ascensor")) {
      URLdata.append("elevator", true)
    }
    if (filters.building.services.includes("Pileta")) {
      URLdata.append("pool", true)
    }
    if (filters.building.services.includes("Gimnasio")) {
      URLdata.append("gym", true)
    }
    if (filters.building.services.includes("Terraza")) {
      URLdata.append("terrace", true)
    }
    if (filters.building.services.includes("Bicicletero")) {
      URLdata.append("bike_rack", true)
    }
    if (filters.building.services.includes("Lavadero")) {
      URLdata.append("laundry", true)
    }

    console.log("https://cc210ef425fe.sn.mynetname.net/building/?" + URLdata)
    fetch("https://cc210ef425fe.sn.mynetname.net/building/?" + URLdata, {
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

  console.log(filters)

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
      <Container sx={{ width: "80%", height: "48px" }}>
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
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <SearchIcon />
      </Button>
    </Container>
  )
}

export default SearchBar
