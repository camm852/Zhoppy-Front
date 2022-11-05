import React from 'react'
import FormSignUp from '../components/FormSignUp'
import Header from '../components/Header'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { Avatar, CssBaseline, Box, Typography, Container } from '@mui/material'

export default function SignUp () {
  React.useEffect(() => {
    document.title = 'Sign Up'
  }, [])

  const location = useLocation()

  const userProvider = useAuth()

  return userProvider.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Box sx={{ height: '100vh' }}>
      <Header showSearch={false} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minWidth: '590px !important'
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Avatar sx={{ m: 0.5, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: '700' }}>
            Sign up
          </Typography>
          {
            //* FormSignUp
          }
        </Box>
        <FormSignUp />
      </Container>
    </Box>
  )
}
