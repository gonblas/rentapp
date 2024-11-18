import { Typography } from "@mui/material"
import FormHeader from "../FormHeader"
import PropertyFilters from "../filters/PropertyFilters"

function Subtitle({ children }) {
  return (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "semibold",
        marginTop: 2,
        marginBottom: 1,
      }}
    >
      {children}
    </Typography>
  )
}

function Characteristics() {
  return (
    <>
      <FormHeader
        title="Características"
        description="Agrega características detalladas para describir mejor el inmueble que estás publicando. No son obligatorias, pero ayudan a los usuarios a encontrar tu inmueble más fácilmente."
      />
      <Subtitle>Características</Subtitle>
      <PropertyFilters />
    </>
  )
}

export default Characteristics
