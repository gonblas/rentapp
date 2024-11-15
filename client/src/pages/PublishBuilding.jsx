import React from "react"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import { Container } from "@mui/material"
import Characteristics from "../components/publish-building/Characteristics"
import ReviewBuilding from "../components/publish-building/ReviewBuilding"
import SelectLocation from "../components/publish-building/SelectLocation"

const comps = [
  <SelectLocation key={0} />,
  <Characteristics key={1} />,
  <ReviewBuilding key={2} />,
]

const steps = ["Ubicación", "Características", "Revisión"]

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
      <HorizontalLinearStepper componets={comps} steps={steps} />
    </Container>
  )
}

export default PublishBuilding
