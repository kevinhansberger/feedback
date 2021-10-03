import { Box, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

export default function MobileMenu() {
  return (
    <nav>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="How it works" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Features" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="About" primaryTypographyProps={{ style: { fontWeight: 500 } }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="contained" color="primary" size="large">
          Add to your site
        </Button>
      </Box>
    </nav>
  )
}
