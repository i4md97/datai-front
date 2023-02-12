import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({children}) => {
  const [sidebar, setSidebar] = useState({
    inicio: false,
    inteligenciaNegocios: false,
    preaprobado: false,
    preCalificacion: false,
    formalizacion: false,
  });

  return (
    <SidebarContext.Provider value={{
      sidebar,
      setSidebar
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext);