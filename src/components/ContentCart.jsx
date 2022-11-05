import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch } from 'react-redux'
import { decrease, deleteShoe, increase } from '../redux/slices/cartSlice'
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  IconButton
} from '@mui/material'

export default function ContentCart (props) {
  const dispatch = useDispatch()

  const CardStyle = styled(Card)(({ theme }) => ({
    '&': {
      minWidth: '250px',
      border: 'none !important',
      boxShadow: 'none !important'
    }
  }))
  return (
    <CardStyle>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Box>
          <CardContent sx={{ mb: -3 }}>
            <Box sx={{ display: 'block' }}>
              <Typography gutterBottom variant="h5" component="div">
                {props.shoe.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'block', mb: '15px' }}>
              <Typography gutterBottom variant="p" component="div">
                Cant: {`${props.shoe.cant}  `}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                Total: {`$ ${props.shoe.price * props.shoe.cant}  `}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ width: '130px' }}>
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                dispatch(deleteShoe(props.index))
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                dispatch(increase(props.index))
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              onClick={() => {
                dispatch(decrease(props.index))
              }}
            >
              <RemoveIcon />
            </IconButton>
          </CardActions>
        </Box>
        <Box sx={{ p: 2 }}>
          <CardMedia
            component="img"
            image={`${props.shoe.image.url}`}
            sx={{ objectFit: 'contain', width: '80px', height: '80px' }}
          />
        </Box>
      </Box>
    </CardStyle>
  )
}
