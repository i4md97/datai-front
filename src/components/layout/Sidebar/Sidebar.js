import React, { useContext, useEffect, useState} from 'react';

// import Scrollbar from 'react-smooth-scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SidebarContent from './SidebarContent';

// Helpers
import PreaprobadoContext from '../../../context/preaprobados/PreaprobadoContext';

const Sidebar = ({
  changeMobileSidebarVisibility,
  sidebarShow,
  sidebarCollapse,
  active,
  setActive,
  changeColor,
  changeFont,
  animation,
  setAnimation,
  sizeFont,
  setSizeFont,
  activeStep,
  setActiveStep,
}) => {

  const [ajustes, setAjustes] = useState(false);
  const [optionSelect, setOptionSelect] = useState("");

  const { step } = useContext(PreaprobadoContext);
  useEffect(() => {
    switch (window.location.pathname) {

      case "/inteligencia-negocios/pronosticos":
        setOptionSelect("/inteligencia-negocios/pronosticos");
        break;

      case "/inteligencia-negocios/perfil-comercial":
        setOptionSelect("/inteligencia-negocios/perfil-comercial");
        break;
      case "/inteligencia-negocios/potenciales-colocacion":
        setOptionSelect("/inteligencia-negocios/potenciales-colocacion");
        break;
      case "/inteligencia-negocios/cartera-mensual":
        setOptionSelect("/inteligencia-negocios/cartera-mensual");
        break;

      case "/pre-aprobados":
        setOptionSelect(activeStep);
        break;
      case "/pre-aprobados/parametros-politica":
        setOptionSelect("/pre-aprobados/parametros-politica");
        break;
      case "/pre-calificacion/nuevos-prospectos":
        setOptionSelect("/pre-calificacion/nuevos-prospectos");
        break;
      case "/inicio/evolucion-semanal":
        setOptionSelect("/inicio/evolucion-semanal");

        break;
      case "/inicio/analisis-cartera":
        setOptionSelect("/inicio/analisis-cartera");

        break;
      case "/inicio/analisis-mora":
        setOptionSelect("/inicio/analisis-mora");

        break;
      case "/inicio/potenciales":
        setOptionSelect("/inicio/potenciales");

        break;

      default:
        break;
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/pre-aprobados") {
      setOptionSelect(step);
      setActiveStep(step);
    }
    //eslint-disable-next-line
  }, [activeStep, step]);

  const sidebarClass = classNames({
    sidebar: true,
    'sidebar--show': sidebarShow,
    'sidebar--collapse': sidebarCollapse,
  });

  return (
    <div className={sidebarClass}>
      <button
        type="button"
        aria-label="sidebar visibility"
        className="sidebar__back"
        onClick={changeMobileSidebarVisibility}
      />
      <div className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent
            onClick={() => {}}
            sidebarCollapse={sidebarCollapse}

            setSizeFont={setSizeFont}
            sizeFont={sizeFont}
            changeColor={changeColor}
            changeFont={changeFont}
            animation={animation}
            setAnimation={setAnimation}
            setActive={setActive}
            ajustes={ajustes}
            setAjustes={setAjustes}
            setOptionSelect={setOptionSelect}
            optionSelect={optionSelect}
            setActiveStep={setActiveStep}
            active={active}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}

            setSizeFont={setSizeFont}
            sizeFont={sizeFont}
            changeColor={changeColor}
            changeFont={changeFont}
            animation={animation}
            setAnimation={setAnimation}
            setActive={setActive}
            ajustes={ajustes}
            setAjustes={setAjustes}
            setOptionSelect={setOptionSelect}
            optionSelect={optionSelect}
            setActiveStep={setActiveStep}
            active={active}
          />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarShow: PropTypes.bool.isRequired,
  sidebarCollapse: PropTypes.bool.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
};

export default Sidebar;