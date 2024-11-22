import React from "react"
import Button from "@mui/material/Button"
import EmailIcon from "@mui/icons-material/Email"

function EmailButton({ mail }) {
  return (
    <Button
      variant="contained"
      onClick={() => window.open(`mailto:${mail}`)}
      startIcon={<EmailIcon />}
      size="small"
      sx={{
        border: "none",
        background: "#ff4949",
        fontWeight: "600",
        textTransform: "none",
        height: "40px",
        "&:hover": {
          background: "#d44638",
        },
      }}
    >
      Correo
    </Button>
  )
}

export default EmailButton
