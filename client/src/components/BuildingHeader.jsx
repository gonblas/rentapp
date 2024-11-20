import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import BuildingFeatures from "./BuildingFeatures"

function BuildingHeader({ building }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        px: "0px!important",
        gap: "10px",
        py: "70px",
      }}
    >
      <Typography variant="h4">{building.address}</Typography>

      <Typography variant="h5" sx={{ pb: "15px" }}>
        {building.neighborhood}
      </Typography>
      <BuildingFeatures building={building} />
    </Container>
  )
}

export default BuildingHeader
