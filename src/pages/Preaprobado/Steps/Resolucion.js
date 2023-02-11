import React, { useContext, useState } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../../context/usuario/UsuarioContext";

// Services
// import petition_post from "../../../utils/petitions/petition_post";

// Components
import { Row, Col, Card, CardBody, Button } from "reactstrap";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import FinalStepModal from "../../../components/FinalStepModal/FinalStepModal";

// Styles
import styled from "styled-components";

const StylesContainer = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.size ? `${props.size}px` : `${props.size2}px`} !important;
  }
`;
export default function Resolucion({ animation, downloadPDF, pdf }) {
  const {
    sizeSteps,
    size,
    cedula,
    riesgo,
    escenarioPreeliminar,
    capacidadPago,
    estructuraFinanciamiento,
  } = useContext(PreaprobadoContext);
  const { user } = useContext(UsuarioContext);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const handleSave = () => {
    escenarioPreeliminar.colillaPago = parseFloat(
      escenarioPreeliminar.colillaPago
    );
    const data = {
      cedula,
      riesgo,
      escenarioPreeliminar,
      capacidadPago,
      estructuraFinanciamiento,
      user,
    };

    setLoading(true);
    downloadPDF();
    setModal(false);
    /*   petition_post("saveSteps", {body: data})
    .then((result) => {
      console.log(result)
      setModal(false)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)

    
    });
 */
  };


  return (
    <div className={`dashboard resolucion-operacion step__cards ${animation && !pdf && "step__animation"}`}
    >
      <FinalStepModal
        modal={modal}
        setModal={setModal}
        loading={loading}
        handleSave={handleSave}
      />
      <StylesContainer size2={size} size={sizeSteps.datosPersonales || null}>
        <Row className="pt-4">
          <Col>
            {/* <SizeSteps className="d-flex" name="datosPersonales" /> */}
            <h4 className="general-title">Resolucion Operacion Creditica</h4>
          </Col>
        </Row>
        <Row className="pt-4 px-3">
          <Col>
            <Card className="">
              <CardBody className="m-lg-0 p-5">
                <Col className="col-12">
                  <p>
                    Solicitud Aprobada para la Linea 245 - Preaprobados Viculacion por un Monto de <strong className="font-card"> ₡ {estructuraFinanciamiento.total && new Intl.NumberFormat(["ban", "id"]).format( estructuraFinanciamiento.total.toFixed(2) || 0 )} </strong> Para Refinanciar Operaciones Detalladas en Esta Presolicitud, a una Tasa de <strong className="font-card"> {escenarioPreeliminar.default.ref_tasa}% </strong> A Nombre de <strong className="font-card"> {cedula && cedula.personal_data.nom_compl[0]} </strong> a un <strong className="font-card"> Plazo en Meses de {escenarioPreeliminar.default.ref_plazo} </strong> Lo que Preeliminarmente Estima una Cuota Aproximada de <strong className="font-card"> ₡ 29.361,66 </strong> Mas una Cuota de Ahorro a la Vista Mensual de <strong className="font-card"> ₡ 0.00 </strong> lo que Estima una Cuota Mensual Total de (que Incluye Ahorra a la Vista) <strong className="font-card"> ₡ 29.361,66 </strong> Apegado a lo Establecido en el PR=CRE-PREA-001 Procedimiento de Soluciones Financieras Preaprobados y segun la Fecha de Produccion de ...
                  </p>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="bottom-section">
          <Col className="d-flex justify-content-center">
            <Button>
              Archivar Prospecto
            </Button>

            <Button
              color={"primary"}
              onClick={() => {
                setModal(true);
              }}
            >
              Generar PDF
            </Button>
          </Col>
        </Row>
      </StylesContainer>
    </div>
  );
}
