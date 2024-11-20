import React, { useState } from "react"
import ListContainer from "./ListContainer"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"

function PendingApprovals() {
  const [showList, setShowList] = useState("apartment")

  return (
    <ListContainer>
      <ToggleButtonGroup
        color="primary"
        value={showList}
        exclusive
        onChange={(event, newShowList) => {
          setShowList(newShowList)
        }}
        aria-label="List of pending approvals"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          boxShadow: "none",
          mb: "auto",
        }}
      >
        <ToggleButton value="apartment">Departamento</ToggleButton>
        <ToggleButton value="buildings">Edificios</ToggleButton>
      </ToggleButtonGroup>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          mb: 3,
        }}
      >
        {showList === "apartment" ? "Departamentos" : "Edificios"} Pendientes
      </Typography>
    </ListContainer>
  )
}

export default PendingApprovals
