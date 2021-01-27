import { useState } from 'react'
import useStyle from './styles/useWelcomeStyle'
import Logo from './components/Logo'
import {
  Paper,
  Typography,
  Button
} from '@material-ui/core'
import {
  FiChevronsRight as RightIcon
} from 'react-icons/fi'
import Login from './landing-page/Login'


const Welcome = () => {

  const classes = useStyle()


  const [showLogin, setShowLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false)

  return (
    <Paper elevation={0} className={ classes.root }>
      <div className={ classes.intro }>
        <div >
          <Logo />
          <Typography variant="h5" color='textSecondary'>
            A quality place for distance learning
          </Typography>
        </div>
        <span className={ classes.btnLogin }>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={ () => setShowLogin(cur => !cur) }
            endIcon={ <RightIcon /> }
          >
            Get started
          </Button>
        </span>
        <span className={ classes.btnCenter }>
          <Button variant="text" color="default" >
            Learn more
          </Button>
        </span>
      </div>
      <Login prop={{showLogin, setShowLogin, setOpenSignup}}/>
    </Paper>
  )
}

export default Welcome