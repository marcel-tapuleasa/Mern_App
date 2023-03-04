import React, {useState, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string('Enter Email')
    .required('Email is required'),
  password: yup
  .string('Enter Password')
  .required('Password is required')
});


const theme = createTheme();

export default function SignIn() {

  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState('');



  let navigate = useNavigate();


  const loginUser = async (values) => {

    const {email, password} = values;

    const config = {
      withCredentials: true,
      crossDomain: true,
      headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
          'Access-Control-Allow-Origin': 'https://hoteltips.netlify.app',
           Authorization: `Bearer ${userContext.token}`,
        },
      credentials: "included"  
  }

    try {
      const { data } = await axios.post('https://hoteltips.onrender.com/api/auth/login', {email, password}, config);

      setUserContext(oldValues => {
        return { ...oldValues, token: data.token, details: data.user}
      })

      // localStorage.setItem('authToken', data.token)

      navigate('/hotels');
      console.log(userContext)

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }


  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: loginUser
});

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '10rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight:'71vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
      {error && <Alert severity='error'>{error}</Alert>}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formik.values.email}
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formik.values.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}