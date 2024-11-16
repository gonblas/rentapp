import React, { useState, useRef, Fragment } from "react"
import {
  Button,
  Popper,
  Typography,
  Container,
  useClickAway,
} from "@mui/material"
import BuildingFilters from "./BuildingFilters"
import PropertyFilters from "./PropertyFilters"

function FilterList() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const popperRef = useRef(null) // Reference for the Popper element
  const buttonRef = useRef(null) // Reference for the button element

  // Toggle Popper visibility when button is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev) // Toggle visibility
  }

  // Use the `useClickAway` hook to close the Popper when clicking outside
  useClickAway(popperRef, () => setOpen(false)) // Close the Popper on outside click

  return (
    <Fragment>
      <Button ref={buttonRef} variant="contained" onClick={handleClick}>
        Filtros
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start" // Popper placement below and to the left of the button
        ref={popperRef} // Attach the ref to the Popper
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10], // Adjust the position of the Popper
            },
          },
        ]}
      >
        <Container
          sx={{
            p: "30px!important",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "white", // Optional background color
            borderRadius: "4px", // Optional border radius
            boxShadow: 3, // Optional shadow
          }}
        >
          <Typography variant="h5">Filtros del Edificio</Typography>
          <BuildingFilters />
          <Typography variant="h5">Filtros de la Propiedad</Typography>
          <PropertyFilters />
        </Container>
      </Popper>
    </Fragment>
  )
}

export default FilterList
