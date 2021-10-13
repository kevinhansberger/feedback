import React, { useState } from 'react';
import {
  AppBar, Box, Button, Container, IconButton, Link, Popover, Stack, SvgIcon, Toolbar, Typography
} from '@mui/material';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NextLink from 'next/link';
import logoSvg from '~/assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from '~/components/MobileMenu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MainContent = ({ ...rest }) => <Box component="main" {...rest} />;
const MainFooter = Box;

function MainHeader({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar component="div" color="default" sx={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'divider' }}>
        {children}
      </AppBar>
    </Slide>
  )
}

export default function DefaultLayout({ children }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const menuOpened = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="header" sx={{ flexShrink: 0 }}>
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
                  <NextLink passHref href={`/login`}>
                    <Link
                      underline="none"
                      sx={{ fontWeight: 500, color: 'grey.800', fontSize: 17, '&:hover': { color: 'primary.main' } }}
                    >
                      Sign in
                    </Link>
                  </NextLink>
                  <NextLink passHref href={`/install`}>
                    <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />}>
                      Add to your site
                    </Button>
                  </NextLink>
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
                  onClick={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    style: { position: 'relative' }
                  }}
                >
                  <AppBar position="static" color="transparent" sx={{ pt: 2 }}>
                    <Toolbar variant="dense">
                      <NextLink passHref href={`/`}>
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
      </Box>
      <MainContent sx={{ flex: 1 }}>
        {children}
      </MainContent>
      <MainFooter sx={{ flexShrink: 0 }}>
        <AppBar component="div" position="static" color="transparent">
          <Container>
            <Toolbar sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="body2" color="action.active">
                &copy; 2021 Daniel Ramirez &mdash; <Link href="https://twitter.com/drmzio" target="_blank" rel="noreferrer" color="inherit">@drmzio</Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton href={`https://twitter.com/widgetscripts`} target="_blank" rel="noreferrer" title="Follow us on Twitter">
                <SvgIcon>
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </SvgIcon>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </MainFooter>
    </Box>
  )
}
