import Container from "@mui/material/Container"

function FeatureItem({ icon, text }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "auto",
        p: "8px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {text}
    </Container>
  )
}

export default FeatureItem
