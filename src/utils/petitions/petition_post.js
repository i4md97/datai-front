import axios from "axios";
//cuando se tenga una nueva ruta del backend es tan facil como crear un nuevo caso y despues llamarlo de la forma petition_post("cedula","valores a pasar en el body").then().catch()
export default function post_user(key, value) {
  let url;
  let data;
  switch (key) {
    case "cedulaGet":
      url = "https://fapi-cp.herokuapp.com/preapr/cedulas/";
      data = value.cedula;
      break;
    case "recommendCedula":
      url = "https://fapi-cp.herokuapp.com/preapr/recomm/";
      data = value.body;
      break;
    case "gestionesActivas":
      url = "https://fapi-cp.herokuapp.com/preapr/retrieve/";
      data = value.body;
      break;
    /*   case "savePreaprobado":
        url = "https://fapi-cp.herokuapp.com/preapr/retrieve/";
        data = {};
        break; */
    case "precalif":
      url = "https://fapi-cp.herokuapp.com/precalif/";
      data = value.body;
      break;
    case "escenario":
      url = "https://fapi-cp.herokuapp.com/preapr/policy_p/escen";
      data = value.body;
      break;
    case "estructura":
      url = "https://fapi-cp.herokuapp.com/preapr/policy_p/recalc/";
      data = value.body;
      break;
    case "global":
      url = "https://fapi-cp.herokuapp.com/preapr/policy_p/glob/";
      data = value.body;
      break;
    case "login":
      url = "https://fapi-cp.herokuapp.com/init/";
      data = value.body;
      break;
    case "updateRiesgo":
      url = "https://fapi-cp.herokuapp.com/preapr/policy_p/normat/";
      data = value.body;
      break;
    case "saveSteps":
      url = "https://fapi-cp.herokuapp.com/preapr/save/";
      data = value.body;
      break;

    default:
      return "error";
  }
  var config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  };
  return axios.post(url, data, config);
}
