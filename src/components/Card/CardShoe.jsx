import React from 'react'
import { useDispatch } from 'react-redux'
import { open } from '../../redux/slices/modalCardDetail'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography
} from '@mui/material'

const CardStyle = styled(Card)(({ theme }) => ({
  '&:hover': {},
  '&': {
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '10px',
    maxWidth: 250
  },
  [theme.breakpoints.up('lg')]: {
    marginLeft: '30px'
  },
  [theme.breakpoints.down('lg')]: {
    marginLeft: '30px'
  }
}))

export default function CardShoe ({ shoe }) {
  const dispatch = useDispatch()

  return (
    <CardStyle
      onClick={() => dispatch(open({ shoe }))}
      sx={{ padding: 2, height: '300px' }}
    >
      <CardMedia
        component="img"
        image={`${shoe.image.url}`}
        sx={{ height: '150px', width: '200px', objectFit: 'contain' }}
        alt={shoe.name}
      />
      <CardContent>
        <Box sx={{ position: 'relative', height: '70px' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ mt: '20px', position: 'absolute' }}
          >
            {shoe.name}
          </Typography>
        </Box>
        <Typography
          variant="p"
          component="div"
          color="text.main"
          sx={{ mt: '40px' }}
        >
          {`$ ${shoe.price}`}
        </Typography>
      </CardContent>
    </CardStyle>
  )
}
