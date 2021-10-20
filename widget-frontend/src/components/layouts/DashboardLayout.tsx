import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import logoSvg from '~/assets/logo.svg';
import { supabase } from '~/utils/supabaseClient';
import { useSession } from '~/context';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const session = useSession();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    } else {
      router.push('/login');
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'grey.50'
      }}
    >
      <AppBar component="div" color="default" sx={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'divider' }}>
        <Container>
          <Toolbar variant="dense">
            <NextLink href={`/`}>
              <a style={{ width: 'auto', height: 38 }}>
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
            <Tooltip title="Sign out">
              <IconButton onClick={handleSignOut}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar variant="dense" />
      <main>
        {children}
      </main>
    </Box>
  )
}
