import React, { Fragment } from "react"
import SearchBar from "../components/SearchBar"
import { useContext } from "react"
import SearchContext from "../components/SearchContext"
import BuildingCard from "../components/cards/BuildingCard"
import ListContainer from "../components/ListContainer"

function Search() {
  const { buildings } = useContext(SearchContext)
  console.log(buildings)
  return (
    <Fragment>
      <SearchBar />
      <ListContainer>
        {buildings.buildings.map((building) => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </ListContainer>
    </Fragment>
  )
}

export default Search
