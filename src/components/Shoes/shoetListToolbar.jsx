import React from 'react'
import FormShoe from './FormShoe'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { Box, Button, Typography, Modal, Fade } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { close, open } from '../../redux/slices/modalShoe'

const style = {
  position: 'absolute',
  borderRadius: '30px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export const ProductListToolbar = () => {
  const { visible } = useSelector((state) => state.shoe)
  const dispatch = useDispatch()

  const handleOpen = () => dispatch(open(true))
  const handleClose = () => dispatch(close(false))

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{
            m: 1,
            fontFamily: 'Roboto Serif, sans-serif',
            fontWeight: 'Bold'
          }}
          variant="h4"
        >
          Shoes
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            color="primary"
            variant="contained"
            sx={{ fontWeight: '600' }}
            onClick={handleOpen}
          >
            Shoe
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={visible}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={visible} timeout={500}>
              <Box sx={style}>
                <FormShoe />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </Box>
  )
}
