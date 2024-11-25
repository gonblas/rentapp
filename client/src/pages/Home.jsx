import React from "react"
import Container from "@mui/material/Container"
import SearchBar from "../components/SearchBar"
import ListContainer from "../components/ListContainer"
import CenteredContainer from "../components/CenteredContainer"
import DefaultProperties from "../components/DefaultProperties"

const Home = () => {
  return (
    <CenteredContainer>
      <SearchBar />
      <DefaultProperties />
    </CenteredContainer>
  )
}

export default Home
