import {
  makeStyles
} from '@material-ui/core'

const useApp = () => {

  const useStyles = makeStyles(theme => ({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      overflow: 'auto'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2)
    }
  }
  }))
  const css = useStyles()
  return {
    css
  };
}

export default useApp;