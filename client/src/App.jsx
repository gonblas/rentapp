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
} from "./pages"
import NavBar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import AppTheme from "./theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { SearchProvider } from "./components/SearchContext"

const App = () => {
  return (
    <SearchProvider>
      <CssBaseline />
      <AppTheme>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/publish-property" element={<PublishProperty />} />
          <Route path="/publish-building" element={<PublishBuilding />} />
          <Route path="/search" element={<Search />} />
          <Route path="/property-full-view" element={<PropertyFullView />} />
          <Route path="/building-full-view" element={<BuildingFullView />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </AppTheme>
    </SearchProvider>
  )
}

export default App
