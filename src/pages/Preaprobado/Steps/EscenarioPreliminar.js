import React, { useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

import { escenarioPreliminarOptions } from "../../../db/dropdownsOptions";

// Components
import { Row, Col, Card, CardBody, Table, Button, Input, Spinner } from "reactstrap";
import { CustomDropdown, ControlledInput } from "../../../components";

export default function EscenarioPreliminar({ animation, StepFourCheck, pdf }) {
  const { changeStep } = useContext(PreaprobadoContext);

  const [isSaving, setIsSaving] = useState(false);

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
        <Col xs={12} xl={12}>
          <h4 className="page-title general-title">Refinanciamiento</h4>
        </Col>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col xs={12} md={6}>
                  <Table className="text-left" responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                    <tbody>
                      <tr>
                        <th className="font-weight-normal">Saldo a Refinanciar</th>
                        <td>₡7,678,000</td>
                      </tr>
                      <tr>
                        <th className="py-4">PRODUCTOS CREDITICIOS PARA REFINANCIAR</th>
                        <td></td>
                      </tr>
                      <tr>
                        <th className="pt-0">
                          <CustomDropdown 
                            options={escenarioPreliminarOptions.productosOptions}
                            selectedOption="REFINANCIAMIENTO"
                            classNameButton="mb-0"
                          />
                        </th>
                        <td className="p-1">
                          <ControlledInput className="bg-green" defaultOption="₡7,678,000"/>
                        </td>
                      </tr>
                      <tr>
                        <th className="pt-0">
                          <CustomDropdown 
                            options={escenarioPreliminarOptions.productosOptions}
                            selectedOption="REFINANCIAMIENTO"
                            classNameButton="mb-0"
                          />
                        </th>
                        <td className="p-1">
                          <ControlledInput className="bg-green" defaultOption="₡0"/>
                        </td>
                      </tr>
                      <tr>
                        <th className="font-weight-normal">Saldo a Refinanciar</th>
                        <td>₡7,678,000</td>
                      </tr>
                      <tr>
                        <th className="font-weight-normal">Balance</th>
                        <td>₡0.00</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} md={6}>
                  <Table className="text-left" responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                    <tbody>
                      <tr>
                        <th className="font-weight-normal">Ahorro Potencial</th>
                        <td>₡64,000</td>
                      </tr>
                      <tr>
                        <th colSpan="2" className="py-4">PLAN DE INVERSÓN</th>
                      </tr>
                      <tr>
                        <td colSpan="2" className="font-weight-normal">Refinanciamiento Deudas</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="font-weight-normal">0</td>
                      </tr>
                      <tr>
                        <th className="font-weight-normal">Ahorro del Refinanciamiento</th>
                        <td>₡64,000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col xs={12} xl={12}>
                  <h4 className="page-title general-title">Necesidades de financiamiento empresarial y personal</h4>
                </Col>
                <Col xs={12} md={6}>
                  <Table className="text-left" responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                    <tr>
                      <th style={{width: "360px"}} className="font-weight-normal">CAPITAL DE TRABAJO</th>
                      <td className="p-1">
                        <ControlledInput className="bg-green" defaultOption="₡1,500,000"/>
                      </td>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">CAPITAL DE INVERSIÓN</th>
                      <td className="p-1">
                        <ControlledInput className="bg-green" />
                      </td>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">GASTOS PERSONALES</th>
                      <td className="p-1">
                        <ControlledInput className="bg-green" />
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">Crédito Empresarial y Personal</th>
                      <td>₡1,500,000</td>
                    </tr>
                    <tr>
                      <th></th>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">TOTAL A FINANCIAR</th>
                      <td>₡9,178,000</td>
                    </tr>
                  </Table>
                </Col>
                <Col xs={12} md={6}>
                  <Table className="text-left" responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                    <tr>
                      <td colSpan={2} className="p-1">
                        <ControlledInput className="bg-green" defaultOption="Compra de materia prima para Restaurante"/>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="p-1">
                        <ControlledInput className="bg-green" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="p-1">
                        <ControlledInput className="bg-green" />
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">Cuota por Financiamiento Empresarial y Personal</th>
                      <td>₡95,000</td>
                    </tr>
                    <tr>
                      <th className="font-weight-normal">Incremento cuota / Ahorro mensual por créditos nuevos</th>
                      <td>₡31,000</td>
                    </tr>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row className="pb-4">
                <Col sm={12}>
                  <p>ETAPA DE LA SOLICITUD</p>
                </Col>
              </Row>
              <Row>
                  <Col>
                    <Row>
                      <Col>
                        <label className="text-center general-title">ESTATUS</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={escenarioPreliminarOptions.statusOptions}
                        />
                      </Col>
                      <Col>
                        <label className="text-center general-title">ETAPA</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={escenarioPreliminarOptions.stageOptions}
                        />
                      </Col>
                      <Col>
                        <label className="text-center general-title">STAND BY</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={escenarioPreliminarOptions.standByOptions}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <label className="text-center general-title">DETALLE</label>
                    <Input type="text" />
                  </Col>
                </Row>
            </CardBody>
          </Card>
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
