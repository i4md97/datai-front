import React, { useState, useContext } from 'react';

// Components
import { Collapse } from 'reactstrap';
import Person from "@material-ui/icons/Person";

// Helpers
  
import UsuarioContext from "../../../context/usuario/UsuarioContext";

const TopbarProfile = () => {
  // Handle Collapse user info
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(UsuarioContext)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="topbar__profile ml-1">
      <button type="button" className="topbar__avatar align-items-center justify-content-center px-2 pl-md-1" onClick={handleToggleCollapse}>
        <p className="topbar__avatar-name">{user && user.role}</p>
        <Person className=" ml-0 ml-md-1"/>
      </button>
      {isCollapsed && (
        <button
          type="button"
          aria-label="button collapse"
          className="topbar__back"
          onClick={handleToggleCollapse}
        />
      )}
      <Collapse isOpen={isCollapsed} className="topbar__menu-wrap">
        {user && (
          <div className="topbar__menu">
            <div className="container">
              <p className="name text-center">Hola {user.name} {user.last_name}</p>
              <p className="role">{user.role} de Cuenta Senior</p>
              <p className="email">{user.email}</p>
              <div className="topbar__menu-divider" />
              <p>Colaborador 123456</p>
            </div>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default TopbarProfile;