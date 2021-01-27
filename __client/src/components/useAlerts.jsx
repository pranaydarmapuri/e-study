import { Snackbar, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'
import { useState } from 'react'

const useCSS = makeStyles(theme => ({
  alert: {
    top: theme.mixins.toolbar.minHeight + theme.spacing(3)
  }
}))

const useAlerts = () => {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const css = useCSS()

  const [open, setOpen] = useState(false)

  const alertHandler = () => setOpen(cur => !cur)

  const Notification = (props) => (<MuiAlert elevation={6} {...props} />)

  const Alert = ({type, message}) => (
    <Snackbar 
      open={open} autoHideDuration={6000} onClose={ alertHandler }
      anchorOrigin={{ vertical: 'top', horizontal: isMobile ? 'center' : 'right' }}
      className={ css.alert }
    >
      <Notification onClose={ alertHandler } severity={ type }>
        { message }
      </Notification>
    </Snackbar>
  )

  return ({
    alertHandler,
    Alert
  });
}

export default useAlerts;