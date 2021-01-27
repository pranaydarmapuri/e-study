/* ===================
-----------Import Statements
======================*/
import { useEffect, useState, useContext } from "react";
import Table from "./Table";
import Form from './Form'
import { PageTitle } from '../../index'
import useAlerts from "../../../components/useAlerts";
import axios from "axios";
import { AuthContext } from '../../../index'


export default function Index() {

  // --------------->........... UseContext
  const { setPageTitle } = useContext(PageTitle)
  const { API_URL, token } = useContext(AuthContext)


  // ------------------ Form Constants
  const formInitial = {
    name: '',
    abbr: '',
    code: '',
    department: ''
  }
  const [formInputs, setFormInputs] = useState(formInitial)
  const [currentSubject, setCurrentSubject] = useState('')
  const [subjects, setSubjects] = useState([])
  const { alertHandler, Alert } = useAlerts()
  const [departments, setDepartments] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [curDept, setCurDept] = useState('NULL')


  
  // ===================== useState hook
  let records = []
  const [isLoading, setIsLoading] = useState(true)

  // ==================== Setting Page Title
  useEffect(() => {
    setPageTitle('Subjects')
    axios
      .post(
        `${API_URL}/api/department/get/all`,
        {},
        token
      )
      .then(res => setDepartments(res.data))
      .catch(e => console.log(e))
  }, [])
  let url = `${API_URL}/api/subject/get/all`
  // ------------>>>>>>>>> setting subjects
  useEffect(() => { 
    axios
      .post(url, {}, token)
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(subjects && departments)
      return setIsLoading(false)
  }, [subjects, departments])

  // -------------------- rendering Loader ~~~~~~~~~~~~~~~~~~~ /////
  if(isLoading)
    return (<>
      <p>Loading</p>
    </>);
  else {
    subjects.forEach(sub => {
      let dept = departments.filter(dept => dept.id === sub.department)
      dept = dept[0]
      records.push({
        ...sub,
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
      <Form 
        setCurrentSubject={ setCurrentSubject } 
        currentSubject={currentSubject } 
        formInputs={ formInputs } 
        setFormInputs={ setFormInputs }
        departments={ departments }
        curDept={ curDept }
        setCurDept={ setCurDept }
        setSubjects={ setSubjects }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
      {/* Adding DeptTable */}
      <Table 
        currentSubject={currentSubject } 
        setCurrentSubject={ setCurrentSubject } 
        setFormInputs={ setFormInputs }
        departments={ departments }
        records={ records }
        setSubjects={ setSubjects }
        setCurDept={ setCurDept }
        setSubjects={ setSubjects }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
    </>
  )
}