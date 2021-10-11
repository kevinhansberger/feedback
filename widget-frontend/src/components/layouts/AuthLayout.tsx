import { Box } from '@mui/material';

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'grey.50'
      }}
    >
      {children}
    </Box>
  )
}
