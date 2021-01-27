import {
  useEffect,
  useState,
  useContext
} from 'react'
import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  FormGroup,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {
  MdClose as Xicon
} from 'react-icons/md'
import useTableStyles from '../../styles/useTableStyles'
import {
  ValidatorForm,
  TextValidator
} from 'react-material-ui-form-validator'
import axios from  'axios'
import { AuthContext } from '../../index'


const Popup = ({ _props }) => {

  const {
    designation,
    setDesignation,
    setDept,
    dept,
    formInputs,
    formInputInitials,
    setFormInputs,
    openPopup,
    setOpenPopup,
    currentFacultyId,
    setCurrentFacultyId,
    departments,
    fetchFaculties,
    alerts
  } = _props

  const { useStyleForPopup } = useTableStyles()

  const css = useStyleForPopup();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


  const { token, API_URL } = useContext(AuthContext)

  const [secs, setSecs] = useState([])

  const idHandler = ({target}) => setFormInputs(cur => ({
    ...cur,
    id: target.value.toUpperCase()
  }))

  // ------------ Input Handler
  const inputHandler = ({target}) => setFormInputs(prevInput => ({
    ...prevInput,
    [target.name]: target.value
  }))
  
  // ---->>>> Department from
  useEffect(() => setFormInputs(cur => ({
    ...cur,
    department: dept
  })), [dept])
  // --->>>>> Designation form
  useEffect(() => setFormInputs(cur => ({
    ...cur,
    designation: designation
  })), [designation])

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
    ValidatorForm.addValidationRule('isRollNo', id => id.length === 5 || id.length === 0)

    return () => {
      ValidatorForm.removeValidationRule('isName')
      ValidatorForm.removeValidationRule('isRollNo')
    }
  }, [])

  //--->>>>>> Update faculty
  const updateFaculty = () => {
    const url = `${API_URL}/api/employee/update/${currentFacultyId}`
    axios
      .post(url, formInputs, token)
      .then(res => {
        fetchFaculties()
        alerts.setAlertType('success')
        alerts.setAlertMessage(res.data.message)
        alerts.alertHandler()
      })
      .catch(e => {
        alerts.setAlertType('danger')
        alerts.setAlertMessage('Something went wrong, while updating')
        alerts.alertHandler()
      })
  }

  //-->>>>>> Add faculty
  const addFaculty = () => {
    const url = `${API_URL}/api/employee/add`
    axios
      .post(url, formInputs, token)
      .then(res => {
        fetchFaculties()
        alerts.setAlertType('success')
        alerts.setAlertMessage(res.data.message)
        alerts.alertHandler()
      })
      .catch(e => {
        alerts.setAlertType('danger')
        alerts.setAlertMessage('Something went wrong, while adding')
        alerts.alertHandler()
      })
  }

  const formHandler = e => {
    e.preventDefault()
    setFormInputs(cur => ({
      ...cur,
      id: cur.id.toUpperCase()
    }))
    if(currentFacultyId === '') 
      addFaculty() 
    else
      updateFaculty()
    setOpenPopup(cur => !cur)
    setDept('')
    setDesignation('')
    setCurrentFacultyId('')
    setFormInputs(formInputInitials)
    fetchFaculties()
  }

  return (
    <Dialog
      classes={{ paper: css.root }}
      fullScreen={ fullScreen }
      open={openPopup} 
      maxWidth='xl' 
      onClose={() => {
        setOpenPopup(cur => !cur)
        setDept('')
        setDesignation('')
        setCurrentFacultyId('')
        setFormInputs(formInputInitials)
      }}
    >
      <div className={ css.titleContainer }>
        <DialogTitle>
          { currentFacultyId ? 'Edit Faculty' : 'Add Faculty' }
        </DialogTitle>
        <IconButton onClick={() => {
          setOpenPopup(cur => !cur)
          setDept('')
          setDesignation('')
          setCurrentFacultyId('')
          setFormInputs(formInputInitials)
        }}>
          <Xicon />
        </IconButton>
      </div>
      <DialogContent>
        <Divider />
        <ValidatorForm 
          className={ css.form }
          onSubmit={ formHandler }
        >
          <FormGroup className={ css.formGroup } >
            <label htmlFor="roll-no">Employee Id</label>
            <TextValidator required
              id="roll-no"
              name="id" 
              variant="outlined"
              size="small"
              validators={[`matchRegexp:[0-9]`,'isRollNo']}
              errorMessages={['Invalid Id','Id should be 5(five) digits']}
              value={ formInputs.id }
              onChange={ inputHandler }
              className={ css.fromFeilds }
            />
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="full-name">Full Name</label>
            <TextValidator required
              id="full-name"
              name="name" 
              variant="outlined"
              size="small"
              validators={[`isName`]}
              errorMessages={['Invalid name, name should contain any numeric or special characters']}
              value={ formInputs.name }
              onChange={ inputHandler }
              className={ css.fromFeilds }
            />
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="dept">Department</label>
            <FormControl id="dept" variant="outlined" size="small" >
              <Select required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ dept }
                onChange={({target}) => setDept(target.value)}
              >
                {
                  departments.map(dept => (
                    <MenuItem key={ `dept-list-${dept.id}` } value={ dept.id }>{ dept.name }</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="design">Designation</label>
            <FormControl id="design" variant="outlined" size="small" >
              <Select required
                labelId="demo-design-select-label"
                id="demo-design-select"
                value={ designation }
                onChange={({target}) => setDesignation(target.value)}
              >
                <MenuItem value={ 'Professor' }>Professor</MenuItem>
                <MenuItem value={ 'Associate Professor' }>Associate Professor</MenuItem>
                <MenuItem value={ 'Assistant Professor' }>Assistant Professor</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="mobile-no">Mobile No</label>
            <TextValidator required
              id="mobile-no"
              name="mobileNo" 
              variant="outlined"
              size="small"
              validators={[`matchRegexp:^[0-9]{10}$`]}
              errorMessages={['Invalid mobile no.,mobile no should be 10(ten) digits']}
              value={ formInputs.mobileNo }
              onChange={ inputHandler }
              className={ css.fromFeilds }
            />
          </FormGroup>
          <Divider style={{marginTop: '24px', marginBottom: '16px'}} />
          <div className={ css.formBtnContainer } style={{marginBottom: '16px'}} >
            <Button onClick={() => {
              setDept('')
              setDesignation('')
              setCurrentFacultyId('')
              setFormInputs(formInputInitials)
            }} >Clear</Button>
            <Button 
              variant="contained"
              color={currentFacultyId ? 'primary' : 'secondary'} 
              type='submit'
            >
              {currentFacultyId ? 'Edit' : 'Add'}
            </Button>
          </div>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
}

export default Popup