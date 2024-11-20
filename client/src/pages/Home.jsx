import React from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import SearchBar from "../components/SearchBar"
import BuildingCard from "../components/cards/BuildingCard"
import ListContainer from "../components/ListContainer"

// import { useEffect } from "react"

const building = {
  id: 0,
  address: "Av. Siempre Viva 742",
  neighborhood_id: 20,
  neighborhood_name: "Springfield",
  floors: 3,
  apartments_per_floor: 2,
  elevator: true,
  pool: true,
  gym: true,
  terrace: true,
  bike_rack: true,
  laundry: true,
}

const Home = () => {
  // const [properties, setProperties] = useState([])

  // useEffect(() => {
  //   fetch("http://localhost:8000/properties", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response)
  //       // setProperties(response)
  //     })
  //     .catch((error) => console.error("Error fetching properties:", error))
  // }, [])

  return (
    <ListContainer>
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
        {/* {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))} */}
        <BuildingCard building={building} />
      </Container>
    </ListContainer>
  )
}

export default Home
