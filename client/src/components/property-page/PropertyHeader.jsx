import React from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import FeatureItem from "../FeatureItem"
import SensorDoorIcon from "@mui/icons-material/SensorDoor"
import SquareFootIcon from "@mui/icons-material/SquareFoot"
import PetsIcon from "@mui/icons-material/Pets"
import GarageIcon from "@mui/icons-material/Garage"
import YardIcon from "@mui/icons-material/Yard"
import BalconyIcon from "@mui/icons-material/Balcony"
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed"

function PropertyHeader({ property, building }) {
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
        <Typography variant="h4">{building.address}</Typography>
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
        <Typography variant="body2">{building.neighborhood_name}</Typography>
      </Container>
      {property.description !== "" && (
        <>
          <Typography
            variant="h6"
            sx={{
              mt: "1.5rem",
            }}
          >
            Descripción
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
            {property.description}
          </Typography>
        </>
      )}

      <Typography
        variant="h6"
        sx={{
          mt: "2.5rem",
        }}
      >
        Caracteristicas de la propiedad
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

export default PropertyHeader
