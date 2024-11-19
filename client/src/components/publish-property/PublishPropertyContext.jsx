import React, { createContext, useState } from "react"

// Crear el Contexto
const PublishPropertyContext = createContext(undefined)

// Crear el Provider para envolver tus componentes
export const PublishPropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    address: "",
    building_id: 1,
    description: "",
    rental_value: null,
    expenses_value: null,
    rooms: null,
    square_meters: null,
    location: null,
    balconies: null,
    backyard: false,
    garage: false,
    pet_friendly: false,
  })

  const [errors, setErrors] = useState({
    building_id: { hasError: false, message: "" },
    description: { hasError: false, message: "" },
    rental_value: { hasError: false, message: "" },
    expenses_value: { hasError: false, message: "" },
    rooms: { hasError: false, message: "" },
    square_meters: { hasError: false, message: "" },
    location: { hasError: false, message: "" },
    balconies: { hasError: false, message: "" },
    backyard: { hasError: false, message: "" },
    garage: { hasError: false, message: "" },
    pet_friendly: { hasError: false, message: "" },
  })

  const validateStep1 = (setErrors) => {
    const { building_id, address } = formData
    let isValid = true

    // Validación para `address`
    if (!address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        building_id: {
          hasError: true,
          message: "Selecciona un edificio",
        },
      }))
      isValid = false
    } else {
      // Validación para `building_id`
      if (building_id === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          building_id: {
            hasError: true,
            message: "El edificio seleccionado no es válido",
          },
        }))
        isValid = false
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          building_id: {
            hasError: false,
            message: "",
          },
        }))
      }
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const validateStep2 = (setErrors) => {
    const { rental_value, expenses_value, rooms, square_meters } = formData
    let isValid = true

    // Validación para `rental_value`
    if (!rental_value || rental_value <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rental_value: {
          hasError: true,
          message: "El valor del alquiler debe ser mayor a 0",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rental_value: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `expenses_value`
    if (expenses_value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expenses_value: {
          hasError: true,
          message: "El valor de las expensas debe ser mayor o igual a 0",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expenses_value: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `rooms`
    if (!rooms || rooms <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rooms: {
          hasError: true,
          message: "La cantidad de habitaciones debe ser mayor a 0",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rooms: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `square_meters`
    if (!square_meters || square_meters <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        square_meters: {
          hasError: true,
          message: "Los metros cuadrados deben ser mayor a 0",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        square_meters: {
          hasError: false,
          message: "",
        },
      }))
    }

    // Validación para `location`

    if(formData.location === null){
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: {
          hasError: true,
          message: "Debes seleccionar una ubicación",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: {
          hasError: false,
          message: "",
        },
      }))
    }

    console.log(formData)
    return isValid
  }

  const nextStepFunction = [
    () => validateStep1(setErrors),
    () => validateStep2(setErrors),
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
      {children}
    </PublishPropertyContext.Provider>
  )
}

export default PublishPropertyContext
