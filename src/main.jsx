import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme.js' // Thêm dòng này

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}> {/* Truyền theme vào đây */}
    <CssBaseline />
    <App />
  </CssVarsProvider>
)
