import React, { createContext, useState } from "react"
import { useNavigate } from 'react-router-dom';

const PublishBuildingContext = createContext(undefined)

export const PublishBuildingProvider = ({ children }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    address: "",
    neighborhood_id: null,
    neighborhood: "",
    floors: null,
    apartments_per_floor: null,
    elevator: false,
    pool: false,
    gym: false,
    terrace: false,
    bike_rack: false,
    laundry: false,
  })

  const [errors, setErrors] = useState({
    address: { hasError: false, message: "" },
    neighborhood_id: { hasError: false, message: "" },
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
    const { address, neighborhood_id } = formData
    let isValid = true

    // Validación para `address`
    if (!address) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: {
          hasError: true,
          message: "Selecciona una dirección válida",
        },
      }))
      isValid = false
    } else {
      const URLdata = new URLSearchParams()
      URLdata.append("address", address)

      fetch("http://localhost:8000/building/search/?" + URLdata, {
        method: "GET",
        credentials: "include",
      }).then((response) => {
        if (response.status === 200) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            address: {
              hasError: true,
              message: "La dirección ya se encuentra registrada.",
            },
          }))
          isValid = false
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            address: {
              hasError: false,
              message: "",
            },
          }))
        }
      })
    }

    // Validación para `neighborhood_id`
    if (!neighborhood_id) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        neighborhood_id: {
          hasError: true,
          message: "Selecciona un barrio",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        neighborhood_id: {
          hasError: false,
          message: "",
        },
      }))
    }

    console.log(isValid)
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
    const filteredData = (({ neighborhood, ...rest }) => rest)(formData)
    console.log(filteredData)

    const dataExample = {
      address: "strinadsdsasdadsg",
      neighborhood_id: 10,
      floors: "0",
      apartments_per_floor: "0",
      elevator: true,
      pool: true,
      gym: true,
      terrace: true,
      bike_rack: true,
      laundry: true,
    }

    fetch("http://localhost:8000/building/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataExample),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/")
      } else {
        console.log("Error al enviar el formulario")
      }
    })
  }

  const nextStepFunction = [
    () => validateStep1(setErrors),
    () => validateStep2(setErrors),
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
