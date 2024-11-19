import React from "react"
import Dropzone from "./Dropzone"
import FormHeader from "../FormHeader"
import { useEffect } from "react"

function Multimedia() {
  const [files, setFiles] = React.useState([])

  const onChange = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  useEffect(() => {
    console.log("Files:", files)
  }, [files])

  return (
    <>
      <FormHeader
        title="Agregar imágenes de la propiedad"
        description="Carga entre 5 y 10 fotos. Una vez cargadas, arrastra las mismas para cambiarlas de orden. Se admiten formatos de imagen jpg, jpeg y png."
      />
      <Dropzone files={files} onChange={onChange}></Dropzone>
    </>
  )
}

export default Multimedia
