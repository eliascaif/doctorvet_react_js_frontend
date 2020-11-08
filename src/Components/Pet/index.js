import React from 'react';
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import dog from '../../Assets/img/dog-blue.svg';

import './styles.scss';

const PetNameStyle = {
  color: '#fff',
  padding: '1em',
  paddingLeft: '0',
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='pet-wraper'>
      {/*console.log(props.data)*/}
      <span className='pointer' onClick={toggleDrawer('left', true)}>{props.children}</span>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/*<span style={{cursor:'pointer'}} onClick={toggleDrawer(anchor, true)}>{props.name}</span>*/}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} className='pet-drawer'>
            <div>
              <div className='pet-header'>
                <ArrowBackIcon style={{color: '#fff', cursor:'pointer'}} onClick={toggleDrawer(anchor, false)}/>
                <div className='pet-data'>
                  <span className='dog-img'><img src={dog} alt='dog' style={{width:'100%'}}/></span>
                  <span style={PetNameStyle}>{props.name}</span>
                </div>
              </div>
              <div className='pet-info'>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="Mascota" {...a11yProps(0)} />
                      {/*<Tab label="Clínica" {...a11yProps(1)} />
                      <Tab label="Suministro" {...a11yProps(2)} />*/}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className='pet-info-basic'>
                      <div className='pet-avatar'>
                        <span className='dog-img'><img src={dog} alt='dog' style={{width:'100%'}}/></span>
                        <div className='pet-avatar-info'>
                          <span>Name</span>
                          <span>Info</span>
                        </div>
                      </div>
                      <div className='pet-details'>
                        <div className='item-detail'>
                          <span className='title'>
                            Nombre
                          </span>
                          <span>
                            {props.data.nombre}
                          </span>
                        </div>{/*
                        <div className='item-detail'>
                          <span className='title'>
                            Nombre
                          </span>
                          <span>
                            Mascota de ejemplo
                          </span>
                        </div>
                        <div className='item-detail'>
                          <span className='title'>
                            Nombre
                          </span>
                          <span>
                            Mascota de ejemplo
                          </span>
                        </div>
                    */}
                    </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                </div>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
