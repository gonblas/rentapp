import React, { createContext, useState } from "react"

// Create the context
const AdminContext = createContext()

// Context provider
export const AdminProvider = ({ children }) => {
  const [showList, setShowList] = useState("apartment") // Default to 'apartment'

  const [filters, setFilters] = React.useState(null)

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
