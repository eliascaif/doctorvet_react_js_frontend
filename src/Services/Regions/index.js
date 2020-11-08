import config from '../../Assets/localConfig.json';

const GetRegions = (token, callback) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    //callback([{nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}])
    
    let url = config.baseApi+'get_regiones.php';
    //console.log(url)
    fetch(
        url, 
        requestOptions
    )
    .then((response) => {
        return response.json();
    })
    .then((json)=>{
        callback(json);
    })
    .catch((error) => {
        console.log(error);
    });
}

export {GetRegions}