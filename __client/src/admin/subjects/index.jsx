import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AllSubjects from './all-subjects'
import SubjectFaculty from './subject-faculty/SubFac'

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          { children }
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: '100%'
  },
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  tabs: {
    borderRadius: theme.shape.borderRadius
  }
}));

export default function FullWidthTabs() {

  const classes = useStyles();
  const theme = useTheme()
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color="default" className={ classes.appBar }>
        <Tabs
          className={ classes.tabs }
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Subjects tabs"
          centered
        >
          <Tab label="All Subjects" {...a11yProps(0)} />
          <Tab label="Faculty-Subjects" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AllSubjects />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SubjectFaculty />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}