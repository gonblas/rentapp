import React from "react"
import Button from "@mui/material/Button"
import { Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"

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
        startIcon={<DoneIcon />} // Add done icon to button
        sx={{
          backgroundColor: "success.dark", // Set background color to success.main
          color: "white", // Set text color to white
          "&:hover": {
            backgroundColor: "success.hover", // Darker shade on hover
          },
          padding: "12px 24px", // Adjust padding for larger buttons
          fontSize: "1rem", // Increase font size
          fontWeight: "bold", // Make the font bold
          textTransform: "none", // Remove text transformation
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
        startIcon={<DeleteIcon />} // Add delete icon to button
        sx={{
          backgroundColor: "error.dark", // Set background color to error.main
          color: "white", // Set text color to white
          "&:hover": {
            backgroundColor: "error.hover", // Darker shade on hover
          },
          padding: "12px 24px", // Adjust padding for larger buttons
          fontSize: "1rem", // Increase font size
          fontWeight: "bold", // Make the font bold
          textTransform: "none", // Remove text transformation
        }}
      >
        Eliminar
      </Button>
    )
  }

  return (
    <Container
      sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pb: "20px" }}
    >
      <ApproveButton />
      <RejectButton />
    </Container>
  )
}

export default ValidationButtons
