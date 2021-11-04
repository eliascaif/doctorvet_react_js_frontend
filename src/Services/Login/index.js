import config from "../../Assets/localConfig.json";

const Login = (data, callback, errorCallback) => {
  let url = config.baseApi + "user_login_account.php";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((json) => {
      if (json.response === "INVALID_ACCOUNT_PASSWORD") {
        errorCallback(json.response);
      } else {
        callback(json);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginFacebookGoogle = (data, callback, errorCallback) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "1b845f0b84f5e8d02db992788ec8e1a2be37e11a1ace1b7ca67a5fa5c23b0b30"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: data.email,
    nombre: data.nombre,
    photo_url: null,
    device_name: "Web app",
    tipo_login: data.tipo_login,
    unique_id: data.unique_id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://34.95.245.77/android_doctor_vet/api/user_facebook_google_login.php",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      callback(result);
    })
    .catch((error) => errorCallback(error));
};

export { Login, LoginFacebookGoogle };
