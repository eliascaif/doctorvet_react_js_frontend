import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
/*import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';*/
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";

import './styles.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Menu(props) {
  const classes = useStyles();
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

  const list = (anchor, options, pathname, clickEvent) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {options.map((data, index) => (
          <ListItem button key={index} className='list-item'>
            <Link onClick={()=>clickEvent(data.value)} className={(data.path===pathname)?'active':''} to={data.path}>{data.name}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className='menu-wraper'>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color:'#fff'}}/></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className='menu-hader'>
              <div className='header-item'>
                <span onClick={props.openVetDetail} className='icon-wrapper pointer'><StoreIcon style={{fontSize:'2.5em', color:'#037e69'}}/></span>
                <div>
                  <h4 onClick={props.openVetDetail} className='pointer' style={{margin:'0'}}>{props.user.veterinary.nombre}</h4>
                  <p style={{margin:'0', fontSize:'.75em'}}>{props.user.veterinary.email}</p>
                </div>
              </div>
              <div className='header-item'>
                <span onClick={props.openOwnerDetail} className='icon-wrapper pointer'><PersonIcon style={{fontSize:'2.5em', color:'#037e69'}}/></span>
                <div>
                  <h4 onClick={props.openOwnerDetail} className='pointer' style={{margin:'0'}}>{props.user.nombre}</h4>
                  <p style={{margin:'0', fontSize:'.75em'}}>{props.user.email}</p>
                </div>
              </div>
            </div>
            {list(anchor, props.options, props.pathname, props.onClick)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
