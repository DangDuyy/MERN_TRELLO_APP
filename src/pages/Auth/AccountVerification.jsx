import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis/index'
import PageLoadingSpinner from '~/components/Loading/pageLoadingSpinner'
function AccountVerification() {
  //lay gia tri email va token tu url
  let [searchParams] = useSearchParams()

  const { email, token } = Object.fromEntries([...searchParams])

  //tao 1 state de biet duoc la da verify tai khoan thanh cong chua 
  const [verified, setVerified] = useState(null)

  //goi api de verify tai khoan
  useEffect(() => {
    if (email && token)
      verifyUserAPI({ email, token }).then(() => setVerified(true))
  }, [email, token])

  if (!email || !token)
    return <Navigate to='/404' />

  if (!verified)
    return <PageLoadingSpinner caption="Wait to verify your account ..." />
  return (
    <Navigate to={`/login?verifiedEmail=${email}`} />
  )
}

export default AccountVerification