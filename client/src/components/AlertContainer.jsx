import React from "react"
import { Box, Typography } from "@mui/material"

const AlertContainer = ({ message }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(200, 200, 200, 0.8)",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        my: "100px",
      }}
    >
      <Typography variant="body1" color="text.primary">
        {message}
      </Typography>
    </Box>
  )
}

export default AlertContainer
