import React from "react"
import Gallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import { useLocation } from "react-router-dom"
import PropertyHeader from "./PropertyHeader"
import BuildingFeatures from "../BuildingFeatures"
import PublisherInfo from "./PublisherInfo"
import useAuth from "../../hooks/AuthContext"
import { Container, Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

function Property({ property, canDelete = true }) {
  const location = useLocation()
  const { userData, logued, handlePropertyDelete } = useAuth()

  // Resize the images to a smaller size
  const ImageGallery = () => {
    return (
      <Gallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        showBullets={true}
        showThumbnails={true}
        slideInterval={3000}
        useBrowserFullscreen={false}
        startIndex={0}
        autoPlay={false}
        disableThumbnailScroll={true}
        thumbnailPosition="bottom"
        renderItem={({ original, description }) => (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <img
              src={original}
              alt={description}
              width={"100%"}
              height={"auto"}
              style={{
                objectFit: "contain",
                maxHeight: "500px",
                margin: "0 auto",
              }}
            />
          </div>
        )}
        renderThumbInner={({ thumbnail, description }) => (
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 5px",
              position: "relative",
            }}
          >
            <img
              src={thumbnail}
              alt={description}
              width={"100%"}
              height={"100%"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "16/9",
                borderRadius: "2px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          </div>
        )}
      />
    )
  }

  const RejectButton = () => {
    return (
      <Button
        onClick={() => {
          handlePropertyDelete(property.id)
        }}
        startIcon={<DeleteIcon />}
        sx={{
          backgroundColor: "error.dark",
          color: "white",
          "&:hover": {
            backgroundColor: "error.hover",
          },
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Eliminar
      </Button>
    )
  }

  const images = property.images.map((image) => ({
    original: image,
    thumbnail: image,
    description: "",
  }))

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "30px",
      }}
    >
      <ImageGallery />
      <PropertyHeader property={property} building={property.building} />
      <BuildingFeatures building={property.building} />
      <PublisherInfo publisher={property.publisher} />
      {canDelete &&
        logued &&
        userData.id === property.publisher.id &&
        !location.pathname.includes("admin") && (
          <Container
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              pb: "20px",
            }}
          >
            <RejectButton />
          </Container>
        )}
    </Container>
  )
}

export default Property
