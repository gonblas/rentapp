import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
