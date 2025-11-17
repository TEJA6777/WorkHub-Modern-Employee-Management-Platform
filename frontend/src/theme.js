import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d9488',
      dark: '#0a7066',
      light: '#14b8a6',
    },
    secondary: {
      main: '#2dd4bf',
      light: '#a7f3d0',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#fbbf24',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#06b6d4',
    },
    background: {
      default: '#f0fdf4',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          borderRadius: '8px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(13, 148, 136, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid #e0e7ff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(13, 148, 136, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            transition: 'all 0.3s ease',
            '&:hover fieldset': {
              borderColor: '#0d9488',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0d9488',
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
});

export default theme;
