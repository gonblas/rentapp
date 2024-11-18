import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Chip from "@mui/material/Chip"
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import CardMedia from "@mui/material/CardMedia"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useState } from "react"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import Divider from "@mui/material/Divider"
import Carousel from "./Carousel"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import React from "react"
import ListItemIcon from "@mui/material/ListItemIcon"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import CopyToClipboardButton from "./CopyToClipboardButton"
import AvatarRender from "./AvatarRender"

function ContactButton({ contact }) {
  const items = [
    {
      icon: <LocalPostOfficeOutlinedIcon />,
      text: contact.email,
      func: () => window.open(`mailto:${contact.email}`),
    },
    {
      icon: <LocalPhoneIcon />,
      text: contact.phone,
      func: () => window.open(`tel:${contact.phone}`),
    },
    {
      icon: <WhatsAppIcon />,
      text: contact.phone,
      func: () => window.open(`https://wa.me/${contact.phone}`),
      condition: contact.whatsapp_enabled,
    },
  ]
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
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
            Contactar
          </Button>
          <Menu
            {...bindMenu(popupState)}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: "5px",
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: "45px",
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
            {items.map((item, index) => {
              if (item.condition === false) return null
              return (
                <MenuItem
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Container
                    onClick={() => {
                      item.func()
                      popupState.close()
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.text}
                  </Container>
                  <CopyToClipboardButton textToCopy={item.text} />
                </MenuItem>
              )
            })}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}

function FavoriteButton() {
  const [favorite, setFavorite] = useState(false)

  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        borderColor: "#D9D9D9",
        color: "#ff3d3d",
        height: "100%!important",
        py: "10px!important",
        border: "0px!important",
        m: "0px",
      }}
      onClick={() => setFavorite(!favorite)}
    >
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  )
}

function InfoTag(props) {
  return (
    <Chip
      color="primary"
      size="small"
      label={props.children}
      sx={{
        fontSize: "15px",
        fontWeight: 400,
        borderRadius: "5px",
        padding: "0.3rem",
        backgroundColor: "#2c2c2c",
        border: "none",
      }}
    />
  )
}

function AvatarPublisher({ publisher }) {
  const typePublisher = publisher.is_real_estate ? "Inmobiliaria" : "Particular"
  return (
    <Container
      sx={{
        display: "flex",
        p: "0px!important",
        marginLeft: "0px!important",
        width: "auto",
        height: "100%",
      }}
    >
      {console.log(publisher.name)}
      <AvatarRender name={publisher.name} image={publisher.avatar} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: "0.4rem!important",
          height: "100%",
        }}
      >
        <Typography variant="body1">{publisher.name}</Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: "light",
            color: "text.secondary",
          }}
        >
          {typePublisher}
        </Typography>
      </Container>
    </Container>
  )
}

function PropertyCard({ property }) {
  const lastTag = (() => {
    if (property.features.pet_friendly) {
      return <InfoTag>Mascotas</InfoTag>
    }
    if (property.features.garage) {
      return <InfoTag>Garaje</InfoTag>
    }
    if (property.features.backyard) {
      return <InfoTag>Patio</InfoTag>
    }
    if (property.features.balconies > 0) {
      return <InfoTag>Balcón</InfoTag>
    }
    return null
  })()

  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%!important",
        height: "300px",
      }}
    >
      <CardMedia
        image=""
        sx={{
          height: "100%",
          width: "35%",
          pr: "15px!important",
        }}
      >
        <Carousel
          data={property.images}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </CardMedia>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pl: "0px!important",
          pr: "10px!important",
          padding: "1rem",
          width: "70%",
          minHeight: "100%!important",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.1rem",
            marginBottom: "1rem",
            width: "100%",
            px: "0!important",
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: "0px!important",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "text.main",
                whiteSpace: "nowrap",
                px: "0!important",
              }}
            >
              ${property.features.rental_value.toLocaleString("es-ES")}
            </Typography>
            <FavoriteButton />
          </Container>
          <Typography
            variant="body1"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            ${property.features.expenses_value.toLocaleString("es-ES")} expensas
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              margin: "0px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              pt: "12px",
            }}
          >
            {property.location.address}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            px: "0!important",
            border: "none",
          }}
        >
          <InfoTag>
            {property.features.square_meters} m<sup>2</sup>
          </InfoTag>
          <InfoTag>{property.features.rooms} amb</InfoTag>
          <InfoTag>
            {property.features.location === "front"
              ? "Frente"
              : property.features.location === "back"
                ? "Contrafrente"
                : "Interno"}
          </InfoTag>
          {lastTag}
        </Container>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.8rem",
            fontWeight: "light",
            px: "0px!important",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            pt: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {property.description}
        </Typography>
        <Divider
          sx={{
            p: "0px!important",
          }}
        />
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            px: "0px!important",
            height: "40px",
          }}
        >
          <AvatarPublisher publisher={property.publisher} />
          <CardActions
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "row",
              gap: "0.25rem",
              px: "0px!important",
              pb: "0px",
            }}
          >
            <ContactButton contact={property.contact}></ContactButton>
          </CardActions>
        </Container>
      </Container>
    </Card>
  )
}

export default PropertyCard
