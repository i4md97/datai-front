import React, { useEffect, useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Card, CardBody, Row, Col, Button, Spinner } from "reactstrap";
import { 
  EtapaSolicitud,
  CustomDropdown
} from "../../../components";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";

import { normativaOptions } from "../../../db/dropdownsOptions";

export default function VerificacionNormativa({ animation, cedula, riesgo, pdf }) {
  const { changeStep } = useContext(PreaprobadoContext);
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
    ["MONTO MÍNIMO", null, null, "₡50,000"],
    ["MONTO MÁXIMO", null, null, "₡1,000,000"],
    ["TIPO TASA", "Tasa", "5.00%", "56800.00%"],
    ["FPP (Frecuencia Pago INT)", "PLAZO", "0", "12"],
    ["FPP (Frecuencia Pago Principal)", null, null, "MENSUAL"]
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
    ["Juicios Activos", "0", "₡1,000", "5", "₡75,000"],
    ["Referencias Comerciales", "0", "₡25,000", "5", "₡75,000"],
    ["Embargos Bienes Muebles", "0", "₡35,000", "1", "₡5,000,000"],
    ["Embargos Bienes INMuebles", "0", "₡0", "1", "₡25,000,000"],
    ["Juicios Históricos", "0", "₡7,000", "5", "₡75,000"],
    ["Referencias Comerciales Históricas", "0", "₡13,000", "5", "₡75,000"],
    ["Bienes Prendados", "0", "₡35,000", "NA", "NA"],
    ["Bienes Hipotecados", "0", "₡0", "NA", "NA"]
  ];

  const labelImpuestosReportados = [
    [["Ingreso reportado útimos meses", "0", "₡0"], ["Patrono reportado", "NA"]],
    [["Impuestos reportados últimos meses", "12", "₡121,000"], ["Sociedad Reportada", "RESTAURANTE BRISAS"]]
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
      <Row className="pt-4 justify-content-center">
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
        {labelPrograma.map((element, i) => {
            return (
              <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`interno-card-${i}`}>
                <Card className="aesthetic-card green">
                  <CardBody className="card-body card-error px-3 py-4">
                    <div className="card__title my-2">
                      <h5 className="text-semibold">{element[0]}</h5>{" "}
                    </div>
                    {cedula && element[1] ? 
                      <p className="mb-0">{element[1]}: {element[2]}</p>
                      :
                      <p className="mb-0">&nbsp;</p>
                    }
                    {cedula && <p className="total-stat text-center">{element[3]}</p>}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>

      <Row className="pt-4">
        <Col>
          <h4 className="page-title general-title">INDICADORES INTERNOS</h4>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {!cedula && labelInterno.map((element, i) => {
            return (
              <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`interno-card-${i}`}>
                <Card className="aesthetic-card green">
                  <CardBody className="card-body card-error px-3 py-4">
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
        {cedula && data.interno.map((element, i) => {
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
              return false;
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
                  <CardBody className="card-body card-error px-3 py-4">
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
                  <Card className="aesthetic-card yellow">
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

            <Col sm={12} md={6} xl={pdf ? 4 : 3}>
              <Card className="aesthetic-card yellow">
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
              <Card className="aesthetic-card green">
                <CardBody className="card-body card-error px-3 py-4">
                  <Row className="pb-2">
                    <Col xs={3} className="text-center">
                      <p>#</p>
                    </Col>
                    <Col xs={9}>
                      <div className="card__title mb-2">
                        {<h5 className="text-semibold">{element[0]}</h5>}
                      </div>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      {cedula && <p>{element[1]}</p>}
                    </Col>
                    <Col xs={9}>
                      {/* <p className="mt-2">Política:</p> */}
                      {cedula && <p className="total-stat">{element[2]}</p>}
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      {cedula && <p>{element[3]}</p>}
                    </Col>
                    <Col xs={9}>
                      {cedula && <p className="total-stat">{element[4]}</p>}
                    </Col>
                  </Row>
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
            <Col sm={12} md={6} xl={6} key={`valoracion-card-${i}`}>
              <Card className="aesthetic-card yellow">
                <CardBody className="card-body card-error px-3 py-4">
                  <Row>
                    <Col xs={1} className="text-center">
                      <p>#</p>
                    </Col>
                    <Col sm={11}>
                      <div className="card__title mb-1">
                        <h5 className="text-semibold">Monto Promedio</h5>{" "}
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-2">
                    <Col xs={1}>
                    </ Col>
                    <Col xs={11} className="pb-2">
                      {cedula && <p>{element[0][0]}</p>}
                    </Col>
                  </Row>
                  <Row className="pb-2 border-bottom align-items-center">
                    <Col xs={1} className="text-center">
                      {cedula && <p>{element[0][1]}</p>}
                    </Col>
                    <Col xs={11}>
                      {cedula && <p className="total-stat">{element[0][2]}</p>}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {cedula && <p className="mt-2"><b className="text-bold">{element[1][0]}</b>: {element[1][1]}</p>}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          );
        })}
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
    </div>
  );
}
