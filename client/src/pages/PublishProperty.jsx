import React from "react"
import { useState } from "react"
import { Container } from "@mui/material"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import SelectBuilding from "../components/publish-property/SelectBuilding"
// import Multimedia from "../components/publish-property/Multimedia"
// import Characteristics from "../components/publish-property/Characteristics"
// import ReviewProperty from "../components/publish-property/ReviewProperty"

function PublishProperty() {
  const steps = [
    "Seleccionar Edificio",
    // "Multimedia",
    // "Características",
    // "Revisión",
  ]

  const validateStep1 = (setErrors, formData) => {
    const setFieldError = (field, hasError, message) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: { hasError, message },
      }))
    }

    const { building_id } = formData

    let isValid = true

    if (!building_id || building_id.length < 10) {
      setFieldError(
        "building_id",
        true,
        "El número de teléfono debe tener al menos 10 dígitos."
      )
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
  ];

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

    // Determina el valor de acuerdo al tipo de campo (checkbox o texto)
    const newValue = type === "checkbox" ? checked : value

    // Actualiza el estado de forma general
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
    <SelectBuilding
      key={0}
      formData={formData[0]}
      handleOnChange={handleOnChange}
      errors={errors[0]}
    />,
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
      <HorizontalLinearStepper
        componets={comps}
        steps={steps}
        nextStepFunction={nextStepFunction}
        setErrors={setErrors}
        formData={formData}
      />
    </Container>
  )
}

export default PublishProperty
