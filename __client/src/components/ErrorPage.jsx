import {
  Typography, 
  Button,
  makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    '& > h1': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '45px'
      }
    },
    '& > h6': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4)
    }
  }
}))

const PageNotFound = ({ link, setPageName }) => {

  if(setPageName)
    setPageName('Page Not Found')

  const path = link ? link : '/';

  const style = useStyle();
  const history = useHistory();

  return (
    <div className={ style.root }>
      <Typography variant="h6" color="primary" component="span">
        Error :&nbsp;
      </Typography>
      <Typography variant="h1" color="textSecondary">
        404
      </Typography>
      <Typography variant="h4" color="textPrimary">
        Sorry, this
      </Typography>
      <Typography variant="h4" color="textPrimary">
        page isn't
      </Typography>
      <Typography variant="h4" color="textPrimary">
        available.
      </Typography>
      <Typography variant="subtitle1" color="primary" >
        The page you were looking for couldn't be found.
      </Typography>
      <Button variant="outlined" color="secondary"
        onClick={() => history.replace(path)}
      >
        Go back to the home page
      </Button>
    </div>
  );
}

export default PageNotFound;