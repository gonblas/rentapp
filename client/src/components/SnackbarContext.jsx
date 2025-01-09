import React, { createContext, useState, useCallback } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"

const SnackbarContext = createContext()

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "success",
  })

  const navigate = useNavigate()

  const handleNavigationWithSnackbar = (path, message, severity) => {
    navigate(path)
    showSnackbar(message, severity)
  }

  const showSnackbar = useCallback((message, type = "success") => {
    setSnackbarState({ open: true, message, type })
  }, [])

  const handleClose = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }))
  }, [])

  return (
    <SnackbarContext.Provider value={{ handleNavigationWithSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.type}
          sx={{
            width: "100%",
            bgcolor:
              snackbarState.type === "success"
                ? "success.main"
                : snackbarState.type === "error"
                  ? "error.main"
                  : undefined,
            color:
              snackbarState.type === "success"
                ? "white"
                : snackbarState.type === "error"
                  ? "white"
                  : undefined,
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarContext
