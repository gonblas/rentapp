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
} from "./pages"
import NavBar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import AppTheme from "./theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { SearchProvider } from "./components/SearchContext"
import PrivateRoutes from "./utils/ProtectedRoutes"
import useAuth from "./hooks/AuthContext"
import AdminPropertyView from "./pages/AdminPropertyView"

const App = () => {
  const { logued, loading } = useAuth()
  return (
    <SearchProvider>
      <CssBaseline />
      <AppTheme>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* Restricts access to unauthenticated users. */}
          <Route
            element={
              <PrivateRoutes
                redirectTo="/sign-in"
                condition={logued}
                loading={loading}
              />
            }
          >
            <Route path="/publish-property" element={<PublishProperty />} />
            <Route path="/publish-building" element={<PublishBuilding />} />
          </Route>
          {/* Restricts access to authenticated users only. */}
          <Route
            element={
              <PrivateRoutes
                redirectTo="/"
                condition={!logued}
                loading={loading}
              />
            }
          >
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route
            path="/property-full-view/:propertyId"
            element={<PropertyFullView />}
          />
          <Route
            path="/building-full-view/:buildingId"
            element={<BuildingFullView />}
          />
          <Route
            path="/admin-property-view/:propertyId"
            element={<AdminPropertyView />}
          />
          <Route
            path="/admin-building-view/:buildingId"
            element={<AdminBuildingView />}
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </AppTheme>
    </SearchProvider>
  )
}

export default App
