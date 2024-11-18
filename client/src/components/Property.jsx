import React from "react"
import Carousel from "./Carousel"
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
    <div>
      <Carousel
        data={property.images}
        style={{
          width: "auto",
          maxHeight: "50px!important",
          mb: "30px!important",
        }}
      />
      {/* <MasonryImageList images={property.images} /> */}
    </div>
  )
}

export default Property
