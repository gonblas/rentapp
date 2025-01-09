import * as React from "react"
import { Link } from "react-router-dom"
import UserMenu from "./UserMenu"
import ButtonMenu from "./ButtonMenu"
import useAuth from "../../hooks/AuthContext"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

function NavBar() {
  const { isAdmin } = useAuth()

  const navItems = [
    { title: "Inicio", path: "/", render: true },
    { title: "Acerca de", path: "/", render: true },
    { title: "Validaciones", path: "/admin", render: isAdmin },
  ]

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
            <Link to={"/"} key={"Inicio"}>
              <img
                src="/src/assets/RentAppLogo.svg"
                alt=""
                height="50"
                width="auto"
              />
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(({ path, title, render }) => (
              <Link to={path} key={title}>
                {render && (
                  <Button sx={{ color: "text.primary", mr: 2 }}>{title}</Button>
                )}
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
