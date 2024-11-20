import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  function handleSignup(data, setFieldError) {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("is_real_estate", data.isRealEstate)
    formData.append("phone_number", data.phone)
    formData.append("has_phone_number", String(data.phone !== ""))
    formData.append("whatsapp_number", data.whatsapp)
    formData.append("has_whatsapp_number", String(data.whatsapp !== ""))

    if (data.avatar) {
      formData.append("avatar", data.avatar)
    }

    fetch("http://localhost:8000/user/signup/", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail === "User already exists") {
          setFieldError(
            "auth",
            true,
            "El correo electrónico ya se encuentra registrado.",
          )
        } else {
          setFieldError("auth", false, "")
          navigate("/sign-in")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  function handleLogin(data, setFieldError) {
    const URLdata = new URLSearchParams({
      email: data.email,
      password: data.password,
    })

    fetch("http://localhost:8000/user/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: URLdata.toString(),
    })
      .then((d) => d.json())
      .then((data) => {
        if (data.detail === "User not found") {
          setFieldError("auth", true, "Correo electrónico no registrado.")
          setUserData(null)
        } else {
          if (data.detail === "Invalid password") {
            setFieldError("auth", true, "Contraseña incorrecta.")
            setUserData(null)
          } else {
            setUserData(data)
            navigate("/")
          }
        }
      })
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleLogin,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
