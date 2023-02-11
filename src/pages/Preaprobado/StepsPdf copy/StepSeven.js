import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
export default function StepSeven({animation}) {
  return (
    <Container
      fluid={true}
      className={` dashboard step__cards ${animation && "step__animation"}`}
      style={{height:"auto"}}
    >
      <Row className="p-4">
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Fecha de Inicio de Labores</h5>
                <p className=" dashboard__total-stat">09/02/2021</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Antiguedad Laboral</h5>
                <p className=" dashboard__total-stat">12.1</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Antiguedad Laboral</h5>
                <p className=" dashboard__total-stat">1.0</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Profesion</h5>
                <p className=" dashboard__total-stat">Tecnico Profecional</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Cantidad Proximada</h5>
                <p className=" dashboard__total-stat">200 empls o mas</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Tipo de Empresa</h5>
                <p className=" dashboard__total-stat">CORPORATIVA</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Tipo de Industria</h5>
                <p className=" dashboard__total-stat">Servicios</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Tipo Actividad Economica</h5>
                <p className=" dashboard__total-stat">SALUD</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Segmento</h5>
                <p className=" dashboard__total-stat">Asalario Publico</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Nombre Empresa / Institucion</h5>
                <p className=" dashboard__total-stat">
                  Ministro de obras publicas y transporte
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>
                  Sucursal / Region / Area / Seccion
                </h5>
                <p className=" dashboard__total-stat">
                  La Sabana Oficinas Centrales
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Telefono / Oficina / Extension</h5>
                <p className=" dashboard__total-stat">2211-4000 / 1445</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>Email Trabjo</h5>
                <p className=" dashboard__total-stat">juancarlos@ccss.sa</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>
                  Empresa Afiliada a Deduccion de Planilla
                </h5>
                <p className=" dashboard__total-stat">Si</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body card-eight border">
              <div className="card__title">
                <h5>
                  Codigo Empresa Afiliada a Deduccion de Plantilla
                </h5>
                <p className=" dashboard__total-stat">
                  A 2500 // Acueductos a alcantarillados
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
