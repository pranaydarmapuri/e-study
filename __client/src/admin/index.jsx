import { createContext, useState } from 'react'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import {
  CssBaseline
} from '@material-ui/core'
// import PrivateRoute from '../components/PrivateRoute'
import Departments from './departments'
import useCSS from '../styles/useAdmin'
import { Paper } from '@material-ui/core'
import AppDrawer from "./layouts/ResponsiveDrawer";
import Home from './Home/index'
import ErrorPage from '../components/ErrorPage'
import Students from './students'
import ClassRoom from './class-rooms'
import Faculty from './faculty'
import Subjects from './subjects/all-subjects'
import SubFac from './subjects/subject-faculty/SubFac'

const PageTitle = createContext()
const UserContext = createContext()

const Admin = () => {

  const { css } = useCSS()
  const his = useHistory()

  const [pageTitle, setPageTitle] = useState('')
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <PageTitle.Provider value={{ setPageTitle, pageTitle }} >
      <Paper elevation={0} square className={ css.root }>
        <CssBaseline />
        <AppDrawer />
        <main className={ css.content } >
          <div className={ css.toolbar } />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/departments" render={() => <Departments />} />
            <Route path="/students" render={() => <Students />} />
            <Route path="/class-rooms" render={() => <ClassRoom />} />
            <Route path="/faculty" render={() => <Faculty />} />
            <Route path='/subjects' render={() => <Subjects />} />
            <Route path='/subject-faculty' render={() => <SubFac />} />
            <Route path="*" render={() => <ErrorPage setPageName={ setPageTitle } />} />
          </Switch>
        </main>
      </Paper>
    </PageTitle.Provider>
    </UserContext.Provider>
  );
}

export { PageTitle, UserContext }
export default Admin;