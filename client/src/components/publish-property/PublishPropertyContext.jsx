import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const PublishPropertyContext = createContext(undefined)

export const PublishPropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    address: "",
    building_id: 0,
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
          console.log("Success: ", data)
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

  const navigate = useNavigate()
  const submitForm = () => {
    // Create the URLSearchParams object with form data
    const URLdata = new URLSearchParams({
      description: formData.description,
      rental_value: formData.rental_value,
      expenses_value: formData.expenses_value,
      rooms: formData.rooms,
      square_meters: formData.square_meters,
      balconies: formData.balconies,
      backyard: formData.backyard ? "true" : "false", // Convert boolean to string
      garage: formData.garage ? "true" : "false",
      pet_friendly: formData.pet_friendly ? "true" : "false",
      location: formData.location,
      building_id: building.id,
    })

    // Append images as individual fields
    formData.images.forEach((image, index) => {
      URLdata.append(`images[${index}]`, image.url)
    })

    fetch("http://localhost:8000/property/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: URLdata.toString(),
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
      .then((responseData) => {
        console.log("Property successfully published:", responseData)

        // Show alert for successful submission
        alert("¡Propiedad enviada para verificación!")

        // Navigate to the home page
        navigate("/")
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
