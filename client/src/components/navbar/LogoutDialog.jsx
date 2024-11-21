import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useAuth from "../../hooks/AuthContext"

function LogoutDialog({ open, handleClose }) {
  const { handleLogout } = useAuth()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault()
          handleClose()
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>¿Quieres cerrar sesión?</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Si cierras sesión, tendrás que volver a iniciar sesión para seguir
          obteniendo los beneficios de tu cuenta.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          variant="contained"
          type="submit"
          onClick={handleLogout}
          sx={{
            background: "error.main",
          }}
        >
          Cerrar Sesión
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutDialog
