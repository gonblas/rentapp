import React, { createContext, useState } from "react"
import { useContext } from "react"
import useAuth from "../../hooks/AuthContext"
import SnackbarContext from "../SnackbarContext"

const PublishBuildingContext = createContext(undefined)

export const PublishBuildingProvider = ({ children }) => {
  const { handleNavigationWithSnackbar } = useContext(SnackbarContext)
  const { userData } = useAuth()

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

      fetch(
        "https://cc210ef425fe.sn.mynetname.net/building/search/?" + URLdata,
        {
          method: "GET",
          credentials: "include",
        },
      )
        .then((response) => {
          if (!response.ok) {
            // Maneja la respuesta como un caso válido (por ejemplo, cuando no hay building)
            return null // Puedes devolver `null` o algún valor para indicar esta situación.
          }
          return response.json() // Continúa con el procesamiento normal de datos
        })
        .then((data) => {
          if (!data) {
            // Maneja el caso cuando no hay datos (response.ok === false)
            console.log("No se encontró un building, continúa el flujo.")
            setErrors((prevErrors) => ({
              ...prevErrors,
              address: {
                hasError: false,
                message: "",
              },
            }))
            return
          }

          console.log(data)
          if (
            data.approved ||
            (!data.approved && data.published_id === userData.id)
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              address: {
                hasError: true,
                message: "Ya existe un edificio con esta dirección.",
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
        .catch((error) => {
          console.error("Error en la conexión o procesamiento:", error)
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
    // eslint-disable-next-line no-unused-vars
    const filteredData = (({ neighborhood, ...rest }) => rest)(formData)

    fetch("https://cc210ef425fe.sn.mynetname.net/building/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(filteredData),
    }).then((response) => {
      if (response.status === 201) {
        handleNavigationWithSnackbar(
          "/",
          "¡Edificio enviado a validar!",
          "success",
        )
      } else {
        alert("Error al enviar el edificio a validar.")
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
