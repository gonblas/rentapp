import React from "react"
import Gallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import Container from "@mui/material/Container"
import PropertyHeader from "./PropertyHeader"
import BuildingFeatures from "../BuildingFeatures"
import PublisherInfo from "./PublisherInfo"
import useAuth from "../../hooks/AuthContext"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"

function Property({ property, canDelete=true }) {
  const { userData, logued, handlePropertyDelete } = useAuth()

  // Resize the images to a smaller size
  const ImageGallery = () => {
    return (
      <Gallery
        items={images}
        showPlayButton={false} // Disable the autoplay button
        showFullscreenButton={false} // Disable the fullscreen button
        showBullets={true} // Enable navigation bullets
        showThumbnails={true} // Enable thumbnails
        slideInterval={3000} // Interval between slides if autoplay is enabled (though it's disabled here)
        useBrowserFullscreen={false} // Disable fullscreen
        startIndex={0} // Start the gallery at the first image
        autoPlay={false} // Disable autoplay feature
        disableThumbnailScroll={true} // Prevent scrolling of the thumbnails
        thumbnailPosition="bottom" // You can change position of thumbnails to bottom if needed
        renderItem={(item) => (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <img
              src={item.original}
              alt={item.description}
              style={{
                width: "100%", // Resize the image to fill the container
                objectFit: "contain", // Ensure the aspect ratio is maintained
                maxHeight: "500px", // Limit the height of the image
                margin: "0 auto",
              }}
            />
          </div>
        )}
        renderThumbInner={(item) => (
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 5px",
              position: "relative",
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.description}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Preserve aspect ratio of thumbnails without distortion
                aspectRatio: "16/9", // Enforce square aspect ratio
                borderRadius: "2px", // Optional: Add rounded corners to thumbnails
                position: "absolute", // Center the image within the thumbnail container
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
    original: image, // Can replace with a smaller image if you have one
    thumbnail: image, // Same here, ideally you should provide a smaller image for thumbnails
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
      {canDelete && logued && userData.id === property.publisher.id &&(
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
