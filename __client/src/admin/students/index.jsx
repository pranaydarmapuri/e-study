/* ===================
-----------Import Statements
======================*/
import { useEffect, useState, useContext } from "react";
import { PageTitle } from '../index'
import useAlerts from "../../components/useAlerts";
import axios from "axios";
import { AuthContext } from '../../index'
import StudentTable from "./StudentTable";
import StudentFrom from './StudentForm'


// -------------------->>>>>>>>>>> Student component
const StudentsIndex = () => {

  // --------------->........... UseContext
  const { API_URL, token } = useContext(AuthContext)
  const { setPageTitle } = useContext(PageTitle)

  // ------------>>>>>> Alert
  const { Alert, alertHandler } = useAlerts()
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  // --->>>>>>>> Loading state
  const [isLoading, setIsLoading] = useState(true)

  // ------------->>>>>>>> Students & thier departments
  let records = []
  const headCells = [
    {id: 'id', label: 'Roll No'},
    {id: 'name', label: 'Full Name'},
    {id: 'departmentName', label: 'Department'},
    {id: 'sectionName', label: 'Section'},
    {id: 'year', label: 'Year'},
    {id: 'action', label: 'Action', disableSorting: true}
  ]
  const formInputInitials = {
    name: '',
    id: '',
    department: '',
    classRoom: '',
    dob: '',
    fatherName: '',
    mobileNo: '',
    year: ''
  }
  const [students, setStudents] = useState([])
  const [departments, setDepartments] = useState([])
  const [classes, setClasses] = useState([])
  const [deptFilter, setDeptFilter] = useState('ALL')
  const [yearFilter, setYearFilter] = useState('ALL')
  const [openPopup, setOpenPopup] = useState(false)
  const [dept, setDept] = useState('')
  const [year, setYear] = useState('')
  const [section, setSection] = useState('')
  const [formInputs, setFormInputs] = useState(formInputInitials)
  const [currentStudentId, setCurrentStudentId] = useState('')

  // >>>>>> delete Student 
  const deleteStudent = id => {
    axios
      .post(`${API_URL}/api/student/delete/${id}`, {}, token)
      .then(({data}) => {
        fetchStudents()
        setAlertMessage(data.message)
        setAlertType('info')
        alertHandler()
      })
      .catch(e => console.log(e))
  }

  // -->>>> fetching students
  const fetchStudents = () => {
    axios
      .post(`${API_URL}/api/student/get/all`, {}, token)
      .then(res => setStudents(res.data))
      .catch(e => console.log(e))
  }
  // --->>>> fetching departments
  const fetchDepts = () => {
    axios
      .post(`${API_URL}/api/department/get/all`, {}, token)
      .then(res => setDepartments(res.data))
      .catch(e => console.log(e))
  }
  // --->>>> fetching Classes
  const fetchClasses = () => {
    axios
      .post(`${API_URL}/api/classes/get/all`, {}, token)
      .then(res => setClasses(res.data))
      .catch(e => console.log(e))
  }

  // ==================== Onload
  useEffect(() => {
    // -------->>>>>>>>> Setting page title
    setPageTitle('Students')
    // ------->>>>>> Fetching Students
    fetchStudents()
    // ------->>>>>> Fetching Departments
    fetchDepts()
    // ----->>>>>>> Fetching Classes
    fetchClasses()
  }, [])

  // checking is loading
  useEffect(() => {
    if(departments && students && classes)
      setIsLoading(false)
  }, [departments, students, classes])

  if(isLoading)
    return (
      <>Loading...</>
    )

  else {
    students.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    if(deptFilter === 'ALL' && yearFilter === 'ALL') 
      students.forEach(student => {
        let dept = departments.filter(dept => dept.id === student.department)
        dept = dept[0]
        records.push({
          ...student,
          department: { ...dept }
        })
      })
    else if(deptFilter === 'ALL')
      (students.filter(student => student.year === yearFilter)).forEach(student => {
        let dept = departments.filter(dept => dept.id === student.department)
        dept = dept[0]
        records.push({
          ...student,
          department: { ...dept }
        })
      })
    else if(yearFilter === 'ALL')
      (students.filter(student => student.department === deptFilter)).forEach(student => {
        let dept = departments.filter(dept => dept.id === student.department)
        dept = dept[0]
        records.push({
          ...student,
          department: { ...dept }
        })
      })
    else 
      (students.filter(student => student.department === deptFilter && student.year === yearFilter)).forEach(student => {
        let dept = departments.filter(dept => dept.id === student.department)
        dept = dept[0]
        records.push({
          ...student,
          department: { ...dept }
        })
      })
  }

  return (
    <>
      <Alert type={ alertType } message={ alertMessage } />
      <StudentFrom _props={{
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
        alerts: {
          alertHandler,
          setAlertMessage,
          setAlertType
        }
      }} />
      <StudentTable 
        records={ records }
        headCells={ headCells }
        departments={ departments }
        setOpenPopup={ setOpenPopup }
        classes={ classes }
        setCurrentStudentId={ setCurrentStudentId }
        setFormInputs = { setFormInputs }
        setYear={ setYear }
        setDept={ setDept }
        setSection={ setSection }
        deleteStudent={ deleteStudent }
        filters={{ 
          deptFilter,
          setDeptFilter,
          yearFilter,
          setYearFilter
        }}
      />
    </>
  );
}

export default StudentsIndex;