import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

// Icons
import HomeIcon from "./../../_icons/HomeIcon";
import AtomIcon from "./../../_icons/AtomIcon";
import CheckIcon from "./../../_icons/CheckIcon";
import ThubmsupIcon from "./../../_icons/ThumbsupIcon";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import { useSidebar } from "../../../context/SidebarContext";

const SidebarContent = ({
  onClick,
  sidebarCollapse,
  // active,
  // setActive,
  // ajustes,
  // setAjustes,
  setActiveStep,
  setOptionSelect,
  optionSelect,

}) => {

  const {
    changeStep,
    // changeMenu,
    // activePreCalificacion,
    // activePreaprobado,
    // activeInteligence,
    // activeInicio,
    // activeFormalizacion
  } = useContext(PreaprobadoContext);

  const { user } = useContext(UsuarioContext);

  /* const openMenu = (activePreCalificacion, activeInteligence, activePreaprobado, activeFormalizacion, activeInicio) => {
    changeMenu({
      activePreCalificacion: activePreCalificacion,
      activeInteligence: activeInteligence,
      activePreaprobado: activePreaprobado,
      activeFormalizacion: activeFormalizacion,
      activeInicio: activeInicio,
    });

    setActive(true);
    setAjustes(false);
  } */

  const preaprobadoClickHandler = (option) => {
    setOptionSelect(option);
    setActiveStep(option);
    changeStep(option);
  }

  const {sidebar} = useSidebar();

  const checkCollapse = (key) => {
    switch (key) {
      case "inicio":
        return sidebar.inicio
      case "inteligenciaNegocios":
        return sidebar.inteligenciaNegocios
      case "preaprobado":
        return sidebar.preaprobado
      case "preCalificacion":
        return sidebar.preCalificacion
      case "formalizacion":
        return sidebar.formalizacion
      default:
        break;
    }
  }

  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarCategory title="Inicio" icon={HomeIcon} sidebarCollapse={checkCollapse("inicio")} keyItem={"inicio"}>
          <SidebarLink title="Evolución Semanal" route="/inicio/evolucion-semanal" onClick={onClick} />
          <SidebarLink title="Análisis de Cartera" route="/inicio/analisis-cartera" onClick={onClick} />
          <SidebarLink title="Análisis de Mora" route="/inicio/analisis-mora" onClick={onClick} />
          <SidebarLink title="Potenciales" route="/inicio/potenciales" onClick={onClick} />
        </SidebarCategory>
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory title="Inteligencia de Negocios" icon={AtomIcon} sidebarCollapse={checkCollapse("inteligenciaNegocios")} keyItem={"inteligenciaNegocios"}>
          <SidebarLink title="Perfil Comercial" route="/inteligencia-negocios/perfil-comercial" onClick={onClick} />
          <SidebarLink title="Pronósticos" route="/inteligencia-negocios/pronosticos" onClick={onClick} />
          <SidebarLink title="Potenciales de Colocaciones" route="/inteligencia-negocios/potenciales-colocacion" onClick={onClick} />
          <SidebarLink title="Cartera Mensual" route="/inteligencia-negocios/cartera-mensual" onClick={onClick} />
        </SidebarCategory>
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory title="Pre-Aprobado" icon={CheckIcon} sidebarCollapse={checkCollapse("preaprobado")} keyItem={"preaprobado"}>
          {user && user.role !== "Gerente" ? 
            <>
              <SidebarLink title="Datos Personales" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(0)} option={0} optionSelect={optionSelect} />
              <SidebarLink title="Actividad Económica" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(1)} option={1} optionSelect={optionSelect} />
              <SidebarLink title="Verificación de Normativa" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(2)} option={2} optionSelect={optionSelect} />
              <SidebarLink title="Detalles de Pasivos" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(3)} option={3} optionSelect={optionSelect} />
              <SidebarLink title="Escenario Preliminar" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(4)} option={4} optionSelect={optionSelect} />
              <SidebarLink title="Capacidad de Pago" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(5)} option={5} optionSelect={optionSelect} />
              <SidebarLink title="Estructura de Financiamiento" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(6)} option={6} optionSelect={optionSelect} />
              <SidebarLink title="Resolución" route={"/pre-aprobados"} onClick={() => preaprobadoClickHandler(7)} option={7} optionSelect={optionSelect} />
            </> 
            : <SidebarLink title="Parametros de Politica" route={"/pre-aprobados/parametros-politica"} onClick={onClick} />
          }
        </SidebarCategory>
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory title="AI Score" icon={ThubmsupIcon} sidebarCollapse={checkCollapse("preCalificacion")} keyItem={"preCalificacion"}>
          <SidebarLink title="Datos cliente nuevo" route="/pre-calificacion/datos-cliente-nuevo" onClick={onClick} />
        </SidebarCategory>
      </ul>
    </div>
  )
}

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
  sidebarCollapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  sidebarCollapse: false,
};

export default SidebarContent;