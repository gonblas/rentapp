import React, { Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import {
  Home,
  SignIn,
  SignUp,
  PublishProperty,
  PublishBuilding,
  Search,
  PropertyFullView,
  BuildingFullView,
  Admin,
  AdminBuildingView,
} from "./pages"
import NavBar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import AppTheme from "./theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import useAuth from "./hooks/AuthContext"
import AdminPropertyView from "./pages/AdminPropertyView"
import SearchRoutes from "./utils/SearchRoutes"
import { AdminProvider } from "./components/AdminContext"

const App = () => {
  const { logued, loading } = useAuth()

  return (
    <Fragment>
      <CssBaseline />
      <AppTheme>
        <NavBar />
        <AdminProvider>
          <Routes>
            <Route element={<SearchRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/property-full-view/:propertyId"
                element={<PropertyFullView />}
              />
              <Route
                path="/building-full-view/:buildingId"
                element={<BuildingFullView />}
              />
            </Route>

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoutes
                  redirectTo="/sign-in"
                  condition={logued}
                  loading={loading}
                />
              }
            >
              <Route path="/publish-property" element={<PublishProperty />} />
              <Route path="/publish-building" element={<PublishBuilding />} />
            </Route>

            {/* Restricted Routes for unauthenticated users */}
            <Route
              element={
                <ProtectedRoutes
                  redirectTo="/"
                  condition={!logued}
                  loading={loading}
                />
              }
            >
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>

            {/* Admin Routes */}
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
        <Footer />
      </AppTheme>
    </Fragment>
  )
}

export default App
