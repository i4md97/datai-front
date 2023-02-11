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
  CHANGE_STEP_FOUR,
  CHANGE_RIESGO,
  CHANGE_PREELIMINAR,
  CHANGE_CAPACIDAD,
  CHANGE_ESTRUCTURA,
  CHANGE_GLOBAL,
  CHANGE_SIZE_STEP

} from "../types";

//ACCIONES QUE SE EJECUTAN CON UN DISPATCH

const PreaprobadoReducer = (state, action) => {

  switch (action.type) {
    case CHANGE_FULLSCREEN:
      return {...state, full_screen: action.payload};
    case CHANGE_CEDULA:
      return {...state, cedula: action.payload};
    case CHANGE_STEP:
      return {...state, step: action.payload};
    case CHANGE_THEME:
      return {...state, theme: action.payload};
    case CHANGE_SIZE:
      return {...state, size: action.payload};
    case CHANGE_STAT_SIZE:
      return {...state, statSize: action.payload};
    case CHANGE_FONT:
      return {...state, font: action.payload};
    case CHANGE_ANIMATION:
      return {...state, animation: action.payload};
    case CHANGE_STEP_FOUR:
      return {...state, stepFourCheck: action.payload};
    case CHANGE_GLOBAL:
      return {...state, global: action.payload};
    case CHANGE_MENU:
      return {
        ...state,
        activePreaprobado: action.payload.activePreaprobado,
        activeInteligence: action.payload.activeInteligence,
        activePreCalificacion: action.payload.activePreCalificacion,
        activeInicio: action.payload.activeInicio,
        activeFormalizacion: action.payload.activeFormalizacion,
      };
    case CHANGE_RIESGO:
      return {
        ...state,
        riesgo: action.payload
      };
    case CHANGE_PREELIMINAR:
      return {
        ...state,
        escenarioPreeliminar: action.payload
      };
    case CHANGE_CAPACIDAD:
      return {
        ...state,
        capacidadPago: action.payload
      };
    case CHANGE_ESTRUCTURA:
      return {
        ...state,
        estructuraFinanciamiento: action.payload
      };
    case CHANGE_SIZE_STEP:
     
      return {
        ...state, sizeSteps: {...state.sizeSteps, [action.payload.name]: action.payload.value}
      };

    default:
      return state;
  }
};

export default PreaprobadoReducer;
