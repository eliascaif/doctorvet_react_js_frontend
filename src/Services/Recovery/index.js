import config from '../../Assets/localConfig.json';

const Recovery = (data, callback, callbackError) => {
    let url = config.baseApi+'';
    fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body:{...data}
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((json)=>{
        callback(json);
    })
    .catch((error) => {
        callbackError(error);
        //console.log(error);
    });
}

export { Recovery }