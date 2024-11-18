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
      ambients: 0,
      surface: 0,
      hasBackyard: false,
      hasBalcony: false,
      position: "",
      rentPrice: 0,
      petfriendly: false,
    },
    building: {
      services: [],
      hasGarage: false,
      neighborhood: "",
      expenses: 0,
      floors: 0,
      apartmentsPerFloor: 0,
      hasElevator: false,
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      search: event.target.search.value,
      ...filters.property,
      ...filters.building,
    }

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
