import React, { useEffect, useState } from 'react';

import Owner from '../../Components/Owner';
import './styles.scss';
import {GetOwners} from '../../Services/Owner';
import {useHistory} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
    CircularProgress,
} from '@material-ui/core';

import AddOwner from '../../Containers/AddOwner';

import {GetRace, GetFur, GetSex, GetCharacter} from '../../Services/Pet';
import {GetRegions} from '../../Services/Regions';

const Owners = (porps) => {

    const history = useHistory();

    const [sesion, setSesion] = useState(null);
    const [owners, setOwners] = useState([]);

    const [add, setAdd] = useState(false);

    const [races, setRaces] = useState(null);
    const [furs, setFurs] = useState(null);
    const [sexes, setSexes] = useState(null);
    const [characteres, setCaracteres] = useState(null);
    const [regions, setRegions] = useState(null);
    const [fetching, setFetching] = useState(true);

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

            GetOwners(localSesion.access_token, localSesion.x_usuarios_veterinarias.id_veterinaria, (data)=>{
                //console.log(data)
                setFetching(false);
                let auxData = data.map(n=>{
                    return {...n, open:false}
                });
                setOwners(auxData);
            });

            GetRace(localSesion.access_token,(data)=>{
                //console.log('razas', data)
                setRaces(data);
            });

            GetFur(localSesion.access_token,(data)=>{
                //console.log('fur', data)
              setFurs(data);
            });
      
            GetSex(localSesion.access_token,(data)=>{
                //console.log('sex', data)
              setSexes(data);
            });
      
            GetCharacter(localSesion.access_token,(data)=>{
                //console.log('char', data)
              setCaracteres(data);
            });
            //console.log('wait regions')
            GetRegions(localSesion.access_token,(data)=>{
                //console.log('regions', data)
                setRegions(data);
            });
        }
    },[]);

    const handleAddOwner = () => {
        setAdd(!add);
    }

    const updateOwners = (flag, id) => {
        console.log('updating owners...');
        if(flag!==false)
            setAdd(!add);
        setFetching(true);
        GetOwners(sesion.access_token, sesion.x_usuarios_veterinarias.id_veterinaria, (data)=>{
            let auxData = data.map(n=>{
                if(n.id+''===id) 
                    return {...n, open:true} 
                else 
                    return {...n, open:false}
            });
            console.log(auxData);
            setFetching(false);
            setOwners(auxData);
        });
    }

    const updatePets = (owner) => {
        let ownersAux = owners.map((ownerData) => {
            if(owner.id===ownerData.id){
                return owner;
            }
            return ownerData;
        });
        setOwners(ownersAux);
        console.log(owner);
    }

    const onDelete = () => {
        updateOwners(false);
    }

    return (
        <div className='owners-wrapper'>
            {
                !fetching ?
                owners.map(({nombre, email, mascotas, id, open}, index) => {
                    return (
                        <Owner
                            name={nombre}
                            email={email}
                            pets={mascotas}
                            id={id}
                            key={id}
                            furs={furs}
                            races={races}
                            characteres={characteres}
                            sexes={sexes}
                            onChange={updatePets}
                            onDelete={onDelete}
                            open={open}
                            regions={regions}
                        />
                    )
                })
            :
            <div className='spiner'>
                <CircularProgress/>
            </div>
            }
            <span className='add-owner' onClick={handleAddOwner}>
                <AddCircleIcon/>
            </span>
            {sesion!==null &&
            <AddOwner
                open={add}
                onClose={handleAddOwner}
                token={sesion.access_token}
                idVet={sesion.x_usuarios_veterinarias.id_veterinaria}
                regions={regions}
                onChange={updateOwners}
            />
            }
        </div>
    )
}
export default Owners;