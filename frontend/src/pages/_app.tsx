import Router from 'next/router';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from '~/theme';

import 'nprogress/nprogress.css';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '~/util/createEmotionCache';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Feedback Widget</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>{`#nprogress .bar { z-index: 1200 !important; background: ${theme.palette.primary.main} !important; }`}</style>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
