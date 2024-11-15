import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid2"
import Container from "@mui/material/Container"

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
        width: "100px",
        height: "100px",
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

function MyDropzone() {
  const [files, setFiles] = React.useState([])

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 10) {
        console.error("No puedes subir más de 10 archivos")
        return
      }

      const filteredFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name) &&
          /\.(png|jpe?g)$/i.test(newFile.name),
      )

      const filesWithPreview = filteredFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }))

      setFiles((prev) => [...prev, ...filesWithPreview])
    },
    [files],
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
        {files.map((file, index) => (
          <ImagePreview key={index} file={file} />
        ))}
      </Grid>
    </>
  )
}

export default MyDropzone
