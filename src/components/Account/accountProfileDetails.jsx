import React from 'react'
import clientAxios from '../../utils/clientAxios'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/Auth'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material'

export const AccountProfileDetails = () => {
  const { user } = useAuth()

  const [values, setValues] = React.useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    email: user.email
  })

  const updateUser = async () => {
    const userStored = JSON.parse(localStorage.getItem('session'))
    try {
      const response = await clientAxios.put(
        '/users/profile',
        {
          ...values
        },
        {
          headers: {
            Authorization: `Bearer ${userStored.token}`
          }
        }
      )
      if (response.status === 200) {
        userStored.name = values.name
        userStored.phone = values.phone
        userStored.address = values.address
        localStorage.setItem('session', JSON.stringify(userStored))
        Swal.fire({
          icon: 'success',
          title: '¡Excelent!',
          text: response.data?.msg,
          showConfirmButton: false,
          timer: 2000
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data?.msg,
        showConfirmButton: false,
        timer: 2000
      })
    } finally {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                disabled
                onChange={handleChange}
                required
                input={{ readOnly: true }}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Adress"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={updateUser}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}
