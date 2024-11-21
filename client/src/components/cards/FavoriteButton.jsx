import React, { useState } from "react"
import Button from "@mui/material/Button"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"

function FavoriteButton() {
  const [favorite, setFavorite] = useState(false)

  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        border: "1px solid",
        borderColor: "#D9D9D9",
        color: "#ff3d3d",
        height: "100%!important",
        py: "10px!important",
        m: "0px",
        zIndex: "1000!important",
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setFavorite(!favorite)
      }}
    >
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  )
}

export default FavoriteButton
