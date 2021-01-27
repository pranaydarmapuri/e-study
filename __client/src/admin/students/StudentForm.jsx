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
    year,
    setYear,
    setDept,
    dept,
    formInputs,
    formInputInitials,
    setFormInputs,
    openPopup,
    setOpenPopup,
    currentStudentId,
    setCurrentStudentId,
    departments,
    classes,
    section,
    setSection,
    fetchStudents,
    alerts
  } = _props

  const { useStyleForPopup } = useTableStyles()

  const css = useStyleForPopup();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  let initDate = new Date('2021-01-01T00:00:00')

  const { token, API_URL } = useContext(AuthContext)

  const [secs, setSecs] = useState([])
  const [selectedDate, setSelectedDate] = useState(initDate)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormInputs(cur => ({
      ...cur,
      dob: date
    }))
  };

  const rollNoHandler = ({target}) => setFormInputs(cur => ({
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
  // --->>>>> Year form
  useEffect(() => setFormInputs(cur => ({
    ...cur,
    year: year
  })), [year])
  // -------->>>> Section form
  useEffect(() => setFormInputs(cur => ({
    ...cur,
    section: section
  })), [section])

  useEffect(() => {
    setSecs(classes.filter(sec => sec.year === year && sec.department === dept))
  }, [year,dept])

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
    ValidatorForm.addValidationRule('isRollNo', id => id.length === 10 || id.length === 0)

    return () => {
      ValidatorForm.removeValidationRule('isName')
      ValidatorForm.removeValidationRule('isRollNo')
    }
  }, [])

  //--->>>>>> Update Student
  const updateStudent = () => {
    const url = `${API_URL}/api/student/update/${currentStudentId}`
    axios
      .post(url, formInputs, token)
      .then(res => {
        fetchStudents()
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

  //-->>>>>> Add Student
  const addStudent = () => {
    const url = `${API_URL}/api/student/add`
    axios
      .post(url, formInputs, token)
      .then(res => {
        fetchStudents()
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
    if(currentStudentId === '') 
      addStudent() 
    else
      updateStudent()
    setOpenPopup(cur => !cur)
    setDept('')
    setYear('')
    setCurrentStudentId('')
    setSelectedDate(initDate)
    setFormInputs(formInputInitials)
    fetchStudents()
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
        setYear('')
        setCurrentStudentId('')
        setSelectedDate(initDate)
        setFormInputs(formInputInitials)
      }}
    >
      <div className={ css.titleContainer }>
        <DialogTitle>
          { !currentStudentId ? 'Edit Student' : 'Add Student' }
        </DialogTitle>
        <IconButton onClick={() => {
          setOpenPopup(cur => !cur)
          setDept('')
          setYear('')
          setCurrentStudentId('')
          setSelectedDate(initDate)
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
            <label htmlFor="roll-no">Roll No</label>
            <TextValidator required
              id="roll-no"
              name="id" 
              variant="outlined"
              size="small"
              validators={[`matchRegexp:[a-zA-Z0-9]`,'isRollNo']}
              errorMessages={['Invalid roll no.','Roll no should be 10(ten) digits']}
              value={ formInputs.id }
              onChange={ rollNoHandler }
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
            <label htmlFor="year">Year</label>
            <FormControl id="year" variant="outlined" size="small" >
              <Select required
                labelId="demo-year-select-label"
                id="demo-year-select"
                value={ year }
                onChange={({target}) => setYear(target.value)}
              >
                <MenuItem value={ 1 }>I</MenuItem>
                <MenuItem value={ 2 }>II</MenuItem>
                <MenuItem value={ 3 }>III</MenuItem>
                <MenuItem value={ 4 }>IV</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="section">Section</label>
            <FormControl id="section" variant="outlined" size="small" >
              <Select required
                labelId="demo-sec-select-label"
                id="demo-sec-select"
                value={ section }
                onChange={({target}) => setSection(target.value)}
              >
                {
                  secs.map(sec => (
                    <MenuItem key={ sec._id } value={ sec._id }>{ sec.name }</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label>Date of Birth</label>
            <MuiPickersUtilsProvider utils={DateFnsUtils} className={ css.formGroup } >
              <KeyboardDatePicker
                margin="none"
                inputVariant="outlined"
                size="small"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="mobile-no">Mobile No</label>
            <TextValidator required
              id="mobile-no"
              name="mobileNo" 
              variant="outlined"
              size="small"
              validators={[`matchRegexp:[0-9]`,'isRollNo']}
              errorMessages={['Invalid mobile no.','mobile no should be 10(ten) digits']}
              value={ formInputs.mobileNo }
              onChange={ inputHandler }
              className={ css.fromFeilds }
            />
          </FormGroup>
          <FormGroup className={ css.formGroup } >
            <label htmlFor="father-name">Father Name</label>
            <TextValidator required
              id="father-name"
              name="fatherName" 
              variant="outlined"
              size="small"
              validators={[`isName`]}
              errorMessages={['Invalid name, name should contain any numeric or special characters']}
              value={ formInputs.fatherName }
              onChange={ inputHandler }
              className={ css.fromFeilds }
            />
          </FormGroup>
          <Divider style={{marginTop: '24px', marginBottom: '16px'}} />
          <div className={ css.formBtnContainer } style={{marginBottom: '16px'}} >
            <Button onClick={() => {
              setDept('')
              setYear('')
              setCurrentStudentId('')
              setSelectedDate(initDate)
              setFormInputs(formInputInitials)
            }} >Clear</Button>
            <Button 
              variant="contained"
              color={currentStudentId ? 'primary' : 'secondary'} 
              type='submit'
            >
              {currentStudentId ? 'Edit' : 'Add'}
            </Button>
          </div>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
}

export default Popup