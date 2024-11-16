import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MuiCard from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import AppTheme from "../theme/AppTheme"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import InputFileUpload from "../components/sign_up/InputFileUpload"
import { useNavigate } from "react-router-dom"
import AvatarRender from "../components/AvatarRender"
import { useEffect } from "react"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "auto",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
  },
}))

export default function SignUp(props) {
  const navigate = useNavigate()

  const [errors, setErrors] = React.useState({
    email: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
    confirmPassword: { hasError: false, message: "" },
    name: { hasError: false, message: "" },
    phone: { hasError: false, message: "" },
    whatsapp: { hasError: false, message: "" },
    date: { hasError: false, message: "" },
  })

  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    whatsapp: "",
    date: "",
    isRealEstate: false,
    avatar: null,
    avatarUrl: "",
  })

  const setFieldError = (field, hasError, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: { hasError, message },
    }))
  }

  const handleOnChange = (event) => {
    const { name, value, checked } = event.target
    setData((prevData) => ({
      ...prevData,
      [name]: name === "isRealEstate" ? checked : value,
    }))
  }

  const handleFileChange = (file, fileUrl) => {
    setData((prevData) => ({
      ...prevData,
      avatar: file,
      avatarUrl: fileUrl,
    }))
  }

  const validateInputs = () => {
    const {
      email,
      password,
      confirmPassword,
      name,
      phone,
      isRealEstate,
      date,
    } = data

    let isValid = true

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFieldError(
        "email",
        true,
        "Por favor ingrese un correo electrónico válido.",
      )
      isValid = false
    } else {
      setFieldError("email", false, "")
    }

    // Password validation
    if (
      !password ||
      password.length < 8 ||
      !/[!@#$%^&*]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      setFieldError(
        "password",
        true,
        "La contraseña debe tener al menos 8 caracteres, un caracter especial y una mayúscula.",
      )
      isValid = false
    } else {
      setFieldError("password", false, "")
      // Confirm password validation
      if (password !== confirmPassword) {
        setFieldError("confirmPassword", true, "Las contraseñas no coinciden.")
        isValid = false
      } else {
        setFieldError("confirmPassword", false, "")
      }
    }

    // Name validation
    if (!name || name.length < 1) {
      setFieldError("name", true, "Por favor ingrese su nombre completo.")
      isValid = false
    } else {
      setFieldError("name", false, "")
    }

    // Phone validation
    if (phone && phone.length < 10) {
      setFieldError(
        "phone",
        true,
        "Por favor ingrese un número de teléfono válido.",
      )
      isValid = false
    } else {
      setFieldError("phone", false, "")
    }

    // WhatsApp validation
    if (phone && phone.length < 10) {
      setFieldError(
        "whatsapp",
        true,
        "Por favor ingrese un número de WhatsApp válido.",
      )
      isValid = false
    } else {
      setFieldError("whatsapp", false, "")
    }

    // Skip date validation if user is real estate
    if (isRealEstate) {
      setFieldError("date", false, "")
      return isValid
    }

    // Date validation with age check
    if (date) {
      const [year, month, day] = date.split("-").map(Number) // Parse the date
      const birthDate = new Date(year, month - 1, day) // Create Date object
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()

      // Adjust age if birthdate is later in the year than today
      const monthDifference = today.getMonth() - birthDate.getMonth()
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--
      }

      if (age < 18) {
        setFieldError(
          "date",
          true,
          "Debes ser mayor de 18 años para registrarte.",
        )
        isValid = false
      } else {
        setFieldError("date", false, "")
      }
    } else {
      setFieldError("date", true, "Por favor ingrese su fecha de nacimiento.")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateInputs()) return

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
    } else {
      formData.append("avatar", "")
    }

    fetch("http://localhost:8000/signup/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
        navigate("/sign-in")
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography sx={{ display: "block" }}>
            <img src="../RentAppLogo.svg" alt="" height="50" />
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Registrarse
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Nombre Completo</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Hernan Perez"
                autoComplete="name"
                value={data.name}
                onChange={handleOnChange}
                error={errors.name.hasError}
                helperText={errors.name.message}
                color={errors.name.hasError ? "error" : "primary"}
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="ejemplo@email.com"
                autoComplete="email"
                value={data.email}
                onChange={handleOnChange}
                error={errors.email.hasError}
                helperText={errors.email.message}
                color={errors.email.hasError ? "error" : "primary"}
                variant="outlined"
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <TextField
                id="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={data.password}
                onChange={handleOnChange}
                error={errors.password.hasError}
                helperText={errors.password.message}
                color={errors.password.hasError ? "error" : "primary"}
                variant="outlined"
                type="password"
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">
                Confirmar Contraseña
              </FormLabel>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                autoComplete="new-password"
                value={data.confirmPassword}
                onChange={handleOnChange}
                error={errors.confirmPassword.hasError}
                helperText={errors.confirmPassword.message}
                color={errors.confirmPassword.hasError ? "error" : "primary"}
                variant="outlined"
                type="password"
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Número de Teléfono</FormLabel>
              <TextField
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                autoComplete="phone"
                value={data.phone}
                onChange={handleOnChange}
                error={errors.phone.hasError}
                helperText={errors.phone.message}
                variant="outlined"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="whatsapp">Número de WhatsApp</FormLabel>
              <TextField
                id="whatsapp"
                name="whatsapp"
                placeholder="123-456-7890"
                autoComplete="phone"
                value={data.whatsapp}
                onChange={handleOnChange}
                error={errors.whatsapp.hasError}
                helperText={errors.whatsapp.message}
                variant="outlined"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                fullWidth
              />
            </FormControl>
            <FormControlLabel
              id="isRealEstate"
              control={
                <Checkbox
                  checked={data.isRealEstate}
                  onChange={handleOnChange}
                  name="isRealEstate"
                />
              }
              label="¿Soy una inmobiliaria?"
            />
            {!data.isRealEstate && (
              <FormControl>
                <FormLabel htmlFor="date">Fecha de Nacimiento</FormLabel>
                <TextField
                  id="date"
                  name="date"
                  autoComplete="date"
                  value={data.date}
                  onChange={handleOnChange}
                  error={errors.date.hasError}
                  helperText={errors.date.message}
                  variant="outlined"
                  type="date"
                  required
                  fullWidth
                />
              </FormControl>
            )}
            <FormControl>
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <AvatarRender name={data.name} image={data.avatarUrl} />
                <InputFileUpload onFileChange={handleFileChange} />
              </div>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Registrarse
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>o</Typography>
          </Divider>
          <Box>
            <Typography
              sx={{ display: "flex!important", justifyContent: "center" }}
            >
              ¿Ya tienes una cuenta? <Link href="/sign-in"> Ingresar</Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
}
