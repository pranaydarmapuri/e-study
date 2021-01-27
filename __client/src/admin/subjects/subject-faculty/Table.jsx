/* ===================
-----------Import Statements
======================*/
import axios from 'axios'
import { useState, useContext } from "react";
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
  setCurSubFac,
  setCurSub,
  setCurFac,
  setCurSec,
  fetchSubFacList,
  records,
  alert
}) => {

  let items =[] 

  if(records)   records.forEach(record =>{ 
    items.push({
      ...record,
      sectionName: record.section.displayName,
      subjectName: record.subject.name,
      facultyName: record.faculty.name
    })
  })

  // ========================= Initializing Theme
  const { useTableStyles } = useStyles()
  const css = useTableStyles()

  // ========= **************** CONSTANTS
  const headCells = [
    {id: 'sectionName', label: 'Section'},
    {id: 'subjectName', label: 'Subject Name'},
    {id: 'facultyName', label: 'Faculty Name'},
    {id: 'action', label: 'Action', disableSorting: true}
  ]

  // const [courses, setCourses] = useState([])
  const [filterFN, setFilterFN] = useState({
    fn: item => item
  })
  const [searchBy, setSearchBy] = useState('subjectName')

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
    let url = `${API_URL}/api/sub-fac/delete/${id}`
    axios
      .post(url, {}, token)
      .then(res => {
        fetchSubFacList()
        alert.setAlertType('info')
        alert.setAlertMessage(res.data.message)
        alert.alertHandler()
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
      <Typography variant="h5" color="textPrimary" component="h1">List of faculties &amp; their Subjects</Typography>
      <div className={ css.toolbar } >
        <FormControl size="small" variant="outlined">
          <Select 
            className={ css.search }
            value={ searchBy }
            onChange={({target}) => setSearchBy(target.value)}
          >
            <MenuItem value='facultyName'>Search by Faculty</MenuItem>
            <MenuItem value='subjectName'>Search by Subject</MenuItem>
            <MenuItem value='sectionName'>Search by Section</MenuItem>
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
            (recordsAfterPagingAndSorting()).map(item => (
              <TableRow key={ `id-${item._id}` }>
                <TableCell>{ item.sectionName }</TableCell>
                <TableCell>{ item.subjectName }</TableCell>
                <TableCell>{ item.facultyName }</TableCell>
                <TableCell align='right'>
                  <ButtonGroup size="small" >
                    <Tooltip title="Edit" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => {
                          setCurSubFac(item._id)
                          setCurFac(item.faculty)
                          setCurSec(item.section)
                          setCurSub(item.subject)
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