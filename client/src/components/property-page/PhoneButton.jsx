import React from "react"
import Button from "@mui/material/Button"
import CallIcon from "@mui/icons-material/Call"

function PhoneButton({ phone }) {
  return (
    <Button
      variant="contained"
      onClick={() => window.open(`tel:${phone}`)}
      startIcon={<CallIcon />}
      size="small"
      sx={{
        border: "none",
        background: "##007BFF",
        fontWeight: "600",
        textTransform: "none",
        height: "40px",
        "&:hover": {
          background: "#0056b3",
        },
      }}
    >
      Llamar
    </Button>
  )
}

export default PhoneButton
