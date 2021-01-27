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
      backgroundColor: theme.palette.type === 'dark' ? '#000' : '#fefefe',
    }
  }))
  const css = useStyles()
  return {
    css
  };
}

export default useApp;