import React, { useState, useEffect, useContext } from "react";

// Helpers
import Html2Pdf from "js-html2pdf";

// Context
import PreaprobadoContext from "../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../context/usuario/UsuarioContext";

// Services
import petition_post from "../../utils/petitions/petition_post";


// Components
import { Container, Row, Col, Tooltip } from "reactstrap";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import CustomTooltip from "./CustomTooltip";
import Loading from "../../components/Loading/Loading"
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import StepSeven from "./Steps/StepSeven";
import StepEight from "./Steps/StepEight";
import StepNine from "./Steps/StepNine";
import StepTen from "./Steps/StepTen";

// icons
import PersonIcon from "@material-ui/icons/Person";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import GavelOutlinedIcon from "@material-ui/icons/GavelOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import logo from "../../assets/images/logo.png";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastConfig from "../../utils/toastConfig.json";

//Modal
import MensajeModal from "./MensajeModal/MensajeModal";
import PdfHeader from "../../components/PdfHeader/PdfHeader";
// import { setIn } from "formik";

// Styles
import "./Preaprobado.scss";

/* Icons of Steps */
function ColorlibStepIcon(props) {
  const icons = {
    1: <PersonIcon />,
    2: <EqualizerIcon />,
    3: <GavelOutlinedIcon />,
    4: <SearchOutlinedIcon />,
    5: <AssignmentTurnedInOutlinedIcon />,
    6: <HomeOutlinedIcon />,
    7: <AssignmentOutlinedIcon />,
    8: <CheckOutlinedIcon />,
  };

  return <div>{icons[String(props.icon)]}</div>;
}

