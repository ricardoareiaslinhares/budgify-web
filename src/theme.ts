"use client";
import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    BG: {
      blue: string;
      lightBlue: string;
      green: string;
      purple: string;
      orange: string;
      red: string;
      grey: string;
      lightGrey: string;
      blueTabName: string;
      blueTab: string;
      blue30: string;
      green30: string;
      purple30: string;
      orange30: string;
      red30: string;
    };
  }
  interface PaletteOptions {
    BG?: {
      blue?: string;
      lightBlue?: string;
      green?: string;
      purple?: string;
      orange?: string;
      red?: string;
      grey?: string;
      lightGrey?: string;
      blueTabName?: string;
      blueTab?: string;
      blue30?: string;
      green30?: string;
      purple30?: string;
      orange30?: string;
      red30?: string;
    };
  }
}

const getCSSVar = (varName: string) => `var(${varName})`;

export const theme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: "var(--font-roboto)",
    h1: { fontWeight: 600, fontSize: "2.5rem" },
    h2: { fontWeight: 500, fontSize: "2rem" },
    h3: { fontWeight: 500, fontSize: "1.75rem" },
    h4: { fontWeight: 500, fontSize: "1.5rem" },
    h5: { fontWeight: 500, fontSize: "1.25rem" },
    h6: { fontWeight: 500, fontSize: "1rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },

  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#F7FBFF",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    BG: {
      blue: getCSSVar("--bg-blue"),
      lightBlue: getCSSVar("--bg-light-blue"),
      green: getCSSVar("--bg-green"),
      purple: getCSSVar("--bg-purple"),
      orange: getCSSVar("--bg-orange"),
      red: getCSSVar("--bg-red"),
      grey: getCSSVar("--bg-grey"),
      lightGrey: getCSSVar("--bg-light-grey"),
      blueTabName: getCSSVar("--bg-blue-tab-name"),
      blueTab: getCSSVar("--bg-blue-tab"),
      blue30: getCSSVar("--bg-blue-30"),
      green30: getCSSVar("--bg-green-30"),
      purple30: getCSSVar("--bg-purple-30"),
      orange30: getCSSVar("--bg-orange-30"),
      red30: getCSSVar("--bg-red-30"),
    },
  },
  shape: {
    borderRadius: 8,
  },

  // Components (global overrides)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //textTransform: 'none', // Prevent uppercase buttons
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
          borderRadius: 40,
          backgroundColor: '#F7FBFF', // Input background
          color: '#000000',
          '& fieldset': {
            borderColor: '#ccc',
          },
        },
        }
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--mui-background-default)",
        },
      },
    },
  },
});
