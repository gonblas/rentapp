import React, { createContext, useState } from "react"

// Create the context
const AdminContext = createContext()

// Context provider
export const AdminProvider = ({ children }) => {
  const [showList, setShowList] = useState("apartment") // Default to 'apartment'
  console.log(showList)

  const handleChange = (event, newShowList) => {
    setShowList(newShowList)
  }
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

  return (
    <AdminContext.Provider
      value={{
        showList,
        setShowList,
        filters,
        setFilters,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContext
