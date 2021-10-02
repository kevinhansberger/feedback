import Box from '@mui/material/Box';

export default function Emoji({ children }) {
  return (
    <Box sx={{ fontSize: 28, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
      {children}
    </Box>
  )
}