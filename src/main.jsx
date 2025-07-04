import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { ConfirmProvider } from 'material-ui-confirm'
import theme from '~/theme.js'
//cau hinh react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//cau hinh redux store
import { store } from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <CssVarsProvider theme={theme}> {/* Truyền theme vào đây */}
      <ConfirmProvider
        sx={{
          allowClose: false,
          dialogProps: { maxWidth: 'xs' },
          buttonOrder: ['confirm', 'order'],
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' }
        }}>
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" theme="colored"/>
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)
