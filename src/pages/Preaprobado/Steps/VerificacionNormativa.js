import React, { useEffect, useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Card, CardBody, Row, Col, Form, Input, Button, Spinner } from "reactstrap";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";

import { normativaOptions } from "../../../db/dropdownsOptions";

// Styles
import styled from "styled-components";

const StylesContainer = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.statSize ? `${props.statSize}em` : `${props.size2}px`} !important;
  }
`;

export default function VerificacionNormativa({ animation, cedula, riesgo, pdf }) {
  const { sizeSteps, statSize, changeStep } = useContext(PreaprobadoContext);
  const [isSaving, setIsSaving] = useState(false);

  const [data, setData] = useState({
    interno: [],
    cic: [],
  });

  const [referencias] = useState({
    interno: {
      riesgo_cumpl: ["NO TIENE", "Alertas Confirmadas", "Alertas Pendientes"],
      score_atraso: ["AA", "A", "B", "C", "D", "E", "N", "SW"],
      rango_atraso_dias: ["0 días", "1 - 30 días", "31 - 60 días", "61 - 90 días", "91 - 120 días", "120 días"],
      niv_riesgo: ["BAJO", "MEDIO", "ALTO", "ALTO NO VIABLE"],
      cat_riesgo: ["A1", "A2", "B1", "C1", "D", "E"],
    },
  });

  useEffect(() => {
    if (cedula) {
      setData({
        interno: Object.keys(cedula.internal_risks),
        cic: Object.keys(cedula.cic_risks),
      });
    }
  }, [cedula]);

  const labelPrograma = [
    "MONTO MÍNIMO",
    "MONTO MÁXIMO",
    "Tasa",
    "TIPO TASA",
    "PLAZO",
    "FPP (Frecuencia Pago INT)",
    "FPP (Frecuencia Pago Principal)"
  ];

  const labelInterno = [
    "Riesgo de Cumplimiento",
    "Score de Atraso",
    "Rango de Atraso",
    "Dias de Atraso Máximo",
    "Prorrogas Aplicadas",
    "Nivel de Riesgo",
    "Categoria de Riesgo"
  ];
  const labelCic = [
    "Calificación Global CicNivel CHP",
    "Puntaje CIC",
    "Dias de Atraso en CIC",
    "Nivel CHP SBD",
    "Puntaje CIC SBD",
    "Dias de Atraso CIC SBD",
    "Operaciones con Estado > 1",
    "Historial - Meses en CIC"
  ];
  const labelValoracionExterna = [
    "Juicios Activos",
    "Referencias Comerciales",
    "Embargos Bienes Muebles",
    "Embargos Bienes INMuebles",
    "Juicios Históricos",
    "Referencias Comerciales Históricas",
    "Bienes Prendados",
    "Bienes Hipotecados"
  ];

  const labelImpuestosReportados = [
    "Ingreso reportado útimos meses",
    "Impuestos reportados últimos meses"
  ];

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(3);
    }, 1500);
  }

  return (
    <div className={`dashboard verificacion-normativa py-3 step__cards ${animation && !pdf && "step__animation"}`}>
      <StylesContainer size2={statSize} size={sizeSteps.verificacionNormativa || null}>
				<Row className="pt-4">
					<Col>
						{/* <SizeSteps className="d-flex" name="verificacionNormativa" /> */}
						<h4 className="page-title general-title">Verificación Normativa</h4>
						<hr />
					</Col>
				</Row>
        <Form>

        </Form>
        <Row className="justify-content-center">
          <Col sm={12}>
            <Card>
              <CardBody>
                <Row>
                  <Col sm={6}>
                    <label className="text-center general-title text-bold">PROGRAMA APLICABLE</label>
                    <CustomDropdown 
                      className="w-100" 
                      classNameButton="bg-light"
                      defaultOption="Sleccionar"
                      selectedOption="SBP MICRO CRÉDITO"
                      options={normativaOptions.creditoOptions}
                    />
                  </Col>
                  <Col sm={6}>
                    <label className="text-center general-title text-bold">PRODUCTO APLICABLE</label>
                    <CustomDropdown 
                      className="w-100" 
                      classNameButton="bg-light"
                      defaultOption="Sleccionar"
                      selectedOption="CAPITAL DE TRABAJO"
                      options={normativaOptions.capitalOptions}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {!cedula && labelPrograma.map((element, i) => {
              return (
                <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`interno-card-${i}`}>
                  <Card className="aesthetic-card green">
                    <CardBody className={`card-body card-error`}>
                      <div className="card__title">
                        <h5 className="text-semibold">{element}</h5>{" "}
                      </div>
                      <p className="mt-2">Política:</p>
                      <p className="total-stat text-center"></p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>

				<Row className="pt-4">
					<Col>
						{/* <SizeSteps className="d-flex" name="verificacionNormativa" /> */}
						<h4 className="page-title general-title">INDICADORES INTERNOS</h4>
						<hr />
					</Col>
				</Row>
        <Row className="justify-content-center">
          {!cedula && labelInterno.map((element, i) => {
              return (
                <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`interno-card-${i}`}>
                  <Card className="aesthetic-card green">
                    <CardBody className={`card-body card-error`}>
                      <div className="card__title">
                        <h5 className="text-semibold">{element}</h5>{" "}
                      </div>
                      <p className="mt-2">Política:</p>
                      <p className="total-stat text-center"></p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>

        <Row className="justify-content-center">
          {data.interno.map((element, i) => {
            let value = 0;
            let valueFilter = 0;
            if (element === "dias_atraso" || element === "prorr_aplic") {
              value = cedula.internal_risks[element][0];
              valueFilter = riesgo.interno[element];
            } else {
              referencias.interno[element].map((elementTwo, i) => {
                if (elementTwo === riesgo.interno[element]) {
                  valueFilter = i;
                }
                if (elementTwo === cedula.internal_risks[element][0]) {
                  value = i;
                }
              });
            }
            return (
              <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`interno-subcard-${i}`}>
                <Card className="aesthetic-card green">
                  <CardBody
                    className={`card-body ${cedula && value <= valueFilter
                      ? "card-confirm"
                      : "card-error"
                      } `}
                  >
                    <div className="card__title mb-1">
                      <h5 className="text-semibold">{labelInterno[i]}</h5>{" "}
                    </div>
                    <p className="mt-2">Política: {riesgo.interno[element]}</p>
                    <p className="total-stat text-center">
                      {cedula && cedula.internal_risks[element][0]}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>

        {pdf && <> <div style={{ marginTop: "18rem" }}></div>
          <div>
            <PdfHeader pagination="4" />
          </div> </>}
        
				<Row>
					<Col>
						<h4 className="page-title general-title">INDICADORES EXTERNOS CIC</h4>
						<hr />
					</Col>
				</Row>

        <Row className="justify-content-center">
          {!cedula &&
            labelCic.map((element, i) => {
              return (
                <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`cic-card-${i}`}>
                  <Card className="aesthetic-card green">
                    <CardBody className={`card-body card-error`}>
                      <div className="card__title">
                        <h5 className="text-semibold">{element}</h5>{" "}
                      </div>
                      <p className="mt-2">Política:</p>
                      <p className="total-stat text-center"></p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>

        <Row className="justify-content-center">
          {data.cic.length > 0 && (
            <>
              {data.cic.map((element, i) => {
                return (
                  <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`cic-subcard-${i}`}>
                    <Card className="aesthetic-card green">
                      <CardBody
                        className={`card-body ${cedula &&
                          cedula.cic_risks[element][0] <= riesgo.cic[element]
                          ? "card-confirm"
                          : "card-error"
                          } `}
                      >
                        <div className="card__title mb-1">
                          <h5 className="text-semibold">{labelCic[i]}</h5>{" "}
                        </div>
                        <p className="mt-2">Política: {riesgo.cic[element]}</p>
                        <p className="total-stat text-center">
                          {cedula && cedula.cic_risks[element][0]}
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}

              {/* TODO: eliminar columna cuando BE tenga estos datos */}
              <Col sm={12} md={6} xl={pdf ? 4 : 3}>
                <Card className="aesthetic-card green">
                  <CardBody
                    className="card-body card-confirm"
                  >
                    <div className="card__title mb-1">
                      <h5 className="text-semibold">Historial – Meses en CIC</h5>{" "}
                    </div>
                    <p className="mt-2">Política: 0</p>
                    <p className="total-stat text-center">
                      ex
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </>
          )}
        </Row>
        
        { labelValoracionExterna.length > 0 && 
          <Row>
            <Col>
                <h4 className="page-title pt-0 general-title">INDICADORES EXTERNOS BURÓ</h4>
                <hr/>
            </Col>
          </Row>
        }
        <Row className="justify-content-center">
          {labelValoracionExterna.map((element, i) => {
            return (
              <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`valoracion-card-${i}`}>
                <Card className="aesthetic-card yellow">
                  <CardBody className={`card-body card-error`}>
                    <div className="card__title mb-1">
                      <h5 className="text-semibold">{element}</h5>{" "}
                    </div>
                    <p className="mt-2">Política:</p>
                    <p className="total-stat text-center"></p>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>

        { labelImpuestosReportados.length > 0 && 
          <Row>
            <Col>
                <h4 className="page-title pt-0 general-title">Ingresos e impuestos reportados según BURÓ</h4>
                <hr/>
            </Col>
          </Row>
        }
        <Row className="justify-content-start">
          {labelImpuestosReportados.map((element, i) => {
            return (
              <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`valoracion-card-${i}`}>
                <Card className="aesthetic-card yellow">
                  <CardBody className={`card-body card-error`}>
                    <div className="card__title mb-1">
                      <h5 className="text-semibold">{element}</h5>{" "}
                    </div>
                    <p className="mt-2">Sociedad Reportada:</p>
                    <p className="total-stat text-center"></p>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
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
                            options={normativaOptions.statusOptions}
                          />
                        </Col>
                        <Col>
                          <label className="text-center general-title">ETAPA</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={normativaOptions.stageOptions}
                          />
                        </Col>
                        <Col>
                          <label className="text-center general-title">STAND BY</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={normativaOptions.standByOptions}
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
      </StylesContainer>
    </div>
  );
}
