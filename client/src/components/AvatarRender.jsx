import React from "react"
import Avatar from "@mui/material/Avatar"

function stringToColor(string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

function stringAvatar(name) {
  const nameParts = name.split(" ")

  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : nameParts[0][0]

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  }
}

function AvatarRender({
  name,
  image,
  style = { width: "40px", height: "40px", fontSize: "100%" },
}) {
  return image ? (
    <Avatar src={image} alt={name} style={style} />
  ) : name ? (
    <Avatar {...stringAvatar(name)} alt={name} style={style} />
  ) : (
    <Avatar alt={name} style={style} />
  )
}

export default AvatarRender
