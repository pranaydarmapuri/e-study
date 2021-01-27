import {
  useMediaQuery,
  createMuiTheme
} from "@material-ui/core"
const useStyle = () => {
  
  // Setting dark mode based on system configration
  const isDarkEnable = useMediaQuery('(prefers-color-scheme: dark)')
  // Creating theme
  const theme = createMuiTheme({
    palette: {
      type: isDarkEnable ? 'dark' : 'light',
      common: {
        black: '#000',
        dark: '#121212',
        white: '#fff',
        light: '#fafafb'
      },
      background: {
        default: isDarkEnable ? '#0D0D0D' : '#f5f5f5',
        paper: isDarkEnable ? '#262626' : '#fff'
      },
      primary: {
        light: isDarkEnable ? '#ffd8b0' : '#ffa680',
        main: isDarkEnable ? '#ffa680' : '#f87553',
        dark: isDarkEnable ? '#c97653' : '#d45c41',
        contrastText: isDarkEnable ? '#000' : '#fff'
      },
      secondary: {
        light: isDarkEnable ? '#8bedec' : '#57baba',
        main: isDarkEnable ? '#57baba' : '#188a8a',
        dark: isDarkEnable ? '#198a8a' : '#005c5d',
        contrastText: isDarkEnable ? '#000' : '#fff'
      },
      error: {
        main: isDarkEnable ? '#e57373' : '#f44336',
        light: isDarkEnable ? '#ffa4a2' : '#e57373',
        dark: isDarkEnable ? '#af4448' : '#d32f2f'
      },
      grey: {
        900: '#0D0D0D',
        800: '#242424',
        700: '#424242',
        600: '#616161',
        500: '#757575'
      },
      text: {
        primary: isDarkEnable ? 'rgba(255,255,255,0.9)' : 'rgba(0, 0, 0, 0.87)',
        secondary: isDarkEnable ? 'rgba(255,255,255,0.57)' : 'rgba(0, 0, 0, 0.54)',
        disabled: isDarkEnable ? 'rgba(255,255,255,0.42)' : 'rgba(0, 0, 0, 0.38)',
        hint: isDarkEnable ? 'rgba(255,255,255,0.42)' : 'rgba(0, 0, 0, 0.38)'
      }
    },
    shape: {
      borderRadius: '8px'
    },
    typography: {
      fontFamily: `font-family: 'Roboto', sans-serif`,
      h1: {
        fontFamily: `'Nunito', sans-serif;`,
        fontWeight: 700
      },
      h2: {
        fontFamily: `'Nunito', sans-serif;`
      },
      h3: {
        fontFamily: `'Nunito', sans-serif;`
      },
      h4: {
        fontFamily: `'Nunito', sans-serif;`
      },
      h5: {
        fontFamily: `'Nunito', sans-serif;`
      },
      h6: {
        fontFamily: `'Nunito', sans-serif;`
      }
    }
  });
  
  return ({
    theme
  });
}

export default useStyle;