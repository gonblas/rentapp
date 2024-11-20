import React, { Fragment } from "react"
import SearchBar from "../components/SearchBar"
import { useContext } from "react"
import SearchContext from "../components/SearchContext"

function Search() {
  const { properties } = useContext(SearchContext)
  return (
    <Fragment>
      <SearchBar />
      {/* {properties.buildings.map((building) => (
        <BuildingCard key={building.id} building={building} />
      ))} */}
    </Fragment>
  )
}

export default Search
