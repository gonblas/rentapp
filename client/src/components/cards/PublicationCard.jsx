import React from "react"
import Card from "@mui/material/Card"

function PublicationCard({ children }) {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%!important",
        height: "300px",
      }}
    >
      {children}
    </Card>
  )
}

export default PublicationCard
