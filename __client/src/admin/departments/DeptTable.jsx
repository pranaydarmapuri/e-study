/* ===================
-----------Import Statements
======================*/
import axios from 'axios'
import { useState, useEffect, useContext } from "react";
import useTable from "../../components/useTable";
import useStyles from './useStyles'
import {
  Card, 
  TableBody, 
  Typography,
  TableCell,
  TableRow,
  IconButton,
  ButtonGroup,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core'
import { 
  MdDelete as DeleteIcon, 
  MdEdit as EditIcon
} from 'react-icons/md'
import { AuthContext } from '../../index'


const DeptTable = ({ setCurrentDept, setFormInputs, setDepartments, departments, currentDept, alert }) => {

  // ========================= Initializing Theme
  const { useTableStyles } = useStyles()
  const css = useTableStyles()

  // ========= **************** CONSTANTS
  const headCells = [
    {id: 'id', label: 'Department Id'},
    {id: 'name', label: 'Department Name'},
    {id: 'department', label: 'Course'},
    {id: 'action', label: 'Action', disableSorting: true}
  ]

  // ===================== useState hook
  let records = []
  const [isLoading, setIsLoading] = useState(true)
  // const [courses, setCourses] = useState([])
  const [filterFN, setFilterFN] = useState({
    fn: item => item
  })
  const [searchBy, setSearchBy] = useState('name')

  // ======================= onLoad
  const { token, API_URL } = useContext(AuthContext)
  let url = `${API_URL}/api/department/get/all`
  // ------------>>>>>>>>> setting departments

  useEffect(() => { 
    axios
      .post(url, {}, token)
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err))
  }, [])

  // ------------------>>>>>>>>>> Delete Department
  const deleteDepartment = (id) => {
    let url = `${API_URL}/api/department/delete/${id}`
    axios
      .post(url, {}, token)
      .then(res => {
        alert.setAlertType('info')
        alert.setAlertMessage(res.data.message)
        alert.alertHandler()
        axios
          .post(`${API_URL}/api/department/get/all`, {}, token)
          .then(res => setDepartments(res.data))
          .catch(err => console.log(err))
      })
      .catch(e => {
        console.log(e)
        alert.setAlertType('warning')
        alert.setAlertMessage('Something went wrong, while deleting')
        alert.alertHandler()
      })
  }

  //---------------------- initializing useTable hook
  const { 
    recordsAfterPagingAndSorting,
    TblContainer,
    TblHead,
    TblPagination
  } = useTable(
    records,
    headCells,
    filterFN
  )

  // ======================= initializing filterFunc
  const handleSearch = ({target}) => {
    setFilterFN({
      fn: item => {
        if(target.value === '')
          return item
        else 
          return item.filter(x => x[searchBy].toLowerCase().includes(target.value))
      }
    })
  }

  useEffect(() => {
    if(departments)
      return setIsLoading(false)
  }, [departments])

  // -------------------- rendering Loader ~~~~~~~~~~~~~~~~~~~ /////
  if(isLoading)
    return (<>
      <p>Loading</p>
    </>);
  else {
    for(let i = 0;i<departments.length;i++) {
      records.push({
        ...departments[i],
        course: departments[i].course.name,
        courseAbbr: departments[i].course.abbr
      })
    }
  }
  
  // ============================ Rendering Table
  return (
    <Card className={ css.root }>
      <Typography variant="h5" color="textPrimary" component="h1">All Departments</Typography>
      <div className={ css.toolbar } >
        <FormControl size="small" variant="outlined">
          <Select 
            className={ css.search }
            value={ searchBy }
            onChange={({target}) => setSearchBy(target.value)}
          >
            <MenuItem value='id'>Search by Id</MenuItem>
            <MenuItem value='name'>Search by Name</MenuItem>
          </Select>
        </FormControl>
        <TextField size="small"
          label="Search" 
          variant="outlined"
          onChange={ handleSearch }
          className={ css.search }
        />
      </div>
      <TblContainer>
        <TblHead/>
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(item => (
              <TableRow key={ `id-${item.id}` }>
                <TableCell>{ item.id }</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>
                  { item.course }
                </TableCell>
                <TableCell align='right'>
                  <ButtonGroup size="small" >
                    <Tooltip title="Edit" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => {
                          setCurrentDept(item._id)
                          setFormInputs({
                            name: item.name,
                            id: item.id,
                            abbr: item.abbr
                          })
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        className={ css.delete } 
                        onClick={() => {deleteDepartment(item._id)}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Card>
  )
}

export default DeptTable;