/* ===================
-----------Import Statements
======================*/
import { useEffect, useState, useContext, createContext } from "react";
import DeptTable from "./DeptTable";
import DeptForm from './DeptForm'
import { PageTitle } from '../index'
import useAlerts from "../../components/useAlerts";

const DeptContext = createContext()

export default function Index() {

  // --------------->........... UseContext
  const { setPageTitle } = useContext(PageTitle)

  // ------------------ Form Constants
  const formInitial = {
    name: '',
    abbr: '',
    id: ''
  }
  const [formInputs, setFormInputs] = useState(formInitial)
  const [currentDept, setCurrentDept] = useState(null)
  const [departments, setDepartments] = useState([])
  const { alertHandler, Alert } = useAlerts()
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  // ==================== Setting Page Title
  useEffect(() => {
    setPageTitle('Departments')
  }, [])

  // -------------------- rendering components
  return (
    <>
      <Alert type={ alertType } message={ alertMessage } />
      <DeptForm 
        setCurrentDept={ setCurrentDept } 
        currentDept={ currentDept } 
        formInputs={ formInputs } 
        setFormInputs={ setFormInputs }
        setDepartments={ setDepartments }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
      {/* Adding DeptTable */}
      <DeptTable 
        currentDept={ currentDept } 
        setCurrentDept={ setCurrentDept } 
        setFormInputs={ setFormInputs }
        departments={ departments }
        setDepartments={ setDepartments }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
    </>
  )
}

export { DeptContext }