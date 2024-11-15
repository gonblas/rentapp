import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import Checkbox from "@mui/material/Checkbox"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { styled } from "@mui/material/styles"

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
  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
  const [passwordError, setPasswordError] = React.useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault()
      return
    }
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
  }

  const validateInputs = () => {
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage("Por favor ingrese un correo electrónico válido.")
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage("")
    }

    if (
      !password.value ||
      password.value.length < 8 ||
      !/[!@#$%^&*]/.test(password.value) ||
      !/[A-Z]/.test(password.value)
    ) {
      setPasswordError(true)
      setPasswordErrorMessage(
        "La contraseña debe tener al menos 8 caracteres, un caracter especial y una mayuscula.",
      )
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage("")
    }

    return isValid
  }

  return (
    <Card variant="outlined">
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
          <FormLabel htmlFor="email">Correo electrónico</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="ejemplo@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
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
              sx={{ alignSelf: "baseline" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Recordarme"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Ingresar
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          ¿No tienes una cuenta?{" "}
          <span>
            <Link href="/sign-up" variant="body2" sx={{ alignSelf: "center" }}>
              Regístrate
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  )
}
