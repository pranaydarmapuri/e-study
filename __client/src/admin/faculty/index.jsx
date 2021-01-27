/* ===================
-----------Import Statements
======================*/
import { useEffect, useState, useContext } from "react";
import { PageTitle } from '../index'
import useAlerts from "../../components/useAlerts";
import axios from "axios";
import { AuthContext } from '../../index'
import Table from "./Table";
import From from './Form'


// -------------------->>>>>>>>>>> component
const Index = () => {

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
    {id: 'designation', label: 'Designation'},
    {id: 'action', label: 'Action', disableSorting: true}
  ]
  const formInputInitials = {
    name: '',
    id: '',
    department: '',
    designation: '',
    mobileNo: ''
  }
  const [faculties, setFaculties] = useState([])
  const [departments, setDepartments] = useState([])
  const [deptFilter, setDeptFilter] = useState('ALL')
  const [designationFilter, setDesignationFilter] = useState('ALL')
  const [openPopup, setOpenPopup] = useState(false)
  const [dept, setDept] = useState('')
  const [designation, setDesignation] = useState('')
  const [formInputs, setFormInputs] = useState(formInputInitials)
  const [currentFacultyId, setCurrentFacultyId] = useState('')

  // >>>>>> delete faculty 
  const deleteFaculty = id => {
    axios
      .post(`${API_URL}/api/employee/delete/${id}`, {}, token)
      .then(({data}) => {
        fetchFaculties()
        setAlertMessage(data.message)
        setAlertType('info')
        alertHandler()
      })
  }

  // -->>>> fetching faculties
  const fetchFaculties = () => {
    axios
      .post(`${API_URL}/api/employee/get/all`, {}, token)
      .then(res => setFaculties(res.data))
      .catch(e => console.log(e))
  }
  // --->>>> fetching departments
  const fetchDepts = () => {
    axios
      .post(`${API_URL}/api/department/get/all`, {}, token)
      .then(res => setDepartments(res.data))
      .catch(e => console.log(e))
  }

  // ==================== Onload
  useEffect(() => {
    // -------->>>>>>>>> Setting page title
    setPageTitle('Students')
    // ------->>>>>> Fetching faculties
    fetchFaculties()
    // ------->>>>>> Fetching Departments
    fetchDepts()
  }, [])

  // checking is loading
  useEffect(() => {
    if(departments && faculties)
      setIsLoading(false)
  }, [departments, faculties])

  if(isLoading)
    return (
      <>Loading...</>
    )

  else {
    faculties.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    if(deptFilter === 'ALL' && designationFilter === 'ALL') 
      faculties.forEach(faculty => {
        let dept = departments.filter(dept => dept.id === faculty.department)
        dept = dept[0]
        records.push({
          ...faculty,
          department: { ...dept }
        })
      })
    else if(deptFilter === 'ALL')
      (faculties.filter(faculty => faculty.designation === designationFilter)).forEach(faculty => {
        let dept = departments.filter(dept => dept.id === faculty.department)
        dept = dept[0]
        records.push({
          ...faculty,
          department: { ...dept }
        })
      })
    else if(designationFilter === 'ALL')
      (faculties.filter(faculty => faculty.department === deptFilter)).forEach(faculty => {
        let dept = departments.filter(dept => dept.id === faculty.department)
        dept = dept[0]
        records.push({
          ...faculty,
          department: { ...dept }
        })
      })
    else 
      (faculties.filter(faculty => faculty.department === deptFilter && faculty.designation === designationFilter)).forEach(faculty => {
        let dept = departments.filter(dept => dept.id === faculty.department)
        dept = dept[0]
        records.push({
          ...faculty,
          department: { ...dept }
        })
      })
  }

  return (
    <>
      <Alert type={ alertType } message={ alertMessage } />
      <From _props={{
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
        alerts: {
          alertHandler,
          setAlertMessage,
          setAlertType
        }
      }} />
      <Table 
        records={ records }
        headCells={ headCells }
        departments={ departments }
        setOpenPopup={ setOpenPopup }
        setCurrentFacultyId={ setCurrentFacultyId }
        setFormInputs = { setFormInputs }
        setDesignation={setDesignation }
        setDept={ setDept }
        deleteFaculty={ deleteFaculty }
        filters={{ 
          deptFilter,
          setDeptFilter,
          designationFilter,
          setDesignationFilter
        }}
      />
    </>
  );
}

export default Index;