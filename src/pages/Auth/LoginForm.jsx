/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import {
  Email as EmailIcon,
  Google as GoogleIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
// import {}
function LoginForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()

  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submitLogIn = (data) => {

    const { email, password } = data
    toast.promise(
      dispatch(loginUserAPI({ email, password })),
      { pending: 'Login in...' }
    ).then((res) => {
      console.log(res)
      //doan nay kiem tra khong co loi thi moi redirect ve route /
      if (!res.error) navigate('/')
    })
    console.log('data ', data)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1
            }}
          >
            Welcome to Trello
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection:'column', padding: '0 1em', gap: 1 }}>
            {verifiedEmail &&
              <Alert
                severity="success"
                sx={{
                  '.MuiAlert-message': { overflow: 'hidden' },
                  py: 1,
                  fontSize: '0.875rem',
                  lineHeight: 1.4
                }}
              >
                Your email{' '}
                <Typography component="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                  {verifiedEmail}
                </Typography>
                {' '}has been verified. Now you can login to enjoy our services! Have a good day!
              </Alert>
            }
            {registeredEmail &&
            <Alert
              severity="info"
              sx={{
                '.MuiAlert-message': { overflow: 'hidden' },
                py: 1,
                fontSize: '0.875rem',
                lineHeight: 1.4
              }}
            >
              An email has been sent to{' '}
              <Typography component="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                {registeredEmail}
              </Typography>
              . Please check and verify your account before logging in!
            </Alert>}
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitLogIn)}>
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email Address"
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              )
            }}
            sx={{ mb: 1 }}
          />
          <FieldErrorAlert errors={errors} fieldName={'email'}/>

          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...register('password', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE
              }
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 1 }}
          />
          <FieldErrorAlert errors={errors} fieldName={'password'}/>

          <Button
            className="interceptor-loading"
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              mb: 1,
              mt: 1
            }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            size="large"
            sx={{
              py: 0.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              mb: 1
            }}
          >
            Continue with Google
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/register')}
                sx={{
                  textDecoration: 'none',
                  fontWeight: 'medium',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default LoginForm