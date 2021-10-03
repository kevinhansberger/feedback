import { createTheme, ThemeOptions } from '@mui/material';

const defaultTheme = createTheme();

const palette = {
  primary: {
    main: '#304ffe',
    light: '#F0F2FF'
  }
};

export const themeOptions: ThemeOptions = {
  palette: {
    ...defaultTheme.palette,
    ...palette
  },
  shape: {
    borderRadius: 6
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-primary-main': palette.primary.main,
          '--color-primary-light': palette.primary.light,
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        dense: {
          [defaultTheme.breakpoints.up('sm')]: {
            paddingLeft: defaultTheme.spacing(1),
            paddingRight: defaultTheme.spacing(1),
          }
        }
      }
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      }
    }
  }
};

export const theme = createTheme(themeOptions);
