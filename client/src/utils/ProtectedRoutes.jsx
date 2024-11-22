import { Outlet, Navigate } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"

function ProtectedRoutes({ redirectTo, condition, loading = false, ...props }) {
  if (loading)
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    )

  return condition ? <Outlet {...props} /> : <Navigate to={redirectTo} />
}

export default ProtectedRoutes
