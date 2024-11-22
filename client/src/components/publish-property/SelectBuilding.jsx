import React from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import GoogleMaps from "../GoogleMaps"
import FormHelperText from "@mui/material/FormHelperText"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

function SelectBuilding() {
  const { errors, handleOnChange, formData } = useContext(
    PublishPropertyContext,
  )
  return (
    <>
      <FormControl>
        <FormControl>
          <FormLabel>Ubicación del edificio</FormLabel>
          <GoogleMaps
            handleOnChange={handleOnChange}
            value={formData.building.address}
          />
          <FormHelperText sx={{ color: "error.main" }}>
            {errors.building.id.hasError && errors.building.id.message}
          </FormHelperText>
        </FormControl>
      </FormControl>
      <Typography sx={{ textAlign: "center", mt: 15 }}>
        ¿No se encuentra registrado tu edificio?{" "}
        <span>
          <Link
            href="/publish-building"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Regístralo aquí
          </Link>
        </span>
      </Typography>
    </>
  )
}

export default SelectBuilding
