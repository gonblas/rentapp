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
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: "8px",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "45px",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "800px!important",
            padding: "30px!important",
          }}
        >
          <Container
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h5">Filtros del Edificio</Typography>
            <BuildingFilters filters={filters} setFilters={setFilters} />
          </Container>
          <Container
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="h5" sx={{ mt: "15px" }}>
              Filtros de la Propiedad
            </Typography>
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </Container>
        </Container>
      </Popover>
    </Fragment>
  )
}

export default FilterList
