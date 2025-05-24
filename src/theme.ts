'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: true,
  
  typography: {
    fontFamily: 'var(--font-roboto)',
    h1: { fontWeight: 600, fontSize: '2.5rem' },
    h2: { fontWeight: 500, fontSize: '2rem' },
    h3: { fontWeight: 500, fontSize: '1.75rem' },
    h4: { fontWeight: 500, fontSize: '1.5rem' },
    h5: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },

  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
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
          borderRadius: 6,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--mui-background-default)',
        },
      },
    },
  },
});
