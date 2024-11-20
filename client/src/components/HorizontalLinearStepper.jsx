import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"
import { styled } from "@mui/material/styles"
import Container from "@mui/material/Container"
import { useContext, useState } from "react"
import PublishPropertyContext from "./publish-property/PublishPropertyContext"
import PublishBuildingContext from "./publish-building/PublishBuildingContext"

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
    left: "calc(-50% + 11px)",
    right: "calc(50% + 11px)",
    zIndex: "-1",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: (theme.vars || theme).palette.primary.dark,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: (theme.vars || theme).palette.primary.dark,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}))

export default function HorizontalLinearStepper({
  componets,
  steps,
  property,
}) {
  const { setErrors, nextStepFunction } = useContext(
    property ? PublishPropertyContext : PublishBuildingContext,
  )

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    let isValid = nextStepFunction[activeStep](setErrors)
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
        sx={{
          pt: 6,
        }}
      >
        {steps.map((label) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "9.3%!important",
          py: 5,
        }}
      >
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>Publicado con exito</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {componets[activeStep]}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Volver
              </Button>
              <Button onClick={handleNext} sx={{ ml: "auto" }}>
                {activeStep === steps.length - 1 ? "Publicar" : "Siguiente"}
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
