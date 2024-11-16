import React from "react"
import PropertyCard from "../components/PropertyCard"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import SearchBar from "../components/SearchBar"

import { useState, useEffect } from "react"

const Home = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/properties", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setProperties(response)
      })
      .catch((error) => console.error("Error fetching properties:", error))
  }, [])

  return (
    <div
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          px: "50px!important",
        }}
      >
        <SearchBar />
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{
            mb: 3,
          }}
        >
          {" "}
          Propiedades Sugeridas
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
            p: "0px!important",
            pb: "100px!important",
            width: "100%!important",
            margin: "0px!important",
          }}
        >
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Container>
      </Container>
    </div>
  )
}

export default Home
