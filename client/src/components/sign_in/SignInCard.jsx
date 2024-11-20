import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import { Link } from "react-router-dom"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import FormHelperText from "@mui/material/FormHelperText"
import AuthContext from "../../hooks/AuthContext"

import { styled, useTheme } from "@mui/material/styles"

import ForgotPassword from "./ForgotPassword"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "400px",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}))

export default function SignInCard() {
  const [open, setOpen] = React.useState(false)
  const { handleLogin } = React.useContext(AuthContext)

  const [errors, setErrors] = React.useState({
    email: { hasError: false, message: "" },
    password: { hasError: false, message: "" },
    auth: { hasError: false, message: "" },
  })

  const [data, setData] = React.useState({
    email: "",
    password: "",
  })

  const setFieldError = (field, hasError, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: { hasError, message },
    }))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateInputs()) return

    handleLogin(data, setFieldError)
  }

  const validateInputs = () => {
    const { email, password } = data

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
    }

    return isValid
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const theme = useTheme()
  return (
    <Card
      variant="outlined"
      sx={{
        py: 8,
      }}
    >
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Typography sx={{ display: "block" }}>
          <img src="../RentAppLogo.svg" alt="" height="50" />
        </Typography>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Iniciar sesión
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{
                alignSelf: "baseline",
                textDecoration: "none", // Ensure there's no underline
                "&:hover": {
                  textDecoration: "none", // Remove underline on hover
                },
                color: theme.palette.primary.dark, // Using theme color
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
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
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Ingresar
        </Button>
        <FormHelperText sx={{ mx: "auto", color: "error.main" }}>
          {errors.auth.hasError && errors.auth.message}
        </FormHelperText>
        <Typography sx={{ textAlign: "center" }}>
          ¿No tienes una cuenta?{" "}
          <span>
            <Link
              to="/sign-up"
              style={{
                marginLeft: "5px",
                color: theme.palette.grey[800],
                textDecoration: "none",
              }}
            >
              Regístrate
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  )
}
