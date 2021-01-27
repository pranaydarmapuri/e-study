import {
  useState,
} from 'react'
import { 
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  TableBody,
  TableRow,
  TableCell,
  ButtonGroup,
  Tooltip,
  IconButton,
  Button,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import {
  MdEdit as EditIcon,
  MdDelete as DeleteIcon,
  MdAdd as PlusIcon
} from 'react-icons/md'
import useTable from '../../components/useTable'
import useStyles from '../../styles/useTableStyles'
import useDialog from '../../components/useDialog'


const StudentTable = ({ records, headCells, setSection, setDept, deleteStudent, setYear, departments, filters, setCurrentStudentId, setFormInputs, classes, setOpenPopup }) => {

  // --->>>>> records
  let items = [], recs = []
  records.forEach(student => {
    let secs = classes.filter(sec => sec._id === student.section)
    secs = secs[0]
    recs.push({
      ...student,
      section: { ...secs }
    })
  })
  recs.forEach(rec => {
    items.push({
      _id: rec._id,
      id: rec.id,
      name: rec.name,
      departmentName: rec.department.name,
      departmentId: rec.department.id,
      section_id: rec.section._id,
      sectionName: rec.section.name,
      year: rec.year,
      mobileNo: rec.mobileNo,
      fatherName: rec.fatherName
    })
  })

  // >>>>>>>> Dialogs
  const { setDialogOpen, ConfirmDialog } = useDialog()
  // >>>>>>>>>>>>>. filters
  const { setDeptFilter, deptFilter, yearFilter, setYearFilter } = filters

  // ========================= Initializing Theme
  const { useTableStyles } = useStyles()
  const css = useTableStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // ->>>>>>>>>>>>>>>>>>>>>> useStates
  const [filterFN, setFilterFN] = useState({
    fn: item => item
  })
  const [deleteStudentId, setDeleteStudentId] = useState('')

  const romanize = num => {
    let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  //---------------------- initializing useTable hook
  const { 
    recordsAfterPagingAndSorting,
    TblContainer,
    TblHead,
    TblPagination
  } = useTable(items,headCells,filterFN)

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

  const [searchBy, setSearchBy] = useState('name')

  return (
    <Card className={ css.root }>
      <Typography variant="h5" color="textPrimary" component="h1">All Students</Typography>
      <div className={ css.toolbar }>
        <Typography variant="h6" color="textPrimary" className={ css.title } >
          Filters
        </Typography>
        <FormControl size="small" variant="outlined" className={ css.search }>
          <Select required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ deptFilter }
            onChange={({target}) => setDeptFilter(target.value)}
          >
            <MenuItem value="ALL">All Departments</MenuItem>
            {
              departments.map(dept => (
                <MenuItem key={ `dept-list-${dept.id}-for-search` } value={ dept.id }>{ dept.name }</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl size="small" variant="outlined" className={ css.search }>
          <Select required
            labelId="filter-by-year"
            value={ yearFilter }
            onChange={({target}) => setYearFilter(target.value)}
          >
            <MenuItem value="ALL">All Years</MenuItem>
            <MenuItem value={1}>I</MenuItem>
            <MenuItem value={2}>II</MenuItem>
            <MenuItem value={3}>III</MenuItem>
            <MenuItem value={4}>IV</MenuItem>
          </Select>
        </FormControl>
      </div>
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
        <Button 
          onClick={() => {
            setOpenPopup(true)
          }}
          color="secondary"
          variant="outlined"
          startIcon={isMobile ? null : <PlusIcon />}
        > 
          { isMobile ? <PlusIcon /> : 'Add student'}
        </Button>
      </div>
      <ConfirmDialog type="WARNING" title="Are you, sure?">
        <Button 
          onClick={() => {setDialogOpen(false); setDeleteStudentId('')}} 
        >
          cancel
        </Button>
        <Button 
          onClick={() => {setDialogOpen(false); deleteStudent(deleteStudentId); setDeleteStudentId('')}}
        >
          Yes, delete
        </Button>
      </ConfirmDialog>
      <TblContainer>
        <TblHead />
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(item => (
              <TableRow key={ `id-${item._id}` }>
                <TableCell>{ item.id }</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>
                  { item.departmentName }
                </TableCell>
                <TableCell>{ item.sectionName }</TableCell>
                <TableCell>{ romanize(item.year) }</TableCell>
                <TableCell align='right'>
                  <ButtonGroup size="small" >
                    <Tooltip title="Edit" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        onClick={() => {
                          setDept(item.departmentId)
                          setYear(item.year)
                          setCurrentStudentId(item._id)
                          setFormInputs({
                            id: item.id,
                            name: item.name,
                            mobileNo: item.mobileNo,
                            fatherName: item.fatherName 
                          })
                          setSection(item.section_id)
                          setOpenPopup(true)
                        }} >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        className={ css.delete } 
                        onClick={() => {setDeleteStudentId(item._id); setDialogOpen(true)}}
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
  );
}

export default StudentTable;