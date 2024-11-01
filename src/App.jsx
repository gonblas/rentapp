import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages"

const App = () => {
  return (
    <div>
      App
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<p>Test</p>} />
      </Routes>
    </div>
  )
}

export default App
