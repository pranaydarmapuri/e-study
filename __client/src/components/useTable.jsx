import { 
  makeStyles,
  Table, 
  TableCell, 
  TableHead, 
  TablePagination, 
  TableRow, 
  TableSortLabel,
  fade
} from "@material-ui/core";
import { useState } from 'react';

const useStyles = makeStyles(theme => {

  const palette = theme.palette
  const isDark = palette.type === 'dark'

  return ({
    table: {
      minWidth: 600,
      marginTop: theme.spacing(3),
      '& thead th': {
        fontWeight: '600',
        color: palette.secondary.dark,
        backgroundColor: fade(isDark ? palette.secondary.dark : palette.secondary.light , isDark ? 0.15 : 0.25),
        borderBottom: 'none',
        '&:last-child': {
          borderRadius: `0 ${theme.shape.borderRadius} ${theme.shape.borderRadius} 0`
        }
      },
      '& thead th:nth-child(1)': {
        borderRadius: `${theme.shape.borderRadius} 0 0 ${theme.shape.borderRadius}`
      },
      '& tbody td': {
        fontWeight: '400'
      },
      '& tbody tr:hover': {
        cursor: 'pointer',
        backgroundColor: fade(isDark ? palette.common.black : theme.palette.grey[200], 0.5)
      },
      '& tr th:last-child': {
        width: '60px',
        textAlign: 'center'
      },
      '& tr td:last-child': {
        width: '60px'
      }
    }
  })
});

const useTable = (records,headCells,filterFN) => {

  const styles = useStyles();

  const pages = [5,10,15,30,60,120,records.length]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = props => (
    <Table className={ styles.table } >
      { props.children }
    </Table>
  )

  const TblHead = props => {
    
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }

    return (
      <TableHead>
        <TableRow>
          {
            headCells.map(headCell => (
              <TableCell 
                key={ headCell.id }
                sortDirection={ orderBy === headCell.id ? order : false }
              >
                { 
                  headCell.disableSorting ? headCell.label :
                  <TableSortLabel 
                    active={ orderBy === headCell.id }
                    direction={ orderBy === headCell.id ? order : 'asc' }
                    onClick={() => { handleSortRequest(headCell.id) }}
                  >
                    { headCell.label }
                  </TableSortLabel>
                }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = ({target}) => {
    setRowsPerPage(parseInt(target.value,10));
    setPage(0);
  }

  const TblPagination = props => (
    <TablePagination 
      component="div"
      rowsPerPageOptions={ pages }
      page={ page }
      count={ records.length }
      rowsPerPage={ rowsPerPage }
      onChangePage={ handleChangePage }
      onChangeRowsPerPage= { handleChangeRowsPerPage }
    />
  )
  
  const sort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const recordsAfterPagingAndSorting = () => {
    return sort(filterFN.fn(records),getComparator(order,orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}

export default useTable;