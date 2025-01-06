import React, { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import PublishPropertyContext from "./PublishPropertyContext"
import Grid from "@mui/material/Grid2"
import { Typography, Container, FormHelperText } from "@mui/material"

function ImagePreview({ file }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px!important",
        margin: "0px!important",
        width: "19.1%",
        aspectRatio: "1 / 1",
        borderRadius: "5px!important",
        overflow: "hidden",
        border: "1px solid #ccc",
      }}
    >
      <img
        src={file.url}
        alt={file.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: "0.8rem",
          fontWeight: "light",
          px: "0px!important",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          whiteSpace: "nowrap",
          textAlign: "center",
          pb: "3px",
        }}
      >
        {file.name}
      </Typography>
    </Container>
  )
}

function Dropzone({ files, onChange, setErrors }) {
  const { errors } = useContext(PublishPropertyContext)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const totalFiles = files.length + acceptedFiles.length

      if (totalFiles > 10) {
        const remainingSlots = 10 - files.length

        if (remainingSlots <= 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            images: {
              hasError: true,
              message: `No puedes subir más de 10 imágenes.`,
            },
          }))
          return
        }

        console.warn(`Solo puedes subir ${remainingSlots} archivo(s) más.`)
        acceptedFiles = acceptedFiles.slice(0, remainingSlots)
      }

      const filteredFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name) &&
          /\.(png|jpe?g)$/i.test(newFile.name),
      )

      const filesWithPreview = filteredFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        image: file,
      }))

      onChange(filesWithPreview)
    },
    [files, onChange, setErrors],
  )

  const onDropRejected = (fileRejections) => {
    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        console.error(`${file.name}: ${err.message}`)
      })
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 10,
    accept: "image/jpeg, image/png",
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  })

  return (
    <>
      <div
        {...getRootProps()}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          backgroundColor: isDragActive ? "#e0e0e0" : "#ffffff",
        }}
      >
        <input {...getInputProps()} type="file" />
        <Typography
          variant="subtitle2"
          sx={{
            padding: "30px",
          }}
        >
          {isDragActive
            ? "¡Suelta el archivo aquí!"
            : "Arrastra y suelta tus archivos aquí, o haz clic para seleccionar"}
        </Typography>
      </div>

      <Grid
        container
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "10px",
          py: "20px",
        }}
      >
        {files.map((file) => (
          <ImagePreview key={file.name} file={file} />
        ))}
      </Grid>
      <FormHelperText sx={{ color: "error.main", mx: "auto" }}>
        {errors.images.hasError && errors.images.message}
      </FormHelperText>
    </>
  )
}

export default Dropzone
