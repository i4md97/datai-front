import axios from "axios";
//cuando se tenga una nueva ruta del backend es tan facil como crear un nuevo caso y despues llamarlo de la forma petition_get("cedula","valores a pasar en el body").then().catch()

export default function post_user(key, value) {
  let url;
  switch (key) {
    case "cedula":
      url = "https://fapi-cp.herokuapp.com";
      break;
    case "escenarioPreeliminar":
      url = "https://fapi-cp.herokuapp.com/preapr/polic_p/escen";
      break;
    case "riesgoCic":
      url = process.env.REACT_APP_CIC_RISKS_DC;
      break;
    case "riesgoInterno":
      url = process.env.REACT_APP_INTERNAL_RISKS_DC;
      break;
    default:
      return "error";
  }
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      accept: "application/json",
    },
  };
  return axios.get(url, config);
}
