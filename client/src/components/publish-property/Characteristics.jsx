import { Typography } from "@mui/material"
import FormHeader from "../FormHeader"

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

// class Property(Base):

//     description = Column(Text)
//     address = Column(String(255))
//     neighborhood_id = Column(Integer, ForeignKey('neighborhoods.id'))
//     type = Column(Enum('apartment', 'house', 'ph'), nullable=False)
//     rental_value = Column(Float)
//     expenses_value = Column(Float)

//     rooms = Column(Integer)
//     square_meters = Column(Integer)
//     balconies = Column(Integer)
//     backyard = Column(Boolean)
//     garage = Column(Boolean)
//     pet_friendly = Column(Boolean)
//     location = Column(Enum('front', 'back', 'internal', 'n/a'))

//     building_id = Column(Integer, ForeignKey('buildings.id'))

function Characteristics() {
  return (
    <>
      <FormHeader
        title="Características"
        description="Agrega características detalladas para describir mejor el inmueble que estás publicando. No son obligatorias, pero ayudan a los usuarios a encontrar tu inmueble más fácilmente."
      />
      <Subtitle>Características generales</Subtitle>
    </>
  )
}

export default Characteristics
