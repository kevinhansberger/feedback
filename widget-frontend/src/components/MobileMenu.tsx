import React from 'react';
import NextLink from 'next/link';
import { Box, Button, List, ListItem, ListItemText, Link } from '@mui/material';

export default function MobileMenu() {
  return (
    <nav>
      <List component="div" disablePadding>
        <NextLink passHref href={`/login`}>
          <ListItem button component={Link}>
            <ListItemText primary="Sign in" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
          </ListItem>
        </NextLink>
      </List>
      <Box sx={{ p: 2 }}>
        <NextLink passHref href={`/install`}>
          <Button fullWidth variant="contained" color="primary" size="large">
            Add to your site
          </Button>
        </NextLink>
      </Box>
    </nav>
  )
}
