// ---------------------------------
// --------------------------------
import {
  useContext,
  useEffect
} from 'react' // ------------ importing React
import { 
  Button,
  Card, 
  Typography
} from '@material-ui/core'; // material-ui
import {
  ValidatorForm,
  TextValidator
} from 'react-material-ui-form-validator' // Validations
import useStyles from './useStyles'
import axios from 'axios';
import { AuthContext } from '../../index'

/// ------------------------------------------------- Import Statements
const DeptForm = ({
  setCurrentDept,
  currentDept,
  setFormInputs,
  formInputs,
  setDepartments,
  alert
}) => {

  // ------------------ Form Constants
  const formInitial = {
    name: '',
    abbr: '',
    id: ''
  }

  const { API_URL, token } = useContext(AuthContext)
  let allDeptURL = `${API_URL}/api/department/get/all`

  // import styles
  const { useFormStyles } = useStyles()
  const css = useFormStyles()


  // ===================== Input Handler
  const inputHandler = ({target}) => setFormInputs({
    ...formInputs,
    [target.name]: target.value
  })


  // ===================== Form Validation
  // ------------- Form Validation
  useEffect(() => {

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
    }
  }, [])

  // =================== Form Handler
  const formHandler = () => {
    if(currentDept) {
      axios
        .post(
          `${API_URL}/api/department/update/${currentDept}`,
          formInputs,
          token
        )
        .then(res => {
          alert.setAlertType('info')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
          axios
            .post(allDeptURL, {}, token)
            .then(res => setDepartments(res.data))
            .catch(err => console.log(err))
        })
        .catch(e => console.log(e))
    } else {
      axios
        .post(
          `${API_URL}/api/department/add`, 
          formInputs, 
          token
        )
        .then(res => {
          alert.setAlertType('success')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
          axios
            .post(allDeptURL, {}, token)
            .then(res => setDepartments(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }

  return (<>
    <Card elevation={1} className={ css.root } >
      <Typography variant="h5" color="textPrimary" component="h1">
        {`${currentDept ? 'Edit' : 'Add'} Department`}
      </Typography>
      <ValidatorForm
        onSubmit={event => {
          event.preventDefault()
          formHandler()
          setFormInputs(formInitial)
          setCurrentDept(null)
        }}
        className={ css.form }
      >
        <TextValidator required
          size="small"
          name="name"
          variant="outlined"
          label="Department Name"
          className={ css.formInput }
          value={ formInputs.name }
          onChange={ inputHandler }
          validators={[`isName`]}
          errorMessages={['Invalid name, name should contain any numeric or special characters']}
        />
        <div className={ css.flexRow }>
          <TextValidator required
            size="small"
            name="id"
            variant="outlined"
            label="Department Id"
            className={ css.formInput }
            value={ formInputs.id }
            onChange={ inputHandler }
            disabled={currentDept ? true : false}
          />
          <TextValidator required
            size="small"
            name="abbr"
            variant="outlined"
            label="Abbrivation"
            className={ css.formInput }
            value={ formInputs.abbr }
            onChange={ inputHandler }
            validators={[`isName`]}
            errorMessages={['Invalid name, name should contain any numeric or special characters']}
          />
        </div>
        <div className={ css.formBtnContainer }>
          <Button 
            type="reset" 
            onClick={() => {
              setFormInputs(formInitial)
              setCurrentDept(null)
            }}
          >
            Cancel
          </Button>
          <Button 
            type='submit' 
            variant="contained" 
            color={currentDept? 'primary' : 'secondary'}
          >
            {currentDept ? 'Edit' : 'Add'}
          </Button>
        </div>
      </ValidatorForm>
    </Card>
  </>);
}

export default DeptForm;