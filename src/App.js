import {authProtectedRoutes, publicRoutes} from "./routes";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Route from "./routes/Route";
import "./App.css";

import PreaprobadoState from "./context/preaprobados/PreaprobadoState";
import UsuarioState from "./context/usuario/UsuarioState";

import NotFound from "./pages/NotFound/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/app.scss";

//Aqui inicia la app, si te das cuenta aqui estamos montando las rutas que se encuentran en la carpeta src/routes/index y un componente Route que estamos reutilizando con todas las configuraciones

function App() {
  return (
    <UsuarioState> 
      <PreaprobadoState>
            <Router>
              <Switch>
                {publicRoutes.map((element, i) => (
                  <Route
                    exact
                    key={i}
                    path={element.path}
                    component={element.component}
                  />
                ))}
                {authProtectedRoutes.map((element, i) => (
                  <Route
                    layout={true}
                    exact
                    key={i}
                    path={element.path}
                    component={element.component}
                  />
                ))}
                <Route 
                  path="*"
                  component={NotFound}
                />
              </Switch>
            </Router>
      </PreaprobadoState>
    </UsuarioState>
  );
}

export default App;
