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
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ height: "48px", px: "30px", fontSize: "16px" }}
      >
        Filtros
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
