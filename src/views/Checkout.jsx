import React from 'react'
import Header from '../components/Header'
import CardCheckout from '../components/Card/CardCheckout'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export default function Checkout () {
  React.useEffect(() => {
    document.title = 'Checkout'
  }, [])

  const shoesRedux = useSelector((state) => state.cart.value)

  const paddingTop = '30px'

  let total = 0

  return (
    <Box>
      <Header />
      <Box sx={{ p: '30px 40px' }}>
        <Box sx={{ mt: '50px' }}>
          <Typography component="h3" variant="h6">
            There are {shoesRedux.length} on the cart
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={10} lg={9} xl={11}>
            <Box
              sx={{
                pt: paddingTop,
                minWidth: '570px',
                height: '50vh',
                overflowY: 'auto'
              }}
            >
              {shoesRedux.map((shoe, i) => {
                return (
                  <Box key={shoe.idShoe} sx={{ minWidht: '200px' }}>
                    <CardCheckout shoe={shoe} index={i} />
                  </Box>
                )
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={2} lg={3} xl={1} sx={{ pl: '20px' }}>
            <Box
              sx={{
                height: '50px',
                borderRadius: '15px',
                backgroundColor: (theme) => theme.palette.primary.main,
                textAlign: 'center',
                lineHeight: '50px'
              }}
            >
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: '#fff',
                  verticalAlign: 'middle'
                }}
              >
                Total
              </Typography>
            </Box>
            <Typography
              component="h3"
              variant="h5"
              sx={{ m: '100px', fontSize: '1.5rem' }}
            >
              {shoesRedux.forEach((shoe, i) => {
                total += parseInt(shoe.cant, 10) * parseInt(shoe.price, 10)
              })}
              $ {total}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
