import config from "../../Assets/localConfig.json";

const GetVeterinary = (data, token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  // myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "veterinarias.php?id_veterinaria=" + data;

  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetVeterinaries = (data, token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  //callback([{nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}])

  let url = config.baseApi + "veterinarias.php?id_usuario=" + data;

  console.log(url);
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const JoinVet = (data, token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  //myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let url = config.baseApi + "insert_x_peticiones_usuarios_veterinarias.php";
  console.log(url, data);
  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const CreateVet = (data, userID, token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    { ...data },
    {
      id_usuario: userID,
      rol: "ADMINISTRADOR",
    },
  ]);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let url = config.baseApi + "veterinarias.php";
  console.log(url, data);
  fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { GetVeterinary, GetVeterinaries, JoinVet, CreateVet };
