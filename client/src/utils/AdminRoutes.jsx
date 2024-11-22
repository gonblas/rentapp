import React from "react"
import { Route, Routes } from "react-router-dom"
import { AdminProvider } from "../components/AdminContext"
import { Admin, AdminBuildingView, AdminPropertyView } from "../pages"

function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        {" "}
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin-property-view/:propertyId"
          element={<AdminPropertyView />}
        />
        <Route
          path="/admin-building-view/:buildingId"
          element={<AdminBuildingView />}
        />
      </Routes>
    </AdminProvider>
  )
}

export default AdminRoutes
