import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme.js' // Thêm dòng này
//cau hinh react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}> {/* Truyền theme vào đây */}
    <CssBaseline />
    <App />
    <ToastContainer position="bottom-left" theme="colored"/>
  </CssVarsProvider>
)
