import { createContext, useContext, useState } from "react";

const PreaprobadoContext = createContext(null);

export const PreaprobadoProvider = ({children}) => {
  const [datosPersona, setDatosPersona] = useState({});
  const [actividaEconomica, setActividaEconomica] = useState({});
  const [verificacionNormativa, setVerificacionNormativa] = useState({});
  const [detallesPasivos, setDetallesPasivos] = useState({});
  const [escenarioPreliminar, setEscenarioPreliminar] = useState({});
  const [capacidadPago, setCapacidadPago] = useState({});
  const [estructuraFinanciera, setEstructuraFinanciera] = useState({});
  const [resolucion, setResolucion] = useState({});

  return (
    <PreaprobadoContext.Provider value={{
      datosPersona, setDatosPersona,
      actividaEconomica, setActividaEconomica,
      verificacionNormativa, setVerificacionNormativa,
      detallesPasivos, setDetallesPasivos,
      escenarioPreliminar, setEscenarioPreliminar,
      capacidadPago, setCapacidadPago,
      estructuraFinanciera, setEstructuraFinanciera,
      resolucion, setResolucion
    }}>
      {children}
    </PreaprobadoContext.Provider>
  )
}

export const usePreaprobado = () => useContext(PreaprobadoContext);