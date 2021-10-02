import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import logoSvg from '~/assets/logo.svg';
import DemoWidget from '~/components/DemoWidget';
import { APP_NAME, APP_DESCRIPTION } from '~/constants';
import {
  AppBar, Box, Button, Container, Grid, Link, Stack, Typography, Toolbar, IconButton, Popover, SvgIcon
} from '@mui/material';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MobileMenu from '~/components/MobileMenu';

function MainHeader({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar color="default" sx={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'divider' }}>
        {children}
      </AppBar>
    </Slide>
  )
}

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuOpened = Boolean(anchorEl);

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
      </Head>
      <MainHeader>
        <Container>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <NextLink href={`/`}>
              <a style={{ width: 'auto', height: 48 }}>
                <img
                  src={logoSvg.src}
                  width={logoSvg.width}
                  height={logoSvg.height}
                  alt="Logo"
                  style={{ width: 'inherit', height: 'inherit' }}
                />
              </a>
            </NextLink>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack component="nav" direction="row" spacing={4} alignItems="center">
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontWeight: 500, color: 'grey.800', fontSize: 17, '&:hover': { color: 'primary.main' } }}
                >
                  How it works
                </Link>
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontWeight: 500, color: 'grey.800', fontSize: 17, '&:hover': { color: 'primary.main' } }}
                >
                  Features
                </Link>
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontWeight: 500, color: 'grey.800', fontSize: 17, '&:hover': { color: 'primary.main' } }}
                >
                  About
                </Link>
                <Button variant="contained" color="primary" size="large" href="#">
                  Add to your site
                </Button>
              </Stack>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleClickMenu}
                sx={{ backgroundColor: 'action.hover' }}
              >
                <MenuIcon />
              </IconButton>
              <Popover
                open={menuOpened}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: { width: '100%', position: 'relative' }
                }}
              >
                <AppBar position="static" color="transparent">
                  <Toolbar>
                    <NextLink href={`/`}>
                      <Link sx={{ height: { xs: 42, md: 48 } }}>
                        <img
                          src={logoSvg.src}
                          width={logoSvg.width}
                          height={logoSvg.height}
                          alt="Logo"
                          style={{ width: 'auto', height: 'inherit' }}
                        />
                      </Link>
                    </NextLink>
                  </Toolbar>
                </AppBar>
                <MobileMenu />
                <IconButton
                  color="inherit"
                  onClick={handleCloseMenu}
                  aria-label="close"
                  sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, margin: 2, backgroundColor: 'action.hover' }}
                >
                  <CloseIcon />
                </IconButton>
              </Popover>
            </Box>
          </Toolbar>
        </Container>
      </MainHeader>
      <Toolbar />
      <main>
        <Box component="section" style={{ overflow: 'hidden' }}>
          <Container>
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={6} sx={{ my: 4 }} style={{ position: 'relative' }}>
                <Box sx={{ mb: 4 }}>
                  <Typography component="h2" sx={{ mb: 2, typography: { xs: 'h4', md: 'h3' } }} style={{ letterSpacing: '-1px' }}>
                    Find out what customers think about your site
                  </Typography>
                  <Typography component="p" variant="subtitle1" color="grey.700">
                    Our modern privacy-focused widget is a simple and straight-forward way to capture feedback from users browsing your site.
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" size="large">
                  Add to your site
                </Button>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <svg width="237" height="86" viewBox="0 0 237 86" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: -80, marginRight: -50 }}>
                    <path d="M14.301 20.1879L17.7285 19.7375L19.0333 29.6663L20.0209 29.5365L18.7161 19.6077L22.1437 19.1572L22.0271 18.27L14.1844 19.3006L14.301 20.1879ZM24.3367 28.9694L25.2767 28.8458L24.5883 23.6068C24.43 22.4026 25.2397 21.4098 26.5072 21.2432C26.7555 21.2106 26.9934 21.2223 27.0793 21.2218L26.9537 20.2658C26.8262 20.2772 26.6083 20.2951 26.4551 20.3152C25.4359 20.4492 24.6366 21.113 24.4168 21.9746L24.3481 21.9836L24.1843 20.7372L23.2706 20.8573L24.3367 28.9694ZM30.6419 31.2353C31.6559 31.1021 32.3242 30.4233 32.6025 29.1886L34.808 19.3572L33.7814 19.476L32.276 26.6635L32.2021 26.6732L28.8909 20.1187L27.8716 20.2527L31.932 28.0518L31.7445 28.9146C31.4566 30.1988 30.8513 30.4986 29.8558 30.3232L29.7113 31.1857C29.9132 31.2505 30.2722 31.2839 30.6419 31.2353ZM41.3044 26.7396L42.2497 26.6153L41.1837 18.5033L40.2383 18.6275L41.3044 26.7396ZM40.5357 17.1701C40.9212 17.1194 41.2031 16.7708 41.1546 16.4011C41.106 16.0314 40.7436 15.7674 40.358 15.8181C39.9725 15.8687 39.6959 16.2167 39.7445 16.5864C39.793 16.9561 40.1502 17.2207 40.5357 17.1701ZM46.5676 17.7958L44.8512 18.0213L44.5958 16.0778L43.6504 16.202L43.9058 18.1455L42.6964 18.3045L42.804 19.1231L44.0134 18.9641L44.7227 24.3616C44.8969 25.6872 46.0335 26.2417 47.0739 26.1049C47.4648 26.0536 47.7191 25.9449 47.8896 25.8527L47.5772 25.0288C47.45 25.0831 47.2859 25.1423 47.0377 25.1749C46.3986 25.2589 45.7729 25.0349 45.6389 24.0156L44.9588 18.8399L46.6752 18.6144L46.5676 17.7958ZM56.5316 24.9104C58.6336 24.6342 59.8762 22.7248 59.5514 20.2532C59.2245 17.7657 57.5308 16.2422 55.4288 16.5184C53.3269 16.7947 52.0842 18.704 52.4111 21.1915C52.7359 23.6632 54.4297 25.1866 56.5316 24.9104ZM56.4185 24.0496C54.7338 24.271 53.5952 22.8841 53.3565 21.0673C53.1177 19.2505 53.8565 17.5954 55.5413 17.374C57.226 17.1526 58.3673 18.5607 58.6061 20.3774C58.8448 22.1942 58.1033 23.8282 56.4185 24.0496ZM66.593 20.2626C66.7887 21.752 65.7745 22.7019 64.676 22.8462C63.5036 23.0003 62.5693 22.2688 62.4028 21.0013L61.7199 15.8045L60.7798 15.9281L61.4703 21.183C61.723 23.1054 62.9688 24 64.5268 23.7953C65.715 23.6391 66.4789 22.9102 66.7494 22.0258L66.8234 22.016L67.0004 23.3628L67.9404 23.2392L66.8744 15.1272L65.9343 15.2507L66.593 20.2626ZM72.261 14.4193L70.5445 14.6449L70.2891 12.7013L69.3438 12.8256L69.5992 14.7691L68.3898 14.928L68.4973 15.7466L69.7068 15.5877L70.4161 20.9852C70.5903 22.3108 71.7269 22.8652 72.7673 22.7285C73.1581 22.6771 73.4125 22.5685 73.583 22.4762L73.2706 21.6523C73.1434 21.7066 72.9792 21.7658 72.731 21.7984C72.092 21.8824 71.4662 21.6584 71.3323 20.6391L70.6521 15.4635L72.3685 15.2379L72.261 14.4193ZM75.0635 11.3003L73.9966 11.4405L75.0793 19.1474L76.0088 19.0253L75.0635 11.3003ZM75.9618 22.2657C76.3843 22.2102 76.6772 21.8225 76.6224 21.4052C76.5669 20.9827 76.1845 20.6892 75.762 20.7447C75.3447 20.7995 75.0459 21.1826 75.1014 21.6051C75.1562 22.0224 75.5446 22.3205 75.9618 22.2657Z" fill="#616161"/>
                    <path d="M56.7863 41.3822C56.4452 40.9479 55.8165 40.8725 55.3822 41.2137C54.9479 41.5549 54.8725 42.1835 55.2137 42.6178L56.7863 41.3822ZM222 42L210.462 41.553L215.844 51.769L222 42ZM55.2137 42.6178C71.6952 63.5965 125.946 92.066 214.496 47.0833L213.591 45.3001C125.686 89.9549 72.5467 61.4429 56.7863 41.3822L55.2137 42.6178Z" fill="#E0E0E0"/>
                  </svg>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <DemoWidget />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box component="section" sx={{ py: 10, backgroundColor: 'background.paper' }}>
          <Container>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
            <p>...</p>
          </Container>
        </Box>
      </main>
      <footer>
        <AppBar component="div" position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant="body2" color="action.active">
                &copy; 2021 Daniel Ramirez
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton>
                <SvgIcon>
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </SvgIcon>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </footer>
    </>
  )
}
