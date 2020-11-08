import config from '../../Assets/localConfig.json';

const GetOwners = (token, vet_id, callback) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    //callback([{nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}])
    
    let url = config.baseApi+'get_propietarios.php?id_veterinaria='+vet_id;
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

const GetOwner = (token, id, callback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_propietario.php?id_propietario='+id;
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

const AddOwner = (data, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([{"direccion":data.direccion,"email":data.email,"id_region":186,"identificacion_regional":data.id_regional,"nombre":data.nombre,"notas":data.notas,"telefono":data.telefono},{"id_veterinaria":data.id_vet}]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://34.95.245.77/android_doctor_vet/api/insert_propietario.php", requestOptions)
    .then(response => 
        response.text()
    )
    .then(result => {
        let aux = result.split(' ');
        console.log(aux)
        if(aux[0]==='Duplicate')
            errorCallback(null);
        else
            callback(result);
        //console.log(result)
    })
    .catch((error) => {
        if(errorCallback)
            errorCallback(error);
        console.log('error', error)
    });
}

export {GetOwners, GetOwner, AddOwner}