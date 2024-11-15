import * as React from "react"
import Grid from "@mui/material/Grid2"
import Stack from "@mui/material/Stack"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {
  sitemap_items,
  explore_items,
  app_icons,
  social_icons,
} from "./footer_data"

function Title(props) {
  return (
    <Typography
      style={{ fontWeight: 700 }}
      variant="body1"
      sx={{ display: "block", pb: 2 }}
    >
      {props.children}
    </Typography>
  )
}

function FooterColumn({ title, items }) {
  return (
    <Grid
      size={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack spacing={1}>
        <Title>{title}</Title>
        {items.map((item) => (
          <Link key={item.name} href={item.path} underline="hover">
            {item.name}
          </Link>
        ))}
      </Stack>
    </Grid>
  )
}

function Footer() {
  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: "#E7E7E7",
        bottom: 0,
        py: 8,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        minWidth: "100vw",
      }}
    >
      <Grid container spacing={2} sx={{ px: "20px" }}>
        <Grid
          size={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ display: "block" }}>
            <img src="../RentAppLogo.svg" alt="" width="200" />
          </Typography>
          <Grid container>
            {social_icons.map((item) => (
              <Grid key={item.key}>
                <Typography sx={{ px: 0.5 }}>{item.icon}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <FooterColumn title="Mapa de sitio" items={sitemap_items} />
        <FooterColumn title="Explorar" items={explore_items} />
        <Grid
          size={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title>Descargar la app</Title>
          <Stack>
            {app_icons.map((item) => (
              <Typography key={item.alt} sx={{ display: "block", pb: 1 }}>
                <img src={item.src} alt={item.alt} width="150" />
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
