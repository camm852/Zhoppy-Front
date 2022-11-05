/* eslint-disable no-unused-vars */
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
import { open, setShoe } from '../../redux/slices/modalShoe'
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Pagination,
  styled,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'

export const ProductListResults = () => {
  const [shoes, setShoes] = React.useState([])
  const [shoesFilter, setShoesFilter] = React.useState([])
  const [page, setPage] = React.useState(1)
  const { user } = useAuth()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const getAllShoes = async () => {
      try {
        const response = await clientAxios('/shoes', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status === 200) {
          setShoes(response.data)
          setShoesFilter(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllShoes()
  }, [user.token])

  const deleteShoe = async (id) => {
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
        const response = await clientAxios.delete(`/shoes/${id}`, {
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
  const count = Math.ceil(shoesFilter.length / perPage)
  const _Shoes = usePagination(shoesFilter, perPage)

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    const dataFilter = shoes.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(value)
    })
    if (dataFilter) {
      setShoesFilter(dataFilter)
    }
  }

  const handleChange = (e, page) => {
    setPage(page)
    _Shoes.jump(page)
  }

  return (
    <Card>
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
                  placeholder="Search Shoe"
                  variant="outlined"
                  onChange={onSearch}
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
                  Id
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Stock
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Provider
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_Shoes.currentData().map((shoe, i) => {
                return (
                  <TableRow hover key={+shoe.idShoe}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {shoe.idShoe}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {shoe.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      ${shoe.price}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {shoe.stock}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {shoe.provider?.name}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <ButtonStyled
                        sx={{
                          '&:hover': {
                            color: '#fff'
                          }
                        }}
                        onClick={() => {
                          deleteShoe(shoe.idShoe)
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
                            dispatch(setShoe(shoe))
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
      <Pagination
        sx={{ float: 'right', mt: '10px' }}
        count={count}
        size="large"
        shape="rounded"
        page={page}
        variant="outlined"
        onChange={handleChange}
      />
    </Card>
  )
}
