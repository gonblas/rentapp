import React, { createContext, useState } from "react"

// Crear el Contexto
const PublishPropertyContext = createContext(undefined)

// Crear el Provider para envolver tus componentes
export const PublishPropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    {
      building_direction: "",
      building_id: 1,
    },
    {
      description: "",
      rental_value: 0,
      expenses_value: 0,
      rooms: 0,
      square_meters: 0,
      location: "",
      balconies: 0,
      backyard: false,
      garage: false,
      pet_friendly: false,
    },
  ])

  const [errors, setErrors] = useState([
    {
      building_id: { hasError: false, message: "" },
    },
    {
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
    },
  ])

  const validateStep1 = (setErrors, formData) => {
    const { building_id, building_direction } = formData
    let isValid = true

    // para la validacion esperar que rama tenga el endpoint, preguntas con el string
    // y te guardas el id del edificio.

    if (!building_direction) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[0] = {
          ...updatedErrors[0],
          building_id: {
            hasError: true,
            message: "Selecciona un edificio",
          },
        }
        return updatedErrors
      })
      isValid = false
    } else {
      if (building_id === 0) {
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]
          updatedErrors[0] = {
            ...updatedErrors[0],
            building_id: {
              hasError: true,
              message: "El edificio seleccionado no es válido",
            },
          }
          return updatedErrors
        })
        isValid = false
      } else {
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]
          updatedErrors[0] = {
            ...updatedErrors[0],
            building_id: {
              hasError: false,
              message: "",
            },
          }
          return updatedErrors
        })
      }
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const validateStep2 = (setErrors, formData) => {
    const { rental_value, expenses_value, rooms, square_meters } = formData
    let isValid = true

    if (!rental_value || rental_value <= 0) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          rental_value: {
            hasError: true,
            message: "El valor del alquiler debe ser mayor a 0",
          },
        }
        return updatedErrors
      })
      isValid = false
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          rental_value: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    if (!expenses_value) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          expenses_value: {
            hasError: true,
            message: "El valor de las expensas debe ser mayor o igual a 0",
          },
        }
        return updatedErrors
      })
      isValid = false
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          expenses_value: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    if (!rooms || rooms <= 0) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          rooms: {
            hasError: true,
            message: "La cantidad de habitaciones debe ser mayor a 0",
          },
        }
        return updatedErrors
      })
      isValid = false
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          rooms: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    if (!square_meters || square_meters <= 0) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          square_meters: {
            hasError: true,
            message: "Los metros cuadrados deben ser mayor a 0",
          },
        }
        return updatedErrors
      })
      isValid = false
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          square_meters: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    console.log(formData)
    return isValid
  }

  const nextStepFunction = [
    () => validateStep1(setErrors, formData[0]),
    () => validateStep2(setErrors, formData[1]),
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
