import React from "react"
import IconButton from "@mui/material/IconButton"
import XIcon from "@mui/icons-material/X"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

const sitemap_items = [
  {
    name: "Propiedades en Argentina",
    path: "#",
  },
  {
    name: "Publicar tu propiedad",
    path: "#",
  },
  {
    name: "Publicidad",
    path: "#",
  },
  {
    name: "Ayuda",
    path: "#",
  },
  {
    name: "Acerca de",
    path: "#",
  },
  {
    name: "Contactanos",
    path: "#",
  },
  {
    name: "Empleos",
    path: "#",
  },
]

const explore_items = [
  {
    name: "Inmobiliarias",
    path: "#",
  },
  {
    name: "Zonas",
    path: "#",
  },
]

const app_icons = [
  {
    src: "../GooglePlay.svg",
    alt: "Google Play",
  },
  {
    src: "../AppStore.svg",
    alt: "App Store",
  },
]

const social_icons = [
  {
    icon: (
      <IconButton
        href="https://x.com/"
        target="_blank"
        sx={{
          "&:hover": {
            color: "black",
            backgroundColor: "transparent",
          },
          backgroundColor: "transparent",
        }}
      >
        <XIcon />
      </IconButton>
    ),
    key: "XIcon",
  },
  {
    icon: (
      <IconButton
        href="https://www.instagram.com/"
        target="_blank"
        sx={{
          "&:hover": {
            color: "#EE2A7B",
            backgroundColor: "transparent",
          },
          backgroundColor: "transparent",
        }}
      >
        <InstagramIcon />
      </IconButton>
    ),
    key: "InstagramIcon",
  },
  {
    icon: (
      <IconButton
        href="https://youtube.com/"
        target="_blank"
        sx={{
          "&:hover": {
            color: "red",
            backgroundColor: "transparent",
          },
          backgroundColor: "transparent",
        }}
      >
        <YouTubeIcon />
      </IconButton>
    ),
    key: "YouTubeIcon",
  },
  {
    icon: (
      <IconButton
        href="https://www.linkedin.com/"
        target="_blank"
        sx={{
          "&:hover": {
            color: "#0077B5",
            backgroundColor: "transparent",
          },
          backgroundColor: "transparent",
        }}
      >
        <LinkedInIcon />
      </IconButton>
    ),
    key: "LinkedInIcon",
  },
]

export { sitemap_items, explore_items, app_icons, social_icons }
