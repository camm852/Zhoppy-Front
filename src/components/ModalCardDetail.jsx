import React from 'react'
import findIndexElement from '../utils/findIndexElement'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../redux/slices/modalCardDetail'
import { add } from '../redux/slices/cartSlice'
import {
  Fade,
  Modal,
  Box,
  styled,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Typography
} from '@mui/material'

function ModalCardDetail () {
  const { visible: cardDetailVisible, value: cardDetails } = useSelector(
    (state) => state.detail
  )
  const shoesRedux = useSelector((state) => state.cart.value)

  const dispatch = useDispatch()

  const handleCloseModalCardDetail = () => {
    dispatch(close())
  }

  const CardStyle = styled(Card)(({ theme }) => ({
    '&': {
      marginTop: '10px',
      boxShadow: 'none',
      minWidth: 250
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '30px'
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '30px'
    }
  }))

  const modalStyle = {
    outlineStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
  }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={cardDetailVisible}
      onClose={handleCloseModalCardDetail}
      closeAfterTransition
      sx={{ fontWeight: '500' }}
    >
      <Fade in={cardDetailVisible} timeout={500}>
        <Box sx={modalStyle}>
          <CardStyle sx={{ maxWidth: 345 }}>
            {cardDetailVisible ? (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <CardHeader
                  title={cardDetails.shoe.name + ' $' + cardDetails.shoe.price}
                />
                <CardMedia
                  component="img"
                  image={`${cardDetails.shoe.image.url}`}
                  sx={{
                    width: '300px',
                    height: '250px',
                    objectFit: 'contain'
                  }}
                  alt={cardDetails.shoe.name}
                />
                <CardContent
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardDetails.shoe.description}
                  </Typography>
                </CardContent>

                <CardActions disableSpacing sx={{ mb: '20px' }}>
                  <Button
                    variant="contained"
                    size="fullwidth"
                    sx={{
                      boxShadow: 'none !important',
                      textTransform: 'capitalize',
                      minWidth: '200px'
                    }}
                    onClick={() => {
                      if (
                        findIndexElement(
                          shoesRedux,
                          cardDetails.shoe.idShoe
                        ) === -1
                      ) {
                        dispatch(add({ ...cardDetails.shoe, cant: 1 }))
                      }
                    }}
                  >
                    {findIndexElement(shoesRedux, cardDetails.shoe.idShoe) !==
                    -1
                      ? 'Is added'
                      : 'Add to cart'}
                  </Button>
                </CardActions>
              </Box>
            ) : (
              ''
            )}
          </CardStyle>
        </Box>
      </Fade>
    </Modal>
  )
}
export default ModalCardDetail
