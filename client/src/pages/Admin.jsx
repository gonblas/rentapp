import React from "react"
import PendingApprovals from "../components/PendingApprovals"
import Container from "@mui/material/Container"
import { AdminProvider } from "../components/AdminContext"

function Admin() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <PendingApprovals />
    </Container>
  )
}

export default Admin
