import React, { createContext, useState } from "react"

const SearchContext = createContext(undefined)

export const SearchProvider = ({ children }) => {
  // State for filters
  const [filters, setFilters] = React.useState({
    property: {
      neighborhood_id: null,
      neighborhood_name: null,
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

  const [building, setBuilding] = React.useState({})
  const [property, setProperty] = React.useState({})

  // State for data fetched from the backend
  const [buildings, setBuildings] = useState({
    buildings: [],
  })

  return (
    <SearchContext.Provider
      value={{
        filters,
        setFilters,
        buildings,
        setBuildings,
        building,
        setBuilding,
        property,
        setProperty,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext
