import React from "react"
import Chip from "@mui/material/Chip"

function InfoTag(props) {
  return (
    <Chip
      color="primary"
      size="small"
      label={props.children}
      sx={{
        fontSize: "20px",
        fontWeight: 600,
        borderRadius: "5px",
        padding: "0.3rem",
        backgroundColor: "#2c2c2c",
        border: "none",
      }}
    />
  )
}

export default InfoTag
