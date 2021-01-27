import {
  makeStyles
} from '@material-ui/core'

// Welcome Components Styles
const useWelcomeStyle = makeStyles(theme => ({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 0,
      backgroundColor: theme.palette.type === 'dark' ? '#000' : '#fefefe',
    },
    intro: {
      display: 'flex',
      gap: theme.spacing(4),
      flexDirection: "column",
      padding: theme.spacing(5),
      width: 'clamp(270px,100%,540px)',
      height: 'min-content',
      marginTop: '250px',
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        width: '540px',
        marginRight: 'auto',
        marginLeft: 'auto'
      },
      '& h5': {
        marginTop: '20px',
        textAlign: "center"
      },
      '& MuiButton-text': {
        width: 'min-content',
        flex: 0,
        alignSelf: 'flex-center',
        marginRight: 'auto',
        marginLeft: 'auto'
      }
    },
    btnCenter: {
      alignSelf: "center",
      textDecoration: 'underline'
    },
    btnLogin: {
      width: '100%',
      display: 'flex',
      flexDirection: "column",
      [theme.breakpoints.up('sm')]: {
        display: 'grid',
        placeItems: 'center'
      }
    },
    signupForm: {
      width: 'clamp(360px, 50%, 570px)'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(3.5),
      '& > *': {
        width: '100%'
      }
    },
    inputField: {
      width: '100%'
    },
    btnContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: theme.spacing(2),   
      marginBottom: theme.spacing(1.5)
    }
  }));


export default useWelcomeStyle;