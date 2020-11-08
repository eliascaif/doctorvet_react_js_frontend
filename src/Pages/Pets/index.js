import React, { useEffect, useState} from 'react';
import {
    CircularProgress
} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import {GetPets} from '../../Services/Pet';
import './styles.scss';
import dog from '../../Assets/img/dog-blue.svg';
import Pet from '../../Components/Pet';
import AddPet from '../../Containers/AddPet';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Pets = (props) => {

    const history = useHistory();

    const [sesion, setSesion] = useState(null);
    const [pets, setPets] = useState(null);

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
            GetPets(localSesion.access_token, localSesion.veterinary.id, (data)=>{
                console.log(data);
                setPets(data);
            },
            (error)=>{

            })
            setSesion(localSesion);
        } 
    },[]);

    const handleAddPet = () => {
        
    }

    return (
        <div className='pets-wrapper' style={{width:'100%'}}>
            {
                pets===null ? 
                <span className='circular-progress'>
                    <CircularProgress/>
                </span>
                :
                <div style={{width:'100%'}}>
                    {
                        pets.map(data=>{
                            return (
                                <Pet
                                    key={data.id} 
                                    ownerName={''}
                                    data={data}
                                >
                                <div className='pet-list-item'>
                                    <span className='dog-img'><img src={dog} alt='dog' style={{width:'100%'}}/></span>
                                    <div className='pet-info'>
                                        <span className='pet-name'>{data.nombre}</span>
                                        <div className='pet-owners'>
                                            {
                                                data.propietarios.map((p_data)=>{
                                                    return(
                                                        <span key={p_data.id} className='owner-name'>{p_data.nombre}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                </Pet>
                            )
                        })
                    }
                </div>
            }
            <span className='addpet-btn' onClick={handleAddPet}>
                <AddCircleIcon/>
            </span>
            <AddPet/>
        </div>
    )
}
export default Pets;