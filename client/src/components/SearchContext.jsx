import React, { createContext, useState } from "react"

const SearchContext = createContext(undefined)

export const SearchProvider = ({ children }) => {
  // State for filters
  const [filters, setFilters] = useState({
    property: {
      neighborhood: 0,
      minRentPrice: 0,
      maxRentPrice: 0,
      minExpenses: 0,
      maxExpenses: 0,
      rooms: 0,
      surface: 0,
      balconies: 0,
      hasBackyard: false,
      hasGarage: false,
      petfriendly: false,
      location: "",
    },
    building: {
      services: [],
      floors: 0,
      apartmentsPerFloor: 0,
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
