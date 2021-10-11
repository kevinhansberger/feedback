import DashboardLayout from '~/components/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';
import ResponsesTable from '~/components/ResponsesTable';

export default function DashboardPage() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <ResponsesTable />
      </Container>
    </Box>
  )
}

DashboardPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
