import React from "react"
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
    src: "src/assets/GooglePlay.svg",
    alt: "Google Play",
  },
  {
    id: 2,
    src: "src/assets/AppStore.svg",
    alt: "App Store",
  },
]

const social_icons = [
  {
    href: "https://x.com/",
    color: "black",
    icon: <XIcon />,
    key: "XIcon",
    "aria-label": "Visitanos en X",
  },
  {
    href: "https://www.instagram.com/",
    color: "#EE2A7B",
    icon: <InstagramIcon />,
    key: "InstagramIcon",
    "aria-label": "Visitanos en Instagram",
  },
  {
    href: "https://youtube.com/",
    color: "red",
    icon: <YouTubeIcon />,
    key: "YouTubeIcon",
    "aria-label": "Visitanos en YouTube",
  },
  {
    href: "https://www.linkedin.com/",
    color: "#0077B5",
    icon: <LinkedInIcon />,
    key: "LinkedInIcon",
    "aria-label": "Visitanos en LinkedIn",
  },
]

export { sitemap_items, explore_items, app_icons, social_icons }
