import React from "react"
import Container from "@mui/material/Container"
import { Typography } from "@mui/material"

function ListContainer({ children, title }) {
  return (
    <Container>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          mb: 3,
        }}
      >
        {" "}
        {title}
      </Typography>
      {children}
    </Container>
  )
}

export default ListContainer
