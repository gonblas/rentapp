import React from "react"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import { Container, Select } from "@mui/material"
import Multimedia from "../components/publish-property/Multimedia"
import SelectBuilding from "../components/publish-property/SelectBuilding"
import Characteristics from "../components/publish-property/Characteristics"
import ReviewProperty from "../components/publish-property/ReviewProperty"

const comps = [
  <SelectBuilding key={0} />,
  <Multimedia key={1} />,
  <Characteristics key={2} />,
  <ReviewProperty key={3} />,
]

const steps = [
  "Seleccionar Edificio",
  "Multimedia",
  "Características",
  "Revisión",
]

const PublishProperty = () => {
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

export default PublishProperty
