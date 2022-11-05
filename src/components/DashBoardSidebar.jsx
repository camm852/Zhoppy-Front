import * as React from 'react'
import PropTypes from 'prop-types'
import profileLogo from '../assets/images/profile.png'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { NavItem } from './NavItem'
import { useAuth } from '../context/Auth'
import { pathsAdmin, pathsUser } from '../assets/userRoutes'
import {
  Button,
  Toolbar,
  List,
  AppBar,
  Box,
  Drawer,
  CssBaseline
} from '@mui/material'

const drawerWidth = 260

function DashBoardSidebar (props) {
  const { children } = props
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { user, signOut } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const logout = () => {
    signOut()
  }

  const drawer = (
    <Box sx={{ mt: 10 }}>
      <Toolbar />
      <List>
        {(user.idRol === 2 &&
          pathsUser.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))) ||
          (user.idRol === 1 &&
            pathsAdmin.map((item) => (
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            )))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#fff',
          boxShadow: '0px 1px 4px rgb(100 116 139 / 12%)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: '#000' }} />
          </IconButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Box component="img" src={profileLogo} sx={{ width: '40px' }}></Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      >
        {
          //* *Drawner mobile */
        }

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.main'
            }
          }}
        >
          {drawer}
          <Box
            sx={{
              widht: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                color: '#fff',
                fontWeight: 'fontWeightBold',
                justifyContent: 'flex-start',
                px: 3,
                pt: 1,
                pb: 1,
                borderRadius: '10px',
                textAlign: 'left',
                textTransform: 'none',
                width: '50px',
                marginRight: '10px',
                '& .MuiButton-startIcon': {
                  color: 'neutral.400'
                },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#fff'
                }
              }}
            ></Button>
          </Box>
        </Drawer>

        {
          //* *Drawner pc*/
        }
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.main'
            }
          }}
          open
        >
          {drawer}
          <Box
            sx={{
              widht: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: { xl: '180px' }
            }}
          >
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                color: '#fff',
                fontWeight: 'fontWeightBold',
                justifyContent: 'flex-start',
                px: 3,
                pt: 1,
                pb: 1,
                borderRadius: '10px',
                textAlign: 'left',
                textTransform: 'none',
                width: '50px',
                marginRight: '10px',
                '& .MuiButton-startIcon': {
                  color: 'neutral.400'
                },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#fff'
                }
              }}
            ></Button>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

DashBoardSidebar.propTypes = {
  window: PropTypes.func
}

export default DashBoardSidebar
