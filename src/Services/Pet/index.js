import config from "../../Assets/localConfig.json";

const AddPet = (token, data, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      chip: data.chip,
      id_caracter: data.id_caracter,
      id_pelaje: data.id_pelaje,
      id_raza: data.id_raza,
      id_sexo: data.id_sexo,
      nacimiento: data.nacimiento,
      nombre: data.nombre,
      notas: data.notas,
      peso: data.peso,
      deceso: data.deceso,
      thumb: 0,
      id_veterinaria: data.id_veterinaria,
      id_propietario: data.id_propietario,
    },
    {},
  ]);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  let url = config.baseApi + "mascotas.php";
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => callback(result))
    .catch((error) => console.log("error", error));
};

const GetRace = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_razas.php";
  const json = {
    content: [
      {
        id: 193,
        nombre: "Aberdeen angus",
        id_especie: 4,
        nombre_especie: "Bovino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Aberdeen-angus.webp",
      },
      {
        id: 1,
        nombre: "Affenpinscher",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Affenpinscher.webp",
      },
      {
        id: 2,
        nombre: "Afgano",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Afgano.webp",
      },
      {
        id: 198,
        nombre: "Agapornis",
        id_especie: 13,
        nombre_especie: "Ave",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Agapornis.webp",
      },
      {
        id: 3,
        nombre: "Airedale terrier",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Airedale-terrier.webp",
      },
      {
        id: 4,
        nombre: "Akita americano",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Akita-americano.webp",
      },
      {
        id: 5,
        nombre: "Akita inu",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Akita-inu.webp",
      },
      {
        id: 6,
        nombre: "Alano bulldog español",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Alano-bulldog-español.webp",
      },
      {
        id: 7,
        nombre: "Alaskan husky",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Alaskan-husky.webp",
      },
      {
        id: 8,
        nombre: "Alaskan malamute",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Alaskan-malamute.webp",
      },
      {
        id: 9,
        nombre: "American bully",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/American-bully.webp",
      },
      {
        id: 214,
        nombre: "Angora Conejo",
        id_especie: 7,
        nombre_especie: "Lepórido",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Angora-Conejo.webp",
      },
      {
        id: 215,
        nombre: "Angora Enano Conejo",
        id_especie: 7,
        nombre_especie: "Lepórido",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Angora-Enano-Conejo.webp",
      },
      {
        id: 192,
        nombre: "Árabe",
        id_especie: 3,
        nombre_especie: "Equino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Árabe.webp",
      },
      {
        id: 157,
        nombre: "Azul Ruso",
        id_especie: 2,
        nombre_especie: "Felino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Azul-Ruso.webp",
      },
      {
        id: 10,
        nombre: "Barbet",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Barbet.webp",
      },
      {
        id: 11,
        nombre: "Basenji",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Basenji.webp",
      },
      {
        id: 12,
        nombre: "Beagle",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Beagle.webp",
      },
      {
        id: 13,
        nombre: "Bedlington terrier",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bedlington-terrier.webp",
      },
      {
        id: 158,
        nombre: "Bengala",
        id_especie: 2,
        nombre_especie: "Felino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bengala.webp",
      },
      {
        id: 181,
        nombre: "Bereber",
        id_especie: 3,
        nombre_especie: "Equino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bereber.webp",
      },
      {
        id: 14,
        nombre: "Bichón frisé",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bichón-frisé.webp",
      },
      {
        id: 15,
        nombre: "Bichón maltés",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bichón-maltés.webp",
      },
      {
        id: 16,
        nombre: "Bloodhound perro de san Humberto",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bloodhound-perro-de-san-Humberto.webp",
      },
      {
        id: 159,
        nombre: "Bobtail Americano",
        id_especie: 2,
        nombre_especie: "Felino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bobtail-Americano.webp",
      },
      {
        id: 17,
        nombre: "Bobtail antiguo pastor inglés",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bobtail-antiguo-pastor-inglés.webp",
      },
      {
        id: 18,
        nombre: "Boerboel",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Boerboel.webp",
      },
      {
        id: 19,
        nombre: "Border collie",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Border-collie.webp",
      },
      {
        id: 20,
        nombre: "Border terrier",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Border-terrier.webp",
      },
      {
        id: 21,
        nombre: "Borzoi galgo ruso",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Borzoi-galgo-ruso.webp",
      },
      {
        id: 160,
        nombre: "Bosque De Noruega",
        id_especie: 2,
        nombre_especie: "Felino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bosque-De-Noruega.webp",
      },
      {
        id: 22,
        nombre: "Boston terrier",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Boston-terrier.webp",
      },
      {
        id: 23,
        nombre: "Boxer",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Boxer.webp",
      },
      {
        id: 24,
        nombre: "Boyero de berna",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Boyero-de-berna.webp",
      },
      {
        id: 25,
        nombre: "Braco alemán de pelo duro",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Braco-alemán-de-pelo-duro.webp",
      },
      {
        id: 26,
        nombre: "Braco de saint germain",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/braco-de-saint-germain.webp",
      },
      {
        id: 194,
        nombre: "Bradford",
        id_especie: 4,
        nombre_especie: "Bovino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bradford.webp",
      },
      {
        id: 182,
        nombre: "Bretón",
        id_especie: 3,
        nombre_especie: "Equino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bretón.webp",
      },
      {
        id: 161,
        nombre: "Britanico De Pelo Corto British Shorthair",
        id_especie: 2,
        nombre_especie: "Felino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Britanico-De-Pelo-Corto-British-Shorthair.JPG",
      },
      {
        id: 27,
        nombre: "Bull terrier",
        id_especie: 1,
        nombre_especie: "Canino",
        thumb_url:
          "http://194.113.73.110/doctorvet/backend/php/test/static/images/razas/Bull-terrier.webp",
      },
    ],
    page: 1,
    results_per_page: 40,
    total_results: 396,
    total_pages: 10,
  };
  callback(json);
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       callback(json);
  //     })
  //     .catch((error) => {
  //       if (errorCallback) errorCallback(error);
  //       //console.log(error);
  //     });
};

