import Link from 'next/link'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuchContext } from '../../components/common/Context/context.hook';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { SRM_Register } from '../../redux/reducers/SRM/user/action';
import { setCookie } from '../../components/common/session';


const Register = () => {

  const auch = useContext(AuchContext)
  let router = useRouter()
  const dispatch = useDispatch()
  const { addToast, removeAllToasts } = useToasts()

  let message = (mes) => {
    removeAllToasts()
    addToast(mes, {appearance: 'success',autoDismiss: true })
  }

  let error = (mes) => {
    removeAllToasts()
    addToast(mes, { appearance: 'error', autoDismiss: true })
  }

  let onSubmit = async (values) => {
    let data = await dispatch(SRM_Register(values.firstName, values.lastName, values.email, values.password))
    
    if(data.create === true){
      message('Создан новый аккаунт для EcoChoice SRM')
    } else {
      error('Что то пошло не так!')
    }
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '70px' }}>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            password: Yup.string().max(255).required('password is required'),
          })
        }
        onSubmit={(values) => { onSubmit(values) }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Create new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.firstName && errors.firstName)}
              fullWidth
              helperText={touched.firstName && errors.firstName}
              label="First name"
              margin="normal"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.lastName && errors.lastName)}
              fullWidth
              helperText={touched.lastName && errors.lastName}
              label="Last name"
              margin="normal"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              variant="outlined"
            />
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
              autoComplete="on"
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
                Создать аккаунт
              </Button>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{ marginTop: '10px' }}
                onClick={()=>{router.push('/AdminPanel/Dashboard')}}
              >
                Назад в SRM
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;

