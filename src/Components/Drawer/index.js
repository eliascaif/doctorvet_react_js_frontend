import React from 'react';
import { Drawer as DrawerUI } from '@material-ui/core';

const Drawer = (props) => {
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

  return (
    
        <React.Fragment>
          <DrawerUI anchor={props.anchor} open={props.open} onClose={toggleDrawer('left', false)}>
            <div className={'drawer-content '+props.className} style={{width:props.width}}>
              {props.children}
            </div>
          </DrawerUI>
        </React.Fragment>
  );
}

Drawer.defaultProps = {
  anchor:'left',
}

export default Drawer;