import React from "react"
import Button from "@mui/material/Button"
import { Container } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import { useContext } from "react"
import SnackbarContext from "./SnackbarContext"

function ValidationButtons({ object, type }) {
  const { handleNavigationWithSnackbar } = useContext(SnackbarContext)

  return (
    <Container
      sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pb: "20px" }}
    >
      {/* Approve Button */}
      <Button
        onClick={() => {
          fetch(
            `http://localhost:8000/admin/${type}/${object.id}/approve`,
            {
              method: "PUT",
              credentials: "include",
            },
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `HTTP Error: ${response.status} - ${response.statusText}`,
                )
              }
              return response.json()
            })
            .then((data) => {
              console.log(data) // Log the response data
              handleNavigationWithSnackbar(
                "/admin",
                type === "property"
                  ? "¡Propiedad validada correctamente!"
                  : "¡Edificio validado correctamente!",
                "success", // Positive snackbar
              )
            })
            .catch((error) => {
              console.error(error) // Log the error message
            })
        }}
        startIcon={<DoneIcon />}
        sx={{
          backgroundColor: "success.main",
          color: "white",
          "&:hover": {
            backgroundColor: "success.dark",
          },
        }}
      >
        Aprobar
      </Button>

      {/* Reject Button */}
      <Button
        onClick={() => {
          fetch(
            `http://localhost:8000/admin/${type}/${object.id}/reject`,
            {
              method: "DELETE",
              credentials: "include",
            },
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `HTTP Error: ${response.status} - ${response.statusText}`,
                )
              }
              return response.json()
            })
            .then((data) => {
              console.log(data) // Log the response data
              handleNavigationWithSnackbar(
                "/admin",
                type === "property"
                  ? "¡Propiedad rechazada correctamente!"
                  : "¡Edificio rechazado correctamente!",
                "error", // Negative snackbar
              )
            })
            .catch((error) => {
              console.error(error) // Log the error message
            })
        }}
        startIcon={<DeleteIcon />}
        sx={{
          backgroundColor: "error.main",
          color: "white",
          "&:hover": {
            backgroundColor: "error.dark",
          },
        }}
      >
        Eliminar
      </Button>
    </Container>
  )
}

export default ValidationButtons
