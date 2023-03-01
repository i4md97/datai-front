import React, { useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import { usePreaprobado } from "../../../context/preaprobado/PreaprobadoContext";

import { escenarioPreliminarOptions } from "../../../db/dropdownsOptions";

// Components
import { Row, Col, Card, CardBody, Button, Spinner } from "reactstrap";
import { 
  RefinanciamientoTable,
  NecesidadesFinanciamientoTable,
  EtapaSolicitud
} from "../../../components";
import { useEffect } from "react";

export default function EscenarioPreliminar({ animation }) {
  const { changeStep } = useContext(PreaprobadoContext);
  const {detallesPasivos} = usePreaprobado();

  const saldoRefinanciar = detallesPasivos.saldoActual;
  const ahorroPotencial = detallesPasivos.ahorroPotencial;
  const globalCuota = 95000;

  const [isSaving, setIsSaving] = useState(false);
  const [globalBalance, setGlobalBalance] = useState(0);

  const [refinanciamiento, setRefinanciamiento] = useState({});
  const [necesidades, setNecesidades] = useState({});

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(5);
    }, 1500);
  }

  return (
    <div className={`dashboard escenario-preliminar step__cards ${animation && "step__animation"}`} >
      <Row className="pt-4">
        <Col xs={12}>
          <Card>
            <CardBody>
              <Row>
                <Col><h4><span className="text-bold">Saldo a Refinanciar:</span> ₡{new Intl.NumberFormat("de-DE").format(saldoRefinanciar)}</h4></Col>
                <Col><h4><span className="text-bold">Ahorro Potencial:</span> ₡{new Intl.NumberFormat("de-DE").format(ahorroPotencial)}</h4></Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row className="pb-4">
                <Col>
                  <h4>Refinanciamiento</h4>
                </Col>
              </Row>
              <RefinanciamientoTable 
                options={escenarioPreliminarOptions.productosOptions} 
                saldo={saldoRefinanciar}
                ahorro={ahorroPotencial}
                setGlobalBalance={setGlobalBalance}
                setRefinanciamiento={setRefinanciamiento}
              />
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <Row className="mb-4">
                <Col xs={12}>
                  <h4>Necesidades de financiamiento empresarial y personal</h4>
                </Col>
              </Row>
              <NecesidadesFinanciamientoTable 
                balance={globalBalance} 
                cuota={globalCuota}
                ahorroPotencial={ahorroPotencial}
                setNecesidades={setNecesidades}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <EtapaSolicitud />
        </Col>
      </Row>

      <Row>
        <Col>
        <Button color="primary" className="action-button" onClick={saveAndContinueHandler}>
          Guardar y Continuar
          {isSaving && 
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className="ml-2"
            />
          }
        </Button>
        </Col>
      </Row>
    </div >
  );
}
