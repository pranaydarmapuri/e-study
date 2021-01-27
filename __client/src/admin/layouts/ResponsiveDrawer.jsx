import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Button,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core'
import { 
  FiMenu as MenuIcon
} from "react-icons/fi";
import {
  MdWc as StudentsIcon,
  MdDashboard as DashboardIcon,
  MdPeople as FacultyIcon,
  MdDomain as DepartmentIcon,
  MdAirplay as MeetingIcon,
  MdBook as SubjectIcon,
  MdBookmark as ClassIcon,
  MdAssignmentInd as SubFacIcon
} from 'react-icons/md'
import useStyles from '../../styles/useAdminDrawer'
import Logo from '../../components/Logo'
import { PageTitle } from '../index'
import { AuthContext } from '../../index'


const navLinks = [
  {
    label: 'Dashboard',
    icon: (<DashboardIcon />),
    path: '/'
  }, {
    label: 'Online Classes',
    icon: (<MeetingIcon />),
    path: '/online-classes'
  }, {
    label: 'Students',
    icon: (<StudentsIcon />),
    path: '/students'
  }, {
    label: 'Faculty',
    icon: (<FacultyIcon />),
    path: '/faculty'
  }, {
    label: 'Departments',
    icon: (<DepartmentIcon />),
    path: '/departments'
  }, {
    label: 'Sections',
    icon: (<ClassIcon />),
    path: '/class-rooms'
  }, {
    label: 'Subjects',
    icon: (<SubjectIcon />),
    path: '/subjects'
  }, {
    label: 'Subject-Faculty',
    icon: (<SubFacIcon />),
    path: '/subject-faculty'
  }
]

const ResponsiveDrawer = ({ window }) => {

  const { pageTitle } = useContext(PageTitle)
  const { setToken } = useContext(AuthContext)
  const theme = useTheme()
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Logo />
      </div>
      <Divider />
      <List>
        {
          navLinks.map((link, index) => (
            <NavLink exact to={ link.path } 
              className={ classes.navLink } 
              activeClassName={ classes.current } 
              key={ `link-${index}` }
              onClick={ matches ? handleDrawerToggle : null }
            >
              <ListItem button >
                { link.icon }
                <ListItemText primary={ link.label } />
              </ListItem>
            </NavLink>
          ))
        }
      </List>
    </div>
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{marginRight: 'auto'}} noWrap>
            { pageTitle }
          </Typography>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
            <Avatar />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem 
              onClick={() => { setToken(''); localStorage.removeItem('auth-token') }}
            >Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xlUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            { drawer }
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            { drawer }
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

export default ResponsiveDrawer;