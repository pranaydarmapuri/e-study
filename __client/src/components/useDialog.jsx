import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  Typography,
  makeStyles
} from '@material-ui/core'
import { 
  MdErrorOutline as WarningIcon 
} from 'react-icons/md'

const useCSS = makeStyles(theme => ({
  root: {
    // width: 'clamp(300px, 50%, 500px)',
    position: 'absolute',
    top: theme.spacing(12),
    paddingBottom: theme.spacing(1),
    borderLeft: `${theme.spacing(1)}px solid ${theme.palette.error.dark}`,
    '& div': {
      display: 'gird',
      placeItems: 'center'
    },
    '& h1': {
      flexGrow: 1
    }
  },
  icon: {
    color: theme.palette.error.main, 
    height: theme.spacing(7),
    width: theme.spacing(7),
    '& path': {
      height: '100%',
      width: '100%'
    }
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3.5)
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2.5)
  }
}))

const useDialog = () => {

  const css = useCSS()

  const [open, setOpen] = useState(false)

  // setting icon
  const SetIcon = ({type}) => {
    switch(type) {
      case 'WARNING': return (
        <WarningIcon className={ css.icon } />
      )
      default: return null
    }
  }

  const ConfirmDialog = ({ children, type, title }) => (
    <Dialog onClose={ () => null } aria-labelledby="confirm-dialog" open={open} classes={{ paper: css.root }}>
      <DialogContent>
        <div className={ css.titleContainer }>
          <div className="icon-container">
            <SetIcon type={ type } />
          </div>
          <Typography variant="h4" component="h1" color="textPrimary">
            { title }
          </Typography>
          </div>
        <div className={ css.btnContainer } >
          { children }
        </div>
      </DialogContent>
    </Dialog>
  )

  return ({
    ConfirmDialog,
    setDialogOpen: setOpen
  })
}

export default useDialog;