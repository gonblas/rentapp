import React from "react"
import { Route, Routes } from "react-router-dom"
import {
  Home,
  SignIn,
  SignUp,
  PublishProperty,
  PublishBuilding,
  Search,
} from "./pages"
import NavBar from "./components/NavBar"
import Footer from "./components/footer/Footer"
import AppTheme from "./theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline"

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppTheme>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/publish-property" element={<PublishProperty />} />
          <Route path="/publish-building" element={<PublishBuilding />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <Footer />
      </AppTheme>
    </>
  )
}

export default App
