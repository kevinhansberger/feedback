import React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import weakMemoize from '@emotion/weak-memoize';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Frame from './Frame';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '~/theme';

const cache = weakMemoize((container: HTMLElement) => {
  return createCache({ key: 'frame-css', container: container });
});

function EmotionProvider({ children, $head }) {
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
