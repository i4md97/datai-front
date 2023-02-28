import React, { useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

import { escenarioPreliminarOptions } from "../../../db/dropdownsOptions";

// Components
import { Row, Col, Card, CardBody, Button, Input, Spinner } from "reactstrap";
import { 
  CustomDropdown, 
  RefinanciamientoTable,
  NecesidadesFinanciamientoTable,
  EtapaSolicitud
} from "../../../components";

export default function EscenarioPreliminar({ animation, pdf }) {
  const { changeStep } = useContext(PreaprobadoContext);

  const [isSaving, setIsSaving] = useState(false);
  const [saldoRefinanciar, setSaldoRefinanciar] = useState(7678000);
  const [ahorroPotencial, setAhorroPotencial] = useState(64000);
  const [globalBalance, setGlobalBalance] = useState(0);
  const [globalCuota, setGlobalCuota] = useState(95000);

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(5);
    }, 1500);
  }

  return (
    <div className={`dashboard escenario-preliminar step__cards ${animation && !pdf && "step__animation"}`} >
      <Row className="pt-4">
        <Col xs={12}>
          <Card>
            <CardBody>
              <Row>
                <Col><h4><span className="text-bold">Saldo a Refinanciar:</span> ₡{saldoRefinanciar}</h4></Col>
                <Col><h4><span className="text-bold">Ahorro Potencial:</span> ₡{ahorroPotencial}</h4></Col>
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
