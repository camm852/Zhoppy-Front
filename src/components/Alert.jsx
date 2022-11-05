import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Alert ({ error, children }) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        bgcolor: !error ? 'success.main' : 'error.main',
        textAlign: 'center',
        padding: '5px'
      }}
    >
      <Typography
        variant="span"
        component="span"
        sx={{ fontWeight: 'bold', color: 'white', fontSize: '1rem' }}
      >
        {children}
      </Typography>
    </Box>
  )
}
