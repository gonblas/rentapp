import React from "react"
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
  MyProperties,
  AdminPropertyView,
} from "./pages"
import NavBar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import AppTheme from "./theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import useAuth from "./hooks/AuthContext"
import SearchRoutes from "./utils/SearchRoutes"
import AdminRoutes from "./utils/AdminRoutes"

const App = () => {
  const { logued, isAdmin, loading } = useAuth()

  return (
    <>
      <CssBaseline />
      <AppTheme>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <SearchRoutes>
                <Home />
              </SearchRoutes>
            }
          />
          <Route
            path="/search"
            element={
              <SearchRoutes>
                <Search />
              </SearchRoutes>
            }
          />
          <Route
            path="/property-full-view/:propertyId"
            element={
              <SearchRoutes>
                <PropertyFullView />
              </SearchRoutes>
            }
          />
          <Route
            path="/building-full-view/:buildingId"
            element={
              <SearchRoutes>
                <BuildingFullView />
              </SearchRoutes>
            }
          />

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
            <Route path="/my-properties" element={<MyProperties />} />
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
          <Route
            element={<ProtectedRoutes redirectTo="/" condition={isAdmin} />}
          >
            <Route
              path="/admin"
              element={
                <AdminRoutes>
                  <Admin />
                </AdminRoutes>
              }
            />
            <Route
              path="/admin-property-view/:propertyId"
              element={
                <AdminRoutes>
                  <AdminPropertyView />
                </AdminRoutes>
              }
            />
            <Route
              path="/admin-building-view/:buildingId"
              element={
                <AdminRoutes>
                  <AdminBuildingView />
                </AdminRoutes>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </AppTheme>
    </>
  )
}

export default App
