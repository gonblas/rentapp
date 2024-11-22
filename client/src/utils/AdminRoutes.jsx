import React from "react"
import { AdminProvider } from "../components/AdminContext"
function AdminRoutes({ children }) {
  return <AdminProvider>{children}</AdminProvider>
}

export default AdminRoutes
