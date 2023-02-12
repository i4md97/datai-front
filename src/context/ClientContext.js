import { createContext, useContext, useState } from "react";

const ClientContext = createContext(null);

export const ClientProvider = ({children}) => {
  const [cliente, setCliente] = useState({
    interno: [],
    cic: [],
    buro: []
  });

  return (
    <ClientContext.Provider value={{
      cliente,
      setCliente
    }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useCliente = () => useContext(ClientContext);