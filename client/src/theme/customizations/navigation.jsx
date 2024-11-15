import * as React from "react"
import { alpha } from "@mui/material/styles"

import { buttonBaseClasses } from "@mui/material/ButtonBase"
import { dividerClasses } from "@mui/material/Divider"
import { menuItemClasses } from "@mui/material/MenuItem"
import { selectClasses } from "@mui/material/Select"
import { tabClasses } from "@mui/material/Tab"
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded"
import { gray, brand } from "../themePrimitives"

// /* eslint-disable import/prefer-default-export */
export const navigationCustomizations = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        padding: "6px 8px",
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: "transparent",
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: "0px",
        [`&.${dividerClasses.root}`]: {
          margin: "0 -8px",
        },
      },
      paper: ({ theme }) => ({
        marginTop: "4px",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: "none",
        background: "hsl(0, 0%, 100%)",
        boxShadow:
          "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
        [`& .${buttonBaseClasses.root}`]: {
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef(function IconComponent(props, ref) {
        return <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      }),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: gray[200],
        backgroundColor: (theme.vars || theme).palette.background.paper,
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        "&:hover": {
          borderColor: gray[300],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: "none",
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        "&:before, &:after": {
          display: "none",
        },
      }),
      select: () => ({
        display: "flex",
        alignItems: "center",
      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: "none",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        position: "relative",
        textDecoration: "none",
        width: "fit-content",
        "&::before": {
          content: '""',
          position: "none",
          width: "100%",
          height: "1px",
          bottom: 0,
          left: 0,
          backgroundColor: (theme.vars || theme).palette.text.secondary,
          opacity: 0.3,
          transition: "width 0.3s ease, opacity 0.3s ease",
        },
        "&:hover::before": {
          width: 0,
        },
        "&:focus-visible": {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: "4px",
          borderRadius: "2px",
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: "fit-content" },
      indicator: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.grey[800],
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "6px 8px",
        marginBottom: "8px",
        textTransform: "none",
        minWidth: "fit-content",
        minHeight: "fit-content",
        color: (theme.vars || theme).palette.text.secondary,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: "transparent",
        ":hover": {
          color: (theme.vars || theme).palette.text.primary,
          backgroundColor: gray[100],
          borderColor: gray[200],
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
        },
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: "4px solid",
        borderColor: (theme.vars || theme).palette.divider,
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.divider,
        borderRadius: "50%",
        "&.Mui-active": {
          color: (theme.vars || theme).palette.primary.dark,
          backgroundColor: "currentColor",
        },
        "&.Mui-completed": {
          color: (theme.vars || theme).palette.primary.dark,
        },
        variants: [
          {
            props: { completed: true },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        "&.Mui-completed": {
          color: (theme.vars || theme).palette.primary.dark,
        },
        "&.Mui-active": {
          color: (theme.vars || theme).palette.primary.dark,
        },
      }),
    },
  },
}
