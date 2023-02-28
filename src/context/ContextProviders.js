import { ClientProvider } from "./ClientContext";
import { SidebarProvider } from "./SidebarContext";

const ContextProviders = ({children}) => {
  return (    
    <ClientProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ClientProvider>
  )
}

export default ContextProviders;