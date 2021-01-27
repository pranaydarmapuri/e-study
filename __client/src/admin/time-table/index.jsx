import { useEffect, useState, useContext } from 'react'
import {
  withStyles,
  makeStyles,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  fade,
  Select,
  FormControl,
  MenuItem
} from '@material-ui/core'
import axiosConfig from '../../configs/axios.config'
import { AuthContext } from '../../index'




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    padding: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.5)
  }
}))(TableRow);


const useStyles = makeStyles(theme => {

  const palette = theme.palette
  const isDark = palette.type === 'dark'

  return ({
    table: {
      minWidth: 900,
      '& thead th': {
        fontWeight: '600',
        color: palette[isDark ? 'secondary' : 'primary'].dark,
        backgroundColor: fade(isDark ? palette.secondary.dark : palette.primary.light , isDark ? 0.15 : 0.225),
        borderBottom: 'none',
        '&:last-child': {
          borderRadius: `0 ${theme.shape.borderRadius} ${theme.shape.borderRadius} 0`
        }
      },
      '& thead th:nth-child(1)': {
        borderRadius: `${theme.shape.borderRadius} 0 0 ${theme.shape.borderRadius}`
      }
    }
  })
})

const useCSS = makeStyles(theme => ({
  root: {
    minWidth: '75%'
  }
}))


const TimeTable = ({_props}) => {

  const classes = useStyles();
  const css = useCSS()

  const { token } = useContext(AuthContext)

  const {
    setCurTableId, curTableId, curTableName, alert
  } = _props

  const {
  setAlertType,
  setAlertMessage,
  alertHandler
  } = alert

  const initArray = {
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
  }
  const arr = ['one', 'two', 'three', 'four', 'five', 'six']
  const [open, setOpen] = useState(false)
  const [monday, setMonday] = useState(initArray)
  const [tuesday, setTuesday] = useState(initArray)
  const [wednesday, setWednesday] = useState(initArray)
  const [thursday, setThursday] = useState(initArray)
  const [friday, setFriday] = useState(initArray)
  const [saturday, setSaturday] = useState(initArray)
  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    if(curTableId) {
      axiosConfig
        .post(`/api/timetable/get/${curTableId}`, {}, token)
        .then(res => {
          if(res.status === 200) {
            const doc = res.data
            setMonday(doc.monday)
            setTuesday(doc.tuesday)
            setWednesday(doc.wednesday)
            setThursday(doc.thursday)
            setFriday(doc.friday)
            setSaturday(doc.saturday)
          }
        })
        .catch(e => console.warn(e))
      axiosConfig
        .post(`/api/timetable/sub-fac/class/${curTableId}`, {}, token)
        .then(res => setSubjectList(res.data))
        .catch(e => console.warn(e))
    }
    setOpen(curTableId ? true : false)
  }, [curTableId])

  const closeHandler = () => {
    setMonday(initArray)
    setTuesday(initArray)
    setWednesday(initArray)
    setThursday(initArray)
    setFriday(initArray)
    setSaturday(initArray)
    setCurTableId('')
  }

  const submitHandler = (e) => {

    e.preventDefault()

    axiosConfig
      .post(
        '/api/timetable/add', {
          id: curTableId,
          monday: { ...monday },
          tuesday: { ...tuesday },
          wednesday: { ...wednesday },
          thursday: { ...thursday },
          friday: { ...friday },
          saturday: { ...saturday }
        },
        token
      )
      .then(res => {
        setAlertType('success')
        setAlertMessage(res.data.message)
        alertHandler()
      })
      .catch(e => {
        setAlertType('error')
        setAlertMessage('Something went wrong')
        alertHandler()
      })

    closeHandler()
  }


  return (
    <>
      <Dialog 
        open={ open } 
        onClose={() => setCurTableId('')} 
        classes={{paper: css.root}} 
        aria-labelledby="time-table"
      ><form onSubmit={ submitHandler } >
        <DialogTitle id="time-table">{ `${curTableName} Time Table` }</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Days/timing</StyledTableCell>
                  <StyledTableCell align="center">09:20 - 10:20</StyledTableCell>
                  <StyledTableCell align="center">10:20 - 11:20</StyledTableCell>
                  <StyledTableCell align="center">11:20 - 12:20</StyledTableCell>
                  <StyledTableCell align="center">01:00 - 02:00</StyledTableCell>
                  <StyledTableCell align="center">02:00 - 03:00</StyledTableCell>
                  <StyledTableCell align="center">03:00 - 04:00</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Monday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-monday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ monday[i] }
                            onChange={({target}) => setMonday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Tuesday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-tuesday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ tuesday[i] }
                            onChange={({target}) => setTuesday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Wednesday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-wednesday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ wednesday[i] }
                            onChange={({target}) => setWednesday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Thursday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-thursday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ thursday[i] }
                            onChange={({target}) => setThursday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Friday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-Friday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ friday[i] }
                            onChange={({target}) => setFriday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">Saturday</StyledTableCell>
                  {
                    arr.map(i => (
                      <StyledTableCell key={ `${i}-saturday` } align="center">
                        <FormControl variant="outlined" size="small" style={{width: 195}} >
                          <Select required
                            value={ saturday[i] }
                            onChange={({target}) => setSaturday(v => ({...v, [i]: target.value}))}
                          >
                            {
                              subjectList.map(sec => (
                                <MenuItem key={ sec._id } value={ sec.subject.code }>
                                  { `${sec.subject.abbr} - ${sec.subject.name}` }
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    ))
                  }
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={ closeHandler } color="default">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            set
          </Button>
          <div style={{ width: '10px'}}></div>
        </DialogActions>
      </form></Dialog>       
    </>
  );
}

export default TimeTable;