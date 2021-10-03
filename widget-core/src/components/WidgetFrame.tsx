import React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import weakMemoize from '@emotion/weak-memoize';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Frame from './Frame';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      // main: '#3d5afe',
      main: '#1683FC',
      light: '#DFEEFF',
      dark: '#036ADC'
    },
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
  }
});

const cache = weakMemoize((container: HTMLElement) => {
  return createCache({ key: 'frame-css', container: container });
});

function EmotionProvider({ children, $head }) {
  //const { cache } = createEmotion({ key: 'frame-css', container: $head });

  return (
    <CacheProvider value={cache($head)}>
      {children}
    </CacheProvider>
  )
}

function WidgetFrame({ children, ...rest }) {
  return (
    <Frame
      head={
        <>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </>
      }
      {...rest}
    >
      {({ $document }) => (
        <EmotionProvider $head={$document.head}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </EmotionProvider>
      )}
    </Frame>
  )
}

export default styled(WidgetFrame)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%'
}));
