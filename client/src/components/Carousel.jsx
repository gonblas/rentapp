import React, { useState } from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Container from "@mui/material/Container"

function Carousel({ data }) {
  const [slide, setSlide] = useState(0)

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1)
  }

  return (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%!important",
        width: "100%!important",
        overflow: "hidden",
        p: "0!important",
      }}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <ArrowBackIosNewIcon
        onClick={prevSlide}
        sx={{
          position: "absolute",
          filter: "drop-shadow(0px 0px 5px #555)",
          width: "2.5rem",
          height: "2.5rem",
          color: "white",
          left: "1rem",
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            boxShadow: "0px 0px 5px #333",
            borderRadius: "50%",
          },
        }}
      />
      {data.map((item, idx) => {
        return slide === idx ? (
          <img
            src={item}
            key={idx}
            style={{
              minWidth: "100%!important",
              minHeight: "100%!important",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src={item}
            key={idx}
            style={{
              width: "100%",
              height: "100%",
              display: "none",
            }}
          />
        )
      })}
      <ArrowForwardIosIcon
        onClick={nextSlide}
        sx={{
          position: "absolute",
          filter: "drop-shadow(0px 0px 5px #555)",
          width: "2.5rem",
          height: "2.5rem",
          color: "white",
          right: "1rem",
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            boxShadow: "0px 0px 5px #333",
            borderRadius: "50%",
          },
        }}
      />
    </Container>
  )
}

export default Carousel
