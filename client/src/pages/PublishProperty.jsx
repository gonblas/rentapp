import React from "react"
import { useState } from "react"
import { Container } from "@mui/material"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import SelectBuilding from "../components/publish-property/SelectBuilding"
// import Multimedia from "../components/publish-property/Multimedia"
// import Characteristics from "../components/publish-property/Characteristics"
// import ReviewProperty from "../components/publish-property/ReviewProperty"
import PublishPropertyContext from "../components/publish-property/PublishPropertyContext"

function PublishProperty() {
  const steps = [
    "Seleccionar Edificio",
    // "Multimedia",
    // "Características",
    // "Revisión",
  ]

  const validateStep1 = (setErrors, formData) => {
    const { building_id } = formData
    let isValid = true

    if (!building_id || building_id.length < 10) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[0] = {
          ...updatedErrors[0],
          building_id: {
            hasError: true,
            message: "El número de edificio debe ser de 10 dígitos",
          },
        }
        return updatedErrors
      })
      isValid = false
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const nextStepFunction = [
    () => validateStep1(setErrors, formData[0]),
    // () => console.log("Estoy en la etapa 2"),
    // () => console.log("Estoy en la etapa 3"),
    // () => console.log("Estoy en la etapa 4"),
  ]

  const [formData, setFormData] = useState([
    // Índice 0: Datos de la primera "etapa"
    {
      building_id: 0,
    },
  ])

  const [errors, setErrors] = useState([
    // Índice 0: Errores para la primera "etapa"
    {
      building_id: { hasError: false, message: "" },
    },
  ])

  const handleOnChange = (event, index) => {
    const { name, value, type, checked } = event.target

    const newValue = type === "checkbox" ? checked : value

    setFormData((prevData) => {
      const updatedData = [...prevData]
      updatedData[index] = {
        ...updatedData[index],
        [name]: newValue,
      }
      return updatedData
    })
  }

  const comps = [
    <SelectBuilding key={0} />,
    // <Multimedia key={1} />,
    // <Characteristics key={2} />,
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
      <PublishPropertyContext.Provider
        value={{
          formData,
          setFormData,
          errors,
          setErrors,
          nextStepFunction,
          handleOnChange,
        }}
      >
        <HorizontalLinearStepper componets={comps} steps={steps} />
      </PublishPropertyContext.Provider>
    </Container>
  )
}

export default PublishProperty
