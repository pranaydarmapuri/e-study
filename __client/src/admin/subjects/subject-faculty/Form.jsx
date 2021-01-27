// ---------------------------------
// --------------------------------
import {
  useContext
} from 'react' // ------------ importing React
import { 
  Button,
  Card, 
  Typography,
  TextField
} from '@material-ui/core'; // material-ui
import {
  Autocomplete
} from '@material-ui/lab'
import {
  ValidatorForm,
} from 'react-material-ui-form-validator' // Validations
import useStyles from './useStyles'
import axios from 'axios';
import { AuthContext } from '../../../index'

/// ------------------------------------------------- Import Statements
const Form = ({
  setCurSubFac,
  curSubFac,
  setCurSub,
  curSub,
  curFac,
  setCurFac,
  setCurSec,
  curSec,
  fetchSubFacList,
  subjects,
  faculties,
  sections,
  alert
}) => {


  const { API_URL, token } = useContext(AuthContext)


  // import styles
  const { useFormStyles } = useStyles()
  const css = useFormStyles()

  // -->>>>> Form Inputs

  // >>>>>>>>>>>. Close Handler
  const closeHandler = () => {
    setCurFac(null)
    setCurSub(null)
    setCurSec(null)
    setCurSubFac(null)
  }

  // =================== Form Handler
  const formHandler = () => {
    if(curSubFac) {
      axios
        .post(
          `${API_URL}/api/sub-fac/update/${curSubFac}`, {
            faculty: curFac.id,
            subject: curSub.code,
            section: curSec._id
          }, token
        )
        .then(res => {
          fetchSubFacList()
          alert.setAlertType('info')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
        })
        .catch(e => console.log(e))
    } else {
      axios
        .post(
          `${API_URL}/api/sub-fac/add`, {
            faculty: curFac.id,
            subject: curSub.code,
            section: curSec._id
          }, token
        )
        .then(res => {
          fetchSubFacList()
          alert.setAlertType('success')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
        })
        .catch(err => console.log(err))
    }
  }

  return (<>
    <Card elevation={1} className={ css.root } >
      <Typography variant="h5" color="textPrimary" component="h1">
        {`${curSubFac ? 'Edit' : 'Add'} subject to faculty`}
      </Typography>
      <ValidatorForm
        onSubmit={event => {
          event.preventDefault()
          formHandler()
          closeHandler()
        }}
        className={ css.form }
      >
        <Autocomplete
          id="subjects"
          options={subjects}
          getOptionLabel={opt => opt.abbr ? `${opt.abbr} - ${opt.name}`: null }
          style={{ width: '100%' }}
          value={ curSub }
          onChange={(event, value) =>  setCurSub(value)}
          renderInput={(params) => (<TextField {...params} size="small" label="Subject" variant="outlined"/>)}
        />
        <div className={ css.flexRow }>
          <Autocomplete
            id="faculty"
            options={faculties}
            getOptionLabel={opt => opt.id ? `${opt.id} - ${opt.name}`: null }
            style={{ width: '100%' }}
            value={ curFac }
            onChange={(event, value) =>  setCurFac(value)}
            renderInput={(params) => (<TextField {...params} size="small" label="Faculty" variant="outlined"/>)}
          />
          <Autocomplete
            id="class"
            options={sections}
            getOptionLabel={opt => opt.displayName }
            style={{ width: '100%' }}
            value={ curSec }
            onChange={(event, value) =>  setCurSec(value)}
            renderInput={(params) => (<TextField {...params} size="small" label="Section" variant="outlined"/>)}
          />
        </div>
        <div className={ css.formBtnContainer }>
          <Button 
            type="reset" 
            onClick={() => closeHandler()}
          >
            Cancel
          </Button>
          <Button 
            type='submit' 
            variant="contained" 
            color={curSubFac ? 'primary' : 'secondary'}
          >
            {curSubFac ? 'Edit' : 'Add'}
          </Button>
        </div>
      </ValidatorForm>
    </Card>
  </>);
}

export default Form;