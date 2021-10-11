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
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '~/constants';
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
          <link rel="shortcut icon" type="image/x-icon" href={`/favicon.ico`} />
          <link rel="icon" type="image/x-icon" href={`/favicon.ico`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`/favicon-16x16.png`} />
          <link rel="manifest" href={`/site.webmanifest`} />
        </Head>
        <DefaultSeo
          title={APP_NAME}
          description={APP_DESCRIPTION}
          openGraph={{
            url: APP_URL,
            title: APP_NAME,
            site_name: APP_NAME,
            description: APP_DESCRIPTION,
            images: [
              {
                url: APP_URL + '/social.jpg',
                width: 800,
                height: 400,
                alt: APP_NAME
              }
            ]
          }}
          twitter={{
            handle: '@drmzio',
            site: '@widgetscripts',
            cardType: 'summary_large_image'
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
