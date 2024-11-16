import { Button, Popover, Typography, Container } from "@mui/material"

import React, { Fragment } from "react"
import BuildingFilters from "./BuildingFilters"
import PropertyFilters from "./PropertyFilters"

function FilterList() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "filter-list" : undefined

  return (
    <Fragment>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Filtros
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          transform: "translateX(-500px) translateY(20px)",
        }}
      >
        <Container
          sx={{
            p: "30px!important",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h5">Filtros del Edificio</Typography>
          <BuildingFilters />
          <Typography variant="h5">Filtros de la Propiedad</Typography>
          <PropertyFilters />
        </Container>
      </Popover>
    </Fragment>
  )
}

export default FilterList
