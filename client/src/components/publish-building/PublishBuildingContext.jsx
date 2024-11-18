import React, { createContext, useState } from "react"

const PublishBuildingContext = createContext(undefined)

export const PublishBuildingProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    building_address: "",
    neighborhood: "",
    floors: 0,
    apartments_per_floor: 0,
    elevator: false,
    pool: false,
    gym: false,
    terrace: false,
    bike_rack: false,
    laundry: false,
  })

  const [errors, setErrors] = useState({
    building_address: { hasError: false, message: "" },
    neighborhood: { hasError: false, message: "" },
    floors: { hasError: false, message: "" },
    apartments_per_floor: { hasError: false, message: "" },
    elevator: { hasError: false, message: "" },
    pool: { hasError: false, message: "" },
    gym: { hasError: false, message: "" },
    terrace: { hasError: false, message: "" },
    bike_rack: { hasError: false, message: "" },
    laundry: { hasError: false, message: "" },
  })

  const validateStep1 = (setErrors) => {
    const { neighborhood, building_address } = formData
    let isValid = true

    if (!building_address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        building_address: {
          hasError: true,
          message: "Selecciona una dirección válida",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        building_address: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `neighborhood`
    if (!neighborhood || neighborhood === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        neighborhood: {
          hasError: true,
          message: "Selecciona un barrio",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        neighborhood: {
          hasError: false,
          message: "",
        },
      }))
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const validateStep2 = (setErrors) => {
    const { floors, apartments_per_floor } = formData
    let isValid = true

    // Validación para `floors`
    if (!floors || floors < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        floors: {
          hasError: true,
          message: "Selecciona un número de pisos válido",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        floors: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `apartments_per_floor`
    if (!apartments_per_floor || apartments_per_floor < 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apartments_per_floor: {
          hasError: true,
          message: "Selecciona un número de apartamentos válido",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        apartments_per_floor: {
          hasError: false,
          message: "",
        },
      }))
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const submitForm = () => {
    console.log(formData)
  }

  const nextStepFunction = [
    () => validateStep1(setErrors, formData[0]),
    () => validateStep2(setErrors, formData[1]),
    () => submitForm(),
  ]

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target

    const newValue = type === "checkbox" ? checked : value

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  return (
    <PublishBuildingContext.Provider
      value={{
        formData,
        setFormData,
        errors,
        setErrors,
        nextStepFunction,
        handleOnChange,
      }}
    >
      {children}
    </PublishBuildingContext.Provider>
  )
}

export default PublishBuildingContext
