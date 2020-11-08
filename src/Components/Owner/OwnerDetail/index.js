import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Drawer from '../../Drawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  CircularProgress,
  TextField,
  Checkbox,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import BackupIcon from '@material-ui/icons/Backup';
import dog from '../../../Assets/img/dog-blue.svg';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneIcon from '@material-ui/icons/Phone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {AddPet} from '../../../Services/Pet';
import Pet from '../../../Components/Pet';

import './styles.scss';

const TextFieldStyles = {
  marginBottom:'1em',
  width:'100%'
}

const OwnerDetail = (props) => {

  const history = useHistory();

  const [newPetOpen, setNewPetOpen] = useState(false);
  const [sesion, setSesion] = useState(null);
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState({
    chip:null,
    id_caracter:null,
    id_pelaje:null,
    id_raza:null,
    id_sexo:null,
    nacimiento:null,
    nombre:'',
    notas:null,
    peso:null,
    thumb:0,
    id_veterinaria:null,
    es_principal:1,
    id_propietario:null,
    deceso:false,
    date:null
  })

  const handleOpenNewPet = () => {
    setNewPetOpen(!newPetOpen);
  }

  const add = () => {
    if(!fetching && /*data.chip!=='' && data.id_caracter!=='' && data.id_pelaje!=='' && data.id_raza!=='' && data.id_sexo!=='' && data.nacimiento!=='' && */data.nombre!=='' /*&& data.notas!=='' && data.peso!=='' && data.id_veterinaria!=='' && data.id_propietario!==''*/){
      setFetching(true);
      AddPet(sesion.access_token, data, 
        (data)=>{
          console.log(data);
          setFetching(false);
          setNewPetOpen(!newPetOpen);
          setData({
            chip:null,
            id_caracter:null,
            id_pelaje:null,
            id_raza:null,
            id_sexo:null,
            nacimiento:null,
            nombre:'',
            notas:null,
            peso:null,
            thumb:0,
            id_veterinaria:null,
            es_principal:1,
            id_propietario:null,
            deceso:false,
            date:null
          });
          props.updatePets();
        },
        (error)=>{
          setFetching(false);
        }
      );
    }
    else{
      console.log(data)
    }
  }

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
      setData({...data, id_propietario:props.id, id_veterinaria: localSesion.x_usuarios_veterinarias.id_veterinaria});
    }
  },[]);

  const handleData = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    //console.log(name, value)
    setData({...data, [name]:value});

  }

  const handleDate = (date) => {
    console.log(formatDate(date));
    setData({...data, nacimiento: formatDate(date), date:date});
  }

  const handleCheck = (event) => {
    let value = event.target.checked;
    let name = event.target.name;
    //console.log(name, value)
    setData({...data, [name]:value});
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  return (
    <Drawer 
      open={props.open}
    >
      <div className='drawer-content'>
        <div className='header'>
          <span onClick={props.onClose} className='close-btn'>
            <ArrowBackIcon/>
          </span>
          <div className='header-owner-data'>
            <span className='avatar-owner'>
              <PersonIcon/>
            </span>
            <span className='header-name'>{props.owner!==null?props.owner.nombre:''}</span>
            <span className='header-crud'>
              <span><CreateIcon/></span>
              <span><DeleteIcon/></span>
            </span>
          </div>
        </div>
        <div className='owner-content'> 
          <div>
            {
              props.owner===null?
                <span className='spiner-container'><CircularProgress/></span>
              :
              <React.Fragment>
                <div className='owner-pets'>
                  {
                    props.pets.map(data => {
                      return (
                        <Pet
                          key={data.id} 
                          ownerName={props.owner.nombre}
                          data={data}
                        >
                          <div className='owner-pet'>
                            <span className='dog-img'><img src={dog} alt='dog' style={{width:'100%'}}/></span>
                            <span className='name'>{data.nombre}</span>
                          </div>
                        </Pet>
                      )
                    })
                  }
                  
                </div>
                <div className='item-list'>
                  <p className='title'>Nombre</p>
                  <p className='description'>{props.owner.nombre}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Dirección</p>
                  <p className='description'>{props.owner.direccion}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Región</p>
                  <p className='description'>{props.owner.nombre_region}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Teléfono</p>
                  <p className='description'>{props.owner.telefono}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Email</p>
                  <p className='description'>{props.owner.email}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Identificación regional</p>
                  <p className='description'>{props.owner.identificacion_regional}</p>
                </div>
                <div className='item-list'>
                  <p className='title'>Notas</p>
                  <p className='description'>{props.owner.notas}</p>
                </div>
                <div className='actions-button'>
                  <PhoneIcon/>
                  <WhatsAppIcon className='wsp'/>
                  <WhatsAppIcon className='wsp'/>
                  <WhatsAppIcon className='wsp'/>
                  <AddCircleIcon 
                    className='add'
                    onClick={handleOpenNewPet}
                  />
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
      <Drawer
        open={newPetOpen}
        className='new-pet'
      >
        <div className='new-pet-header header'>
            <div className='header-title'>
              <span onClick={handleOpenNewPet} className='close-btn'>
                <ArrowBackIcon/>
              </span>
              <span className='dog-img'><img src={dog} alt='dog' style={{width:'100%'}}/></span>
              <span style={{marginLeft:'1em'}}>
                <span className='pet-header-title'>Nueva mascota</span>
                <span className='pet-header-subtitle'>Ingresando nueva mascota</span>
              </span>
            </div>
            <span className='add-pet-btn' onClick={add}>
              <BackupIcon/>
            </span>
        </div>
        <div className='new-pet-content'>
          {((props.races===null || props.furs===null || props.sexes===null || props.characteres===null) || fetching)?
          <div className='spiner'>
            <CircularProgress/>
          </div>
          :
          <span>
            <TextField 
              label='Nombre'
              name='nombre'
              style={TextFieldStyles}
              onChange={handleData}
              value={data.nombre}
            />

            <FormControl style={{width:'100%'}}>
              <InputLabel htmlFor="race">Raza</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: 'id_raza',
                  id: 'race',
                }}
                style={TextFieldStyles}
                value={data.id_raza}
              >
                <option value="" />
                {
                  props.races.map(data=>{
                    return <option key={data.id} value={data.id}>{data.nombre}</option>
                  })
                }
              </Select>
            </FormControl>

            <FormControl style={{width:'100%'}}>
              <InputLabel htmlFor="fur">Pelaje</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: 'id_pelaje',
                  id: 'fur',
                }}
                style={TextFieldStyles}
                value={data.id_pelaje}
              >
                <option value="" />
                {
                  props.furs.map(data=>{
                    return <option key={data.id} value={data.id}>{data.nombre}</option>
                  })
                }
              </Select>
            </FormControl>

            <FormControl style={{width:'100%'}}>
              <InputLabel htmlFor="sex">Sexo</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: 'id_sexo',
                  id: 'sex',
                }}
                style={TextFieldStyles}
                value={data.id_sexo}
              >
                <option value="" />
                {
                  props.sexes.map(data=>{
                    return <option key={data.id} value={data.id}>{data.nombre}</option>
                  })
                }
              </Select>
            </FormControl>

            <FormControl style={{width:'100%'}}>
              <InputLabel htmlFor="character">Caracter</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: 'id_caracter',
                  id: 'character',
                }}
                style={TextFieldStyles}
                value={data.id_caracter}
              >
                <option value="" />
                {
                  props.characteres.map(data=>{
                    return <option key={data.id} value={data.id}>{data.nombre}</option>
                  })
                }
              </Select>
            </FormControl>

            <KeyboardDatePicker
              margin="normal"
              format="MM/dd/yyyy"
              label="Nacimiento"
              name='nacimiento'
              value={data.date}
              onChange={handleDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={TextFieldStyles}
            />
            
            <TextField 
              label='Peso'
              name='peso'
              style={TextFieldStyles}
              onChange={handleData}
              value={data.peso}
            />
            <div className='chip'>
              <TextField 
                label='Chip'
                name='chip'
                style={TextFieldStyles}
                onChange={handleData}
                value={data.chip}
              />
              <span className='bar-code'><ViewHeadlineIcon/></span>
            </div>
            <TextField 
              label='Notas'
              name='notas'
              style={TextFieldStyles}
              onChange={handleData}
              value={data.notas}
            />
            <div style={TextFieldStyles} className='check-box'>
              <Checkbox
                checked={data.deceso}
                onChange={handleCheck}
                name='deceso'
              />
              <span>Deceso</span>
            </div>
          </span>
          }
        </div>
      </Drawer>
    </Drawer>
  );
}
export default OwnerDetail;