import React from 'react'
import clientAxios from '../../utils/clientAxios'
import * as Yup from 'yup'
import theme from '../../utils/theme'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import Alert from '../Alert'
import { LoadingButton } from '@mui/lab'
import { Formik } from 'formik'
import { useAuth } from '../../context/Auth'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography
} from '@mui/material'

export default function FormShoe () {
  const [loading, setLoading] = React.useState(false)
  const [providers, setProviders] = React.useState([])
  const [image, setImage] = React.useState(null)
  const [errorImage, setErrorImage] = React.useState(false)
  const [alert, setAlert] = React.useState({
    error: false,
    msg: ''
  })
  const { shoe } = useSelector((state) => state.shoe)
  const { user } = useAuth()

  React.useEffect(() => {
    const getProviders = async () => {
      try {
        const response = await clientAxios('/providers', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status !== 200) {
          throw new Error('Algo ha salido mal')
        }
        setProviders(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProviders()
  }, [user.token])

  React.useEffect(() => {
    setImage(shoe.idImage)
  }, [shoe])

  const handleChangeImage = (e) => {
    setImage(e.target.files[0])
    setErrorImage(false)
  }

  const newShoe = async (values) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('price', values.price)
    formData.append('stock', values.stock)
    formData.append('description', values.description)
    formData.append('provider', values.provider)
    formData.append('image', image)
    try {
      const response = await clientAxios.post('/shoes', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      if (response.status !== 201) throw new Error()
      setAlert({
        error: false,
        msg: response.data.msg
      })
      setTimeout(() => {
        setLoading(false)
        window.location.reload()
      }, 2000)
    } catch (error) {
      setAlert({
        error: true,
        msg: error.response.data.msg
      })
      setLoading(false)
    }
  }

  const updateShoe = async (values) => {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('price', values.price)
    formData.append('stock', values.stock)
    formData.append('description', values.description)
    formData.append('provider', values.provider)
    if (image !== shoe.idImage) formData.append('image', image)
    try {
      const response = await clientAxios.put(
        `/shoes/${shoe.idShoe}`,
        formData,
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is Required')
      .min(5, 'Min 5 characteres')
      .max(18, 'Max 18 characteres'),
    provider: Yup.number()
      .required('Provider is required')
      .typeError('Only Numbers')
      .integer('Must be integer')
      .positive('Must be positive'),
    stock: Yup.number()
      .required('Stock is required')
      .typeError('Only Numbers')
      .integer('Must be integer')
      .positive('Must be positive'),
    price: Yup.number()
      .required('Price is required')
      .typeError('Only Numbers')
      .integer('Must be integer')
      .positive('Must be positive')
  })

  if (providers.length === 0) return
  return (
    <ThemeProvider theme={theme}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: shoe?.name ?? '',
          price: shoe?.price ?? '',
          stock: shoe?.stock ?? '',
          provider: shoe?.idProvider ?? '',
          description: shoe?.description ?? ''
        }}
        onSubmit={async (values) => {
          if (!image) {
            setErrorImage(true)
            return
          }
          setLoading(true)
          if (shoe?.idShoe) {
            return updateShoe(values)
          }
          newShoe(values)
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                Form New Shoe
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
                encType="multipart/form-data"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      id="name"
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      color={
                        !errors.name && values.name.length !== 0
                          ? 'success'
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={false}>
                      <InputLabel id="demo-simple-select-label">
                        Provider
                      </InputLabel>
                      <Select
                        variant="standard"
                        id="provider"
                        name="provider"
                        label="Provider"
                        value={values.provider}
                        onChange={handleChange}
                        error={touched.provider && Boolean(errors.provider)}
                        color={
                          !errors.provider && values.provider.length !== 0
                            ? 'success'
                            : null
                        }
                      >
                        {providers.map((provider) => {
                          return (
                            <MenuItem
                              key={provider.idProvider}
                              value={provider.idProvider}
                            >
                              {provider.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      id="price"
                      name="price"
                      label="Price $"
                      value={values.price}
                      onChange={handleChange}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                      color={
                        !errors.price && values.price.length !== 0
                          ? 'success'
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      id="stock"
                      name="stock"
                      label="Stock"
                      value={values.stock}
                      onChange={handleChange}
                      error={touched.stock && Boolean(errors.stock)}
                      helperText={touched.stock && errors.stock}
                      color={
                        !errors.stock && values.stock.length !== 0
                          ? 'success'
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      multiline
                      rows={2}
                      id="description"
                      name="description"
                      label="Description"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        py: '10px',
                        width: '100%',
                        mt: '10px'
                      }}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<AddPhotoAlternateOutlinedIcon />}
                        color={
                          errorImage ? 'error' : !image ? 'primary' : 'success'
                        }
                        sx={{
                          flexGrow: 1
                        }}
                      >
                        <input
                          type="file"
                          hidden
                          name="image"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={handleChangeImage}
                        />
                        Photo
                      </Button>
                      <Box sx={{ flexGrow: 2, textAlign: 'center' }}>
                        <Typography component="p" variant="div">
                          {image && image.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <LoadingButton
                  startIcon={
                    shoe?.idShoe ? (
                      <RefreshOutlinedIcon />
                    ) : (
                      <AddCircleOutlineRoundedIcon />
                    )
                  }
                  loading={loading}
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 5, mb: 2, fontWeight: '600' }}
                >
                  Shoe
                </LoadingButton>
                {alert.msg && <Alert error={alert.error}>{alert.msg}</Alert>}
              </Box>
            </Box>
          </Container>
        )}
      </Formik>
    </ThemeProvider>
  )
}
