import React from "react"
import BuildingFeatures from "../BuildingFeatures"
import PropertyHeader from "./PropertyHeader"
import PublisherInfo from "./PublisherInfo"
import Container from "@mui/material/Container"
import Carousel from "../Carousel"
// import ImageList from "@mui/material/ImageList"
// import ImageListItem from "@mui/material/ImageListItem"
// import Box from "@mui/material/Box"

// function MasonryImageList({ images }) {
//   const numberOfColumns = 3 // Número de columnas por fila

//   // Dividir las imágenes en dos filas
//   const rows = []
//   for (let i = 0; i < images.length; i += numberOfColumns) {
//     rows.push(images.slice(i, i + numberOfColumns))
//   }

//   return (
//     <Box sx={{ width: "100%", height: 450, overflowX: "scroll" }}>
//       <ImageList
//         variant="masonry"
//         cols={numberOfColumns}
//         gap={8}
//         sx={{ display: "flex", flexDirection: "row" }}
//       >
//         {rows.map((row, rowIndex) => (
//           <div key={rowIndex} style={{ display: "flex", flexDirection: "row" }}>
//             {row.map((item) => (
//               <ImageListItem key={item}>
//                 <img src={item} loading="lazy" alt="" />
//               </ImageListItem>
//             ))}
//           </div>
//         ))}
//       </ImageList>
//     </Box>
//   )
// }

function Property({ property }) {
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
      <Carousel
        data={property.images}
        style={{
          width: "100%",
          height: "448px!important",
          mb: "30px!important",
          overflow: "hidden",
        }}
      />
      <PropertyHeader property={property} />
      <BuildingFeatures building={property.building} />
      <PublisherInfo publisher={property.publisher} />
    </Container>
  )
}

export default Property
