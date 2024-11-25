import React from "react"
import { Box, Typography } from "@mui/material"

const AlertContainer = ({ message }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(200, 200, 200, 0.8)", // Grayish background
        padding: "20px", // Padding for content inside
        borderRadius: "8px", // Rounded corners
        maxWidth: "600px", // Limit the container width
        margin: "0 auto", // Center horizontally
        textAlign: "center", // Center text inside
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        my: "100px", //
      }}
    >
      <Typography variant="body1" color="text.primary">
        {message}
      </Typography>
    </Box>
  )
}

export default AlertContainer
