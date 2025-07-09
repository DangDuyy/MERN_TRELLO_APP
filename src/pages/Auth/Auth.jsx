import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
//
function Auth() {
  const location = useLocation()
  //location.pathname trả về đường dẫn đầy đủ bao gồm dấu / đầu
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  return (
    <Box>
      {isLogin && <LoginForm/>}
      {isRegister && <RegisterForm/>}
    </Box>
  )
}

export default Auth