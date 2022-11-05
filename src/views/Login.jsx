import React from 'react'
import Header from '../components/Header'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FormLogin from '../components/FormLogin'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { Avatar, CssBaseline, Box, Typography, Container } from '@mui/material'

export default function Login () {
  React.useEffect(() => {
    document.title = 'Login'
  }, [])

  const location = useLocation()
  const { user } = useAuth()

  React.useEffect(() => {
    document.title = 'Sign In'
  }, [])

  return user ? (
    <Navigate to="/profile" state={{ from: location }} replace />
  ) : (
    <>
      <Header showSearch={false} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minWidth: '600px !important'
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: '600' }}>
            Login
          </Typography>
        </Box>
        <FormLogin />
      </Container>
    </>
  )
}
