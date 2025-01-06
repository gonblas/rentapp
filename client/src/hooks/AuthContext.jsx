import { createContext, useLayoutEffect, useState, useContext } from "react"
import SnackbarContext from "../components/SnackbarContext"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [logued, setLogued] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const { handleNavigationWithSnackbar } = useContext(SnackbarContext)

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

    fetch("https://cc210ef425fe.sn.mynetname.net/user/signup/", {
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
          handleNavigationWithSnackbar(
            "/sign-in",
            "¡Registro exitoso! Por favor inicie sesión.",
            "success", // Positive snackbar
          )
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

    fetch("https://cc210ef425fe.sn.mynetname.net/user/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: URLdata.toString(),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            setFieldError(
              "auth",
              true,
              "El correo electrónico no se encuentra registrado.",
            )
          } else if (response.status === 403) {
            setFieldError("auth", true, "Contraseña incorrecta.")
          }
          setUserData(null)
          setIsAdmin(false)
          setLogued(false)
          return null
        }
        return response.json()
      })
      .then((user) => {
        setUserData(user)
        setIsAdmin(user.is_admin)
        setLogued(true)
        handleNavigationWithSnackbar(
          "/",
          "¡Inicio de sesión exitoso!",
          "success", // Positive snackbar
        )
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error)
        setUserData(null)
        setIsAdmin(false)
        setLogued(false)
      })
      .finally(() => setLoading(false))
  }

  function handleLogout() {
    fetch("https://cc210ef425fe.sn.mynetname.net/user/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        setUserData(null)
        setIsAdmin(false)
        setLogued(false)
        handleNavigationWithSnackbar(
          "/",
          "¡Cierre de sesión exitoso!",
          "success", // Positive snackbar
        )
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  function handlePropertyDelete(propertyId) {
    fetch("https://cc210ef425fe.sn.mynetname.net/property" + "/" + propertyId, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`,
          )
        }
        return response.json()
      })
      .then(() => {
        handleNavigationWithSnackbar(
          "/my-properties",
          "¡Propiedad eliminada correctamente!",
          "success", // Positive snackbar
        )
      })
      .catch((error) => {
        console.error(error) // Log the error message
      })
  }

  useLayoutEffect(() => {
    fetch("https://cc210ef425fe.sn.mynetname.net/user/me", {
      method: "GET",
      credentials: "include",
    })
      .then((data) => {
        if (data.status == 401) throw new Error("401")
        return data.json()
      })
      .then((user) => {
        setUserData(user)
        setIsAdmin(user.is_admin)
        setLogued(true)
      })
      .catch(() => {
        setUserData(null)
        setIsAdmin(false)
        setLogued(false)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userData,
        logued,
        isAdmin,
        loading,
        handleLogin,
        handleSignup,
        handleLogout,
        handlePropertyDelete,
        handleNavigationWithSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