const GetFur = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_pelajes.php";

  const json = {
    content: [
      {
        id: 1,
        nombre: "Alazán",
      },
      {
        id: 2,
        nombre: "Amarillo",
      },
      {
        id: 3,
        nombre: "Amarillo y blanco",
      },
      {
        id: 4,
        nombre: "Amarillo y negro",
      },
      {
        id: 5,
        nombre: "Apricot",
      },
      {
        id: 6,
        nombre: "Atigrado",
      },
      {
        id: 7,
        nombre: "Atigrado claro",
      },
      {
        id: 8,
        nombre: "Atigrado oscuro",
      },
      {
        id: 78,
        nombre: "Balo encerado",
      },
      {
        id: 9,
        nombre: "Barcino",
      },
      {
        id: 10,
        nombre: "Bayo",
      },
      {
        id: 11,
        nombre: "Beige",
      },
      {
        id: 12,
        nombre: "Bicolor",
      },
      {
        id: 13,
        nombre: "Blanco",
      },
      {
        id: 15,
        nombre: "Blanco con manchas claras",
      },
      {
        id: 14,
        nombre: "Blanco con manchas oscuras",
      },
      {
        id: 16,
        nombre: "Blanco con marrón",
      },
      {
        id: 17,
        nombre: "Blanco con negro",
      },
      {
        id: 18,
        nombre: "Blanco y negro",
      },
      {
        id: 19,
        nombre: "Café",
      },
      {
        id: 20,
        nombre: "Café claro",
      },
      {
        id: 21,
        nombre: "Canela",
      },
      {
        id: 22,
        nombre: "Caramelo",
      },
      {
        id: 70,
        nombre: "Castaño claro",
      },
      {
        id: 71,
        nombre: "Castaño oscuro",
      },
      {
        id: 77,
        nombre: "Cerbuno",
      },
      {
        id: 23,
        nombre: "Champagne",
      },
      {
        id: 24,
        nombre: "Chocolate",
      },
      {
        id: 76,
        nombre: "Colorado",
      },
      {
        id: 80,
        nombre: "Colorado requemado",
      },
      {
        id: 25,
        nombre: "Dorado",
      },
      {
        id: 26,
        nombre: "Gateado",
      },
      {
        id: 27,
        nombre: "Gris",
      },
      {
        id: 28,
        nombre: "Gris claro",
      },
      {
        id: 29,
        nombre: "Gris oscuro",
      },
      {
        id: 30,
        nombre: "Gris plata",
      },
      {
        id: 31,
        nombre: "Gris y blanco\t",
      },
      {
        id: 32,
        nombre: "Gris y negro",
      },
      {
        id: 67,
        nombre: "Isabela",
      },
      {
        id: 33,
        nombre: "Leche y chocolate",
      },
    ],
    page: 1,
    results_per_page: 40,
    total_results: 80,
    total_pages: 2,
  };
  callback(json);
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       callback(json);
  //     })
  //     .catch((error) => {
  //       if (errorCallback) errorCallback(error);
  //       //console.log(error);
  //     });
};

