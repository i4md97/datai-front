import React, { useReducer } from "react";
import PreAprobadoContext from "./PreaprobadoContext";
import PreAprobadoReducer from "./PreaprobadoReducer";
import {
  CHANGE_CEDULA,
  CHANGE_THEME,
  CHANGE_FONT,
  CHANGE_SIZE,
  CHANGE_STAT_SIZE,
  CHANGE_ANIMATION,
  CHANGE_STEP,
  CHANGE_FULLSCREEN,
  CHANGE_MENU,
  CHANGE_RIESGO,
  CHANGE_PREELIMINAR,
  CHANGE_STEP_FOUR,
  CHANGE_CAPACIDAD,
  CHANGE_ESTRUCTURA,
  CHANGE_GLOBAL,
  CHANGE_SIZE_STEP
} from "../types";
import StepTen from "../../pages/Preaprobado/Steps/StepTen";

export default function PreaprobadoState(props) {
  const theme = localStorage.getItem('_theme');
  //Estados globales actuales
  const initialState = {
    cedula: null,
    step: 0,
    theme: theme ? theme : "light",
    font: "barlow-semi",
    size: "14",
    statSize: "2",
    sizeSteps: {},
    animation: true,
    full_screen: false,
    activePreaprobado: false,
    activeInteligence: false,
    activeFormalizacion: false,
    activePreCalificacion: false,
    activeInicio: false,
    stepFourCheck: [],
    riesgo: {},
    escenarioPreeliminar: {
      default: {
        mes_mto_max: "",
        ref_plazo: "",
        ref_tasa: "",
        sf_mto_max: "",
        tc_plazo: "",
        tc_tasa: "",
      }
    },
    capacidadPago: {},
    estructuraFinanciamiento: {
      default: {
        recalc_tasa: "",
        recalc_plazp: "",
        global: {
          sf_mto_max: 0,
          mes_mto_max: 0,
        }
      }
    }
  };

  const [state, dispatch] = useReducer(PreAprobadoReducer, initialState);

  //Funciones que cambian los valores globales
  const changeFullscreen = (value) => {
    dispatch({
      type: CHANGE_FULLSCREEN,
      payload: value,
    });
  };
  const changeMenu = (value) => {
    dispatch({
      type: CHANGE_MENU,
      payload: value,
    });
  };

  const changeCedula = (value) => {
    dispatch({
      type: CHANGE_CEDULA,
      payload: value,
    });
  };
  const changeStep = (value) => {
    dispatch({
      type: CHANGE_STEP,
      payload: value,
    });
  };
  const changeTheme = (value) => {
    dispatch({
      type: CHANGE_THEME,
      payload: value,
    });
  };
  const changeFont = (value) => {
    dispatch({
      type: CHANGE_FONT,
      payload: value,
    });
  };
  const changeSize = (value) => {
    dispatch({
      type: CHANGE_SIZE,
      payload: value,
    });
  };
  const changeStatSize = (value) => {
    dispatch({
      type: CHANGE_STAT_SIZE,
      payload: value,
    });
  };
  const changeAnimation = (value) => {
    dispatch({
      type: CHANGE_ANIMATION,
      payload: value,
    });
  };
  const changeStepFourCheck = (value) => {
    dispatch({
      type: CHANGE_STEP_FOUR,
      payload: value,
    });
  };
  const changeRiesgo = (value) => {
    dispatch({
      type: CHANGE_RIESGO,
      payload: value,
    });
  };
  const changeEscenarioPreeliminar = (value) => {
    dispatch({
      type: CHANGE_PREELIMINAR,
      payload: value,
    });
  };
  const changeCapacidadPago = (value) => {
    dispatch({
      type: CHANGE_CAPACIDAD,
      payload: value,
    });
  };
  const changeEstructuraFinanciamiento = (value) => {
    dispatch({
      type: CHANGE_ESTRUCTURA,
      payload: value,
    });
  };
  const changeGlobal = (value) => {
    dispatch({
      type: CHANGE_GLOBAL,
      payload: value,
    });
  };
  const changeSizeStep = (value) => {
    dispatch({
      type: CHANGE_SIZE_STEP,
      payload: value,
    });
  };

  //EXPORTAMOS TODO ESTO,ASI EN CUALQUIER ARCHIVO DEL PROYECTO PODREMOS OBTENER ESTA INFORMACION GLOBAL
  return (
    <PreAprobadoContext.Provider
      value={{
        estructuraFinanciamiento: state.estructuraFinanciamiento,
        escenarioPreeliminar: state.escenarioPreeliminar,
        capacidadPago: state.capacidadPago,
        cedula: state.cedula,
        step: state.step,
        theme: state.theme,
        size: state.size,
        statSize: state.statSize,
        sizeSteps: state.sizeSteps,
        animation: state.animation,
        font: state.font,
        riesgo: state.riesgo,
        stepFourCheck: state.stepFourCheck,
        full_screen: state.full_screen,
        activePreCalificacion: state.activePreCalificacion,
        activeInteligence: state.activeInteligence,
        activePreaprobado: state.activePreaprobado,
        activeInicio: state.activeInicio,
        activeFormalizacion: state.activeFormalizacion,
        global: state.global,
        changeCedula,
        changeStep,
        changeTheme,
        changeFont,
        changeSize,
        changeStatSize,
        changeAnimation,
        changeFullscreen,
        changeMenu,
        changeStepFourCheck,
        changeRiesgo,
        changeEscenarioPreeliminar,
        changeCapacidadPago,
        changeEstructuraFinanciamiento,
        changeGlobal, changeSizeStep
      }}
    >
      {props.children}
    </PreAprobadoContext.Provider>
  );
}
