import React from "react"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAuth } from "../../context/AuthContext"

function DeleteButton(propertyID) {
  const { handlePropertyDelete } = useAuth()
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        border: "1px solid",
        borderColor: "#D9D9D9",
        color: "#ff3d3d",
        height: "100%!important",
        py: "10px!important",
        m: "0px",
        zIndex: "1000!important",
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handlePropertyDelete(propertyID)
      }}
    >
      <DeleteIcon />
    </Button>
  )
}

export default DeleteButton
