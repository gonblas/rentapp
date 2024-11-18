import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React from "react"
import FilterList from "./filters/FilterList"
import SearchIcon from "@mui/icons-material/Search"

function SearchBar() {
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
    const formData = new FormData()
    formData.append("search", event.target.search.value)
  }

  return (
    <Container
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
        id="outlined-search"
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
        href="/search"
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
