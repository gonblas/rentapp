import React from "react"
import HorizontalLinearStepper from "../components/HorizontalLinearStepper"
import { Container } from "@mui/material"
import SelectBuilding from "../components/publish-property/SelectBuilding"
// import Multimedia from "../components/publish-property/Multimedia"
// import Characteristics from "../components/publish-property/Characteristics"
// import ReviewProperty from "../components/publish-property/ReviewProperty"
import { useState } from "react"

function PublishProperty() {
  const steps = [
    "Seleccionar Edificio",
    // "Multimedia",
    // "Características",
    // "Revisión",
  ]

  const nextStepFunction = [
    () => console.log("Estoy en la etapa 1"),
    // () => console.log("Estoy en la etapa 2"),
    // () => console.log("Estoy en la etapa 3"),
    // () => console.log("Estoy en la etapa 4"),
  ]

  const [formData, setFormData] = useState([
    // Índice 0: Datos de la primera "etapa"
    {
      email: "",
      password: "",
    },
    // Índice 1: Datos de la segunda "etapa"
    {
      confirmPassword: "",
      name: "",
    },
    // Índice 2: Datos de la tercera "etapa"
    {
      phone: "",
      whatsapp: "",
    },
    // Índice 3: Datos de la cuarta "etapa"
    {
      date: "",
      address: "",
    },
  ]);

  const [errors, setErrors] = useState([
    // Índice 0: Errores para la primera "etapa"
    {
      email: { hasError: false, message: "" },
      password: { hasError: false, message: "" },
    },
    // Índice 1: Errores para la segunda "etapa"
    // {
    //   confirmPassword: { hasError: false, message: "" },
    //   name: { hasError: false, message: "" },
    // },
    // // Índice 2: Errores para la tercera "etapa"
    // {
    //   phone: { hasError: false, message: "" },
    //   whatsapp: { hasError: false, message: "" },
    // },
    // // Índice 3: Errores para la cuarta "etapa"
    // {
    //   date: { hasError: false, message: "" },
    //   address: { hasError: false, message: "" },
    // },
  ])

  const comps = [
    <SelectBuilding
      key={0}
      formData={formData}
      setFormData={setFormData}
      errors={errors}
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
