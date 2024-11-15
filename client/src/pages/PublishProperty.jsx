import React from "react"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import { Container } from "@mui/material"
import Multimedia from "../components/publish-property/Multimedia"
import Principal from "../components/publish-property/Principal"
import Characteristics from "../components/publish-property/Characteristics"
import ReviewProperty from "../components/publish-property/ReviewProperty"

const comps = [
  <Principal key={0} />,
  <Multimedia key={1} />,
  <Characteristics key={2} />,
  <ReviewProperty key={3} />,
]

const steps = ["Principal", "Multimedia", "Características", "Revisión"]

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
