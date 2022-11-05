import React from 'react'
import * as Yup from 'yup'
import Alert from './Alert'
import clientAxios from '../utils/clientAxios'
import LoadingButton from '@mui/lab/LoadingButton'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import { Formik } from 'formik'
import { TextField, Link, Grid, Box, Typography } from '@mui/material'
import { useAuth } from '../context/Auth'

export default function FormLogin () {
  const [error, setError] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const { setUser } = useAuth()

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string('Enter your password')
      .min(3, 'Minimum 8 characters length')
      .required('Password is required')
  })

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values) => {
        setLoading(true)
        const { email, password } = values
        const user = {
          email,
          password
        }
        let response
        try {
          response = await clientAxios.post('/users/login', user)
          setError({ error: false, msg: 'Logging...' })
          const userInfo = { ...response.data }
          setTimeout(() => {
            setLoading(false)
            setUser({ ...userInfo })
            localStorage.setItem('session', JSON.stringify(userInfo))
          }, 2000)
        } catch (error) {
          setLoading(false)
          response = error.response
          return setError({ error: true, msg: response.data.msg })
        }
      }}
    >
      {({ errors, touched, handleChange, handleSubmit, values }) => (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            autoComplete="off"
            margin="normal"
            name="email"
            id="email"
            label="Email Address"
            values={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            variant="standard"
            margin="normal"
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            label="Password"
            values={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
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

          <Grid container>
            <Grid item>
              <Link
                href="/signUp"
                variant="body2"
                style={{ textDecoration: 'none' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  )
}
