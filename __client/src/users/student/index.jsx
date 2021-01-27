import { useEffect, useContext } from 'react'
import axios from 'axios'
import {
  useHistory,
  Switch,
  Route
} from 'react-router-dom'
import { AuthContext } from '../../index'


const Student = () => {

  const page = useHistory()

  const { token } = useContext(AuthContext)

  useEffect(() => {
    axios
      .post('http://localhost:5000/e_study_app/api/student/get-roll/177R1A0574', { token: token })
      .then(res => console.log(res))
      .catch(e => console.log(e))
  })

  return (
    <>
    <button onClick={() => page.replace('/about')}>About</button>
    <Switch>
      <Route exact path="/" render={() => <h1>Hello</h1>} />
      <Route exact path="/about" render={() => <h1>About</h1>} />
    </Switch>
    </>
  )
}

export default Student