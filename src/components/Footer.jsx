import React from 'react'
import { Box, Typography } from '@mui/material'

function Footer () {
  return (
    <Box
      sx={{
        mt: '50px',
        minWidth: '600px',
        height: '120px !important',
        backgroundColor: '#F4F4F4',
        pt: '20px'
      }}
    >
      <Box sx={{ mt: '19px', textAlign: 'center' }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: '1.4em', color: '#2A2A2A', mb: '20px' }}
        >
          ©Copyright
        </Typography>
      </Box>
      <Typography
        component="p"
        variant="p"
        sx={{
          fontSize: '12px',
          mt: '6px',
          textAlign: 'center',
          color: '#787878'
        }}
      >
        Copyright © 2021 Carlos Muñoz. All Rights Reserved
      </Typography>
    </Box>
  )
}

export default Footer
