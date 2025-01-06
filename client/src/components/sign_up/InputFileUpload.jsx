import React from "react"
import { styled, Button, SvgIcon, ThemeProvider } from "@mui/joy"
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
const theme = unstable_createMuiStrictModeTheme()

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

export default function InputFileUpload({ onFileChange }) {
  function handleChange(e) {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("El archivo no puede ser mayor de 5MB")
        return
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!validTypes.includes(selectedFile.type)) {
        alert("Solo se permiten archivos JPG, JPEG o PNG")
        return
      }

      onFileChange(selectedFile, URL.createObjectURL(selectedFile))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          width: "100%",
        }}
      >
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
          sx={{
            width: "100%",
          }}
        >
          Carga tu archivo
          <VisuallyHiddenInput type="file" onChange={handleChange} />
        </Button>
        {/* <img src={file} /> */}
      </Stack>
    </ThemeProvider>
  )
}
