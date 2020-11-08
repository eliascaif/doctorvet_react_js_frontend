import config from '../../Assets/localConfig.json';

const Login = (data, callback, errorCallback) => {
    let url = config.baseApi+'user_login_account.php';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((json)=>{
        if(json.response==='INVALID_ACCOUNT_PASSWORD'){
            errorCallback(json.response);
        }
        else{
            callback(json);
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export { Login }