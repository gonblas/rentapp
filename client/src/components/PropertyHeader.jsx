import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import FeatureItem from "./FeatureItem"
import SensorDoorIcon from "@mui/icons-material/SensorDoor"
import SquareFootIcon from "@mui/icons-material/SquareFoot"
import PetsIcon from "@mui/icons-material/Pets"
import GarageIcon from "@mui/icons-material/Garage"
import YardIcon from "@mui/icons-material/Yard"
import BalconyIcon from "@mui/icons-material/Balcony"
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed"

function PropertyHeader({ property }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: "0px!important",
        }}
      >
        <Typography variant="h4">
          ${property.features.rental_value.toLocaleString("es-ES")}
        </Typography>
        <Typography variant="h4">{property.location.address}</Typography>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: "0px!important",
        }}
      >
        <Typography variant="body2">
          Expensas: ${property.features.expenses_value.toLocaleString("es-ES")}
        </Typography>
        <Typography variant="body2">
          Neighborhood: {property.location.neighborhood_id}
        </Typography>
      </Container>

      <Typography
        variant="h6"
        sx={{
          mt: "2.5rem",
        }}
      >
        Caracteristicas generales
      </Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2px",
          py: "20px",
        }}
      >
        <FeatureItem
          icon={<SensorDoorIcon />}
          text={`Ambientes: ${property.features.rooms}`}
        />
        <FeatureItem
          icon={<SquareFootIcon />}
          text={`${property.features.square_meters} m²`}
        />
        <FeatureItem
          icon={<GpsNotFixedIcon />}
          text={property.features.location}
        />
        <FeatureItem
          icon={<BalconyIcon />}
          text={`Balcones: ${property.features.balconies}`}
        />
        <FeatureItem
          icon={<YardIcon />}
          text={property.features.backyard ? "Jardin" : "Sin jardin"}
        />
        <FeatureItem
          icon={<GarageIcon />}
          text={property.features.garage ? "Cochera" : "Sin cochera"}
        />
        <FeatureItem
          icon={<PetsIcon />}
          text={
            property.features.pet_friendly
              ? "Acepta mascotas"
              : "No acepta mascotas"
          }
        />
      </Grid>
    </Container>
  )
}

// features: {
//   rental_value: 350000,
//   expenses_value: 28000,
// },

export default PropertyHeader
