import React, { Fragment, useContext } from "react"
import SearchBar from "../components/SearchBar"
import SearchContext from "../components/SearchContext"
import BuildingCard from "../components/cards/BuildingCard"
import ListContainer from "../components/ListContainer"
import AlertContainer from "../components/AlertContainer" // Import AlertContainer

function Search() {
  const { buildings } = useContext(SearchContext)

  return (
    <Fragment>
      <SearchBar />
      <ListContainer>
        {buildings && buildings.buildings.length > 0 ? (
          buildings.buildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              linkName="/building-full-view"
            />
          ))
        ) : (
          <AlertContainer message="No hay edificios disponibles." /> // Display AlertContainer when no buildings are available
        )}
      </ListContainer>
    </Fragment>
  )
}

export default Search
