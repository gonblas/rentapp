import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
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
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const navItems = [
  { title: "Crear cuenta", path: "/sign-up" },
  { title: "Iniciar Sesion", path: "/sign-in" },
  { title: "Inicio", path: "/" },
  { title: "Acerca de", path: "/" },
  { title: "Publicar", path: "/publish" },
]

function NavBar() {
  return (
    <Box sx={{ display: "flex", px: 10, mb: 12 }}>
      <AppBar component="nav" sx={{ display: "flex", px: 8 }}>
        <Toolbar>
          <Typography
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              pt: 1,
            }}
          >
            <img src="../RentAppLogo.svg" alt="" height="50" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                href={item.path}
                sx={{ color: "text.primary", mr: 2 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <AccountMenu></AccountMenu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
