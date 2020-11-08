import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './Styles/styles.scss';

import Header from './Containers/Header';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboar from './Pages/Dashboard';
import Owners from './Pages/Owners';
import Recovery from './Pages/Recovery';
import SetVeterinary from './Pages/SetVeterinary';
import Pets from './Pages/Pets';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';

import DateFnsUtils from '@date-io/date-fns';

const options = [
  {
    name:'Inicio',
    path:'/dashboard',
    value:'Inicio'
  },
  {
    name:'Propietarios',
    path:'/owners',
    value:'Propietarios'
  },
  {
    name:'Mascotas',
    path:'/pets',
    value:'Mascotas'
  },
  /*{
    name:'Productos',
    path:'/',
    value:'products'
  },
  {
    name:'Ajustes',
    path:'/',
    value:'settings'
  },*/
  {
    name:'Cerrar sesión',
    path:'/',
    value:'logout'
  },
];

const App = () => {

  const handleClick = (event) => {

  }

  const [sesion, setSesion] = useState(null);
  const [option, setOption] = useState('Inicio');

  useEffect(()=>{
    let localSesion = null;
    try {
      localSesion = JSON.parse(localStorage.getItem('sesion'));
    } catch (error) {
      localStorage.setItem('sesion', null);
    }
    if(localSesion===null){
      return;
    }
    if(localSesion.access_token!==undefined){
      setSesion(localSesion);
    } 
  },[]);
  
  const handleOption = (event) => {
    setOption(event);
    if(event==='logout'){
      console.log('app',event)
      localStorage.setItem('sesion',null);
      setSesion(null);
    }
  }

  const handleUpdateSesion = (newSesion) => {
    console.log(newSesion)
    setSesion(newSesion);
  }

  return (
    <Router basename={'/frontend'}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        {
          sesion!==null &&
          <Header
            user={sesion}
            options={options}
            handleOption={handleOption}
            option = {option.toUpperCase()}
          />
        }
        <span style={{display:'flex'}}>
        {(sesion!==null && sesion.veterinary!==null)&&
            <div className='menu-lg'>
              <div className='menu-hader'>
                <div className='header-item'>
                  <span className='icon-wrapper'><StoreIcon style={{fontSize:'2.5em', color:'#037e69'}}/></span>
                  <div>
                  <h4 style={{margin:'0'}}>{sesion.veterinary.nombre}</h4>
                  <p style={{margin:'0', fontSize:'.75em'}}>{sesion.veterinary.email}</p>
                  </div>
                </div>
                <div className='header-item'>
                  <span className='icon-wrapper'><PersonIcon style={{fontSize:'2.5em', color:'#037e69'}}/></span>
                  <div>
                  <h4 style={{margin:'0'}}>{sesion.nombre}</h4>
                  <p style={{margin:'0', fontSize:'.75em'}}>{sesion.email}</p>
                </div>
              </div>
            </div>
            <List>
              {options.map((data, index) => (
              <ListItem button key={index} className='list-item'>
                <Link onClick={()=>handleOption(data.value)} className={(data.path==='')?'active':''} to={data.path}>{data.name}</Link>
              </ListItem>
              ))}
            </List>
        </div>
        }
        <Switch>
          <Route 
            path='/' 
            exact 
            render={(props) => (
              <Login 
                onClick = {handleClick}
              />
            )}
          />
           <Route 
            path='/register' 
            render={(props) => (
              <Register onClick = {handleClick}/>
            )}
          />
          <Route 
            path='/dashboard' 
            render={(props) => (
              <Dashboar
                onChangeSesion = {handleUpdateSesion}
              />
            )}
          />
          <Route 
            path='/owners' 
            render={(props) => (
              <Owners
              />
            )}
          />
          <Route 
            path='/recovery' 
            render={(props) => (
              <Recovery/>
            )}
          />
          <Route 
            path='/set-veterinary' 
            render={(props) => (
              <SetVeterinary/>
            )}
          />
          <Route 
            path='/pets' 
            render={(props) => (
              <Pets/>
            )}
          />
        </Switch>
        </span>
      </div>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
