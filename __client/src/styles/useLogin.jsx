import {
  makeStyles
} from '@material-ui/core'

const useLogin = (showLogin) => makeStyles(theme => ({
  root: {
    pointerEvents: showLogin ? 'auto' : 'none',
    opacity: showLogin ? '1' : '0',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backdropFilter: 'blur(6px)',
    display: "grid",
    placeItems: 'center',
    transition: 'opacity .5s ease-in-out'
  },
  loginCard: {
    width: 'clamp(360px, 50%, 570px)',
    borderRadius: theme.shape.borderRadius,
    padding: '10px',
    '& > button.MuiIconButton-root': {
      display: 'block',
      marginLeft: 'auto'
    },
    '& > h2': {
      fontWeight: '700',
      marginBottom: '16px',
      marginLeft: '12px'
    }
  },
  form: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  signInWithGoogle: {
    marginTop: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.default
  },
  forgotPwd: {
    marginRight: 'auto',
    cursor: "pointer",
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  signup: {
    textAlign: 'center',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2.5)
  },
  resetInput: {
    width: 'clamp(350px, 46%, 560px)'
  },
  resetInputFormBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5)
  },
  resetEmail: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  scrollPaper: {
    backdropFilter: 'blur(10px)'
  }
}));

export default useLogin