const GetSex = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_sexos.php";
  const json = [
    {
      id: 1,
      nombre: "Hembra",
    },
    {
      id: 2,
      nombre: "Hembra castrada",
    },
    {
      id: 3,
      nombre: "Hembra pedigree",
    },
    {
      id: 4,
      nombre: "Hembra pedigree reproductora",
    },
    {
      id: 5,
      nombre: "Hembra reproductora",
    },
    {
      id: 6,
      nombre: "Macho",
    },
    {
      id: 7,
      nombre: "Macho castrado",
    },
    {
      id: 8,
      nombre: "Macho pedigree",
    },
    {
      id: 9,
      nombre: "Macho pedigree reproductor",
    },
    {
      id: 10,
      nombre: "Macho reproductor",
    },
  ];
  callback(json);
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       callback(json);
  //     })
  //     .catch((error) => {
  //       if (errorCallback) errorCallback(error);
  //       //console.log(error);
  //     });
};

const GetCharacter = (token, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas_caracteres.php";
  const json = [
    {
      id: 1,
      nombre: "Agresivo",
    },
    {
      id: 2,
      nombre: "Bueno",
    },
    {
      id: 3,
      nombre: "Dócil",
    },
    {
      id: 5,
      nombre: "Miedoso",
    },
    {
      id: 6,
      nombre: "Muy bueno",
    },
    {
      id: 4,
      nombre: "No controlable",
    },
  ];
  callback(json);
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       callback(json);
  //     })
  //     .catch((error) => {
  //       if (errorCallback) errorCallback(error);
  //       //console.log(error);
  //     });
};

const GetPets = (token, id_vet, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = config.baseApi + "mascotas.php?id_veterinaria=" + id_vet;
  const json = {
    content: [
      {
        id: 5,
        nombre: "mascota 1",
        id_raza: 14,
        id_pelaje: 1,
        id_sexo: 1,
        id_caracter: 1,
        nacimiento: "2021-11-07",
        peso: 44,
        chip: 123,
        deceso: 0,
        notas: "nota",
        nombre_raza: "Bichón frisé",
        nombre_pelaje: "Alazán",
        nombre_sexo: "Hembra",
        nombre_caracter: "Agresivo",
        propietarios: [
          {
            id: 7,
            nombre: "dos",
            es_principal: 1,
          },
        ],
      },
      {
        id: 6,
        nombre: "mascota 2",
        id_raza: 193,
        id_pelaje: 1,
        id_sexo: 1,
        id_caracter: 1,
        nacimiento: "2021-07-01",
        peso: 48,
        chip: 456,
        deceso: 0,
        notas: "nota",
        nombre_raza: "Aberdeen angus",
        nombre_pelaje: "Alazán",
        nombre_sexo: "Hembra",
        nombre_caracter: "Agresivo",
        propietarios: [
          {
            id: 7,
            nombre: "dos",
            es_principal: 1,
          },
        ],
      },
    ],
    page: 1,
    results_per_page: 40,
    total_results: 0,
    total_pages: 0,
  };
  callback(json);
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       callback(json);
  //     })
  //     .catch((error) => {
  //       if (errorCallback) errorCallback(error);
  //       //console.log(error);
  //     });
};

const DeletePet = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", data.token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id_mascota: data.id_mascota,
    id_veterinaria: data.id_veterinaria,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://34.95.245.77/android_doctor_vet/api/delete_mascota.php",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      callback(result);
      //console.log(result)
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
      console.log("error", error);
    });
};

const UpdatePet = (token, data, callback, errorcallback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify([
    {
      id: data.id,
      chip: data.chip,
      id_caracter: data.id_caracter,
      id_pelaje: data.id_pelaje,
      id_raza: data.id_raza,
      id_sexo: data.id_sexo,
      nacimiento: data.nacimiento,
      nombre: data.nombre,
      notas: data.notas,
      peso: data.peso,
      deceso: data.deceso,
      thumb: 0,
    },
    {
      id_veterinaria: data.id_veterinaria,
    },
    {
      es_principal: 1,
      id_propietario: data.propietarios[0].id,
    },
  ]);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://34.95.245.77/android_doctor_vet/api/update_mascota.php",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => errorcallback(error));
};

export {
  GetRace,
  GetFur,
  GetSex,
  GetCharacter,
  AddPet,
  GetPets,
  DeletePet,
  UpdatePet,
};
