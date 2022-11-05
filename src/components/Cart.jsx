import React from 'react'
import ContentCart from './ContentCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import styled from '@mui/styled-engine'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IconButton, SwipeableDrawer, Badge, Box, Button } from '@mui/material'

export default function Cart () {
  const [state, setState] = React.useState({
    right: false
  })
  const navigate = useNavigate()
  const shoesRedux = useSelector((state) => state.cart.value)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setState({ right: open })
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -4,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }))

  return (
    <>
      {/* Icono Carrito */}

      <IconButton
        aria-label="cart"
        sx={{ marginRight: '5px' }}
        onClick={toggleDrawer(true)}
      >
        <StyledBadge badgeContent={shoesRedux.length} color="secondary">
          <ShoppingCartIcon sx={{ color: '#fff' }} />
        </StyledBadge>
      </IconButton>

      {/* Modal */}

      <SwipeableDrawer
        anchor={'right'}
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {/* Contenido Modal */}

        <Box
          sx={{
            width: '300px',
            height: '90vh',
            overflowY: 'auto'
          }}
        >
          {shoesRedux.map((shoe, i) => {
            return <ContentCart key={shoe.idShoe} shoe={shoe} index={i} />
          })}
        </Box>
        <Box
          sx={{
            width: '90%',
            verticalAlign: 'bottom'
          }}
        >
          {shoesRedux.length > 0 && (
            <Button
              fullWidth
              variant="contained"
              sx={{ marginLeft: '15px', padding: '10px', py: '10px' }}
              onClick={() => {
                navigate('/checkout')
              }}
            >
              Checkout
            </Button>
          )}
        </Box>
      </SwipeableDrawer>
    </>
  )
}
