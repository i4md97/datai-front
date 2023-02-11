import React, { useContext, useState } from "react";
// import ReactDOM from "react-dom";

// Components
import { Card, CardBody } from "reactstrap";
import Select from "react-select";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";

// Helpers
import PreaprobadoContext from "../../context/preaprobados/PreaprobadoContext";

// Styles
import "./MenuSettings.scss";

const MenuSettings = ({
  changeColor,
  animation,
  setAnimation,
  changeFont,
  sizeFont,
  setSizeFont,
}) => {
  const { font: fontContext, theme: themeContext } = useContext(PreaprobadoContext);

  const [show, setShow] = useState(false);

  const options = [
    { value: "light", label: "White" },
    { value: "dark", label: "Dark" },
    { value: "normal", label: "Normal" },
    { value: "blueNew", label: "Blue" },
    // { value: "new", label: "Blue Opacity" },
    // { value: "blue", label: "Blue" },
    // { value: "blueWhite", label: "BlueWhite" },
  ];
  const options2 = [
    { value: "barlow", label: "Barlow" },
    { value: "barlow-condensed", label: "Barlow-condensed" },
    { value: "barlow-semi", label: "Barlow-semi" },
    { value: "open-sand", label: "Open-sand" },
    { value: "pt-sans", label: "Pt-sans" },
    { value: "default", label: "Default" },
    { value: "abel", label: "Abel" },
  ];

  /* const BackDrop = () => {
		return <div className={`backdrop${show ? ' show' : ''}`} onClick={() => setShow(prev => !prev)}></div>
	} */

  const SidebarOverlay = () => {
    return (
      <div className={`${show ? "menuOn" : "menuOff"} menuSettings`}>
        <div className=" row m-0 p-0 ">
          <div className="col-12 p-0 ">
            <Card className="w-100">
              <CardBody>
                <div>
                  <p htmlFor="" className="label__dropdown pb-1 py-2">
                    Animations
                  </p>
                  <Switch
                    onChange={() => {
                      setAnimation((prev) => !prev);
                    }}
                    checked={animation}
                    color="primary"
                    className="mui-switch"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />

                  <p htmlFor="" className="label__dropdown">
                    Temas
                  </p>
                  <Select
                    onChange={(e) => {
                      changeColor(e.value);
                    }}
                    placeholder={
                      options.find((element) => element.value === themeContext)
                        .label
                    }
                    options={options}
                  />

                  <p htmlFor="" className="label__dropdown">
                    Letras
                  </p>
                  <Select
                    onChange={(e) => {
                      changeFont(e.value);
                    }}
                    placeholder={
                      options2.find((element) => element.value === fontContext)
                        .label
                    }
                    options={options2}
                  />

                  <p htmlFor="" className="label__dropdown">
                    Tamaño
                  </p>
                  <input
                    type="number"
                    value={sizeFont}
                    onChange={(e) => {
                      setSizeFont(e.target.value);
                    }}
                    className="form-control "
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <button
          className="topbar__btn d-flex p-2 m-0 justify-content-center align-items-center"
          onClick={() => setShow((prev) => !prev)}
        >
          <SettingsIcon className="m-0" />
        </button>
      </div>

      {/* <BackDrop /> */}
      <SidebarOverlay />
      {/* {ReactDOM.createPortal(
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				document.getElementById('overlay-root')
			)} */}
    </>
  );
};

export default MenuSettings;