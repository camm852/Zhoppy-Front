import React from 'react'
import FormProvider from './FormProvider'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { open, close } from '../../redux/slices/modalProvider'

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

const ProviderListToolbar = () => {
  const { visible } = useSelector((state) => state.provider)
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
          Providers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            color="primary"
            variant="contained"
            sx={{ fontWeight: '600' }}
            onClick={handleOpen}
          >
            Provider
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
                <FormProvider />
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </Box>
  )
}

export default ProviderListToolbar
