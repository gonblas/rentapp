import { gray } from "../themePrimitives"

// /* eslint-disable import/prefer-default-export */
export const surfacesCustomizations = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        overflow: "clip",
        backgroundColor: (theme.vars || theme).palette.background.default,
        border: "1px solid",
        borderColor: (theme.vars || theme).palette.divider,
        ":before": {
          backgroundColor: "transparent",
        },
        "&:not(:last-of-type)": {
          borderBottom: "none",
        },
        "&:first-of-type": {
          borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
        },
        "&:last-of-type": {
          borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
          borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: () => ({
        border: "none",
        borderRadius: 8,
        "&:hover": { backgroundColor: gray[50] },
        "&:focus-visible": { backgroundColor: "transparent" },
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: "none" },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          gap: 16,
          transition: "all 100ms ease",
          backgroundColor: gray[50],
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          boxShadow: "none",
          variants: [
            {
              props: {
                variant: "outlined",
              },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: "none",
                background: "hsl(0, 0%, 100%)",
              },
            },
          ],
        }
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        "&:last-child": { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
}
