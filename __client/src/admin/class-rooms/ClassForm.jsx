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
import { AuthContext } from '../../index'

/// ------------------------------------------------- Import Statements
const ClassForm = ({
  setCurrentClass,
  currentClass,
  setFormInputs,
  formInputs,
  setClasses,
  alert,
  departments,
  curYear,
  setCurYear,
  setCurDept,
  curDept
}) => {

  // ------------------ Form Constants
  const formInitial = {
    name: '',
    department: '',
    year: ''
  }

  const { API_URL, token } = useContext(AuthContext)
  let allDeptURL = `${API_URL}/api/classes/get/all`

  // import styles
  const { useFormStyles } = useStyles()
  const css = useFormStyles()

  useEffect(() => {
    setFormInputs(cur => ({
        ...cur,
        year: curYear === 'NULL' ? '' : curYear
    }))
  }, [curYear])

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

    ValidatorForm.addValidationRule('isName', value => {
      let i = value.length
      if(i > 1)
        return false
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
    if(currentClass) {
      axios
        .post(
          `${API_URL}/api/classes/update/${currentClass}`,
          formInputs,
          token
        )
        .then(res => {
          alert.setAlertType('info')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
          axios
            .post(allDeptURL, {}, token)
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
        })
        .catch(e => console.log(e))
    } else {
      axios
        .post(
          `${API_URL}/api/classes/add`, 
          { 
            name: formInputs.name.toUpperCase(),
            year: formInputs.year,
            department: formInputs.department
          }, 
          token
        )
        .then(res => {
          alert.setAlertType('success')
          alert.setAlertMessage(res.data.message)
          alert.alertHandler()
          axios
            .post(allDeptURL, {}, token)
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
  }

  return (<>
    <Card elevation={1} className={ css.root } >
      <Typography variant="h5" color="textPrimary" component="h1">
        {`${currentClass ? 'Edit' : 'Add'} Section`}
      </Typography>
      <ValidatorForm
        onSubmit={event => {
          event.preventDefault()
          formHandler()
          setFormInputs(formInitial)
          setCurrentClass(null)
        }}
        className={ css.form }
      >
        <TextValidator required
          size="small"
          name="name"
          variant="outlined"
          label="Section Name"
          className={ css.formInput }
          value={ formInputs.name }
          onChange={ inputHandler }
          validators={[`isName`]}
          errorMessages={['Invalid name, name should contain any numeric or special characters']}
        />
        <div className={ css.flexRow }>
          <FormControl id="dept" variant="outlined" disabled={ currentClass ? true : false } size="small" className={ css.formInput } >
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
          <FormControl id="dept" variant="outlined" size="small" className={ css.formInput } >
            <Select required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ curYear }
              onChange={({target}) => setCurYear(target.value)}
            >
              <MenuItem value="NULL">Select Year</MenuItem>
              <MenuItem value="1">I</MenuItem>
              <MenuItem value="2">II</MenuItem>
              <MenuItem value="3">III</MenuItem>
              <MenuItem value="4">IV</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={ css.formBtnContainer }>
          <Button 
            type="reset" 
            onClick={() => {
              setFormInputs(formInitial)
              setCurrentClass(null)
              setCurDept('NULL')
              setCurYear('NULL')
            }}
          >
            Cancel
          </Button>
          <Button 
            type='submit' 
            variant="contained" 
            color={currentClass ? 'primary' : 'secondary'}
          >
            {currentClass ? 'Edit' : 'Add'}
          </Button>
        </div>
      </ValidatorForm>
    </Card>
  </>);
}

export default ClassForm;