import React from "react";

import {Container, Card, CardBody, Col} from "reactstrap";

export default function StepTen({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
     
          <Card className="">
            <CardBody  style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" }} className="m-lg-0 p-0 pb-4 ">
              <Col
                className="col-12 text-center pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 general-title   ">Resolucion Operacion Creditica</div>
              </Col>
              <Col className="col-12   pt-3">
                <p>
                  Solicitud Aprobada para la Linea 245 - Preaprobados Viculacion
                  por un Monto de
                  <strong className="font-card"> ₡ 1.190.012,55</strong> Para
                  Refinanciar Operaciones Detalladas en Esta Presolicitud, a una
                  Tasa de <strong className="font-card"> 16,71% </strong> A
                  Nombre de Murillo Murillo Rodoldo a un Plazo en Meses de
                  <strong className="font-card"> 180 </strong> Lo que
                  Preeliminarmente Estima una Cuota Aproximada de
                  <strong className="font-card"> ₡ 29.361,66 </strong>Mas una
                  Cuota de Ahorro a la Vista Mensual de
                  <strong className="font-card"> ₡ 0.00 </strong>lo que Estima
                  una Cuota Mensual Total de (que Incluye Ahorra a la Vista)
                  <strong className="font-card"> ₡ 29.361,66 </strong> )Apegado a
                  lo Establecido en el PR=CRE-PREA-001 Procedimiento de
                  Soluciones Financieras Preaprobados y segun la Fecha de
                  Produccion de ...
                </p>
              </Col>
              <Col className="col-12  pb-1 pt-3 text-center">
                <div
                
                  style={{
                    background: "rgb(83,199,123)",
                    padding: "0.5rem 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <strong>Solicitud Aprovada para la Linea</strong>
                </div>
              </Col>
            </CardBody>
          </Card>
        
        {/* <Col style={{padding: "10px"}} className="col-12 col-lg-6">
          <Card className="">
            <CardBody>
              <Col
                className="col-12 text-center row  pt-3"
                style={{fontSize: "1.1rem"}}
              >
                <div className="col-12 general-title ">Recomendaciones de Migracion</div>
                <br />
                <br />
              </Col>

              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">Modalidad de Repago</div>
                <div className="col-6 text-center">
                  Modalidad de Repago Optima
                </div>
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row  "
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">SEGMENTO</div>
                <div className="col-6 text-center">
                  Dado el Segmento, Asociado con Potencial para la Vinculacion
                  de Ahorro a la Vista
                </div>
                <br />
                <br />
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row  "
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">
                  Cuota de Ahorro se Ajusta a Rebajo de Plantilla
                </div>
                <div className="col-5 offset-1 text-center font-card">
                  ₡ 2.142.879,92
                </div>
                <br />
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">Historial Laboral</div>
                <div className="col-6 text-center">
                  Historial Laboral Optimo
                </div>
                <br />
                <br />
              </Col>
              <Col
                className="col-12 row"
                style={{display: "flex", alignItems: "center"}}
              >
                <div className="col-6 ">Garantia</div>
                <div className="col-6 text-center">
                  Dado la Garantia, Es Importante Vincular Al Asociado con Otros
                  Productos
                </div>
              </Col>
            </CardBody>
          </Card>
        </Col> */}

    </Container>
  );
}
