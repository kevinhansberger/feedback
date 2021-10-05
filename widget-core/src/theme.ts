import { createTheme, ThemeOptions } from '@mui/material';

const defaultTheme = createTheme();

const palette = {
  primary: {
    main: '#1683FC',
    light: '#DFEEFF',
    dark: '#036ADC'
  }
};

const themeOptions: ThemeOptions = {
  palette: {
    ...palette
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minWidth: 112,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0
        },
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        }
      }
    }
  }
};

export const theme = createTheme(themeOptions);
