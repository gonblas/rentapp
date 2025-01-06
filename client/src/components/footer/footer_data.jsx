import React from "react"
import IconButton from "@mui/material/IconButton"
import XIcon from "@mui/icons-material/X"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

const sitemap_items = [
  {
    id: 1,
    name: "Propiedades en Argentina",
    path: "#",
  },
  {
    id: 2,
    name: "Publicar tu propiedad",
    path: "/publish-property",
  },
  {
    id: 3,
    name: "Publicar un edificio",
    path: "/publish-building",
  },
  {
    id: 4,
    name: "Ayuda",
    path: "#",
  },
  {
    id: 5,
    name: "Acerca de",
    path: "#",
  },
  {
    id: 6,
    name: "Contactanos",
    path: "#",
  },
  {
    id: 7,
    name: "Empleos",
    path: "#",
  },
]

const explore_items = [
  {
    id: 1,
    name: "Inmobiliarias",
    path: "#",
  },
  {
    id: 2,
    name: "Zonas",
    path: "#",
  },
]

const app_icons = [
  {
    id: 1,
    src: "../GooglePlay.svg",
    alt: "Google Play",
  },
  {
    id: 2,
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
