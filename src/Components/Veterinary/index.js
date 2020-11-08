import React from 'react';
import StoreIcon from '@material-ui/icons/Store';
import './styles.scss';

const Veterinary = (props) => {
    return (
        <div className='veterinary-wraper' onClick={props.onClick}>
            <span className='icon-wrapper'><StoreIcon style={{fontSize:'2.5em', color:'#fff'}}/></span>
            <div className='veterinary-data'>
                <h4 style={{margin:'0'}}>{props.name}</h4>
                <p style={{margin:'0', fontSize:'.75em'}}>{props.email}</p>
            </div>
            <div className='radio-button'>
                <span className={'circle '+(props.active?'circle-active':'')}>
                    <span className='inner-circle'>
                    </span>
                </span>
            </div>
        </div>
    )
}
Veterinary.defaultProps = {
    active:false,
}
export default Veterinary;