import FeatureItem from "./FeatureItem"
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline"
import ElevatorIcon from "@mui/icons-material/Elevator"
import PoolIcon from "@mui/icons-material/Pool"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import DeckIcon from "@mui/icons-material/Deck"
import PedalBikeIcon from "@mui/icons-material/PedalBike"
import ApartmentIcon from "@mui/icons-material/Apartment"
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService"
import Grid from "@mui/material/Grid2"
import { Typography, Container } from "@mui/material"

function BuildingFeatures({ building }) {
  const {
    floors,
    apartments_per_floor,
    elevator,
    pool,
    gym,
    terrace,
    bike_rack,
    laundry,
  } = building

  const featuresItems = [
    {
      id: 1,
      icon: <ApartmentIcon />,
      text: `Pisos: ${floors}`,
    },
    {
      id: 2,
      icon: <ViewHeadlineIcon />,
      text: `Departamentos por piso: ${apartments_per_floor}`,
    },
    {
      id: 3,
      icon: <ElevatorIcon />,
      text: elevator ? "Ascensor" : "Sin ascensor",
    },
    {
      id: 4,
      icon: <PoolIcon />,
      text: pool ? "Piscina" : "Sin piscina",
    },
    {
      id: 5,
      icon: <FitnessCenterIcon />,
      text: gym ? "Gimnasio" : "Sin gimnasio",
    },
    {
      id: 6,
      icon: <DeckIcon />,
      text: terrace ? "Terraza" : "Sin terraza",
    },
    {
      id: 7,
      icon: <PedalBikeIcon />,
      text: bike_rack ? "Bicicletero" : "Sin bicicletero",
    },
    {
      id: 8,
      icon: <LocalLaundryServiceIcon />,
      text: laundry ? "Lavanderia" : "Sin lavanderia",
    },
  ]
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "0px!important",
        width: "100%",
      }}
    >
      <Typography variant="h5">
        Caracteristicas generales del edificio
      </Typography>
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
        <FeatureItem icon={<ApartmentIcon />} text={`Pisos: ${floors}`} />
        <FeatureItem
          icon={<ViewHeadlineIcon />}
          text={`Departamentos por piso: ${apartments_per_floor}`}
        />
      </Grid>
      <Typography variant="h5">Servicios del edificio</Typography>
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
        {featuresItems.map((item) => (
          <FeatureItem key={item.id} icon={item.icon} text={item.text} />
        ))}
      </Grid>
    </Container>
  )
}

export default BuildingFeatures
