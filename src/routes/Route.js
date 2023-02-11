import React, { useState, useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

// Components
import { Container, Row} from "reactstrap";
import Layout from "../components/layout/Layout";
import Tabs from "../components/Tabs/Tabs";

// import styled from "styled-components";
import logo from "../assets/images/logo.png";


//Context
import PreaprobadoContext from "../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../context/usuario/UsuarioContext";

//Styles for FontSize - Gestiona el cambio de el tamano y estilos muy precisos que no permite css
// const SizeFont = styled.div`
//   th,
//   .font-card,
//   .dashboard__total-stat {
//     font-size: ${(props) => (props.size ? `${props.size}px` : "17px")};
//     text-transform: uppercase;
//     color: black !important;
//   }
//   td {
//     color: #646777 !important;
//     font-size: 15px;
//     border: none;
//   }
// `;

export default function Router({ component: Component, layout, path, ...rest }) {
  //Global Data - Vienen de src/context
  const {
    theme: themeContext,
    size: sizeContext,
    animation: animationContext,
    font: fontContext,
    changeSize,
    changeFont: changeFontContext,
    changeAnimation,
    changeTheme,
  } = useContext(PreaprobadoContext);
  const { user } = useContext(UsuarioContext);

  const history = useHistory();
  //States
  const [color, setColor] = useState(themeContext);
  const [font, setFont] = useState(fontContext);
  const [animation, setAnimation] = useState(animationContext);
  const [sizeFont, setSizeFont] = useState(sizeContext);
  const [activeStep, setActiveStep] = useState(0);
  const [active, setActive] = useState(true);
  const [menuInicio, setMenuInicio] = useState(false)



  //Change Color Theme
  const changeColor = (value) => {
    setColor(value);
    changeTheme(value);
    localStorage.setItem('_theme', value);
  };

  //Change Type of Font
  const changeFont = (value) => {
    setFont(value);
    changeFontContext(value);
  };

  //Change Switf of Animation
  useEffect(() => {
    changeAnimation(animation);
    //eslint-disable-next-line
  }, [animation]);

  //Change Size of Font
  useEffect(() => {
    changeSize(sizeFont);
    //eslint-disable-next-line
  }, [sizeFont]);


  //Get Initial Switch Sidebar
  useState(() => {
    if (window.innerWidth < 768) {
      setActive(false);
    }

    //Redirect to login
    if (layout && !user) history.push("/");

  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {layout ? (
              /* If Private Route */
              <div
                className={`theme-${color} font-${font} ltr-support`}
                dir="ltr"
              >
                <Layout
                  active={active}
                  setActive={setActive}
                  changeColor={changeColor}
                  changeFont={changeFont}
                  font={font}
                  animation={animation}
                  setAnimation={setAnimation}
                  sizeFont={sizeFont}
                  setSizeFont={setSizeFont}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />


                <div className="container__wrap">
                  <Container>
                    <Row className="top-tabs">
                      <Tabs menuInicio={{ menuInicio, setMenuInicio }} />
                    </Row>
                    <Component
                      animation={animation}
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      menuInicio={menuInicio}
                      {...props}
                    />
                  </Container>
                </div>
                <div className="logo text-left footer">
                  <div className="d-flex pr-4 mb-3 justify-content-end align-items-center">
                      <span>Powered by: </span>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="http://www.datai.ai/"
                      >
                        <img
                          className="img-fluid"
                          style={{ cursor: "pointer" }}
                          src={logo}
                          alt="Logo Datai"
                        />
                      </a>
                  </div>
                </div>
                
              </div>
            ) : (
              <div className={`theme-${color} font-${font}`}>
                <div className="container__wrap p-0">
                  <Component {...props} />
                </div>
              </div>
            )}
          </>
        );
      }}
    ></Route>
  );
}
