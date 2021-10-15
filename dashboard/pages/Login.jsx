import Link from 'next/link'
import * as Yup from 'yup';
import { Formik } from 'Formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setToken, SRM_Login } from '../../redux/reducers/SRM/user/action';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuchContext } from "../../components/common/Context/context.hook"
import { setCookie } from '../../components/common/session';

const Login = () => {

  const auch = useContext(AuchContext)
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()
  let router = useRouter()

  let onSubmit = async (values) => {
    let data = await dispatch(SRM_Login(values.email,values.password))

    if(data.login === true){
      setIsLogin(data.login)
      setCookie('auth',data.token)
      auch.login(data.token,data.userId)
    } else {
      router.push('/AdminPanel/SignIn')
    }
  }

  useEffect(()=>{
    if(auch.isAuthorization){
      dispatch(setToken(auch.token))
      router.push('/AdminPanel/Dashboard')
    }
  },[])

  useEffect(()=>{
    if(isLogin === true || auch.isAuthorization){
      router.push('/AdminPanel/Dashboard')
    }
  },[isLogin])

  return (
    <Container maxWidth="sm" style={{ marginTop: '150px' }}>
      <Formik initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={(values) => { onSubmit(values) }}
      >

        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography color="textPrimary" variant="h2" align="center">
                Sign in
              </Typography>
            </Box>

            <Box sx={{ pb: 1, pt: 3 }}>
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;

