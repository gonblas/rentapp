import React from "react"
import Button from "@mui/material/Button"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

function WhatsAppButton({ phone }) {
  return (
    <Button
      variant="contained"
      onClick={() => window.open(`https://wa.me/${phone}`)}
      startIcon={<WhatsAppIcon />}
      size="small"
      sx={{
        border: "none",
        background: "#25D366",
        fontWeight: "600",
        textTransform: "none",
        height: "100%",
        "&:hover": {
          background: "#128c7e",
        },
      }}
    >
      WhatsApp
    </Button>
  )
}

export default WhatsAppButton
