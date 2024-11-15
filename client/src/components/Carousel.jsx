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
        width: "100%",
        height: "100%",
        p: "0!important",
      }}
    >
      <ArrowBackIosNewIcon
        onClick={prevSlide}
        sx={{
          position: "absolute",
          filter: "drop-shadow(0px 0px 5px #555)",
          width: "1.5rem",
          height: "1.5rem",
          color: "white",
          left: "0.25rem",
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            boxShadow: "0px 0px 5px #333",
            borderRadius: "50%", // Ensures the shape is circular
          },
        }}
      />
      {data.map((item, idx) => {
        return slide === idx ? (
          <img
            src={item}
            key={idx}
            style={{
              width: "100%",
              height: "100%",
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
          width: "1.5rem",
          height: "1.5rem",
          color: "white",
          right: "0.25rem",
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            boxShadow: "0px 0px 5px #333",
            borderRadius: "50%", // Ensures the shape is circular
          },
        }}
      />
    </Container>
  )
}

export default Carousel
