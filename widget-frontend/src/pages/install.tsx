import { Box, Container, Typography } from '@mui/material';
import InstallSteps from '~/components/InstallSteps';
import Page from '~/components/Page';

export default function InstallPage() {
  return (
    <Page title="Install" description="Learn how to install the widget on your site.">
      <Box component="section" sx={{ py: { xs: 4, sm: 8 } }}>
        <Container maxWidth="sm">
          <Typography gutterBottom component="h1" sx={{ typography: { xs: 'h4', md: 'h3' } }}>
            Installation
          </Typography>
          <Typography gutterBottom component="p" variant="subtitle1" color="grey.700">
            Follow the installation steps below to start receiving customer feedback for your site.
          </Typography>
          <InstallSteps />
        </Container>
      </Box>
    </Page>
  )
}
