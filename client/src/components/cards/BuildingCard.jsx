import React, { useContext } from "react"
import PublicationCard from "./PublicationCard"
import InfoTag from "./InfoTag"
import Container from "@mui/material/Container"
import { Typography } from "@mui/material"
import FavoriteButton from "./FavoriteButton"
import ApartmentIcon from "@mui/icons-material/Apartment"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"
import SearchContext from "../SearchContext"

const TagTitle = {
  elevator: "Ascensor",
  pool: "Piscina",
  gym: "Gimnasio",
  terrace: "Terraza",
  bike_rack: "Bicicletero",
  laundry: "Lavandería",
}

function FeatureItem({ icon, text }) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      {icon}
      <Typography
        variant="h5"
        sx={{
          color: "text.main",
          px: "0!important",
        }}
      >
        {text}
      </Typography>
    </Container>
  )
}

function BuildingCard({ building }) {
  const activeFeatures = Object.keys(TagTitle).filter(
    (key) => building[key] === true,
  )

  return (
    <PublicationCard
      linkName={"building-full-view"}
      item={{ type: "building", data: building }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem!important",
          width: "100%",
          minHeight: "100%!important",
          gap: "1rem",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "0px!important",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.main",
              whiteSpace: "nowrap",
              px: "0!important",
            }}
          >
            {building.address}
          </Typography>
          <FavoriteButton />
        </Container>

        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            px: "0!important",
          }}
        >
          {building.neighborhood_name}
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "0.5rem",
            px: "0!important",
            my: "auto",
          }}
        >
          <FeatureItem
            icon={<ApartmentIcon />}
            text={`Pisos: ${building.floors}`}
          />
          <FeatureItem
            icon={<ViewHeadlineIcon />}
            text={`Deptos. por piso: ${building.apartments_per_floor}`}
          />
        </Container>

        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
            mx: "auto",
            mt: "auto",
          }}
        >
          {activeFeatures.map((feature) => (
            <InfoTag key={feature}>{TagTitle[feature]}</InfoTag>
          ))}
        </Container>
      </Container>
    </PublicationCard>
  )
}

export default BuildingCard
