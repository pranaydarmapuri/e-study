import { useContext, useEffect, useState } from 'react'
import { PageTitle, UserContext } from "../index";
import {
  withStyles,
  Paper, Typography, Card, Avatar, Button
} from '@material-ui/core'
import clock from '../../img/clock.svg'
import { AuthContext } from '../../index'
import {
  MdWc as StudentsIcon,
  MdPeople as FacultyIcon,
  MdDomain as DepartmentIcon,
  MdAirplay as MeetingIcon,
  MdBook as SubjectIcon,
  MdBookmark as ClassIcon
} from 'react-icons/md'
import {
  useHistory
} from 'react-router-dom'

const Dashboard = withStyles(theme => ({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    background: `
      linear-gradient(
        330deg, 
        rgba(24,138,138,0.65) 0%, 
        rgba(24,138,138,0.70) 10%, 
        rgba(248,117,83,0.60) 25%, 
        rgba(248,117,83,0.70) 35%, 
        rgba(248,117,83,0.50) 50%,
        rgba(24,138,138,0.60) 60%, 
        rgba(24,138,138,0.75) 70%, 
        rgba(248,117,83,0.60) 80%, 
        rgba(248,117,83,0.70) 90%, 
        rgba(248,117,83,0.50) 100%
      ),
      url(${clock})`,
    backgroundSize: '200% 200%',
    boxShadow: 'none',
    padding: `${theme.spacing(2)}px ${theme.spacing(3.5)}px`,
    animation: `$Head_gradient__XO_rv 40s infinite ease`
  },
  "@keyframes Head_gradient__XO_rv": {
    '0%': {
      backgroundPosition: '0 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0 50%'
    }
  }
}))(Paper)

const GridContainer = withStyles(theme => ({
  root: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    backgroundColor: 'transparent',
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: 'none',
    [theme.breakpoints.only('xs')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: theme.spacing(1.5),
      marginTop: theme.spacing(1.5),  
    }
  }
}))(Paper)

const Tiles = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    '& svg': {
      fontSize: theme.spacing(7),
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(5),
      }
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    gap: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer'
    },
    '& h6': {
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(1.8),
      }
    }
  }
}))(Card)

const Today = withStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: 'transparent',    
    boxShadow: 'none',
    marginLeft: 'auto',
    '& h6': {
      textAlign: 'center',
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(2)
      }
    },
    '& h3': {
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(4)
      }
    }
  }
}))(Paper)

const ProfileCard = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(1.25),
    padding: theme.spacing(2)
  }
}))(Card)

const Home = () => {

  const { setPageTitle } = useContext(PageTitle)
  const { token, authData, user } = useContext(AuthContext)

  const history = useHistory()

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const startTime = () => {
    let today = new Date();
    let h = today.getHours();
    setTime(() => `${checkTime(h % 12)}:${checkTime(today.getMinutes())} ${(h < 13) ? 'am' : 'pm'}`);
    setDate(() => `${months[today.getMonth()]} ${today.getDate()}, ${days[today.getDay()]}`);
    setTimeout(startTime, 1000);
  }
  const checkTime = i => (i < 10) ? `0${i}` : i;

  const linearStartTime = () => {

  }

  useEffect(() => {
    startTime()
    linearStartTime()
    setPageTitle('Dashboard')
    return () => {
      clearInterval(startTime);
    }
  }, [])

  return (
    <>
      <Dashboard>
        <Today>
          <Typography variant="h3" color="initial">{ time }</Typography>
          <Typography variant="h6" color="initial">{ date }</Typography>
        </Today>
      </Dashboard>
      <GridContainer>
        <Tiles onClick={() => history.replace('/students')} >
          <StudentsIcon />
          <Typography variant="h6" color="initial">
            Students
          </Typography>
        </Tiles>
        <Tiles onClick={() => history.replace('/faculty')} >
          <FacultyIcon />
          <Typography variant="h6" color="initial">
            Faculty
          </Typography>
        </Tiles>
        <ProfileCard>
          <Avatar style={{width: '60px', height: '60px'}} src={ null } />
          <Typography variant="h6" color="initial">
            { user.name }
          </Typography>
          <Typography variant="body1" color="initial">
            { `${authData.role} - ${user.id}` }
          </Typography>
        </ProfileCard>
        <Tiles onClick={() => history.replace('/department')} >
          <DepartmentIcon />
          <Typography variant='h6' color='initial'>
            Departments
          </Typography>
        </Tiles>
        <Tiles onClick={() => history.replace('/online-classes')} >
          <MeetingIcon />
          <Typography variant='h6' color='initial'>
            Online Classes
          </Typography>
        </Tiles>
        <Tiles onClick={() => history.replace('/class-rooms')} >
          <ClassIcon />
          <Typography variant='h6' color='initial'>
            Section
          </Typography>
        </Tiles>
      </GridContainer>
   </>
  );
}

export default Home;