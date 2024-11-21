import React from "react"
import Button from "@mui/material/Button"
import { Container } from "@mui/material"
import { useNavigate } from "react-router-dom"

function ValidationButtons({ object, endpoint }) {
  const navigate = useNavigate()
  const ApproveButton = () => {
    return (
      <Button
        onClick={() => {
          fetch(endpoint + "/" + object.id + "/" + "approve", {
            method: "PUT",
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
            .then((data) => {
              console.log(data) // Log the response data
              navigate("/admin")
            })
            .catch((error) => {
              console.error(error) // Log the error message
            })
        }}
        sx={{
          backgroundColor: "success.dark", // Set background color to success.main
          color: "white", // Set text color to white
          "&:hover": {
            backgroundColor: "success.dark", // Darker shade on hover
          },
        }}
      >
        Aprobar
      </Button>
    )
  }

  const RejectButton = () => {
    return (
      <Button
        onClick={() => {
          fetch(endpoint + "/" + object.id + "/" + "reject", {
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
            .then((data) => {
              console.log(data) // Log the response data
              navigate("/admin")
            })
            .catch((error) => {
              console.error(error) // Log the error message
            })
        }}
        sx={{
          backgroundColor: "error.dark", // Set background color to error.main
          color: "white", // Set text color to white
          "&:hover": {
            backgroundColor: "error.dark", // Darker shade on hover
          },
        }}
      >
        Eliminar
      </Button>
    )
  }

  return (
    <Container
      sx={{ display: "flex", justifyContent: "flex-end", gap: 1, pb: "20px" }}
    >
      <ApproveButton />
      <RejectButton />
    </Container>
  )
}

export default ValidationButtons
