import React, { createContext, useContext, useState } from "react"
import SnackbarContext from "../SnackbarContext"

const PublishPropertyContext = createContext(undefined)

export const PublishPropertyProvider = ({ children }) => {
  const { handleNavigationWithSnackbar } = useContext(SnackbarContext)
  const [formData, setFormData] = useState({
    address: "",
    building_id: 0,
    description: "",
    rental_value: null,
    expenses_value: 0,
    rooms: null,
    square_meters: null,
    location: null,
    balconies: 0,
    backyard: false,
    garage: false,
    pet_friendly: false,
    images: [],
  })

  const [building, setBuilding] = useState({
    id: null,
    approved: false,
    address: "",
    neighborhood_id: null,
    neighborhood_name: "",
    floors: null,
    apartments_per_floor: null,
    elevator: false,
    pool: false,
    gym: false,
    terrace: false,
    bike_rack: false,
    laundry: false,
  })
  const [requestBody, setRequestBody] = useState({
    id: null,
    description: null,
    features: {
      rental_value: null,
      expenses_value: null,
      rooms: null,
      square_meters: null,
      location: null,
      balconies: null,
      backyard: null,
      garage: null,
      pet_friendly: null,
    },
    publisher: {
      id: null,
      name: null,
      is_real_estate: null,
      avatar: null,
      contact: {
        email: null,
        phone_number: null,
        has_phone_number: null,
        whatsapp_number: null,
        has_whatsapp_number: null,
      },
    },
    building: {
      id: null,
      address: null,
      neighborhood_name: null,
      floors: null,
      apartments_per_floor: null,
      elevator: null,
      pool: null,
      gym: null,
      terrace: null,
      bike_rack: null,
      laundry: null,
    },
    images: [],
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
    images: { hasError: false, message: "" },
  })

  const validateStep1 = async (setErrors) => {
    const { address } = formData
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
      const URLdata = new URLSearchParams()
      URLdata.append("address", address)

      try {
        const response = await fetch(
          `http://localhost:8000/building/search/?${URLdata.toString()}`,
          {
            method: "GET",
            credentials: "include",
          },
        )

        if (response.ok) {
          const data = await response.json()
          setBuilding(data)
          setErrors((prevErrors) => ({
            ...prevErrors,
            building_id: {
              hasError: false,
              message: "",
            },
          }))
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            building_id: {
              hasError: true,
              message: "El edificio no se encuentra registrado.",
            },
          }))
          isValid = false
        }
      } catch (error) {
        console.error("Error:", error)
        isValid = false
      }
    }

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
    if (formData.location === null) {
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
    return isValid
  }

  const validateStep3 = (setErrors) => {
    const { images } = formData
    let isValid = true

    // Validación para `images`
    if (images.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: {
          hasError: true,
          message: "Debes subir al menos 5 imágenes",
        },
      }))
      isValid = false
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: {
          hasError: false,
          message: "",
        },
      }))
    }

    return isValid
  }

  const useSubmitOnce = (func) => {
    const [called, setCalled] = useState(false)

    const submitOnce = (e) => {
      if (!called) {
        setCalled(true)
        func(e)
      }
    }

    return submitOnce
  }

  const submitForm = () => {
    const data = new FormData()
    data.append("description", formData.description)
    data.append("rental_value", formData.rental_value)
    data.append("expenses_value", formData.expenses_value)
    data.append("rooms", formData.rooms)
    data.append("square_meters", formData.square_meters)
    data.append("balconies", formData.balconies)
    data.append("backyard", formData.backyard)
    data.append("garage", formData.garage)
    data.append("pet_friendly", formData.pet_friendly)
    data.append("location", formData.location)
    data.append("building_id", building.id)
    formData.images.forEach((file) => {
      data.append("images", file.image)
    })

    fetch("http://localhost:8000/property/", {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`,
          )
        }
      })
      .then(() => {
        // Show alert for successful submission
        handleNavigationWithSnackbar(
          "/",
          "¡Propiedad enviada para validacion!",
          "success",
        )
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error)
        alert(`Error al publicar la propiedad: ${error.message}`)
      })
  }

  const nextStepFunction = [
    () => validateStep1(setErrors),
    () => validateStep2(setErrors),
    () => validateStep3(setErrors),
    useSubmitOnce(submitForm), // Usamos el hook aquí
  ]

  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target

    const newValue = type === "checkbox" ? checked : value

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))
  }

  const handleOnChangeImages = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...(prevData.images || []), ...files],
    }))
  }

  return (
    <PublishPropertyContext.Provider
      value={{
        formData,
        setFormData,
        building,
        setBuilding,
        requestBody,
        setRequestBody,
        errors,
        setErrors,
        nextStepFunction,
        handleOnChange,
        handleOnChangeImages,
      }}
    >
      {children}
    </PublishPropertyContext.Provider>
  )
}

export default PublishPropertyContext
