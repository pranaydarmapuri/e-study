import {
  makeStyles
} from '@material-ui/core'

const drawerWidth = 270

const useAdminDrawer = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    padding: `${theme.spacing(1)}px ${theme.spacing(3.5)}px ${theme.spacing(0)}px`,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navLink: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '& svg': {
      marginRight: theme.spacing(2.5)
    }
  },
  current: {
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main
    }
  }
}));

export default useAdminDrawer