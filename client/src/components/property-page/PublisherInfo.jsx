import { React } from "react"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"
import AvatarRender from "../AvatarRender"
import WhatsAppButton from "./WhatsAppButton"
import EmailButton from "./EmailButton"
import PhoneButton from "./PhoneButton"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

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
        margin: "3rem",
        width: "100%",
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
      <AvatarRender name={publisher.name} image={publisher.avatar} />
      {/* name: "Daniel Gomez",
    is_real_estate: false,
    avatar:  */}
      <Typography>{publisher.name}</Typography>
      <Typography>
        {publisher.is_real_estate ? "Inmobiliaria" : "Propietario"}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        useFlexGap
      >
        <EmailButton mail={publisher.contact.email} />
        {publisher.contact.has_phone_number && (
          <PhoneButton phone={publisher.contact.phone_number} />
        )}
        {publisher.contact.has_whatsapp_number && (
          <WhatsAppButton phone={publisher.contact.whatsapp_number} />
        )}
      </Stack>
    </Paper>
  )
}

export default PublisherInfo
