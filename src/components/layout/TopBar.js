import React, { useState, useContext } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import MenuIcon from "@material-ui/icons/Menu";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { useHistory } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import UsuarioContext from "../../context/usuario/UsuarioContext";
import MenuSettings from "../../components/MenuOptions/MenuSettings"
export default function TopBar({
  active,
  setActive,
  changeColor,
  changeFont,
  animation,
  setAnimation,
  sizeFont,
  setSizeFont, }) {
  const { user } = useContext(UsuarioContext)
  const [collapse, setCollapse] = useState(false);
  const [settingsActive, setSettinsActive] = useState(false)
  const history = useHistory();


  return (
    <div className="topbar py-2" style={{display: "flex", alignItems: "center",justifyContent: "space-between",}}>
      <MenuSettings
        setSizeFont={setSizeFont}
        sizeFont={sizeFont}
        changeColor={changeColor}
        changeFont={changeFont}
        animation={animation}
        setAnimation={setAnimation}
        settingsActive={settingsActive}
      />

      <div className="d-flex align-items-center">
        <button
          type="submit"
          className="step__card topbar__menu2"
          onClick={() => {setActive(!active);}}
        >
          <MenuIcon style={{ fontSize: "2rem" }} />
        </button>
        <h4 className="pl-3 topbar-settings" style={{ fontSize: "1.5rem", alignContent: "center" }}>
          BRISK
        </h4>
      </div>

      <div className="topbar-settings">

        <SettingsIcon onClick={() => { setSettinsActive(!settingsActive) }} style={{ fontSize: "1.7rem", cursor: "pointer" }} />

        {user && <div style={{ border: "1px solid white", display: "flex", alignItems: "center", padding: "0 0.5rem", borderRadius: "5px", margin: "0 1rem" }}> {user.role} </div>}

        {user && <Dropdown isOpen={collapse}>

          <DropdownToggle caret> </DropdownToggle>
          <PermIdentityIcon
            onClick={() => {
              setCollapse(!collapse);
            }}
            style={{ fontSize: "1.7rem", cursor: "pointer" }}
          />
          <DropdownMenu>
            <DropdownItem
              text
              className="text-center"
              style={{ borderRadius: "10px", background: "white" }}
            >
              Hola {user.name} {user.last_name}!
            </DropdownItem>
            <DropdownItem header>{user.role} de Cuenta Senior</DropdownItem>
            <DropdownItem header>{user.email}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem text>Colaborador: 123-456</DropdownItem>
          </DropdownMenu>
        </Dropdown>}

        <button
          onClick={() => {
            history.push("/");
          }}
          className="btn-topbar"
        >
          SALIR
        </button>
      </div>

    </div>
  );
}
