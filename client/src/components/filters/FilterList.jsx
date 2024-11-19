import React, { useState, Fragment } from "react"
import { Button, Popover, Typography, Container } from "@mui/material"
import BuildingFilters from "./BuildingFilters"
import PropertyFilters from "./PropertyFilters"

function FilterList({ filters, setFilters }) {
  const [anchorEl, setAnchorEl] = useState(null)
  // Toggle Popover visibility when button is clicked
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  // Determine if the Popover is open
  const open = Boolean(anchorEl)

  return (
    <Fragment>
      <Button variant="contained" onClick={handleClick}>
        Filtros
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)} // Close Popover when clicking outside or elsewhere
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        // PaperProps={{
        //   sx: {
        //     p: "30px!important",
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "20px",
        //     backgroundColor: "white", // Optional background color
        //     borderRadius: "4px", // Optional border radius
        //     boxShadow: 3, // Optional shadow
        //   },
        // }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            maxWidth: "800px!important",
            padding: "30px!important",
          }}
        >
          <Typography variant="h5">Filtros del Edificio</Typography>
          <BuildingFilters filters={filters} setFilters={setFilters} />
          <Typography variant="h5">Filtros de la Propiedad</Typography>
          <PropertyFilters filters={filters} setFilters={setFilters} />
        </Container>
      </Popover>
    </Fragment>
  )
}

export default FilterList
