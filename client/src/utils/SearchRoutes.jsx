import React from "react"
import { Route, Routes } from "react-router-dom"
import { SearchProvider } from "../components/SearchContext"
import { BuildingFullView, Home, PropertyFullView, Search } from "../pages"

function SearchRoutes() {
  return (
    <SearchProvider>
      <Routes>
        {" "}
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
      </Routes>
    </SearchProvider>
  )
}

export default SearchRoutes
