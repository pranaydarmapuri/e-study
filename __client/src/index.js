import React, {
  useState,
  useEffect,
  createContext
} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
import useStyle from "./styles/useStyle"
import {
  ThemeProvider,
  CssBaseline,
  Paper,
  makeStyles
} from '@material-ui/core'
import './styles/index.css'
import Loader from './components/Loader'
import Welcome from './Welcome'
import Student from './users/student';
import Admin from './admin';
import Faculty from './users/faculty';
import API_URL from './configs/database.config'
import configToken from './configs/token.config';
import axiosConfig from './configs/axios.config';

// Create context
const AuthContext = createContext()

const Index = () => {

  const useCSS = makeStyles(theme => ({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: 0,
      backgroundColor: theme.palette.type === 'dark' ? '#000' : '#fefefe'
    }
  }))

  const tokenLS = localStorage.getItem('auth-token')

  const { theme } = useStyle()

  const css = useCSS()

  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(configToken(tokenLS))
  const [authData, setAuthData] = useState({})
  const [user, setUser] = useState({})

  // ================--------------------->>>> On auth change
  useEffect(() => {
    // Checking is user exists
    axiosConfig
      .post('/is-login', {}, token)
      .then(({ data }) => {
        setAuthData(data)
        axiosConfig
          .post(
            `/api/${data.role === 'student' ? 'student/get-roll' : 'employee/get-id'}/${data.id}`,
            {},
            token
          )
          .then(r => setUser(r.data))
          .catch(e => console.log(e))
      })
      .catch(error => {
        setAuthData({})
        console.warn(error)
      })
    setIsLoading(false)
  }, [token])

  const root = (role) => {
    switch (role) {
      case ('student'): return <Student />
      case ('admin'): return <Admin />
      case ('faculty'): return <Faculty />
      default:
        break;
    }
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ token, setToken, authData, setAuthData, setUser, user, API_URL }} >
          <Paper elevation={0} className={css.root}>
            <Router>
              {
                isLoading ? <Loader /> : (authData.id ? root(authData.role) : <Welcome />)
              }
            </Router>
          </Paper>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { AuthContext }