import React, { useContext } from "react"
import { Container } from "@mui/material"
import Property from "../components/property-page/Property"
import SearchContext from "../components/SearchContext"

function PropertyFullView() {
  const { property, building } = useContext(SearchContext)
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
      }}
    >
      <Property property={property} building={building} />
    </Container>
  )
}

export default PropertyFullView
