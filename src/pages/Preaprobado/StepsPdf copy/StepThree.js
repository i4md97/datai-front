import React, {useEffect, useState} from "react";
import {Card, CardBody, Row, Col} from "reactstrap";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";
export default function StepTwo({animation, cedula, riesgo}) {
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
    "Dias de Atrasos",
    "Prorrogas Aplicadas",
    "Nivel de Riesgo",
    "Categoria de Riesgo",
  ];
  const labelCic = [
    "Calificacion Global Cic",
    "Puntaje Cic",
    "Dias de Atraso en Cic",
    "Calificacion Global Cic Sbd",
    "Puntaje Cic Sbd",
    "Dias de Atraso en Cic Sdb",
    "Operaciones con Estado > 1",
    /*     " Historial Crediticio (Meses de Actividad)", */
  ];

  return (
    <div className={`dashboard step__cards ${animation && "step__animation"}`}>
      <div className="d-flex title-hr title-first pt-3">
        <hr />
        <h4 className="page-title  general-title">Interno</h4> <hr />
      </div>

      <Row className="justify-content-center">
        <Col className="col-12 row">
          {" "}
          {!cedula &&
            labelInterno.map((element, i) => {
              return (
                <Col className={`col-12 col-md-6 col-lg-4 col-xl-4 `}>
                  <Card>
                    <CardBody className={`card-body card-error`}>
                      <div className="card__title">
                        <h5>{element}</h5>{" "}
                        <p className="dashboard__total-stat center-text"></p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Col>

        <Col className="col-6 row">
          {data.interno.map((element, i) => {
            let value = 0;
            let valueFilter = 0;
            console.log(referencias);
            console.log(element);
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

            console.log(value);
            console.log(valueFilter);

            return (
              <Col
                className={`col-12 col-md-6 col-lg-6 ${
                  riesgo.interno && value > valueFilter && "d-none"
                }`}
              >
                <Card>
                  <CardBody
                    className={`card-body ${
                      cedula && value <= valueFilter
                        ? "card-confirm"
                        : "card-error"
                    } `}
                  >
                    <div className="card__title">
                      <h5>{labelInterno[i]}</h5>{" "}
                      <p className="dashboard__total-stat center-text">
                        {cedula && cedula.internal_risks[element][0]}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Col>
        <Col className="col-6 row">
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
              <Col
                className={`col-12 col-md-6 col-lg-6 ${
                  riesgo.interno && value <= valueFilter && "d-none"
                }`}
              >
                <Card>
                  <CardBody
                    className={`card-body ${
                      cedula && value <= valueFilter
                        ? "card-confirm"
                        : "card-error"
                    } `}
                  >
                    <div className="card__title">
                      <h5>{labelInterno[i]}</h5>{" "}
                      <p className="dashboard__total-stat center-text">
                        {cedula && cedula.internal_risks[element][0]}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Col>
      </Row>
      <div style={{marginTop: "20rem"}}></div>
      <div>
        <PdfHeader pagination="4" />
      </div>
      <div className="d-flex title-hr pt-3 ">
        <hr />
        <h4 className="page-title pt-0 general-title">CIC</h4> <hr />
      </div>
      <Row className="justify-content-center">
        <Col className="col-12 row">
          {" "}
          {!cedula &&
            labelCic.map((element, i) => {
              return (
                <Col className={`col-12 col-md-6 col-lg-4 col-xl-4 `}>
                  <Card>
                    <CardBody className={`card-body card-error`}>
                      <div className="card__title">
                        <h5>{element}</h5>{" "}
                        <p className="dashboard__total-stat center-text"></p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Col>

        <Col className="col-6 row">
          {data.cic.map((element, i) => {
            return (
              <Col
                className={`col-12 col-md-6 col-lg-6 ${
                  riesgo.cic &&
                  cedula.cic_risks[element][0] > riesgo.cic[element] &&
                  "d-none"
                }`}
              >
                <Card>
                  <CardBody
                    className={`card-body ${
                      cedula &&
                      cedula.cic_risks[element][0] <= riesgo.cic[element]
                        ? "card-confirm"
                        : "card-error"
                    } `}
                  >
                    <div className="card__title">
                      <h5>{labelCic[i]}</h5>{" "}
                      <p className="dashboard__total-stat center-text">
                        {cedula && cedula.cic_risks[element][0]}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Col>
        <Col className="col-6 row">
          {data.cic.map((element, i) => {
            return (
              <Col
                className={`col-12 col-md-6 col-lg-6 ${
                  riesgo.cic &&
                  cedula.cic_risks[element][0] <= riesgo.cic[element] &&
                  "d-none"
                }`}
              >
                <Card>
                  <CardBody
                    className={`card-body ${
                      cedula &&
                      cedula.cic_risks[element][0] <= riesgo.cic[element]
                        ? "card-confirm"
                        : "card-error"
                    } `}
                  >
                    <div className="card__title">
                      <h5>{labelCic[i]}</h5>{" "}
                      <p className="dashboard__total-stat center-text">
                        {cedula && cedula.cic_risks[element][0]}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
