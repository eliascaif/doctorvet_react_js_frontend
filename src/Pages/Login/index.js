import React,{useEffect,useState} from 'react';
import {Login as LoginService, LoginFacebookGoogle} from '../../Services/Login';
import './styles.scss';

import {
    TextField,
    Button,
    CircularProgress
} from '@material-ui/core';

import Dialog from '../../Components/Dialog';

import {Link, useHistory} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const TextFieldStyles = {
    marginBottom:'1em',
    width:'100%'
}

const Login = (props) => {

    const history = useHistory();

    const [verified, setVerified] = useState(true);
    const [email, setEmail] = useState('');
    const [sesion, setSesion] = useState(null);

    const [userData, setUserData] = useState({
        /*email:'test@email.com',
        password:'asd'*/
        email:'',
        password:''
    })

    const [disabled, setDisabled] = useState(false);

    const componentClicked = (event) => {
        console.log(event);
    }

    const responseFacebook = (response) => {
        setDisabled(true);
        console.log('Facebook response',response);
        let data = {email: response.email, nombre: response.name, tipo_login: 'FACEBOOK', unique_id: response.id}
        LoginFacebookGoogle(data, (resp) => {
            console.log(resp);

            if(resp.response==='ACCOUNT_WAITING_FOR_EMAIL_CHECK'){
                setVerified(false);
                setEmail(resp.email);
                return;
            }
            localStorage.setItem('sesion', JSON.stringify(resp));
            setSesion(resp);
            if(props.onChangeSesion){
                props.onChangeSesion(JSON.stringify(resp));
            }
            setDisabled(false);
            if(resp.id_x_usuarios_veterinarias_en_uso===null){
                console.log('push to set veterinary')
                history.push('/set-veterinary');
            }
            else
                history.push('/dashboard');

        },
        (error) => {
            setDisabled(false);
            console.error(error);
        });
    }
    
    const responseGoogle = (response) => {
        console.log('Google response',response.profileObj);
        setDisabled(true);
        if(response.profileObj!==undefined){
            let data = {email: response.profileObj.email, nombre: response.profileObj.name, tipo_login: 'GOOGLE', unique_id: response.profileObj.googleId};
            console.log(data);
            LoginFacebookGoogle(data, (resp) => {
                console.log(resp);

                if(resp.response==='ACCOUNT_WAITING_FOR_EMAIL_CHECK'){
                    setVerified(false);
                    setEmail(resp.email);
                    return;
                }
                localStorage.setItem('sesion', JSON.stringify(resp));
                setSesion(resp);
                if(props.onChangeSesion){
                    props.onChangeSesion(JSON.stringify(resp));
                }
                setDisabled(false);
                if(resp.id_x_usuarios_veterinarias_en_uso===null){
                    console.log('push to set veterinary')
                    history.push('/set-veterinary');
                }
                else
                    history.push('/dashboard');

            },
            (error) => {
                setDisabled(false);
                console.error(error);
            });
        }
    }

    useEffect(()=>{
        /*console.log('effect')
        localStorage.setItem('sesion',null);*/
    },[])

    const handleData = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setUserData({...userData, [name]:value});
    }

    const [errorMessage, setErrorMessage] = useState({status:false, message:''});

    const handleLogin = () => {
        setDisabled(true);
        LoginService({...userData, tipo_login:'EMAIL'}, (data) => {
            console.log(data);
            //if(data.usuario.id_x_usuarios_veterinarias_en_uso!==null)
            if(data.response==='ACCOUNT_WAITING_FOR_EMAIL_CHECK'){
                setVerified(false);
                setEmail(data.usuario.email);
                return;
            }
            localStorage.setItem('sesion', JSON.stringify(data.usuario));
            setSesion(data.usuario);
            if(props.onChangeSesion){
                props.onChangeSesion(JSON.stringify(data.usuario));
            }
            setDisabled(false);
            if(data.usuario.id_x_usuarios_veterinarias_en_uso===null){
                history.push('/set-veterinary');
            }
            else
                history.push('/dashboard');
        },
        (error)=>{
            console.error('login',error);
            setErrorMessage({status:true, message:error});
            setDisabled(false);
        });
    }

    const handleNotVerified = () => {
        setVerified(true);
        setDisabled(false);
    }

    const handleClose = () => {
        setErrorMessage({status:false, message:''});
    }

    const handleRedirect = () => {
        let localSesion = null;
        try {
            localSesion = JSON.parse(localStorage.getItem('sesion'));
        } catch (error) {
            localStorage.setItem('sesion', null);
        }
        if(localSesion!==null)
            history.push('/dashboard');
    }

    return (
        <React.Fragment>
            {handleRedirect()}
            {
                !verified?
                <div className='not-verified'>
                    <span style={{textAlign:'center'}}>
                        Por favor revisa tu correo electronico {email} para ingresar
                        <Button
                            variant="contained"
                            style={{width:'100%', boxShadow:'none', margin:'1em 0 1em 0'}}
                            onClick={handleNotVerified}
                        >
                            Ingresar
                        </Button>
                        <Button
                            variant="contained"
                            style={{width:'100%', boxShadow:'none'}}
                            onClick={handleNotVerified}
                        >
                            Usar otra cuenta
                        </Button>

                    </span>
                </div>
                :
                <div className='login-wrapper'>
                    <section className='user-data'>
                        <TextField 
                            label="Email"
                            name='email'
                            style={TextFieldStyles}
                            value={userData.email}
                            onChange={handleData}
                            disabled={disabled}
                        />
                        <TextField 
                            label="Contraseña" 
                            name='password'
                            type='password'
                            style={TextFieldStyles}
                            value={userData.password}
                            onChange={handleData}
                            disabled={disabled}
                        />
                        <Button
                            variant="contained"
                            style={{width:'100%', boxShadow:'none'}}
                            disabled={(disabled || userData.email==='' || userData.password==='')}
                            onClick={handleLogin}
                        >
                            Ingresar
                        </Button>
                        {
                            disabled && <div style={{width:'100%', textAlign:'center', padding:'1em 0'}}><CircularProgress/></div>
                        }
                        <span>
                            <Link to='register'>¿No registrado? Crea cuenta</Link>
                        </span>
                        <span>
                            <Link to='recovery'>Olvidé mi contraseña</Link>
                        </span>
                    </section>
                    <div className='media-login'>
                        <span>O conectate con</span>
                        <div>
                            <GoogleLogin
                                //clientId="148746490734-6dn9077cugm231t1ppgf0mn403ba8hgd.apps.googleusercontent.com"
                                clientId="117867739974-u1p6folp269rufct1me8iqo4ahv48kss.apps.googleusercontent.com"
                                buttonText="Sign in"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className='google-button'
                            />
                        </div>
                        <div>
                            <FacebookLogin
                                appId="849031608861789"
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseFacebook} 
                                textButton='Continue with facebook'
                            />
                        </div>
                    </div>
                </div>
            }
            <Dialog
                open={errorMessage.status}
                message={errorMessage.message}
                handleClose={handleClose}
            />
        </React.Fragment>
    )
}

export default Login;