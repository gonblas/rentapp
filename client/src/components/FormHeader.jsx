import { Typography } from "@mui/material"

function FormHeader({ title, description }) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          pb: "30px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.8rem",
          fontWeight: "light",
          color: "text.secondary",
          mb: "20px",
        }}
      >
        {description}
      </Typography>
    </>
  )
}

export default FormHeader
