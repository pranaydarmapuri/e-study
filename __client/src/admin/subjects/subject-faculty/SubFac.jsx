/* ===================
-----------Import Statements
======================*/
import Table from "./Table"
import Form from './Form'
import {
  useTheme
} from '@material-ui/core'
import React from 'react'
import { AuthContext } from '../../../index'
import useAlerts from '../../../components/useAlerts'
import axios from 'axios'
import { PageTitle } from '../../index'


  // -------------------- rendering components

const SubFac = (_props) => {

  const { setPageTitle, pageTitle } = React.useContext(PageTitle)

  
// --------------->........... UseContext
const { API_URL, token } = React.useContext(AuthContext)

const theme = useTheme()
// ------------------ Form Constants
const [curFac, setCurFac] = React.useState(null)
const [faculties, setFaculties] = React.useState([])
const [curSub, setCurSub] = React.useState(null)
const [subjects, setSubjects] = React.useState([])
const { alertHandler, Alert } = useAlerts()
const [alertMessage, setAlertMessage] = React.useState('')
const [alertType, setAlertType] = React.useState('')
const [subFacList, setSubFacList] = React.useState([])
const [curSubFac, setCurSubFac] = React.useState('')
const [sections, setSections] = React.useState([])
const [curSec, setCurSec] = React.useState(null)


// ->>>>>>>>>>>> Fetch subject
const fetchSubs = () => {
  axios
    .post(
      `${API_URL}/api/subject/get/all`,
      {},
      token
    )
    .then(res => setSubjects(res.data))
    .catch(e => console.log(e))
}

// ->>>>>>>>>>>> Fetch subject
const fetchSecs = () => {
  axios
    .post(
      `${API_URL}/api/classes/get/all/dept`,
      {},
      token
    )
    .then(res => setSections(res.data))
    .catch(e => console.log(e))
}

// ->>>>>>>>>>>> Fetch Facs
const fetchFacs = () => {
  axios
    .post(
      `${API_URL}/api/employee/get/all`,
      {},
      token
    )
    .then(({data}) => {
      setFaculties(data.filter(
        fac => ["Professor", "Associate Professor", "Assistant Professor"].includes(fac.designation)
      ))
    })
    .catch(e => console.log(e))
}

// -->>>>>>>.... Fetching Subject-Faculty List
const fetchSubFacList = () => {
  axios
    .post(`${API_URL}/api/sub-fac/get/all`, {}, token)
    .then(({data}) => setSubFacList(data))
    .catch(e => console.log(e))
}


// ===================== useState hook
let records = []
const [isLoading, setIsLoading] = React.useState(true)

React.useEffect(() => {
  setPageTitle('Subject-Faculty')
  // ---->>>>>> fetching data on load
  fetchSubFacList()
  fetchFacs()
  fetchSubs()
  fetchSecs()
}, [])

React.useEffect(() => {
  if(subjects && faculties && subFacList && sections )
    setIsLoading(false)
}, [subjects, faculties, subFacList, sections])

// -------------------- rendering Loader ~~~~~~~~~~~~~~~~~~~ /////
if(isLoading)
  return (<>
    <p>Loading</p>
  </>);
else {
  subFacList.forEach(list => {
    let fac = faculties.filter(fac => fac.id === list.faculty)
    fac = fac[0]
    let sub = subjects.filter(sub => sub.code === list.subject)
    sub = sub[0]
    let sec = sections.filter(sec => sec._id === list.section)
    sec = sec[0]
    records.push({
      ...list,
      faculty: { ...fac },
      subject: { ...sub },
      section: { ...sec }
    })
  })
  records.sort((a,b) => (a.section._id > b.section._id) ? 1 : ((b.section._id > a.section._id) ? -1 : 0))
  // console.log(records)
}


  return (
    <>
      <Alert type={ alertType } message={ alertMessage } />
      <div style={{ marginBottom: theme.spacing(2.5) }} />
      <Form 
        setCurSubFac={ setCurSubFac } 
        curSubFac={curSubFac } 
        subjects={ subjects }
        faculties={ faculties }
        sections={ sections }
        setCurSub={ setCurSub }
        curSub={ curSub }
        curFac={ curFac }
        setCurFac={ setCurFac }
        setCurSec={ setCurSec }
        curSec={ curSec }
        fetchSubFacList={ fetchSubFacList }
        alert={{
          setAlertType,
          setAlertMessage,
          alertHandler
        }}
      />
      {/* Adding Subject */}
      <Table 
        setCurSubFac={ setCurSubFac } 
        curSubFac={curSubFac } 
        setCurSub={ setCurSub }
        curSub={ curSub }
        curFac={ curFac }
        setCurFac={ setCurFac }
        setCurSec={ setCurSec }
        curSec={ curSec }
        fetchSubFacList={ fetchSubFacList }
        records={ records }
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
export default SubFac