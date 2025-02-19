import PublicationCard from "./PublicationCard"
import {
  Container,
  Typography,
  Button,
  Divider,
  CardMedia,
  Menu,
  MenuItem,
  ListItemIcon,
  CardActions,
} from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import CopyToClipboardButton from "../CopyToClipboardButton"
import AvatarRender from "../AvatarRender"
import InfoTag from "./InfoTag"
import FavoriteButton from "./FavoriteButton"
import Carousel from "../Carousel"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined"
import { Link } from "react-router-dom"

function ContactButton({ contact }) {
  const items = [
    {
      id: 1,
      icon: <LocalPostOfficeOutlinedIcon />,
      text: contact.email,
      func: () => window.open(`mailto:${contact.email}`),
      condition: true,
    },
    {
      id: 2,
      icon: <LocalPhoneIcon />,
      text: contact.phone_number,
      func: () => window.open(`tel:${contact.phone}`),
      condition: contact.has_phone_number,
    },
    {
      id: 3,
      icon: <WhatsAppIcon />,
      text: contact.whatsapp_number,
      func: () => window.open(`https://wa.me/${contact.phone}`),
      condition: contact.has_whatsapp_number,
    },
  ]

  return (
    <Link
      to="/some-path"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <PopupState
        variant="popover"
        popupId="demo-popup-menu"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        {(popupState) => (
          <>
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
                ml: "auto",
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
              {items.map(({ id, condition, func, icon, text }) => {
                if (condition === false) return null
                return (
                  <MenuItem
                    key={id}
                    sx={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Container
                      onClick={() => {
                        func()
                        popupState.close()
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      {text}
                    </Container>
                    <CopyToClipboardButton textToCopy={text} />
                  </MenuItem>
                )
              })}
            </Menu>
          </>
        )}
      </PopupState>
    </Link>
  )
}

function AvatarPublisher({ publisher }) {
  const { name, avatar, is_real_estate } = publisher
  const typePublisher = is_real_estate ? "Inmobiliaria" : "Particular"
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
      <AvatarRender name={name} image={avatar} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: "0.4rem!important",
          height: "100%",
        }}
      >
        <Typography variant="body1">{name}</Typography>
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

function PropertyCard({ property, linkName }) {
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

  const { id, images, features, address, description, publisher } = property

  return (
    <PublicationCard linkName={linkName} item={{ type: "property", id: id }}>
      <CardMedia
        image=""
        sx={{
          height: "100%",
          width: "30%!important",
          pr: "15px!important",
        }}
      >
        <Carousel
          data={images}
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
          padding: "10px",
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
              ${features.rental_value.toLocaleString("es-ES")}
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
            ${features.expenses_value.toLocaleString("es-ES")} expensas
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
            {address}
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
          <InfoTag>{features.square_meters} m²</InfoTag>
          <InfoTag>{features.rooms} amb</InfoTag>
          <InfoTag>
            {features.location === "front"
              ? "Frente"
              : features.location === "back"
                ? "Contrafrente"
                : features.location === "Interno"
                  ? "Interno"
                  : "Lateral"}
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
          {description}
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
          <AvatarPublisher publisher={publisher} />
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
            <ContactButton contact={publisher.contact}></ContactButton>
          </CardActions>
        </Container>
      </Container>
    </PublicationCard>
  )
}

export default PropertyCard
