import { ClientProvider } from "./ClientContext";
import { SidebarProvider } from "./SidebarContext";
import { PreaprobadoProvider } from "./preaprobado/PreaprobadoContext";

const ContextProviders = ({children}) => {
  return (    
    <ClientProvider>
      <SidebarProvider>
        <PreaprobadoProvider>
          {children}
        </PreaprobadoProvider>
      </SidebarProvider>
    </ClientProvider>
  )
}

export default ContextProviders;