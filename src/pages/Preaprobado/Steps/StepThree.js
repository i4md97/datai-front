import React, { useEffect, useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Card, CardBody, Row, Col } from "reactstrap";
import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";

// Styles
import styled from "styled-components";

const SizeStep = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.statSize ? `${props.statSize}em` : `${props.size2}px`} !important;
  }
`;

export default function StepTwo({ animation, cedula, riesgo, pdf }) {
  const { sizeSteps, statSize } = useContext(PreaprobadoContext);

  const [data, setData] = useState({
    interno: [],
    cic: [],
  });

  const [referencias, setReferencias] = useState({
    interno: {
      riesgo_cumpl: ["NO TIENE", "Alertas Confirmadas", "Alertas Pendientes"],
      score_atraso: ["AA", "A", "B", "C", "D", "E", "N", "SW"],
      rango_atraso_dias: [
        "0 días",
        "1 - 30 días",
        "31 - 60 días",
        "61 - 90 días",
        "91 - 120 días",
        "120 días",
      ],
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

  const labelInterno = [
    "Riesgo de Cumplimiento",
    "Score de Atraso",
    "Rango de Atrasos",
    "Días de Atrasos",
    "Prorrogas Aplicadas",
    "Nivel de Riesgo",
    "Categoria de Riesgo",
  ];
  const labelCic = [
    "Calificación Global Cic",
    "Puntaje Cic",
    "Días de Atraso en Cic",
    "Calificación Global Cic Sbd",
    "Puntaje Cic Sbd",
    "Días de Atraso en Cic Sdb",
    "Operaciones con Estado > 1",
    "Historial – Meses en CIC",
  ];
  const labelValoracionExterna = [
    "Juicios",
    "Referencias",
    "Embargos Bienes Inmuebles",
    "Embargos Bienes Inmuebles",

  ];

  return (
    <div className={`dashboard verificacion-normativa py-3 step__cards ${animation && !pdf && "step__animation"}`}>
      <SizeStep size2={statSize} size={sizeSteps.verificacionNormativa || null}>
				<Row className="pt-4">
					<Col>
						{/* <SizeSteps className="d-flex" name="verificacionNormativa" /> */}
						<h4 className="page-title general-title">Interno</h4>
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
						<h4 className="page-title general-title">CIC</h4>
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
                <h4 className="page-title pt-0 general-title">Valoración Externa</h4>
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
      </SizeStep>
    </div>
  );
}
