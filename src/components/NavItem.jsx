import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, ListItem } from '@mui/material'

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props
  const location = useLocation()
  const active = href ? location.pathname === href : false
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate(href)
  }

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 1.5,
        px: 2
      }}
      {...others}
    >
      <Button
        onClick={handleClickButton}
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && '#fff',
          color: active ? 'primary.main' : '#fff',
          fontWeight: active && 'fontWeightBold',
          justifyContent: 'flex-start',
          px: 3,
          pt: 1,
          pb: 1,
          borderRadius: '10px',
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '& .MuiButton-startIcon': {
            color: active ? 'primary.main' : 'neutral.400'
          },
          '&:hover': {
            color: 'primary.main',
            backgroundColor: '#fff'
          }
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
}
