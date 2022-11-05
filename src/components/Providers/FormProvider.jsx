/* eslint-disable no-unused-vars */
import React from 'react'
import * as Yup from 'yup'
import clientAxios from '../../utils/clientAxios'
import Alert from '../Alert'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { Formik } from 'formik'
import { Box, Container } from '@mui/system'
import { useAuth } from '../../context/Auth'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'
import { cities } from '../../assets/cities'
import {
  Autocomplete,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material'

const FormProvider = () => {
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({
    error: false,
    msg: ''
  })
  const { provider } = useSelector((state) => state.provider)
  const [inputValue, setInputValue] = React.useState(
    provider?.city?.nameCity ?? 'Villavicencio'
  )

  const { user } = useAuth()

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.number().required(),
    city: Yup.string().required()
  })

  const newProvider = async (values) => {
    try {
      const response = await clientAxios.post(
        '/providers',
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      if (response.status === 201) {
        setAlert({
          error: false,
          msg: response.data.msg
        })
        setTimeout(() => {
          setLoading(false)
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.msg
      })
      setLoading(false)
    }
  }
  const updateProvider = async (values) => {
    try {
      const response = await clientAxios.put(
        `/providers/${provider.idProvider}`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      if (response.status === 200) {
        setAlert({
          error: false,
          msg: response.data.msg
        })
        setTimeout(() => {
          setLoading(false)
          window.location.reload()
        }, 2000)
      }
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.msg
      })
      setLoading(false)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: provider?.name ?? '',
        address: provider?.address ?? '',
        phone: provider?.phone ?? '',
        city: inputValue
      }}
      onSubmit={(values) => {
        values = { ...values, city: inputValue }
        setLoading(true)
        if (provider?.idProvider) {
          return updateProvider(values)
        }
        newProvider(values)
      }}
    >
      {({ values, errors, handleChange, handleSubmit, touched }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: '600', mb: '10px' }}
            >
              Form New Provider
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="off"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name && touched.name}
                    color={
                      !errors.name && values.name.length !== 0
                        ? 'success'
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="standard"
                    autoComplete="off"
                    name="phone"
                    fullWidth
                    id="phone"
                    value={values.phone}
                    label="Telephone"
                    onChange={handleChange}
                    error={errors.phone && touched.phone}
                    color={
                      !errors.phone && values.phone.length !== 0
                        ? 'success'
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="off"
                    value={values.address}
                    onChange={handleChange}
                    error={errors.address && touched.address}
                    color={
                      !errors.address && values.address.length !== 0
                        ? 'success'
                        : null
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth error={false}>
                    <Autocomplete
                      disablePortal
                      value={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue)
                      }}
                      options={cities}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          sx={{ width: '100%' }}
                          id="city"
                          name="city"
                          label="City"
                          error={inputValue.length === 0 && touched.city}
                          color={inputValue.length !== 0 ? 'success' : null}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <LoadingButton
                startIcon={<AddCircleOutlineRoundedIcon />}
                loading={loading}
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 5, mb: 2, fontWeight: '600' }}
              >
                Provider
              </LoadingButton>
              {alert.msg && <Alert error={alert.error}>{alert.msg}</Alert>}
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  )
}

export default FormProvider
