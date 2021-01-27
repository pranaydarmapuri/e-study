/* ===================
-----------Import Statements
======================*/
import { useEffect, useState, useContext } from "react";
import ClassTable from "./ClassTable";
import ClassForm from './ClassForm'
import { PageTitle } from '../index'
import useAlerts from "../../components/useAlerts";
import axios from "axios";
import { AuthContext } from '../../index'
import Timetable from '../time-table'


export default function Index() {

  // --------------->........... UseContext
  const { setPageTitle } = useContext(PageTitle)
  const { API_URL, token } = useContext(AuthContext)

  // ------------------ Form Constants
  const formInitial = {
    name: '',
    abbr: '',
    id: ''
  }
  const [formInputs, setFormInputs] = useState(formInitial)
  const [currentClass, setCurrentClass] = useState(null)
  const [classes, setClasses] = useState([])
  const { alertHandler, Alert } = useAlerts()
  const [departments, setDepartments] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [curYear, setCurYear] = useState('NULL')
  const [curDept, setCurDept] = useState('NULL')
  const [curTableId, setCurTableId] = useState('')
  const [curTableName, setCurTableName] = useState('')

  
  // ===================== useState hook
  let records = []
  const [isLoading, setIsLoading] = useState(true)

  // ==================== Setting Page Title
  useEffect(() => {
    setPageTitle('Class Rooms')
    axios
      .post(
        `${API_URL}/api/department/get/all`,
        {},
        token
      )
      .then(res => setDepartments(res.data))
      .catch(e => console.log(e))
  }, [])
  let url = `${API_URL}/api/classes/get/all`
  // ------------>>>>>>>>> setting classes
  useEffect(() => { 
    axios
      .post(url, {}, token)
      .then(res => setClasses(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(classes && departments)
      return setIsLoading(false)
  }, [classes, departments])

  // -------------------- rendering Loader ~~~~~~~~~~~~~~~~~~~ /////
  if(isLoading)
    return (<>
      <p>Loading</p>
    </>);
  else {
    classes.forEach(student => {
      let dept = departments.filter(dept => dept.id === student.department)
      dept = dept[0]
      records.push({
        ...student,
        departmentObj: {
          ...dept
        }
      })
    })
  }


  // -------------------- rendering components
  return (
    <>
      <Alert type={ alertType } message={ alertMessage } />
      <ClassForm 
        setCurrentClass={ setCurrentClass } 
        currentClass={ currentClass } 
        formInputs={ formInputs } 
        setFormInputs={ setFormInputs }
        departments={ departments }
        setClasses={ setClasses }
        curDept={ curDept }
        setCurDept={ setCurDept }
        curYear={ curYear }
        setCurYear={ setCurYear }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
      {/* Adding DeptTable */}
      <ClassTable 
        currentClass={ currentClass } 
        setCurrentClass={ setCurrentClass } 
        setFormInputs={ setFormInputs }
        departments={ departments }
        records={ records }
        setClasses={ setClasses }
        setCurDept={ setCurDept }
        setCurYear={ setCurYear }
        setCurTableId={ setCurTableId }
        setCurTableName={ setCurTableName }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
      <Timetable _props={{ setCurTableId, curTableId, curTableName, alert: { setAlertType, setAlertMessage, alertHandler } }} />
    </>
  )
}