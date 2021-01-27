/* ===================
-----------Import Statements
======================*/
import axios from 'axios'
import { useState, useEffect, useContext } from "react";
import useTable from "../../../components/useTable";
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
import { AuthContext } from '../../../index'


const Table = ({ 
  currentSubject, 
  setCurrentSubject,
  setFormInputs,
  departments,
  records,
  setSubjects,
  setCurDept,
  alert
}) => {

  let items =[]

  if(records)   records.forEach(record =>{ 
    items.push({
      ...record,
      departmentName: record.departmentObj.name
    })
  })

  // ========================= Initializing Theme
  const { useTableStyles } = useStyles()
  const css = useTableStyles()

  // ========= **************** CONSTANTS
  const headCells = [
    {id: 'code', label: 'Subject Code'},
    {id: 'name', label: 'Subject Name'},
    {id: 'abbr', label: 'Abbrivation'},
    {id: 'departmentName', label: 'Department'},
    {id: 'action', label: 'Action', disableSorting: true}
  ]

  // const [courses, setCourses] = useState([])
  const [filterFN, setFilterFN] = useState({
    fn: item => item
  })
  const [searchBy, setSearchBy] = useState('departmentName')

  //---------------------- initializing useTable hook
  const { 
    recordsAfterPagingAndSorting,
    TblContainer,
    TblHead,
    TblPagination
  } = useTable(items,headCells,filterFN);

  const { API_URL, token } = useContext(AuthContext)
  // ------------------>>>>>>>>>> Delete Class
  const deleteClass = (id) => {
    let url = `${API_URL}/api/classes/delete/${id}`
    axios
      .post(url, {}, token)
      .then(res => {
        alert.setAlertType('info')
        alert.setAlertMessage(res.data.message)
        alert.alertHandler()
        axios
          .post(`${API_URL}/api/classes/get/all`, {}, token)
          .then(res => setSubjects(res.data))
          .catch(err => console.log(err))
      })
      .catch(e => {
        console.log(e)
        alert.setAlertType('warning')
        alert.setAlertMessage('Something went wrong, while deleting')
        alert.alertHandler()
      })
  }  

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
  
  // ============================ Rendering Table
  return (
    <Card className={ css.root }>
      <Typography variant="h5" color="textPrimary" component="h1">All Subjects</Typography>
      <div className={ css.toolbar } >
        <FormControl size="small" variant="outlined">
          <Select 
            className={ css.search }
            value={ searchBy }
            onChange={({target}) => setSearchBy(target.value)}
          >
            <MenuItem value='departmentName'>Search by Department</MenuItem>
            <MenuItem value='name'>Search by Name</MenuItem>
            <MenuItem value='abbr'>Search by Abbrivation</MenuItem>
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
            (recordsAfterPagingAndSorting().sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))).map(item => (
              <TableRow key={ `id-${item._id}` }>
                <TableCell>{ item.code }</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>{ item.abbr }</TableCell>
                <TableCell>{ item.departmentName }</TableCell>
                <TableCell align='right'>
                  <ButtonGroup size="small" >
                    <Tooltip title="Edit" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => {
                          setCurrentSubject(item._id)
                          setFormInputs({
                            name: item.name,
                            abbr: item.abbr,
                            department: item.department,
                            code: item.code
                          })
                          setCurDept(item.department)
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
                        onClick={() => {deleteClass(item._id)}}
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

export default Table;