import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Stack from "@mui/material/Stack"
import SignInCard from "../components/sign_in/SignInCard"
import AppTheme from "../theme/AppTheme"

export default function SignInSide(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "auto",
            marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
          },
          //BACKGROUND HERE
          () => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  )
}
