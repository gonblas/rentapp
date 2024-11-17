import React, { createContext, useContext, useState } from "react"

// Crear el Contexto
const PublishPropertyContext = createContext(undefined)

// Crear el Provider para envolver tus componentes
export const PublishPropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    {
      building_id: 0,
    },
  ])

  const [errors, setErrors] = useState([
    {
      building_id: { hasError: false, message: "" },
    },
  ])

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
    // Aquí van los siguientes pasos
  ]

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
