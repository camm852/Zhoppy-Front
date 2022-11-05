import React from 'react'
import Carousel from 'react-elastic-carousel'
import CardShoe from '../../components/Card/CardShoe'
import Header from '../../components/Header'
import brahma from '../../assets/images/bannerWebBrahma.jpg'
import precios from '../../assets/images/bannerWebPrecios.jpg'
import ultimos from '../../assets/images/bannerWebUltimos.jpg'
import creditCart from '../../assets/images/creditCard.svg'
import box from '../../assets/images/box.svg'
import shield from '../../assets/images/shield.svg'
import ShowAllShoes from './HomeShowAll'
import Footer from '../../components/Footer'
import HouseIcon from '@mui/icons-material/House'
import ModalCardDetail from '../../components/ModalCardDetail'
import theme from '../../utils/theme'
import clientAxios from '../../utils/clientAxios'
import { Box, Button, Grid, ThemeProvider, Typography } from '@mui/material'

const items = [brahma, precios, ultimos]

export default function Home () {
  React.useEffect(() => {
    document.title = 'Home'
  }, [])

  const [showAll, setShowAll] = React.useState(false)
  const [shoes, setShoes] = React.useState([])
  const carouselImagesRef = React.useRef(null)

  React.useEffect(() => {
    const getShoes = async () => {
      const response = await clientAxios.get('/shoes/home')
      response.status === 200 ? setShoes(response.data) : setShoes([])
    }
    getShoes()
  }, [])

  // Actions
  const handleShowAllShoes = () => setShowAll(true)
  const handleComeBack = () => setShowAll(false)

  // Object

  const breakpointsCarousel = [
    { width: theme.breakpoints.values.xs, itemsToShow: 2 },
    { width: theme.breakpoints.values.sm, itemsToShow: 3 },
    { width: theme.breakpoints.values.md, itemsToShow: 4 },
    { width: theme.breakpoints.values.lg, itemsToShow: 5 }
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header showSearch={showAll} />
        <ModalCardDetail />
        {showAll ? (
          <Box sx={{ paddingTop: '40px' }}>
            <Box sx={{ minWidth: '600px' }}>
              <Typography sx={{ textAlign: 'center' }}>
                <Button
                  startIcon={<HouseIcon />}
                  variant="contained"
                  sx={{
                    boxShadow: 'none',
                    textTransform: 'capitalize',
                    '&:hover': { boxShadow: 'none' }
                  }}
                  onClick={handleComeBack}
                >
                  Come back main page
                </Button>
              </Typography>
            </Box>
            <Box sx={{ mt: '20px' }}>
              <ShowAllShoes shoes={shoes} />
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down('md')]: {
                  display: 'none'
                }
              })}
            >
              <Carousel
                ref={carouselImagesRef}
                showArrows={false}
                enableAutoPlay
                autoPlaySpeed={1500} // same time
                onNextEnd={({ index }) => {
                  if (index + 1 === 3) {
                    setTimeout(() => {
                      carouselImagesRef.current.goTo(0)
                    }, 1500) // same time
                  }
                }}
              >
                {items.map((item, i) => {
                  return <img alt="" key={i} src={item} />
                })}
              </Carousel>
            </Box>

            <Box
              sx={{
                pb: 2,

                mt: '20px'
              }}
            >
              {/* Recently added */}

              <Box
                sx={{
                  backgroundColor: '#F4F4F4',
                  padding: '20px 0',
                  minWidth: '600px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    mb: '30px'
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Recently added
                  </Typography>
                </Box>
                <Box sx={{ minWidth: '600px' }}>
                  <Carousel
                    breakPoints={breakpointsCarousel}
                    disableArrowsOnEnd={false}
                    itemsToScroll={4}
                    itemsToShow={4}
                  >
                    {shoes.map((shoe, i) => {
                      return <CardShoe key={shoe.idShoe} shoe={shoe} />
                    })}
                  </Carousel>
                </Box>
              </Box>

              {/* Bidding */}

              <Box
                sx={{
                  padding: '20px 0',
                  mt: '20px',
                  minWidth: '600px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    mb: '30px'
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Bidding
                  </Typography>
                </Box>
                <Box sx={{ minWidth: '600px' }}>
                  <Carousel
                    breakPoints={breakpointsCarousel}
                    disableArrowsOnEnd={false}
                    itemsToScroll={4}
                    itemsToShow={4}
                  >
                    {shoes.map((shoe, i) => {
                      return <CardShoe key={shoe.idShoe} shoe={shoe} />
                    })}
                  </Carousel>
                </Box>
              </Box>

              {/* Best sellers */}

              <Box
                sx={{
                  backgroundColor: '#F4F4F4',
                  padding: '20px 0',
                  mt: '50px',
                  minWidth: '600px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    mb: '30px'
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Best sellers
                  </Typography>
                </Box>
                <Box sx={{ minWidth: '600px' }}>
                  <Carousel
                    breakPoints={breakpointsCarousel}
                    disableArrowsOnEnd={false}
                    itemsToScroll={4}
                    itemsToShow={4}
                  >
                    {shoes.map((shoe, i) => {
                      return <CardShoe key={shoe.idShoe} shoe={shoe} />
                    })}
                  </Carousel>
                </Box>
              </Box>
            </Box>

            {/* Show all shoes */}

            <Box
              sx={{
                mt: '50px',
                mb: '50px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button
                variant="contained"
                sx={{ boxShadow: 'none', textTransform: 'capitalize' }}
                onClick={handleShowAllShoes}
              >
                Show All Shoes
              </Button>
            </Box>

            {/* Information */}

            <Box
              sx={{
                padding: '20px 0',
                minWidth: '600px'
              }}
            >
              <Grid container>
                <Grid item xs={4} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img alt="" src={creditCart} />
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                      padding: '20px 10px 0 10px'
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ color: '#3D3D3D' }}
                    >
                      Free shipping over $70,000
                    </Typography>
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        fontSize: '12px',
                        mt: '6px',
                        color: '#787878',
                        px: '10px'
                      }}
                    >
                      Just by being registered in Mercado Libre, you have free
                      shipping on thousands of selected products.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img alt="" src={box} />
                  </Box>
                  <Box sx={{ textAlign: 'center', pt: '20px' }}>
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{ color: '#3D3D3D' }}
                    >
                      Payment by card
                    </Typography>
                    <Typography
                      component="p"
                      variant="p"
                      sx={{
                        fontSize: '12px',
                        mt: '6px',
                        color: '#787878',
                        px: '10px'
                      }}
                    >
                      pay in installments and take advantage of the comfort of
                      financing that your bank gives you, or do it with cash at
                      payment points. And its always safe!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Box sx={{ textAlign: 'center', ml: '50px' }}>
                    <img alt="" src={shield} />
                    <Box sx={{ textAlign: 'center', pt: '20px' }}>
                      <Typography
                        component="h1"
                        variant="h5"
                        sx={{ color: '#3D3D3D' }}
                      >
                        Security, from start to finish
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        sx={{
                          fontSize: '12px',
                          mt: '6px',
                          color: '#787878',
                          px: '15px'
                        }}
                      >
                        You do not like? Return it! In Mercado Libre, there is
                        nothing you cannot do, because you are always protected.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* Footer */}
            <Footer />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}
