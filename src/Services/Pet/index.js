import config from '../../Assets/localConfig.json';

const AddPet = (token, data, callback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
        [
            {
                "chip":data.chip,
                "id_caracter":data.id_caracter,
                "id_pelaje":data.id_pelaje,
                "id_raza":data.id_raza,
                "id_sexo":data.id_sexo,
                "nacimiento":data.nacimiento,
                "nombre":data.nombre,
                "notas":data.notas,
                "peso":data.peso,
                "deceso":data.deceso,
                "thumb":0
            },
            {
                "id_veterinaria":data.id_veterinaria
            },
            {
                "es_principal":1,
                "id_propietario":data.id_propietario
            }
        ]
    );

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(
        "http://34.95.245.77/android_doctor_vet/api/insert_mascota.php", 
        requestOptions
    )
    .then(response => 
        response.text()
    )
    .then(result => 
        callback(result)
    )
    .catch(error => 
        console.log('error', error)
    );
}

const GetRace = (token, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_mascotas_razas.php';

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
        if(errorCallback)
            errorCallback(error);
        //console.log(error);
    });
}

const GetFur = (token, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_mascotas_pelajes.php';

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
        if(errorCallback)
            errorCallback(error);
        //console.log(error);
    });
}

const GetSex = (token, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_mascotas_sexos.php';

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
        if(errorCallback)
            errorCallback(error);
        //console.log(error);
    });
}

const GetCharacter = (token, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_mascotas_caracteres.php';

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
        if(errorCallback)
            errorCallback(error);
        //console.log(error);
    });
}

const GetPets = (token, id_vet, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let url = config.baseApi+'get_mascotas.php?id_veterinaria='+id_vet;

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
        if(errorCallback)
            errorCallback(error);
        //console.log(error);
    });
}

const DeletePet = (data, callback, errorCallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"id_mascota":data.id_mascota,"id_veterinaria":data.id_veterinaria});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://34.95.245.77/android_doctor_vet/api/delete_mascota.php", requestOptions)
    .then(response => 
        response.text()
    )
    .then(result => {
        callback(result);
        //console.log(result)
    })
    .catch((error) => {
        if(errorCallback)
            errorCallback(error);
        console.log('error', error)
    });
}

const UpdatePet = (token, data, callback, errorcallback) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
        [
            {
                "id":data.id,
                "chip":data.chip,
                "id_caracter":data.id_caracter,
                "id_pelaje":data.id_pelaje,
                "id_raza":data.id_raza,
                "id_sexo":data.id_sexo,
                "nacimiento":data.nacimiento,
                "nombre":data.nombre,
                "notas":data.notas,
                "peso":data.peso,
                "deceso":data.deceso,
                "thumb":0
            },
            {
                "id_veterinaria":data.id_veterinaria
            },
            {
                "es_principal":1,
                "id_propietario":data.propietarios[0].id
            }
        ]
    );

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(
        "http://34.95.245.77/android_doctor_vet/api/update_mascota.php", 
        requestOptions
    )
    .then(response => 
        response.json()
    )
    .then(result => 
        callback(result)
    )
    .catch(error => 
        errorcallback(error)
    );
}

export {GetRace, GetFur, GetSex, GetCharacter, AddPet, GetPets, DeletePet, UpdatePet}