import React, { useReducer } from "react";
import UsuarioContext from "./UsuarioContext";
import UsuarioReducer from "./UsuarioReducer";
import {
  CHANGE_USER,
} from "../types";
export default function PreaprobadoState(props) {
  //Estados globales actuales
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(UsuarioReducer, initialState);

  //Funciones que cambian los valores globales

  const changeUser = (value) => {
    dispatch({
      type: CHANGE_USER,
      payload: value,
    });
  };

  //EXPORTAMOS TODO ESTO,ASI EN CUALQUIER ARCHIVO DEL PROYECTO PODREMOS OBTENER ESTA INFORMACION GLOBAL
  return (
    <UsuarioContext.Provider
      value={{
        user: state.user,
        changeUser
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
}
