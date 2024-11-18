import React from "react"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import { Container } from "@mui/material"
import SelectLocation from "../components/publish-building/SelectLocation"
import Characteristics from "../components/publish-building/Characteristics"
// import ReviewBuilding from "../components/publish-building/ReviewBuilding"
import { PublishBuildingProvider } from "../components/publish-building/PublishBuildingContext"

const comps = [
  <SelectLocation key={0} />,
  <Characteristics key={1} />,
  // <ReviewBuilding key={2} />,
]

const steps = ["Ubicación", "Características"]
// , "Revisión"]

const PublishBuilding = () => {
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
      <PublishBuildingProvider>
        <HorizontalLinearStepper
          componets={comps}
          steps={steps}
          property={false}
        />
      </PublishBuildingProvider>
    </Container>
  )
}

export default PublishBuilding
