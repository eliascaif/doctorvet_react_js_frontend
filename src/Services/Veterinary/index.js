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

  const json = {
    id: 6,
    nombre: "name",
    propietario: "pro",
    direccion: "dir",
    id_region: 7,
    nombre_region: "Almirante Brown / Buenos Aires",
    latlng: null,
    telefono: 4560,
    email: "test12245@gmail.co",
    pagina_web: null,
    notas: 123,
    configuracion_inicio: 0,
    photo_url: null,
    thumb_url: null,
    sistema_unidades: "METRICO_DECIMAL",
  };
  callback(json);
  // fetch(url, requestOptions)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => {
  //     callback(json);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
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

  const json = [
    {
      id: 2,
      nombre: "FacebookLogin",
      id_region: 7,
      email: "facebooklogin@emial.com",
      nombre_region: "Almirante Brown / Buenos Aires",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 3,
      nombre: "GoogleLogin",
      id_region: 17,
      email: "googlelogin@email.com",
      nombre_region: "Avellaneda / Buenos Aires",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 7,
      nombre: "jorge",
      propietario: 123,
      direccion: "dir",
      id_region: 7,
      telefono: 312456000,
      email: "jor@e.com",
      nombre_region: "Almirante Brown / Buenos Aires",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 6,
      nombre: "name",
      propietario: "pro",
      direccion: "dir",
      id_region: 7,
      telefono: 4560,
      email: "test12245@gmail.co",
      notas: 123,
      nombre_region: "Almirante Brown / Buenos Aires",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 4,
      nombre: "Test",
      propietario: "Yo",
      direccion: "Calle 1",
      id_region: 719,
      telefono: 612222222,
      email: "vete1@123.com",
      pagina_web: "www.test.com",
      notas: "no tengo",
      nombre_region: "Argentina / Argentina",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 5,
      nombre: "Test",
      propietario: "yo",
      direccion: "test",
      id_region: 719,
      telefono: 31204555,
      email: "jorge@gmail.com",
      notas: "nota",
      nombre_region: "Argentina / Argentina",
      sistema_unidades: "METRICO_DECIMAL",
    },
    {
      id: 1,
      nombre: "Veterinaria1",
      id_region: 7,
      email: "veterinaria1@email.com",
      nombre_region: "Almirante Brown / Buenos Aires",
      sistema_unidades: "METRICO_DECIMAL",
    },
  ];

  callback(json);
  // fetch(url, requestOptions)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => {
  //     callback(json);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
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

  let url = config.baseApi + "usuarios_peticiones.php";
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
