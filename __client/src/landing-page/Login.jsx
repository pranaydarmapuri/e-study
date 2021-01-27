import React,{
  useState,
  useContext
} from 'react';
import axios from 'axios'
import { 
  Card, 
  IconButton, 
  InputLabel, 
  Typography, 
  FormControl, 
  FormControlLabel,
  Checkbox,
  OutlinedInput, 
  Button,
  Divider, Dialog, DialogContent, DialogContentText, DialogTitle, TextField
} from '@material-ui/core';
// import { Cancel as CloseIcon} from '@material-ui/icons';
import useLogin from '../styles/useLogin'
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { AuthContext } from '../index'
import configToken from '../configs/token.config'


const Login = ({prop}) => {

  const { setToken, API_URL } = useContext(AuthContext)
  const url = `${API_URL}/login`

  const css = useLogin(prop.showLogin);
  const classes = css()

  const LoginInitials = {
    id: '',
    password: ''
  };

  const [loginInputs, setLoginInputs] = useState(LoginInitials);
  const [showPassword, setShowPassword] = useState(false);

  const LoginInputHandler = ({target}) => {
    setLoginInputs({
      ...loginInputs,
      [target.name]: target.value
    });
  }

  // =======================>>>>>... Login
  const loginHandler = () => {
    if(loginInputs.id && loginInputs.password) {
      axios
        .post(
          url, 
          loginInputs
        )
        .then(res => {
          setToken(configToken(res.data))
          localStorage.setItem('auth-token', res.data)
        })
        .catch(e => console.log(e))
    }
    setLoginInputs({})
  }

  const openSignup = () => {
    prop.setOpenSignup(true)
    prop.setShowLogin(cur => !cur)
  }

  //------------------------------------------  Reset Password
  const [resetPwd, setResetPwd] = useState(false)
  const [emailId, setEmailId] = useState('')
  

  return (
    <div className={ classes.root }>
      <Card className={ classes.loginCard }>
        <IconButton 
          aria-label="Close" 
          onClick={() => prop.setShowLogin(cur => !cur)}
        >
          {/* <CloseIcon /> */}
        </IconButton>
        <Typography variant="h2" color="initial">
          Login.
        </Typography>
        <form 
          className={ classes.form }
          onSubmit={e => {
            e.preventDefault();
            loginHandler()
          }}
        >
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="component-outlined"color="secondary" >ID/Roll No.</InputLabel>
            <OutlinedInput required
              type='text'
              id="component-outlined" 
              value={ loginInputs.id } 
              onChange={ LoginInputHandler } 
              label="Username" 
              name="id"
              color="secondary"
            />
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="component-outlined-password" color="secondary" >Password</InputLabel>
            <OutlinedInput required
              id="component-outlined-password" 
              value={ loginInputs.password } 
              onChange={ LoginInputHandler } 
              label="Password" 
              name="password"
              type={ showPassword ? 'text' : "password" }
              color="secondary"
            />
            <FormControlLabel
            control={
              <Checkbox
                checked={ showPassword }
                onChange={() => setShowPassword(cur => !cur)}
                name="checkedB"
                color="secondary"
              />
            }
            label="Show password"
          />
          </FormControl>
          <Typography 
            variant="subtitle1" 
            color="secondary" 
            className={ classes.forgotPwd }
            onClick={() => {
              setResetPwd(true)
              prop.setShowLogin(false)
            }} 
          >
            forgot password?
          </Typography>
          <Button variant="contained" color="secondary" size='large' type="submit">
            Login
          </Button>
        </form>
        <Typography variant="subtitle1" color="initial" className={ classes.signup }>
          Create an account?
          <Button variant="text" color="default" onClick={ openSignup } >
            Click Here
          </Button>
        </Typography>
        <Divider />
        <IconButton 
          size="medium" 
          className={ classes.signInWithGoogle }
          onClick={ ()=>{return} }
        >
          <GoogleIcon />
        </IconButton>
      </Card>
      <Dialog 
        open={resetPwd} 
        onClose={() => {
          setResetPwd(false)
          setEmailId('')
        }} 
        aria-labelledby="ResetPwd" 
        classes={{ 
          paper: classes.resetInput, 
          scrollPaper: classes.scrollPaper 
        }}
        >
        <form 
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <DialogTitle id="ResetPwd">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your registered email
            </DialogContentText>
            <TextField required
              type="email"
              name="emailId"
              variant="outlined"
              value={ emailId }
              onChange={({target}) => setEmailId(target.value)}
              size='small'
              className={ classes.resetEmail }
            />
            <div className={ classes.resetInputFormBtn }>
              <Button 
                onClick={() => {
                  setResetPwd(false)
                  setEmailId('')
                }} 
                color="default"
              >
                Cancel
              </Button>
              <Button type="submit" color='secondary' variant="contained">
                Confirm
              </Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default Login;