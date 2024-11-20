import React, { useContext } from "react"
import { Container } from "@mui/material"
import BuildingHeader from "../components/BuildingHeader"
import SearchContext from "../components/SearchContext"
import PropertyCard from "../components/cards/PropertyCard"

function BuildingFullView() {
  const { building } = useContext(SearchContext)
  console.log(building)
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        px: "0px!important",
      }}
    >
      <BuildingHeader building={building} />
      {building.properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          address={building.address}
        />
      ))}
    </Container>
  )
}

export default BuildingFullView
