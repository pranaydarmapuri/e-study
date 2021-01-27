// ---------------------------------
// --------------------------------
import {
  useContext,
  useEffect
} from 'react' // ------------ importing React
import { 
  Button,
  Card, 
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'; // material-ui
import {
  ValidatorForm,
  TextValidator
} from 'react-material-ui-form-validator' // Validations
import useStyles from './useStyles'
import axios from 'axios';
import { AuthContext } from '../../../index'

/// ------------------------------------------------- Import Statements
const Form = ({
  setCurrentSubject,
  currentSubject,
  formInputs,
  setFormInputs,
  departments,
  curDept,
  setCurDept,
  alert,
  setSubjects
}) => {

  // ------------------ Form Constants
  const formInitial = {
    name: '',
    abbr: '',
    code: '',
    department: ''
  }

  const { API_URL, token } = useContext(AuthContext)
  let allSubURL = `${API_URL}/api/subject/get/all`

  // import styles
  const { useFormStyles } = useStyles()
  const css = useFormStyles()


  useEffect(() => {
    setFormInputs(cur => ({
        ...cur,
        department: curDept === 'NULL' ? '' : curDept
    }))
  }, [curDept])

  // ===================== Input Handler
  const inputHandler = ({target}) => setFormInputs({
    ...formInputs,
    [target.name]: target.value
  })
  


  // ===================== Form Validation
  // ------------- Form Validation
  useEffect(() => {

    ValidatorForm.addValidationRule('isCode', value => /^[0-9A-Z]{5,10}$/.test(value) || value.length === 0)

    ValidatorForm.addValidationRule('isName', value => {
      let i = value.length
      while(i--)  {
        let char = value.charCodeAt(i)
        if((char < 65 && char !== 32) || (char > 90 && char < 97) || (char > 122))
          return false
      }
      return true
    })

    return () => {
      ValidatorForm.removeValidationRule('isName')
      ValidatorForm.removeValidationRule('isCode')
    }
  }, [])


  // =================== Form Handler
  const formHandler = () => {
    if(currentSubject) {
      axios
        .post(
          `${API_URL}/api/subject/update/${currentSubject}`,
          formInputs,
          token
        )
        .then(res => {
          axios
            .post(allSubURL, {}, token)
            .then(res => setSubjects(res.data))
            .catch(err => console.log(err))
          alert.setAlertType('info')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
        })
        .catch(e => console.log(e))
    } else {
      axios
        .post(
          `${API_URL}/api/subject/add`, 
          formInputs, 
          token
        )
        .then(res => {
          axios
            .post(allSubURL, {}, token)
            .then(res => setSubjects(res.data))
            .catch(err => console.log(err))
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
        {`${currentSubject ? 'Edit' : 'Add'} Subject`}
      </Typography>
      <ValidatorForm
        onSubmit={event => {
          event.preventDefault()
          formHandler()
          setFormInputs(formInitial)
          setCurrentSubject(null)
          setCurDept('NULL')
        }}
        className={ css.form }
      >
        <div className={ css.flexRow }>
          <TextValidator required
            size="small"
            name="code"
            variant="outlined"
            label="Subject Code"
            className={ css.formInput }
            value={ formInputs.code }
            onChange={ inputHandler }
            validators={[`isCode`]}
            errorMessages={['Invalid code, subject code shouldn\'t contain any special characters']}
          />
          <TextValidator required
            size="small"
            name="name"
            variant="outlined"
            label="Subject Name"
            className={ css.formInput }
            value={ formInputs.name }
            onChange={ inputHandler }
            validators={[`isName`]}
            errorMessages={['Invalid name, name should not contain any numeric or special characters']}
          />
        </div>
        <div className={ css.flexRow }>
          <TextValidator required
            size="small"
            name="abbr"
            variant="outlined"
            label="Abbrivation"
            className={ css.formInput }
            value={ formInputs.abbr }
            onChange={({target}) => setFormInputs(cur => ({...cur, abbr: (target.value).toUpperCase()}))}
            validators={[`isName`]}
            errorMessages={['Invalid name, name should not contain any numeric or special characters']}
          />
          <FormControl id="dept" variant="outlined" disabled={ currentSubject ? true : false } size="small" className={ css.formInput } >
            <Select required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ curDept }
              onChange={({target}) => setCurDept(target.value)}
            >
              <MenuItem value="NULL">Select Department</MenuItem>
              {
                departments.map(dept => (
                  <MenuItem key={ `dept-list-${dept.id}` } value={ dept.id }>{ dept.name }</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className={ css.formBtnContainer }>
          <Button 
            type="reset" 
            onClick={() => {
              setFormInputs(formInitial)
              setCurrentSubject(null)
              setCurDept('NULL')
            }}
          >
            Cancel
          </Button>
          <Button 
            type='submit' 
            variant="contained" 
            color={currentSubject ? 'primary' : 'secondary'}
          >
            {currentSubject ? 'Edit' : 'Add'}
          </Button>
        </div>
      </ValidatorForm>
    </Card>
  </>);
}

export default Form;