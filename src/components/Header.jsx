import React from 'react'
import styled from '@mui/styled-engine'
import SearchIcon from '@mui/icons-material/Search'
import theme from '../utils/theme'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import {
  Avatar,
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography
} from '@mui/material'

export default function Header ({ showSearch }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const SearchInput = styled(InputBase)({})

  const isLoggin = (user) => {
    if (user) {
      return (
        <Avatar
          src="/broken-image.jpg"
          sx={{ bgcolor: '#1976d2', color: '#fff' }}
        />
      )
    } else {
      return 'Login'
    }
  }

  const navigateRender = () => {
    if (user) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  return (
    <Box>
      {/* App bar es la barra completa del header */}
      <AppBar position="static" sx={{ minWidth: '600px' }}>
        <Toolbar>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 3, sm: 2, md: 3 }}
          >
            {/* Icono */}

            <Grid item xs={4} sm={3} md={2} lg={4} xl={4}>
              <Box
                sx={{
                  ml: '20%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingTop: '5px'
                }}
              >
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ cursor: 'pointer', fontSize: '1.8em' }}
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  Zhoppy
                </Typography>
              </Box>
            </Grid>

            {/* Barra de busqueda  */}

            <Grid item xs={5} sm={7} md={6} lg={5} xl={4}>
              <Box sx={{ display: 'flex', aligItems: 'center' }}>
                {showSearch && (
                  <>
                    <SearchInput
                      sx={{
                        color: '#fff',
                        width: '600px',
                        minWidth: '150px'
                      }}
                      placeholder="Buscar..."
                    />
                    <IconButton
                      type="submit"
                      sx={{ p: '10px', color: '#fff' }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                    <Divider
                      sx={{ height: 28, m: 0.5, backgroundColor: '#fff' }}
                      orientation="vertical"
                    />
                  </>
                )}
              </Box>
            </Grid>

            {/* Iconos */}

            <Grid
              item
              xs={3}
              sm={2}
              md={4}
              lg={3}
              xl={4}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              className="grid-buttons"
            >
              {/* Carrito */}

              <Cart />

              {/* Icono usuario / login */}

              <Button
                color="inherit"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    fontSize: '.65em'
                  },
                  fontSize: '.8em',
                  mr: '1%',
                  ml: '10px',
                  fontWeight: 'bold'
                }}
                onClick={navigateRender}
                className="cartIcon"
              >
                {isLoggin(!!user)}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
