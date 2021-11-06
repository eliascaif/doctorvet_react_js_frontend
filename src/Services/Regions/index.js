import config from "../../Assets/localConfig.json";
const GetRegions = (token, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  //callback([{nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}, {nombre:'vet 1', email:'asd@asd.dsa', id:'1'}])
  // const demo = {
  //   content: [
  //     {
  //       id: 719,
  //       nombre_region: "Argentina",
  //     },
  //     {
  //       id: 7,
  //       nombre_region: "Almirante Brown / Buenos Aires / Argentina",
  //     },
  //     {
  //       id: 17,
  //       nombre_region: "Avellaneda / Buenos Aires / Argentina",
  //     },
  //     {
  //       id: 28,
  //       nombre_region: "Bahía Blanca / Buenos Aires / Argentina",
  //     },
  //   ],
  // };

  // callback(demo.content);

  let url = config.baseApi + "regiones.php?format=search";

  fetch(url, requestOptions)
    .then((response) => {
      console.log("response");
      return response.json();
    })
    .then((json) => {
      console.log("then");
      callback(json);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
};

export { GetRegions };
