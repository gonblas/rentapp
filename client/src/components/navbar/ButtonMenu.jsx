import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ApartmentIcon from "@mui/icons-material/Apartment"
import HomeIcon from "@mui/icons-material/Home"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Link } from "react-router-dom"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}))

function ButtonMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Link>
      <Button
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{ color: "text.primary", mr: 2 }}
      >
        Publicar
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: "4px" }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={"/publish-property"} key={"publicar propiedad"}>
            <Button>
              <HomeIcon />
              Publicar propiedad
            </Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to={"/publish-building"}
            key={"publicar edificio"}
            style={{
              width: "100%",
              color: "theme.palette.grey[800]",
              textDecoration: "none",
            }}
          >
            <Button
              sx={{ width: "100%", display: "flex", justifyContent: "start" }}
            >
              <ApartmentIcon />
              <span style={{ all: "unset" }}>Publicar edificio</span>
            </Button>
          </Link>
        </MenuItem>
      </StyledMenu>
    </Link>
  )
}

export default ButtonMenu
