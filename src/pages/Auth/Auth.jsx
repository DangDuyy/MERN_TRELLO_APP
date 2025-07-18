import { Box } from '@mui/material'
import { useLocation, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

//
function Auth() {
  const location = useLocation()
  //location.pathname trả về đường dẫn đầy đủ bao gồm dấu / đầu
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <Box>
      {isLogin && <LoginForm/>}
      {isRegister && <RegisterForm/>}
    </Box>
  )
}

export default Auth