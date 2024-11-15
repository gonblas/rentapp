import { createTheme, alpha } from "@mui/material/styles"
import "@fontsource/poppins"

const defaultTheme = createTheme()

export const brand = {
  50: "#e6f7ff",
  100: "#d9f0ff",
  200: "#b3e0ff",
  300: "#80ccff",
  400: "#7ab8ff",
  500: "#6aa3ff",
  600: "#4d8cff",
  700: "#09569E",
  800: "#004090",
  900: "#003080",
}

export const gray = {
  50: "#f7f7f7",
  100: "#f0f0f0",
  200: "#e0e0e0",
  300: "#cccccc",
  400: "#a6a6a6",
  500: "#6a6a6a",
  600: "#595959",
  700: "#404040",
  800: "#1a1a1a",
  900: "#0d0d0d",
}

export const green = {
  50: "#f0fff0",
  100: "#e0ffe0",
  200: "#d0ffd0",
  300: "#b0ffb0",
  400: "#80ff80",
  500: "#6aff6a",
  600: "#55ff55",
  700: "#33ff33",
  800: "#1aff1a",
  900: "#0dff0d",
}

export const orange = {
  50: "#fff8e6",
  100: "#ffebd9",
  200: "#ffdbb3",
  300: "#ffcc80",
  400: "#ffb866",
  500: "#ffa64d",
  600: "#ff9140",
  700: "#ff6633",
  800: "#ff521a",
  900: "#ff3d0d",
}

export const red = {
  50: "#fff5f5",
  100: "#ffe6e6",
  200: "#ffcccc",
  300: "#ff9999",
  400: "#ff6666",
  500: "#ff4d4d",
  600: "#ff3333",
  700: "#ff1a1a",
  800: "#ff0d0d",
  900: "#e60000",
}

export const colorSchemes = {
  light: {
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      primary: {
        light: brand[200],
        main: "#f1f1f3",
        dark: brand[800],
        contrastText: brand[50],
      },
      info: {
        light: red[100],
        main: red[300],
        dark: red[600],
        contrastText: red[50],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: "#f1f1f3",
        paper: "hsl(220, 35%, 97%)",
      },
      text: {
        primary: "#333",
        secondary: gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: `${alpha(gray[200], 0.3)}`,
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
    },
  },
}

export const typography = {
  fontFamily: ['"sans-serif", "Inter"'].join(","),
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 200,
  },
}

export const shape = {
  borderRadius: 8,
}

const defaultShadows = [
  "none",
  "var(--template-palette-baseShadow)",
  ...defaultTheme.shadows.slice(2),
]

export const shadows = defaultShadows
