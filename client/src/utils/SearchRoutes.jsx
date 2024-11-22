import React from "react"
import { SearchProvider } from "../components/SearchContext"
function SearchRoutes({ children }) {
  return <SearchProvider>{children}</SearchProvider>
}

export default SearchRoutes
