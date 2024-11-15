import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React from "react"
import FilterList from "./FilterList"
import SearchIcon from "@mui/icons-material/Search"

function SearchBar() {
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
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{
          flexGrow: 1,
        }}
      />
      <FilterList
        style={{
          flexShrink: 0,
        }}
      />
      <Button
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