export default function Preaprobado({ animation, activeStep, setActiveStep }) {
  //States
  const {
    cedula,
    changeCedula,
    changeStep,
    riesgo,
    stepFourCheck,
    escenarioPreeliminar,
    changeStepFourCheck,
    changeEscenarioPreeliminar,
  } = useContext(PreaprobadoContext);
  const { user } = useContext(UsuarioContext);
  const [activeSticky, setActiveSticky] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRecommend, setLoadingRecommed] = useState(false);
  const [inputCedula, setInputCedula] = useState("");
  const [showAllSteps, setShowAllSteps] = useState(false);

  const [gestionesActivas, setGestionesActivas] = useState([]);

  toast.configure();

  /* Population of Cedula */
  const handleChange = (cedulaRecomendada) => {
    let inputCedulaCopy = cedulaRecomendada || inputCedula;

    setInputCedula(inputCedulaCopy);

    if (!cedulaRecomendada) setLoading(true);

    if (inputCedulaCopy.trim() === "") {
      setLoading(false);
      changeCedula(null);
      return toast.error("Ingresa un numero de cedula", toastConfig);
    }

    petition_post("cedulaGet", { cedula: { cedula: inputCedulaCopy } })
      .then((result) => {
        changeCedula({ ...result.data, cedula: inputCedulaCopy });
        setLoading(false);
        setLoadingRecommed(false);
        changeStepFourCheck([]);
        changeEscenarioPreeliminar({ default: escenarioPreeliminar.default });

        toast.success("Cedula encontrada", toastConfig);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error al encontrar la cedula.", toastConfig);
      });
  };

  const handleChangeRecommend = () => {
    setLoadingRecommed(true);
    petition_post("recommendCedula", { body: { user } })
      .then((result) => {
        const cedulaRecomendada = result.data;
        setInputCedula(cedulaRecomendada);
        handleChange(cedulaRecomendada);
      })

      .catch((error) => {
        console.log(error)
        console.log(error.response)
        setLoading(false);
        toast.error("Error al recomendar una cedula.", toastConfig);
      });
  };

  /* Number of Steps */
  const STEP = [
    { id: "step-1", prueba: "Step 1", tooltipText: "Datos Personales" },
    { id: "step-2", prueba: "Step 2", tooltipText: "Actividad Económica" },
    { id: "step-3", prueba: "Step 3", tooltipText: "Verificación de Normativa" },
    { id: "step-4", prueba: "Step 4", tooltipText: "Detalles de Pasivos" },
    { id: "step-5", prueba: "Step 5", tooltipText: "Escenario Preliminar" },
    { id: "step-6", prueba: "Step 6", tooltipText: "Capacidad de Pago" },
    { id: "step-7", prueba: "Step 7", tooltipText: "Estructura de Financiamiento" },
    { id: "step-8", prueba: "Step 8", tooltipText: "Resolución" },
  ];

  const downloadPDF = () => {
    setShowAllSteps(true);
    setTimeout(() => {
      var options = {
        filename: "my-file.pdf",
      };
      var exporter = new Html2Pdf(document.getElementById("prueba"), options);

      exporter.getPdf(true).then((pdf) => {
        setShowAllSteps(false);
      });

    }, 500)


  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showAllSteps])

  useEffect(() => {
    if (user && user.role === "Ejecutivo") {
      petition_post("gestionesActivas", { body: { user } })
        .then((result) => {
          setGestionesActivas(result.data);
        })
        .catch((error) => {
          setLoading(false);

          toast.error("Error al encontrar la cedula.", toastConfig);
        });
    }

    let active = false;

    /* Steps Respondive  */
    const viewScreen = () => {
      if (window.scrollY > 40 && !active) {
        active = true;
        setActiveSticky(true);
      } else if (window.scrollY < 40 && active) {
        active = false;
        setActiveSticky(false);
      }

    };
    window.addEventListener("scroll", viewScreen);
    return () => {
      window.removeEventListener("scroll", viewScreen);
    };
  }, []);

  return (
    <Row>
      <Container fluid={true} className="preaprobado" >
        <MensajeModal
          activeStep={activeStep}
          modal={modal}
          setModal={setModal}
        />
        <Row className="step-row d-none d-md-block">
          <Col className={`d-flex align-items-center justify-content-center pt-0 ${cedula && `cedula`} ${activeSticky && "step__sticky-active"}`} >
            <div className={`arrow-left d-none d-lg-block${activeStep === 0 ? ' not-show' : ''}`}>
              <ArrowBackIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (activeStep > 0) {
                    changeStep(activeStep - 1);
                    setActiveStep(activeStep - 1);
                    window.scrollTo(0, 0);
                  }
                }}
              />
            </div>
            <Stepper alternativeLabel activeStep={activeStep}>
              {STEP.map((element, i) => (
                <Step key={`step-key-${i}`} id={element.id} >
                  <StepLabel
                    onClick={() => {changeStep(i); setActiveStep(i); window.scrollTo(0, 0);}}
                    style={{ cursor: "pointer" }}
                    StepIconComponent={ColorlibStepIcon}
                    className={`step-color ${activeStep >= i && "activeStep"}  ${i === activeStep && `activeStepFinish`}`}
                  />
                  <CustomTooltip id={element.id} tooltipText={element.tooltipText} />
                </Step>
              ))}

            </Stepper>
            <div className={`arrow-right d-none d-lg-block${activeStep === STEP.length - 1 ? ' not-show' : ''}`}>
              <ArrowForwardIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (activeStep < 7) {
                    changeStep(activeStep + 1);
                    setActiveStep(activeStep + 1);
                    window.scrollTo(0, 0);
                  }
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Screen of Steps */}

        {showAllSteps && <Loading />}
        <div id="prueba">
          {!showAllSteps ? (
            <>
              {activeStep === 0 && (
                <StepTwo
                  loadingRecommend={loadingRecommend}
                  loading={loading}
                  cedula={cedula}
                  inputCedula={inputCedula}
                  setInputCedula={setInputCedula}
                  handleChangeRecommend={handleChangeRecommend}
                  handleChange={handleChange}
                  animation={animation}
                  gestionesActivas={gestionesActivas}
                />
              )}

              {activeStep === 1 && <StepSeven animation={animation} />}

              {activeStep === 2 && (
                <StepThree
                  riesgo={riesgo}
                  cedula={cedula}
                  animation={animation}
                />
              )}
              {activeStep === 3 && (
                <StepFour cedula={cedula} animation={animation} />
              )}
              {activeStep === 4 && (
                <StepFive StepFourCheck={stepFourCheck} animation={animation} />
              )}
              {/*      {activeStep === 4 && <StepSix animation={animation} />} */}
              {activeStep === 5 && (
                <StepEight
                  cedula={cedula}
                  escenarioPreeliminar={escenarioPreeliminar}
                  animation={animation}
                />
              )}
              {activeStep === 6 && <StepNine animation={animation} />}
              {activeStep === 7 && (
                <StepTen animation={animation} downloadPDF={downloadPDF} />
              )}
            </>
          ) : (
            <>
              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="1" title="DATOS PERSONALES" />
                <StepTwo
                  pdf={true}
                  loadingRecommend={loadingRecommend}
                  loading={loading}
                  cedula={cedula}
                  inputCedula={inputCedula}
                  setInputCedula={setInputCedula}
                  handleChangeRecommend={handleChangeRecommend}
                  handleChange={handleChange}
                  animation={animation}
                  gestionesActivas={gestionesActivas}
                />
              </div>

              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="2" title="ACTIVIDAD ECONOMICA" />
                <StepSeven pdf={true} animation={animation} />
              </div>
              <div style={{ height: "2100px" }}>
                <PdfHeader pagination="3" title="VERIFICACION DE NORMATIVA" />

                <StepThree
                  riesgo={riesgo}
                  cedula={cedula}
                  animation={animation}
                  pdf={true}
                />
              </div>
              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="5" />

                <StepFour pdf={true} cedula={cedula} animation={animation} />
              </div>
              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="6" />
                <StepFive
                  pdf={true}
                  StepFourCheck={stepFourCheck}
                  animation={animation}
                />
              </div>
              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="7" />

                <StepEight
                  pdf={true}
                  cedula={cedula}
                  escenarioPreeliminar={escenarioPreeliminar}
                  animation={animation}
                />
              </div>
              <div style={{ height: "1050px" }}>
                <PdfHeader pagination="8" title="MONTOS TOTALES A FINANCIAR" />
                <StepNine pdf={true} animation={animation} />
              </div>
              <div >
                <PdfHeader pagination="9" />
                <StepTen pdf={true} animation={animation} downloadPDF={downloadPDF} />

              </div>

            </>
          )}
        </div>
      </Container>
    </Row>
  );
}
