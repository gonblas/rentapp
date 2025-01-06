import React, { useContext } from "react"
import PublishPropertyContext from "./PublishPropertyContext"
import GoogleMaps from "../GoogleMaps"
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
  Link,
} from "@mui/material"

function SelectBuilding() {
  const { errors, handleOnChange, formData } = useContext(
    PublishPropertyContext,
  )
  return (
    <>
      <FormControl>
        <FormControl>
          <FormLabel sx={{ pb: "20px" }}>Ubicación del edificio</FormLabel>
          <GoogleMaps
            handleOnChange={handleOnChange}
            value={formData.address}
          />
          <FormHelperText sx={{ color: "error.main" }}>
            {errors.building_id.hasError && errors.building_id.message}
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
