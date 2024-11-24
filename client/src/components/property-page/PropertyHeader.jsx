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
  const locations = [
    { value: "front", label: "Frente" },
    { value: "back", label: "Contrafrente" },
    { value: "inside", label: "Interno" },
    { value: "lateral", label: "Lateral" },
  ]
  const location =
    locations.find((loc) => loc.value === property.features.location)?.label ||
    property.features.location

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
          flexWrap: "nowrap", // Evitar que los textos se vayan a otra línea
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "clamp(16px, 1.5vw, 24px)", // Ajusta dinámicamente el tamaño de la fuente
            whiteSpace: "nowrap", // Mantén todo el texto en una línea
            overflow: "hidden", // Oculta texto si es necesario
            textOverflow: "ellipsis", // Muestra puntos suspensivos si el texto es demasiado largo
            maxWidth: "10%", // Cada texto ocupa hasta un 48% del contenedor
          }}
        >
          ${property.features.rental_value.toLocaleString("es-ES")}
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
          {building.address}
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
        <FeatureItem icon={<GpsNotFixedIcon />} text={location} />
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
