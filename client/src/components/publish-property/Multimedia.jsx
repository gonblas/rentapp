import React, { useContext } from "react"
import Dropzone from "./Dropzone"
import FormHeader from "../FormHeader"
import PublishPropertyContext from "./PublishPropertyContext"

function Multimedia() {
  const { formData, handleOnChangeImages, setErrors } = useContext(
    PublishPropertyContext,
  )

  return (
    <>
      <FormHeader
        title="Agregar imágenes de la propiedad"
        description="Carga entre 5 y 10 fotos. Una vez cargadas, arrastra las mismas para cambiarlas de orden. Se admiten formatos de imagen jpg, jpeg y png."
      />
      <Dropzone
        files={formData.images}
        onChange={handleOnChangeImages}
        setErrors={setErrors}
      ></Dropzone>
    </>
  )
}

export default Multimedia
