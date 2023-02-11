// Public routes
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import RecoverPassword from "../pages/RecoverPassword/RecoverPassword";
// Private routes
import Preaprobado from "../pages/Preaprobado/Preaprobado";
import PerfilComercial from "../pages/InteligenciaNegocios/PerfilComercial";
import Pronostico from "../pages/InteligenciaNegocios/Pronosticos";
import PotencialesColocacion from "../pages/InteligenciaNegocios/PotencialesColocacion";
import CarteraMensual from "../pages/InteligenciaNegocios/CarteraMensual";
import EvolucionSemanal from "../pages/Inicio/EvolucionSemanal";
import AnalisisCartera from "../pages/Inicio/AnalisisCartera";
import AnalisisMora from "../pages/Inicio/AnalisisMora";
import Potenciales from "../pages/Inicio/Potenciales";
import NuevosProspectos from "../pages/PreCalificacion/NuevosProspectos";
import ParametrosPolitica from "../pages/Preaprobado/parametrosPolitica/parametrosPolitica"
//Aqui se encuentran las rutas, este proceso esta realizado para que solo debas crear una nueva carpeta en src/pages con su archivo .js lo importes aqui y lo crees en el objeto que elijas con el mismo formato que los demas,
const authProtectedRoutes = [
  {
    path: "/pre-aprobados",
    component: Preaprobado,
  },
  {
    path: "/pre-aprobados/parametros-politica",
    component: ParametrosPolitica,
  },
  {
    path: "/inteligencia-negocios/perfil-comercial",
    component: PerfilComercial,
  },
  {
    path: "/inteligencia-negocios/pronosticos",
    component: Pronostico,
  },
  {
    path: "/inteligencia-negocios/potenciales-colocacion",
    component: PotencialesColocacion,
  },
  {
    path: "/inteligencia-negocios/cartera-mensual",
    component: CarteraMensual,
  },
  {
    path: "/inicio/evolucion-semanal",
    component: EvolucionSemanal,
  },
  {
    path: "/inicio/analisis-cartera",
    component: AnalisisCartera,
  },
  {
    path: "/inicio/analisis-mora",
    component: AnalisisMora,
  },
  {
    path: "/inicio/potenciales",
    component: Potenciales,
  },
  {
    path: "/pre-calificacion/datos-cliente-nuevo",
    component: NuevosProspectos,
  },
];

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/forgot", component: ForgotPassword },
  { path: "/recover-password", component: RecoverPassword },
];

export { authProtectedRoutes, publicRoutes };
