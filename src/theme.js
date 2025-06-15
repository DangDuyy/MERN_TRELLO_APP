// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '48px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
// Create a theme instance.
const theme = extendTheme({
  components: {
    // Name of the component
    MuiTypography: {
      styleOverrides: {
        root: {
          // Các thuộc tính chung cho mọi Typography
        },
        body1: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          //de cac button khong bi viet hoa
          textTransform:'none',
          borderWidth: '0.5px'
          // '&:hover' : {
          // borderWidth: '0.5px'
          // }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: {
          // color: theme.palette.primary.main
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '1px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important'
          }
        }
      }
    },
    //custom thanh scrollbar
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar ': {
            width: '8px',
            height : '8px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor : '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover ': {
            backgroundColor : 'white'
          }
        }
      }
    }
  },
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes:{
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  }
})

export default theme