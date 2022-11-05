import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import usePagination from '../utils/pagination'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  CardContent,
  TextField,
  SvgIcon,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import clientAxios from '../utils/clientAxios'
import { useAuth } from '../context/Auth'

export const UserListResults = () => {
  const [users, setUsers] = React.useState([{}])
  const [usersFilter, setUsersFilter] = React.useState([{}])
  const [page, setPage] = React.useState(1)
  const { user } = useAuth()

  React.useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await clientAxios.get('/users/', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status === 200) {
          const data = response.data
          setUsers(data)
          setUsersFilter(data)
        }
      } catch (error) {
        setUsers()
        setUsersFilter()
      }
    }
    getAllUsers()
  }, [user.token])

  const perPage = 5
  const count = Math.ceil(usersFilter.length / perPage)
  const _Users = usePagination(usersFilter, perPage)

  const handleChange = (e, page) => {
    setPage(page)
    _Users.jump(page)
  }

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    const dataFilter = users.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(value)
    })
    if (dataFilter) {
      setUsersFilter(dataFilter)
    }
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <PerfectScrollbar>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search user"
                  variant="outlined"
                  onChange={onSearch}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          {usersFilter.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: '600' }}>
                    NAME
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: '600' }}>
                    EMAIL
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: '600' }}>
                    PHONE
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: '600' }}>
                    ADDRESS
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: '600' }}>
                    ROL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ minHeight: '600px' }}>
                {_Users.currentData().map((user) => {
                  return (
                    <TableRow hover key={Math.floor(Math.random() * 1000)}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        {user.idRol === 2 ? 'User' : 'Admin'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <h1>Data not found</h1>
          )}
        </Box>
      </PerfectScrollbar>
      <Pagination
        sx={{ float: 'right', mt: '10px' }}
        count={count}
        size="large"
        shape="rounded"
        page={page}
        variant="outlined"
        onChange={handleChange}
      />
      {/* <TablePagination component="div" /> */}
    </Box>
  )
}
