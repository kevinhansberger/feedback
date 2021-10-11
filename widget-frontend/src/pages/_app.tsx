import { ReactElement, ReactNode } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import NProgress from 'nprogress';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from '~/theme';
import 'nprogress/nprogress.css';
import { APP_DESCRIPTION, APP_NAME } from '~/constants';
import createEmotionCache from '~/utils/createEmotionCache';
import DefaultLayout from '~/components/layouts/DefaultLayout';
import SessionContextProvider from '~/components/SessionContextProvider';

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

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available.
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <SessionContextProvider>
        <Head>
          <title>{APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <style>{`#nprogress .bar { z-index: 1200 !important; background: ${theme.palette.primary.main} !important; }`}</style>
          <link rel="shortcut icon" href={`/favicon.ico`} type="image/x-icon" />
          <link rel="icon" href={`/favicon.ico`} type="image/x-icon" />
        </Head>
        <DefaultSeo
          title={APP_NAME}
          description={APP_DESCRIPTION}
          twitter={{
            handle: '@drmzio',
            site: '@widgetscripts',
            cardType: 'summary'
          }}
        />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </SessionContextProvider>
    </CacheProvider>
  )
}
