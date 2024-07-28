"use client";
import { createTheme } from "@mui/material/styles";

const primaryMain = "#6BB955";
const primaryLight = "#D5F2E4";
const primaryContrastText = "#FFFFFF";
const secondaryMain = "#161C2D";
const backgroundColorMain = "#ffffff";
const grey100 = "#8F98A5";
const grey200 = "#94A3B8";

const theme = createTheme({
  typography: {
    fontFamily: ["League Spartan", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryMain,
      contrastText: primaryContrastText,
    },
    secondary: {
      main: secondaryMain,
    },
    divider: primaryMain,
    background: {
      default: backgroundColorMain,
      paper: backgroundColorMain,
    },
    grey: {
      "100": grey100,
      "200": grey200,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: grey100,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: grey100,
        },
        root: {
          color: primaryContrastText,
          borderRadius: 16,
          ":hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryMain,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: secondaryMain,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          color: secondaryMain,
          border: "1px solid " + grey100,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: primaryContrastText,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: "0px 16px",
          borderRadius: 8,
          backgroundColor: "#ff9a9a29",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 300,
          height: 70,
          fontSize: 20,
          fontWeight: 600,
          color: primaryContrastText,

          [theme.breakpoints.down("md")]: {
            height: 60,
            fontSize: 18,
          },
        }),
        containedPrimary: {
          background: primaryMain,
          borderRadius: 50,
          color: primaryContrastText,
        },
        outlinedPrimary: {
          border: "1px solid " + primaryMain,
          borderRadius: 50,
          color: secondaryMain,
        },
        text: {
          width: "fit-content",
          height: "auto",
          fontSize: "inherit",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(8px)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: "#777",
        },
      },
    },
  },
});

export default theme;
