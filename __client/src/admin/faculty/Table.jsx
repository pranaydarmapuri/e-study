import {
  useState,
  useEffect
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


const Table = ({ 
  records, headCells, departments, setOpenPopup, setCurrentFacultyId, setFormInputs, setDesignation,
  setDept, deleteFaculty, filters
}) => {
  
  let items = []
  records.forEach(rec => {
    items.push({
      ...rec,
      departmentName: rec.department.name
    })
  })

  // >>>>>>>> Dialogs
  const { setDialogOpen, ConfirmDialog } = useDialog()
  // >>>>>>>>>>>>>. filters
  const { setDeptFilter, deptFilter, designationFilter, setDesignationFilter } = filters

  // ========================= Initializing Theme
  const { useTableStyles } = useStyles()
  const css = useTableStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // ->>>>>>>>>>>>>>>>>>>>>> useStates
  const [filterFN, setFilterFN] = useState({
    fn: item => item
  })
  const [deleteFacultyId, setDeleteFacultyId] = useState('')


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
      <Typography variant="h5" color="textPrimary" component="h1">All Faculties</Typography>
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
            value={ designationFilter }
            onChange={({target}) => setDesignationFilter(target.value)}
          >
            <MenuItem value="ALL">All Designations</MenuItem>
            <MenuItem value={ 'Professor' }>Professor</MenuItem>
            <MenuItem value={ 'Associate Professor' }>Associate Professor</MenuItem>
            <MenuItem value={ 'Assistant Professor' }>Assistant Professor</MenuItem>
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
          { isMobile ? <PlusIcon /> : 'Add faculty'}
        </Button>
      </div>
      <ConfirmDialog type="WARNING" title="Are you, sure?">
        <Button 
          onClick={() => {setDialogOpen(false); setDeleteFacultyId('')}} 
        >
          cancel
        </Button>
        <Button 
          onClick={() => {setDialogOpen(false); deleteFaculty(deleteFacultyId); setDeleteFacultyId('')}}
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
                <TableCell>{ item.designation }</TableCell>
                <TableCell align='right'>
                  {
                    item.designation === 'admin' ? '-' :
                    <ButtonGroup size="small" >
                      <Tooltip title="Edit" placement="top">
                        <IconButton 
                          aria-label="delete" 
                          size="small" 
                          onClick={() => {
                            setDept(item.department.id)
                            setDesignation(item.designation)
                            setCurrentFacultyId(item._id)
                            setFormInputs({
                              id: item.id,
                              name: item.name,
                              mobileNo: item.mobileNo
                            })
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
                          onClick={() => {setDeleteFacultyId(item._id); setDialogOpen(true)}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  }
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

export default Table;