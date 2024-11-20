import React, { createContext, useState } from "react"

const SearchContext = createContext(undefined)

export const SearchProvider = ({ children }) => {
  // State for filters
  const [filters, setFilters] = React.useState({
    property: {
      neighborhood: null,
      minRentPrice: null,
      maxRentPrice: null,
      minExpenses: null,
      maxExpenses: null,
      rooms: null,
      surface: null,
      balconies: null,
      hasBackyard: null,
      hasGarage: null,
      petfriendly: null,
      location: null,
    },
    building: {
      services: [],
      floors: null, // Set to null
      apartmentsPerFloor: null,
    },
  })

  // State for data fetched from the backend
  const [properties, setProperties] = useState({
    properties: [],
  })

  return (
    <SearchContext.Provider
      value={{
        filters,
        setFilters,
        properties,
        setProperties,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
