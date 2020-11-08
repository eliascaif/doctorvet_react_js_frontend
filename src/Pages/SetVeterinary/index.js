import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
    CircularProgress,
    Button,
    TextField, 
    InputLabel,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';

import Dialog from '../../Components/Dialog';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import StoreIcon from '@material-ui/icons/Store';
import BackupIcon from '@material-ui/icons/Backup';
import Veterinary from '../../Components/Veterinary';
import './styles.scss';

import {GetVeterinaries, JoinVet, CreateVet} from '../../Services/Veterinary';
import {GetRegions} from '../../Services/Regions';

const TextFieldStyles = {
    marginBottom:'1em',
    width:'100%'
}

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: 0,
      minWidth: '100%',
      marginBottom:'1em'
    },
    selectEmpty: {
        
    },
}));

const SetVeterinary = (props) => {

    const classes = useStyles();

    const history = useHistory();
    const [sesion, setSesion] = useState(null);
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRegions, setLoadingRegions] = useState(false);
    const [vet, setVet] = useState(null);
    const [option, setOption] = useState(null);
    const [regions, setRegions] = useState([]);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        direccion: '',
        email: '',
        id_region: '',
        nombre: '',
        nombre_region: '',
        notas: '',
        pagina_web: '',
        propietario: '',
        telefono: '',
        thumb: 0
    })

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
            GetVeterinaries(
                localSesion.id, 
                localSesion.access_token,
                (data)=>{
                    setVets(data);
                    setLoading(false);
                    //console.log(data);
                },
                (error)=>{
                    console.error(error);
                }
            );
            GetRegions(
                localSesion.access_token,
                (data)=>{
                    setRegions(data);
                    setLoadingRegions(false);
                    //console.log(data);
                },
                (error)=>{
                    console.error(error);
                }
            );
        }
    },[]);

    const handleVet = (d) => {
        setVet(d.id);
        setOpen(true);
    }

    const handleJoinVet = () => {
        JoinVet(
            {id_usuario:sesion.id, id_veterinaria:vet},
            sesion.access_token,
            (data)=>{
                console.log(data);
            }
        );
    }

    const handleOption = (data) => {
        setOption(data);
    }

    const handleAddVet = () => {
        CreateVet(
            data, 
            sesion.id,
            sesion.access_token,
            (data)=>{
                console.log(data);
            }
        )
    }

    const handleData = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        console.log(data)
        if(name==='id_region'){
            let aux = value.split('*vet*');
            setData({...data, id_region:aux[0], nombre_region:aux[1]});
            return;
        }
        setData({...data, [name]:value});
    }

    return (
        <div>
            {option===null &&
            <div className='select-option'>
                <Button
                    variant="contained"
                    style={{width:'100%', boxShadow:'none', marginBottom:'1em'}}
                    onClick={()=>handleOption(true)}
                >
                    Crear Veterinaria
                </Button>
                <Button
                    variant="contained"
                    style={{width:'100%', boxShadow:'none'}}
                    onClick={()=>handleOption(false)}
                >
                    Unirse a veterinaria
                </Button>
            </div>
            }
            {option===false &&
            <React.Fragment>
                <div className='login-vet-header'>
                    <span className='controls'>
                        <ArrowBackIcon 
                            style={{cursor:'pointer'}}
                            onClick={()=>handleOption(null)}
                        />
                        <div className='title'>
                            <span>Veterinarias</span>
                            <span style={{fontSize:'.75em'}}>Unirse a veterinaria</span>
                        </div>
                    </span>
                    <span>
                        {/*<SearchIcon/>*/}
                    </span>
                </div>
                <div className='existing-vet'>
                    {
                        loading 
                        ? 
                            <CircularProgress/>
                        :
                            <div></div>
                    }
                    <div style={{width:'100%'}}>
                        {
                            vets.map(data => {
                                //console.log(data.id,vet,data.id===vet)
                                return (
                                    <Veterinary
                                        name={data.nombre}
                                        email={data.email}
                                        key={data.id}
                                        active={data.id===vet}
                                        onClick={()=>handleVet(data)}
                                    />
                                )
                            })
                        }
                    </div>
                    {/*<Button
                        variant="contained"
                        style={{width:'calc(100% - 1em)', boxShadow:'none', margin:'1em .5em .5em .5em'}}
                        disabled={vet===null}
                        onClick={handleJoinVet}
                    >
                        Aceptar
                    </Button>*/}
                </div>
                <Dialog
                    open={open}
                    CloseText={'Cancelar'}
                    okText={'Unirse'}
                    handleClose={()=>{setOpen(false)}}
                >
                    <div style={{textAlign:'center'}}>
                        <h3>¿Unirse a veterinaria?</h3>
                        <p style={{textAlign:'center'}}>
                            En caso de unirse se enviara una solicitud a la veterinaria elegida 
                        </p>
                    </div>
                </Dialog>
            </React.Fragment>
            }
            {option===true &&
                <span>
                {
                    loadingRegions
                    ? 
                        <CircularProgress/>
                    :
                    <React.Fragment>
                    <div className='login-vet-header'>
                        <span className='controls'>
                            <ArrowBackIcon 
                                style={{cursor:'pointer'}}
                                onClick={()=>handleOption(null)}
                            />
                            <span className='icon-wrapper'><StoreIcon/></span>
                            <div className='title' style={{marginLeft:'.5em'}}>
                                <span>Nueva veterinaria</span>
                                <span style={{fontSize:'.75em'}}>Ingresando nueva veterinaria</span>
                            </div>
                        </span>
                        <span
                            style={{fontSize:'1.5em'}}
                        >
                            <BackupIcon
                                style={{fontSize:'1.5em'}}
                            />
                        </span>
                    </div>
                    <div className='create-vet'>
                        <TextField 
                            label="Nombre" 
                            name='nombre'
                            style={TextFieldStyles}
                            value={data.nombre}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <TextField 
                            label="Dirección" 
                            name='direccion'
                            style={TextFieldStyles}
                            value={data.direccion}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel>Región</InputLabel>
                            <Select
                                value={data.id_region+'*vet*'+data.nombre_region}
                                onChange={handleData}
                                name='id_region'
                            >
                                {
                                    regions.map(data=>{
                                        return(
                                            <MenuItem value={data.id+'*vet*'+data.nombre_region} key={data.id}>{data.nombre_region}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        {/*<TextField 
                            label="Región" 
                            name='id_region'
                            style={TextFieldStyles}
                            value={data.id_region}
                            onChange={handleData}
                            disabled={disabled}
                        />*/}
                        <TextField 
                            label="Teléfono" 
                            name='telefono'
                            style={TextFieldStyles}
                            value={data.telefono}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <TextField 
                            label="Email" 
                            name='email'
                            style={TextFieldStyles}
                            value={data.email}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <TextField 
                            label="Propietario" 
                            name='propietario'
                            style={TextFieldStyles}
                            value={data.propietario}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <TextField 
                            label="Pagina web" 
                            name='pagina_web'
                            style={TextFieldStyles}
                            value={data.pagina_web}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <TextField 
                            label="Notas" 
                            name='notas'
                            style={TextFieldStyles}
                            value={data.notas}
                            onChange={handleData}
                            /*disabled={disabled}*/
                        />
                        <Button
                            variant="contained"
                            style={{width:'calc(100% - 1em)', boxShadow:'none', margin:'1em .5em .5em .5em'}}
                            disabled={data.direccion==='' || data.email==='' || data.id_region==='' || data.nombre==='' || data.nombre_region==='' || data.notas==='' || data.pagina_web==='' || data.propietario==='' || data.telefono===''}
                            onClick={handleAddVet}
                        >
                            Aceptar
                        </Button>
                    </div>
                    </React.Fragment>
                }
                </span>
            }
        </div>
    )
}
export default SetVeterinary;