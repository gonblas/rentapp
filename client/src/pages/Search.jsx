import React, { Fragment } from "react"
import SearchBar from "../components/SearchBar"
import { useContext } from "react"
import SearchContext from "../components/SearchContext"
import BuildingCard from "../components/cards/BuildingCard"

function Search() {
  const { properties } = useContext(SearchContext)
  return (
    <Fragment>
      <SearchBar />
      {properties.buildings.map((building) => (
        <BuildingCard key={building.id} building={building} />
      ))}
    </Fragment>
  )
}

export default Search
