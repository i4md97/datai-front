import React, { useState } from "react";

// Components
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

// Styles
import classNames from "classnames";

export default function Layout({
  changeColor,
  changeFont,
  font,
  animation,
  setAnimation,
  sizeFont,
  setSizeFont,
  activeStep,
  setActiveStep,
  active,
  setActive
}) {

  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const layoutClass = classNames({
    layout: true,
    'layout--collapse': isSidebarCollapsed,
  });

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(!isSidebarShown);
  };


  //ESTO NOS PERMITE QUE EN CUALQUIER LUGAR AL QUE LE APLIQUEMOS ESTO, CARGARA EL SIDEBAR Y EL TOPBAR CON TODAS SUS CONFIGURACIONES, POR DEFECTO ESTO SE ESTA USANDO EN src/routes/Route.js para todas las rutas privadas
  return (
    <div className={layoutClass}>
      <Topbar
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        changeSidebarVisibility={changeSidebarVisibility}
        
        active={active}
        setActive={setActive}
        changeFont={changeFont}
        changeColor={changeColor}
        sizeFont={sizeFont}
        setSizeFont={setSizeFont}
        setAnimation={setAnimation}
        animation={animation}
      />
      <Sidebar
        sidebarShow={isSidebarShown}
        sidebarCollapse={isSidebarCollapsed}
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}

        
        changeFont={changeFont}
        changeColor={changeColor}
        font={font}
        active={active}
        setActive={setActive}
        setAnimation={setAnimation}
        animation={animation}
        sizeFont={sizeFont}
        setSizeFont={setSizeFont}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}
