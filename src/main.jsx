import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import { ConfirmProvider } from 'material-ui-confirm'
import theme from '~/theme.js'
import { GlobalStyles } from '@mui/material'
//cau hinh react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//cau hinh redux store
import { store } from './redux/store'
import { Provider } from 'react-redux'

//cau hinh react-router-dom voi browserrouter
import { BrowserRouter } from 'react-router-dom'

//cau hinh redux-persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

//ky thuat inject store: la ki thuat khi can su dung bien redux store o cac file ngoai pham vi cua du an
import { injectStore } from '~/utils/authorizeAxios'

injectStore(store)

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}> {/* Truyền theme vào đây */}
          <ConfirmProvider
            sx={{
              allowClose: false,
              dialogProps: { maxWidth: 'xs' },
              buttonOrder: ['confirm', 'order'],
              confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
              cancellationButtonProps: { color: 'inherit' }
            }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' }}} />
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="colored"/>
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
