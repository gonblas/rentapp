import { React } from "react"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"
import AvatarRender from "../AvatarRender"
import WhatsAppButton from "./WhatsAppButton"
import EmailButton from "./EmailButton"
import PhoneButton from "./PhoneButton"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Container from "@mui/material/Container"

function PublisherInfo({ publisher }) {
  return (
    <Paper
      square={false}
      elevation={1}
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        mb: "3rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Contactá al publicante
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "2rem",
          px: "0px!important",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            pr: "0px!important",
            pl: "2rem",
          }}
        >
          <AvatarRender
            name={publisher.name}
            image={publisher.avatar}
            style={{ width: "100px", height: "100px", fontSize: "3em" }}
          />
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {publisher.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "light",
              color: "text.secondary",
            }}
          >
            {publisher.is_real_estate ? "Inmobiliaria" : "Propietario"}
          </Typography>
        </Container>
        <Stack
          direction="column"
          spacing={1}
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{
            minWidth: "300px",
          }}
        >
          <EmailButton mail={publisher.contact.email} />
          {publisher.contact.has_phone_number && (
            <PhoneButton phone={publisher.contact.phone_number} />
          )}
          {publisher.contact.has_whatsapp_number && (
            <WhatsAppButton phone={publisher.contact.whatsapp_number} />
          )}
        </Stack>
      </Container>
    </Paper>
  )
}

export default PublisherInfo
