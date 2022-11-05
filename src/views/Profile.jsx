import React from 'react'
import DashBoardSidebar from '../components/DashBoardSidebar'
import { useAuth } from '../context/Auth'
import { AccountProfile } from '../components/Account/accountProfile'
import { AccountProfileDetails } from '../components/Account/accountProfileDetails.jsx'
import { Box, Container, Grid, Typography } from '@mui/material'

export default function User () {
  React.useEffect(() => {
    document.title = 'Profile'
  }, [])

  const { user } = useAuth()

  if (!user) return

  return (
    <DashBoardSidebar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashBoardSidebar>
  )
}
