import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Pet from '../Pet';
import {useHistory} from 'react-router-dom';

import './styles.scss';

import OwnerDetail from './OwnerDetail';

import {GetOwner} from '../../Services/Owner';

const Owner = (props) => {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [sesion, setSesion] = useState(null);
    const [ownerData, setOwnerData] = useState(null);
    const [newData, setNewData] = useState(null);
    const [newOwnerFlag, setNewOwnerFlag] = useState(true);

    useEffect(()=>{
        let localSesion = null;
        try {
            localSesion = JSON.parse(localStorage.getItem('sesion'));
        } catch (error) {
            localStorage.setItem('sesion', null);
        }
        if(localSesion===null){
            history.push('/');
            return;
        }
        if(localSesion.access_token!==undefined){
            setSesion(localSesion);
            GetOwner(localSesion.access_token, props.id, (data)=>{
                setOwnerData(data);
            });
            setNewOwnerFlag(props.open);
        }
    },[])

    const handleOpen = () => {
        if(!newOwnerFlag)
            setOpen(!open);
        setNewOwnerFlag(false);
        if(sesion!==null)
            GetOwner(sesion.access_token, props.id, (data)=>{
                //console.log(data);
                setOwnerData(data);
            });
    }

    const updatePets = () => {
        GetOwner(sesion.access_token, props.id, (data)=>{
            console.log('nuevos datos',data);
            props.onChange(false);
            setNewData(data);
        });
    }

    return (
        <React.Fragment>
            <div className='owner-wrapper'>
                <div className='avatar pointer' onClick={handleOpen}>
                    <AccountCircleIcon
                        style={{fontSize:'4.5em'}}
                    />
                </div>
                <div className='owner-data'>
                    <h4 onClick={handleOpen} className='pointer'>{props.name}</h4>
                    <span className='owner-email'>{props.email}</span>
                    <div className='owner-pets-dashboard'>
                        {
                            [...props.pets].map((data, index)=>{
                                return (
                                    <Pet
                                        key={data.id}
                                        ownerName={props.name}
                                        data={data}
                                    >
                                        <span className='owner-pet-name'><span>{data.nombre}</span> - <span>{props.name}</span></span>
                                    </Pet>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <OwnerDetail
                open={!open?(props.open && newOwnerFlag):open}
                onClose={handleOpen}
                owner={ownerData}
                pets={newData===null?(ownerData===null?[]:ownerData.mascotas):newData.mascotas}
                furs={props.furs}
                races={props.races}
                characteres={props.characteres}
                sexes={props.sexes}
                id={props.id}
                updatePets={updatePets}
            />

        </React.Fragment>
    )
}
Owner.defaultProps = {
    pets:[],
    name:'',
    email:'',
    avatar:'',
}
export default Owner;