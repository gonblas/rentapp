import React, { createContext, useState } from "react"

const PublishBuildingContext = createContext(undefined)

export const PublishBuildingProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    {
      building_address: "",
      neighbourhood: "",
    },
    {
      floors: 0,
      apartments_per_floor: 0,
      elevator: false,
      pool: false,
      gym: false,
      terrace: false,
      bike_rack: false,
      laundry: false,
    },
  ])

  const [errors, setErrors] = useState([
    {
      building_address: { hasError: false, message: "" },
      neighbourhood: { hasError: false, message: "" },
    },
    {
      floors: { hasError: false, message: "" },
      apartments_per_floor: { hasError: false, message: "" },
      elevator: { hasError: false, message: "" },
      pool: { hasError: false, message: "" },
      gym: { hasError: false, message: "" },
      terrace: { hasError: false, message: "" },
      bike_rack: { hasError: false, message: "" },
      laundry: { hasError: false, message: "" },
    },
  ])

  const validateStep1 = (setErrors, formData) => {
    const { neighbourhood, building_address } = formData
    let isValid = true

    if (!building_address) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[0] = {
          ...updatedErrors[0],
          building_address: {
            hasError: true,
            message: "Selecciona una dirección válida",
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
          building_address: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    if(!neighbourhood || neighbourhood === "") {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[0] = {
          ...updatedErrors[0],
          neighbourhood: {
            hasError: true,
            message: "Selecciona un barrio",
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
          neighbourhood: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    console.log(isValid)
    console.log(formData)
    return isValid
  }

  const validateStep2 = (setErrors, formData) => {
    const { floors, apartments_per_floor } = formData
    let isValid = true

    if (!floors || floors < 1) { 
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          floors: {
            hasError: true,
            message: "Selecciona un número de pisos válido",
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
          floors: {
            hasError: false,
            message: "",
          },
        }
        return updatedErrors
      })
    }

    if (!apartments_per_floor || apartments_per_floor < 1) {
      setErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]
        updatedErrors[1] = {
          ...updatedErrors[1],
          apartments_per_floor: {
            hasError: true,
            message: "Selecciona un número de apartamentos válido",
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
          apartments_per_floor: {
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

  const submitForm = () => {
    console.log(formData)
  }

  const nextStepFunction = [
    () => validateStep1(setErrors, formData[0]),
    () => validateStep2(setErrors, formData[1]),
    () => submitForm(),
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
