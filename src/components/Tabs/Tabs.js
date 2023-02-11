import React, { useContext, useState, useEffect } from "react";

// Components 
import { Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import PreaprobadoContext from "../../context/preaprobados/PreaprobadoContext"

// Icons
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ReplayIcon from '@material-ui/icons/Replay';

export default function StepTen({ menuInicio }) {
  const { step, cedula } = useContext(PreaprobadoContext)

  const [tab, setTab] = useState({ base: "", page: "" });


  //Write component of Tabs
  useEffect(() => {
    switch (window.location.pathname) {
      case "/inteligencia-negocios/perfil-comercial":
        setTab({ base: "I. Inteligencia de Negocios", page: "Perfil Comercial" });
        break;
      case "/inteligencia-negocios/pronosticos":
        setTab({ base: "I. Inteligencia de Negocios", page: "Pronósticos" });
        break;
      case "/inteligencia-negocios/potenciales-colocacion":
        setTab({
          base: "I. Inteligencia de Negocios",
          page: "Potenciales de Colocacion",
        });
        break;
      case "/inteligencia-negocios/cartera-mensual":
        setTab({ base: "I. Inteligencia de Negocios", page: "Cartera Mensual" });
        break;
      case "/pre-calificacion/datos-cliente-nuevo":
        setTab({ base: "III. AI Score", page: "Datos cliente nuevo" });
        break;
      case "/inicio/evolucion-semanal":
        setTab({ base: "Inicio", page: "Evolución Semanal" });
        break;
      case "/inicio/analisis-cartera":
        setTab({ base: "Inicio", page: "Análisis de Cartera" });
        break;
      case "/inicio/analisis-mora":
        setTab({ base: "Inicio", page: "Análisis de Mora" });
        break;
      case "/inicio/potenciales":
        setTab({ base: "Inicio", page: "Potenciales" });
        break;
      case "/formalizacion/pre-aprobados":
        setTab({ base: "Formalizacion", page: "Pre Aprobados" });
        break;
      case "/formalizacion/pre-calificados":
        setTab({ base: "Formalizacion", page: "Pre Calificados" });
        break;
      case "/pre-aprobados/parametros-politica":
        setTab({ base: "II. Pre-Aprobados", page: "Parametros de Politica" });
        break;
      case "/pre-aprobados":
        let value;
        switch (step + 1) {
          case 1:
            value = "Datos personales";
            break;
          case 2:
            value = "Actividad Economica";
            break;
          case 3:
            value = "Verificacion de Normativa";
            break;
          case 4:
            value = "Detalles de Pasivos";
            break;
          case 5:
            value = "Escenario Preliminar";
            break;
          case 6:
            value = "Capacidad de Pago";
            break;
          case 7:
            value = "Estructura de Financiamiento";
            break;
          case 8:
            value = "Resolucion";
            break;
          default:
            break;
        }

        setTab({ base: "II. Pre-Aprobados", page: value });
        break;
      default:
        break;
    }
  }, [step]);


  return (
    <Col>
      <div className="d-flex align-items-center justify-content-between">
        <Breadcrumb className="datai-breadcrumbs" style={{ fontSize: "0.95rem", margin: "0 !important" }}>
          <BreadcrumbItem active>BR</BreadcrumbItem>
          <BreadcrumbItem active>{tab.base}</BreadcrumbItem>
          <BreadcrumbItem>{tab.page}</BreadcrumbItem>
        </Breadcrumb>
        <div className="global-icons d-flex position-relative">
          {cedula && window.location.pathname === "/pre-aprobados" && (
            <>
              <div>
                {cedula.personal_data.nom_compl}
                <span className="px-2"> / </span>
                {cedula.cedula}
              </div>
            </>
          )}
          {window.location.pathname.split("/")[1] === "inicio" && (
            <>
              <div
                /*   onClick={() => { menuInicio.setMenuInicio(!menuInicio.menuInicio) }} */
                className="mx-1"
                style={{
                  // position: "absolute",
                  // right: "40px",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                <ReplayIcon />
              </div>
              <div
                onClick={() => { menuInicio.setMenuInicio(!menuInicio.menuInicio) }}
                className="mx-1"
                style={{
                  // position: "absolute",
                  // right: "10px",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                <MenuOpenIcon />
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="top-hr m-0 mb-2" />
      <div className="tab-title" >
          <h2>{tab.page}</h2>
      </div>
    </Col>
  );
}
