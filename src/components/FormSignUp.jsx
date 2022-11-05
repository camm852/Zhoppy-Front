import React from 'react'
import Alert from './Alert'
import * as Yup from 'yup'
import clientAxios from '../utils/clientAxios'
import LoadingButton from '@mui/lab/LoadingButton'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { TextField, Link, Grid, Box, Typography } from '@mui/material'

export default function FormSignUp () {
  const [error, setError] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is Required')
      .matches(/^[aA-zZ\s0-9]+$/, 'Only alphabets')
      .min(10, 'Min 10 characteres')
      .max(40, 'Max 40 characteres'),
    phone: Yup.number()
      .required('Phone is Required')
      .positive()
      .typeError('Only Numbers')
      .integer()
      .min(3000000000, 'The number must be colombian'),
    address: Yup.string()
      .required('Address is Required')
      .min(10, 'Min 10 characteres')
      .max(20, 'Max 20 characteres'),
    email: Yup.string()
      .email('Invalid E-mail')
      .required('The E-mail is required'),
    password: Yup.string()
      .min(5, 'Minimum 5 characteres')
      .max(18, 'Max 18 characteres')
      .required('Password is required')
      .matches(/^[aA-zZ\s0-9]+$/, 'Only alphabets')
      .matches(/(\d)/, 'Must contain one number')
      .matches(/[A-Z]/, 'Must contain one uppercase'),
    confirmPassword: Yup.string()
      .required('Confirm Password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true)
        const { name, email, address, password, phone } = values
        const user = {
          name,
          email,
          address,
          phone,
          password
        }
        let response
        try {
          response = await clientAxios.post('/users/', user)
          setError({ error: false, msg: response.data.msg })
          setTimeout(() => {
            setLoading(false)
            navigate('/login')
          }, 3000)
        } catch (error) {
          response = error.response
          return setError({ error: true, msg: response.data.msg })
        }
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                name="name"
                id="name"
                label="Full Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name}
                color={
                  !errors.name && values.name.length !== 0 ? 'success' : null
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                name="phone"
                id="phone"
                value={values.phone}
                label="Phone"
                onChange={handleChange}
                error={errors.phone && touched.phone}
                helperText={errors.phone && touched.phone}
                color={
                  !errors.phone && values.phone.length !== 0 ? 'success' : null
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                name="address"
                id="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                error={errors.address && touched.address}
                helperText={errors.address && touched.address}
                color={
                  !errors.address && values.address.length !== 0
                    ? 'success'
                    : null
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                name="email"
                id="email"
                label="Email Address"
                value={values.email}
                onChange={handleChange}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email}
                color={
                  !errors.email && values.email.length !== 0 ? 'success' : null
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                helperText={errors.password && touched.password}
                color={
                  !errors.password && values.password.length !== 0
                    ? 'success'
                    : 'primary'
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="standard"
                autoComplete="off"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword && touched.confirmPassword}
                helperText={errors.confirmPassword && touched.confirmPassword}
                color={
                  !errors.confirmPassword && values.confirmPassword.length !== 0
                    ? 'success'
                    : null
                }
                sx={{ mt: '-10px' }}
              />
            </Grid>
          </Grid>
          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            startIcon={<SendTwoToneIcon />}
            loading={loading}
            loadingPosition="center"
            sx={{ mt: 3, mb: 2 }}
          >
            <Typography
              variant="span"
              component="span"
              sx={{ fontWeight: 'bold', fontSize: '1rem' }}
            >
              Send
            </Typography>
          </LoadingButton>
          {error.msg && <Alert error={error.error}>{error.msg}</Alert>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  )
}
