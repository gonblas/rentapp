import React from "react"
import PublicationCard from "./PublicationCard"
import FavoriteButton from "./FavoriteButton"
import InfoTag from "./InfoTag"
import { Container, Typography } from "@mui/material"
import ApartmentIcon from "@mui/icons-material/Apartment"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"

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

function BuildingCard({ building, linkName }) {
  const activeFeatures = Object.keys(TagTitle).filter(
    (key) => building[key] === true,
  )

  const { id, address, neighborhood_name, floors, apartments_per_floor } =
    building

  return (
    <PublicationCard linkName={linkName} item={{ type: "building", id: id }}>
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
            {address}
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
          {neighborhood_name}
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
          <FeatureItem icon={<ApartmentIcon />} text={`Pisos: ${floors}`} />
          <FeatureItem
            icon={<ViewHeadlineIcon />}
            text={`Deptos. por piso: ${apartments_per_floor}`}
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
