import {
CHANGE_USER
  } from "../types";
  
  //ACCIONES QUE SE EJECUTAN CON UN DISPATCH
  
  const UsuarioReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_USER:
        return {...state, user: action.payload};
    
  
      default:
        return state;
    }
  };
  
  export default UsuarioReducer;
  