import React from "react"
import Container from "@mui/material/Container"

function ListContainer({ children }) {
  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          px: "150px!important",
        }}
      >
        {children}
      </Container>
    </div>
  )
}

export default ListContainer
