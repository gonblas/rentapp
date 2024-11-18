import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import FeatureItem from "./FeatureItem"
import ElevatorIcon from "@mui/icons-material/Elevator"
import PoolIcon from "@mui/icons-material/Pool"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import DeckIcon from "@mui/icons-material/Deck"
import PedalBikeIcon from "@mui/icons-material/PedalBike"
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService"
import ApartmentIcon from "@mui/icons-material/Apartment"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"

function BuildingHeader({ building }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        px: "0px!important",
        gap: "10px",
      }}
    >
      <Typography variant="h4">{building.address}</Typography>

      <Typography variant="h5" sx={{ pb: "15px" }}>
        {building.neighborhood}
      </Typography>
      <Typography variant="h6">Caracteristicas generales</Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "5px",
          py: "20px",
        }}
      >
        <FeatureItem
          icon={<ApartmentIcon />}
          text={`Pisos: ${building.floors}`}
        />
        <FeatureItem
          icon={<ViewHeadlineIcon />}
          text={`Departamentos por piso: ${building.apartments_per_floor}`}
        />
      </Grid>
      <Typography variant="h6">Servicios</Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "5px",
          py: "20px",
        }}
      >
        <FeatureItem
          icon={<ElevatorIcon />}
          text={building.elevator ? "Ascensor" : "Sin ascensor"}
        />
        <FeatureItem
          icon={<PoolIcon />}
          text={building.pool ? "Piscina" : "Sin piscina"}
        />
        <FeatureItem
          icon={<FitnessCenterIcon />}
          text={building.gym ? "Gimnasio" : "Sin gimnasio"}
        />
        <FeatureItem
          icon={<DeckIcon />}
          text={building.terrace ? "Terraza" : "Sin terraza"}
        />
        <FeatureItem
          icon={<PedalBikeIcon />}
          text={building.bike_rack ? "Bicicletero" : "Sin bicicletero"}
        />
        <FeatureItem
          icon={<LocalLaundryServiceIcon />}
          text={building.laundry ? "Lavanderia" : "Sin lavanderia"}
        />
      </Grid>
    </Container>
  )
}

export default BuildingHeader
