import React from "react"
import SensorDoorIcon from "@mui/icons-material/SensorDoor"
import SquareFootIcon from "@mui/icons-material/SquareFoot"
import PetsIcon from "@mui/icons-material/Pets"
import GarageIcon from "@mui/icons-material/Garage"
import BalconyIcon from "@mui/icons-material/Balcony"
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed"
import YardIcon from "@mui/icons-material/Yard"
import FeatureItem from "../FeatureItem"
import Grid from "@mui/material/Grid2"
import { Typography, Container } from "@mui/material"

function PropertyHeader({ property, building }) {
  const { features, description } = property
  const { address, neighborhood_name } = building

  const locations = [
    { value: "front", label: "Frente" },
    { value: "back", label: "Contrafrente" },
    { value: "internal", label: "Interno" },
    { value: "side", label: "Lateral" },
  ]
  const location =
    locations.find((loc) => loc.value === features.location)?.label ||
    features.location

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
          flexWrap: "nowrap",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "clamp(16px, 1.5vw, 24px)",
            whiteSpace: "nowrap",
            maxWidth: "10%",
          }}
        >
          ${features.rental_value.toLocaleString("es-ES")}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "clamp(16px, 1.5vw, 24px)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "90%",
            textAlign: "right",
          }}
        >
          {address}
        </Typography>
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
          Expensas: ${features.expenses_value.toLocaleString("es-ES")}
        </Typography>
        <Typography variant="body2">{neighborhood_name}</Typography>
      </Container>
      {description !== "" && (
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
            {description}
          </Typography>
        </>
      )}

      <Typography
        variant="h5"
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
          text={`Ambientes: ${features.rooms}`}
        />
        <FeatureItem
          icon={<SquareFootIcon />}
          text={`${features.square_meters} m²`}
        />
        <FeatureItem icon={<GpsNotFixedIcon />} text={location} />
        <FeatureItem
          icon={<BalconyIcon />}
          text={`Balcones: ${features.balconies}`}
        />
        <FeatureItem
          icon={<YardIcon />}
          text={features.backyard ? "Jardin" : "Sin jardin"}
        />
        <FeatureItem
          icon={<GarageIcon />}
          text={features.garage ? "Cochera" : "Sin cochera"}
        />
        <FeatureItem
          icon={<PetsIcon />}
          text={
            features.pet_friendly ? "Acepta mascotas" : "No acepta mascotas"
          }
        />
      </Grid>
    </Container>
  )
}

export default PropertyHeader
