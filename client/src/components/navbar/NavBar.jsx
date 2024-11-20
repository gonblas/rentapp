import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import UserMenu from "./UserMenu"
import ButtonMenu from "./ButtonMenu"
import { Link } from "react-router-dom"

const navItems = [
  { title: "Inicio", path: "/" },
  { title: "Acerca de", path: "/" },
]

function NavBar() {
  return (
    <Box sx={{ display: "flex", px: 10, mb: 8 }}>
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
              <Link to={item.path} key={item.title}>
                <Button sx={{ color: "text.primary", mr: 2 }}>
                  {item.title}
                </Button>
              </Link>
            ))}
            <ButtonMenu />
          </Box>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
