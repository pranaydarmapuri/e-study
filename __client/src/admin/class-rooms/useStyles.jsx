import {
  makeStyles
} from '@material-ui/core'


const useStyles = () => {

  // ----------------- Form Styling
  const useFormStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2.5)
    },
    form: {
      marginTop: theme.spacing(4)
    },
    formInput: {
      width: '100%'
    },
    flexColumn: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3)
    },
    flexRow: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      width: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: theme.spacing(3)
    }, 
    formBtnContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: theme.spacing(2)
    }
  }));

  // ============================== Table Style
  const useTableStyles = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2.5)
    },
    toolbar: {
      marginTop: theme.spacing(2.5),
      display: 'flex',
      justifyContent: 'space-between',
      gap: theme.spacing(3)
    },
    search: {
      flexGrow: 1
    },
    delete: {
      color: theme.palette.error.main
    }
  }))


  return ({
    useFormStyles,
    useTableStyles
  })
}
// -------------------- === Exporting //////
export default useStyles;