import React from 'react';
import {
    Button,
    Dialog as DialogComponent, 
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
    return (
        <div>
            <DialogComponent
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handleClose}
            >
              <DialogContent>
                {props.children}
                <DialogContentText>
                  {props.message}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                  {props.CloseText}
                </Button>
                {props.okText!==undefined &&
                <Button onClick={props.handleOk} color="primary">
                  {props.okText}
                </Button>
                }
              </DialogActions>
            </DialogComponent>
        </div>
    )
}
Dialog.defaultProps = {
    message:'',
    open:false,
    CloseText:'Cerrar'
}
export default Dialog;