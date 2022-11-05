import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import usePagination from '../../utils/pagination'
import SearchIcon from '@mui/icons-material/Search'
import clientAxios from '../../utils/clientAxios'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/Auth'
import { useDispatch } from 'react-redux'
import { open, setProvider } from '../../redux/slices/modalProvider'
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
  InputAdornment,
  SvgIcon,
  TextField,
  Button,
  styled
} from '@mui/material'

const ProviderListResults = () => {
  const [providers, setProviders] = React.useState([])
  const [providersFilter, setProvidersFilter] = React.useState([])
  const [page, setPage] = React.useState(1)
  const { user } = useAuth()

  const dispatch = useDispatch()

  React.useEffect(() => {
    const getAllproviders = async () => {
      try {
        const response = await clientAxios.get('/providers/', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status === 200) {
          const data = response.data
          setProviders(data)
          setProvidersFilter(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllproviders()
  }, [])

  const deleteProvider = async (id) => {
    const { value } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (value) {
      try {
        const response = await clientAxios.delete(`/providers/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status === 200) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            showCancelBotton: false
          })
          setTimeout(() => {
            window.location.reload()
          }, 1800)
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  const ButtonStyled = styled(Button)({
    '&:hover': {
      backgroundColor: '#e4e4e414'
    }
  })

  const perPage = 5
  const count = Math.ceil(providersFilter.length / perPage)
  const _Providers = usePagination(providersFilter, perPage)

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    const dataFilter = providers.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(value)
    })
    if (dataFilter) {
      setProvidersFilter(dataFilter)
    }
  }

  const handleChange = (e, page) => {
    setPage(page)
    _Providers.jump(page)
  }

  return (
    <Box>
      <PerfectScrollbar>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  onChange={onSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search Provider"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Nit
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Phone
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  City
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_Providers.currentData().map((provider) => {
                return (
                  <TableRow hover key={provider.idProvider}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {provider.idProvider}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {provider.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {provider.phone}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {provider.address}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: 'center', textTransform: 'capitalize' }}
                    >
                      {provider.city?.nameCity}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <ButtonStyled
                        sx={{
                          '&:hover': {
                            color: '#fff'
                          }
                        }}
                        onClick={() => {
                          deleteProvider(provider.idProvider)
                        }}
                      >
                        <DeleteIcon
                          sx={{
                            fontSize: '2.3em',
                            color: '#ef2a2a',
                            '&:hover': {
                              color: '#ef2a2ac2'
                            }
                          }}
                        />
                      </ButtonStyled>
                      <ButtonStyled>
                        <EditIcon
                          sx={(theme) => ({
                            fontSize: '2.3em',
                            '&:hover': {
                              color: theme.palette.primary.dark
                            }
                          })}
                          onClick={() => {
                            dispatch(setProvider(provider))
                            dispatch(open(true))
                          }}
                        />
                      </ButtonStyled>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {
        <Pagination
          sx={{ float: 'right', mt: '10px' }}
          count={count}
          size="large"
          shape="rounded"
          page={page}
          variant="outlined"
          onChange={handleChange}
        />
      }
    </Box>
  )
}

export default ProviderListResults
