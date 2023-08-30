import React, { useState, useEffect } from 'react';

import { useSidebar } from '../../../context/SidebarContext';

import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import classNames from 'classnames';

const SidebarCategory = ({
  title, icon, isNew, children, sidebarCollapse, keyItem
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryClass = classNames({
    'sidebar__category-wrap': true,
    'sidebar__category-wrap--open': isOpen,
  });

  const {sidebar, setSidebar} = useSidebar();

  useEffect(() => {
    if (sidebar && keyItem) {
      switch (keyItem) {
        case "inicio":
          setIsOpen(sidebar.inicio);
          break;
        case "inteligenciaNegocios":
          setIsOpen(sidebar.inteligenciaNegocios);
          break;
        case "preaprobado":
          setIsOpen(sidebar.preaprobado);
          break;
        case "preCalificacion":
          setIsOpen(sidebar.preCalificacion);
          break;
        case "formalizacion":
          setIsOpen(sidebar.formalizacion);
          break;
      
        default:
          break;
      }
    }
  }, [sidebar, keyItem]);

  const toggleCollapse = () => {
    setIsOpen(prev => !prev);
    switch (keyItem) {
      case "inicio":
        setSidebar(prev => ({...prev, inicio: !isOpen}));
        break;
      case "inteligenciaNegocios":
        setSidebar(prev => ({...prev, inteligenciaNegocios: !isOpen}));
        break;
      case "preaprobado":
        setSidebar(prev => ({...prev, preaprobado: !isOpen}));
        break;
      case "preCalificacion":
        setSidebar(prev => ({...prev, preCalificacion: !isOpen}));
        break;
      case "formalizacion":
        setSidebar(prev => ({...prev, formalizacion: !isOpen}));
        break;
      default:
        break;
    }
  }

  return (
    <div className={categoryClass}>
      <button className="sidebar__link sidebar__category align-items-center" type="button" onClick={toggleCollapse}>
        <span className="sidebar__category-svg">
          {icon && icon() }
        </span>
        <p className="sidebar__link-title">{title}
          {isNew && <span className="sidebar__category-new" />}
        </p>
        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <Collapse isOpen={sidebarCollapse} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>
            {children}
          </div>
        </ul>
      </Collapse>
    </div>
  );
};

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  sidebarCollapse: PropTypes.bool.isRequired,
  isNew: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

SidebarCategory.defaultProps = {
  icon: null,
  isNew: false,
};

export default SidebarCategory;