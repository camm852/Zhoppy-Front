import Inventory2Icon from '@mui/icons-material/Inventory2'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import HouseIcon from '@mui/icons-material/House'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const pathsAdmin = [
  {
    href: '/',
    icon: <HouseIcon fontSize="small" />,
    title: 'Home',
    description: 'Main page'
  },
  {
    href: '/profile',
    icon: <AccountCircleIcon fontSize="small" />,
    title: 'Profile',
    description: 'User profile'
  },
  {
    href: '/users',
    icon: <GroupAddIcon fontSize="small" />,
    title: 'Users',
    description: 'Users Management'
  },
  {
    href: '/shoes',
    icon: <Inventory2Icon fontSize="small" />,
    title: 'Shoes',
    description: 'Shoes Management'
  },
  {
    href: '/providers',
    icon: <AccountCircleIcon fontSize="small" />,
    title: 'Providers',
    description: 'Suppliers Management'
  }
]

export const pathsUser = [
  {
    href: '/',
    icon: <HouseIcon fontSize="small" />,
    title: 'Home',
    description: 'Main page'
  },

  {
    href: '/profile',
    icon: <AccountCircleIcon fontSize="small" />,
    title: 'Profile',
    description: 'User profile'
  }
]
