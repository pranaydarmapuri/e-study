import { AuthContext } from './index'
import { useContext, useEffect } from 'react'
import { Button, Typography, Paper } from '@material-ui/core';
import Admin from './admin'
import Faculty from './users/faculty'
import Student from './users/student';
import axios from 'axios';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import useApp from "./styles/useApp";
import Welcome from './Welcome';
import PrivateRoute from './components/PrivateRoute'

const App = () => {

  const { token, authData } = useContext(AuthContext)
  const history = useHistory()
  const { css } = useApp()

  useEffect(() => {
    if (authData.role)
      history.replace(`/${authData.role}`)
    else
      history.replace('/')
  }, [authData])

  // const Logout = () => setToken(null)

  return (
    <Paper elevation={0} square className={css.root}>
      <Switch>
        <PrivateRoute path="/admin" render={() => <Admin />} />
        <PrivateRoute path="/student" render={() => <Student />} />
        <PrivateRoute path="/faculty" render={() => <Faculty />} />
      </Switch>
    </Paper>
  );
}

export default App;