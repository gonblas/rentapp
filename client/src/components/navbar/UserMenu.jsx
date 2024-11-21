import React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import useAuth from "../../hooks/AuthContext"
import Button from "@mui/material/Button"
import AvatarRender from "../AvatarRender"
import LogoutDialog from "./LogoutDialog"
import { Link } from "react-router-dom"

function AccountMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          border: "0px",
        }}
      >
        <Tooltip title="Configuración">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            style={{ border: "0px" }}
          >
            <AvatarRender name={user.name} image={user.avatar} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          Mi cuenta
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDialog(true)
            console.log("Cerrar Sesión")
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
      <LogoutDialog
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false)
          console.log("Cerrar Sesión")
        }}
      />
    </React.Fragment>
  )
}

function SigninButton() {
  return (
    <Link to="/sign-in" key="sign-in">
      <Button
        variant="contained"
        size="small"
        sx={{
          borderColor: "#D9D9D9",
          fontWeight: "600",
          textTransform: "none",
          border: "none",
          height: "100%",
          "&:hover": {
            background: "#003080",
          },
        }}
      >
        Iniciar sesión
      </Button>
    </Link>
  )
}

function UserMenu() {
  const { logued, userData, loading } = useAuth()

  if (loading) {
    return null
  }

  return <>{logued ? <AccountMenu user={userData} /> : <SigninButton />}</>
}

export default UserMenu
