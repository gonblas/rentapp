import * as React from "react"
import Grid from "@mui/material/Grid2"
import { Stack, Link, Typography, Container, IconButton } from "@mui/material"
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
        {items.map(({ id, name, path }) => (
          <Link key={id} href={path} underline="hover">
            {name}
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
          <img src="/src/assets/RentAppLogo.svg" alt="" width="200" />
          <Grid container>
            {social_icons.map((data) => (
              <Grid key={data.key}>
                <IconButton
                  href={data.href}
                  target="_blank"
                  aria-label={data["aria-label"]}
                  sx={{
                    "&:hover": {
                      color: `${data.color}`,
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  {data.icon}
                </IconButton>
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
            {app_icons.map(({ id, alt, src }) => (
              <Typography key={id} sx={{ display: "block", pb: 1 }}>
                <img src={src} alt={alt} width="150" />
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer
