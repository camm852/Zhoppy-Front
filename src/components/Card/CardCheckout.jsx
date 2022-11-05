import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { CardActions, Grid, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { decrease, deleteShoe, increase } from '../../redux/slices/cartSlice'

export default function CardCheckout ({ shoe, index }) {
  const dispatch = useDispatch()

  return (
    <Card sx={{ mb: '10px', boxShadow: 'none' }}>
      <Grid container>
        <Grid item md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <CardMedia
              component="img"
              sx={{ width: '150px', height: '128px', objectFit: 'cover' }}
              image={shoe.image.url}
              alt={shoe.name}
            />
            <CardContent>
              <Typography component="div" variant="h5">
                {shoe.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {shoe.description}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Cant: {shoe.cant}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Total: ${shoe.price * shoe.cant}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item md={2}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <CardActions
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  dispatch(deleteShoe(index))
                }}
                sx={{ pl: '15px' }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  dispatch(increase(index))
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  dispatch(decrease(index))
                }}
              >
                <RemoveIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
