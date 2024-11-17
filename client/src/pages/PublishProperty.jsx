import React from "react"
import { Container } from "@mui/material"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import SelectBuilding from "../components/publish-property/SelectBuilding"
import Characteristics from "../components/publish-property/Characteristics"
import Multimedia from "../components/publish-property/Multimedia"
// import ReviewProperty from "../components/publish-property/ReviewProperty"
import { PublishPropertyProvider } from "../components/publish-property/PublishPropertyContext"

function PublishProperty() {
  const steps = [
    "Seleccionar Edificio",
    "Características",
    "Multimedia",
    // "Revisión",
  ]

  const comps = [
    <SelectBuilding key={0} />,
    <Characteristics key={1} />,
    <Multimedia key={2} />,
    // <ReviewProperty key={3} />,
  ]

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
      <PublishPropertyProvider>
        <HorizontalLinearStepper componets={comps} steps={steps} />
      </PublishPropertyProvider>
    </Container>
  )
}

export default PublishProperty
