import React from "react";
import {Container, Card, CardBody, Row, Col} from "reactstrap";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons";

import {Pie, PieChart, ResponsiveContainer} from "recharts";

export default function DatosCampana({animation}) {
  const data01 = [
    {value: 3.5, fill: "#007BFF"},
    {value: 100, fill: "#eeeeee"},
  ];
  const data02 = [
    {value: 5.18, fill: "#FF4861"},
    {value: 100, fill: "#eeeeee"},
  ];
  return (
    <Container
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title color__background pb-2 text-center">
        DATOS DE CAMPAÑA
      </h3>
      <Row style={{justifyContent: "center"}}>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body ">
              <div className="card__title">
                <h5>FECHA DE SOLICITUD</h5>{" "}
                <p className=" dashboard__total-stat ">08/03/2021</p>
                <div className="icon__card">
                  <CalendarTodayIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>CAMPAÑA</h5>{" "}
                <p className=" dashboard__total-stat">PREAPROBADOS</p>{" "}
                <div className="icon__card">
                  <AccountBalanceWalletIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>CODIGO CAMPAÑAS</h5>{" "}
                <p className=" dashboard__total-stat">MARZO G1</p>{" "}
                <div className="icon__card">
                  <ReceiptIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>ASESOR</h5>{" "}
                <p className=" dashboard__total-stat">JUAN PERE Z</p>{" "}
                <div className="icon__card">
                  <PersonIcon />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>REGION </h5>
                <p className=" dashboard__total-stat">METROPOLITANA</p>{" "}
                <div className="icon__card">
                  <AccountBalanceIcon />
                </div>
              </div>{" "}
            </CardBody>
          </Card>
        </Col>

        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>AGENCIA</h5>
                <p className=" dashboard__total-stat">SAN JOSE</p>{" "}
                <div className="icon__card">
                  <AttachMoneyIcon />
                </div>{" "}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h3 className="page-title color__background-2  pt-3  text-center">
        TASAS
      </h3>
      <Row style={{justifyContent: "center"}} className="pb-5">
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>TASA BANCARIA PASIVA BCCR</h5>{" "}
                <div className="dashboard__weekly-stat-chart-item m-auto">
                  <div className="dashboard__weekly-stat-chart-pie">
                    <ResponsiveContainer>
                      <PieChart className="dashboard__weekly-stat-chart-pie-wrapper">
                        <Pie
                          data={data01}
                          dataKey="value"
                          cx={44}
                          cy={47}
                          innerRadius={35}
                          outerRadius={44}
                          startAngle={180}
                          endAngle={-180}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="dashboard__weekly-stat-label">3,50%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>TIPO DE CAMBIO BCCR</h5>{" "}
                <p className=" dashboard__total-stat">606,00</p>
                <div className="icon__card">
                  <FontAwesomeIcon icon={faHandHoldingUsd} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={3} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title text-center">
                <h5>TASA TRI 12 MESES</h5>{" "}
                <div className="dashboard__weekly-stat-chart-item m-auto">
                  <div className="dashboard__weekly-stat-chart-pie">
                    <ResponsiveContainer>
                      <PieChart className="dashboard__weekly-stat-chart-pie-wrapper">
                        <Pie
                          data={data02}
                          dataKey="value"
                          cx={44}
                          cy={47}
                          innerRadius={35}
                          outerRadius={44}
                          startAngle={180}
                          endAngle={-180}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="dashboard__weekly-stat-label">5,18%</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h3 className="page-title color__background-2 pt-3  text-center">
        POTENCIAL TOTAL
      </h3>
      <Row className="pb-5 mb-5" style={{justifyContent: "center"}}>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>POR REGION </h5>
                <div className="row pt-4 pb-3">
                  <div className="col-6 p-0">
                    <p className="dashboard__total-stat">
                      Cantidad: <br /> 704
                    </p>{" "}
                  </div>
                  <div className="col-6 p-0 ">
                    <p className="dashboard__total-stat">
                      {" "}
                      SALDOS EXTERNOS: <br /> $ 13,705,015,777.00
                    </p>{" "}
                  </div>
                </div>
              </div>{" "}
            </CardBody>
          </Card>
        </Col>

        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>POR AGENCIA</h5>
                <div className="row pt-3">
                  <div className="col-6 p-0">
                    <p className="dashboard__total-stat">
                      Cantidad: <br /> 57
                    </p>{" "}
                  </div>
                  <div className="col-6 p-0">
                    <p className="dashboard__total-stat">
                      {" "}
                      SALDOS EXTERNOS: <br /> 1,587,000,525.00
                    </p>{" "}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12} xl={4} lg={6} xs={12}>
          <Card>
            <CardBody className="card-body">
              <div className="card__title">
                <h5>POR ASESOR</h5>
                <div className="row pt-3">
                  <div className="col-6 p-0">
                    <p className="dashboard__total-stat">
                      Cantidad: <br /> 25
                    </p>{" "}
                  </div>
                  <div className="col-6 p-0">
                    <p className="dashboard__total-stat">
                      {" "}
                      SALDOS EXTERNOS: <br />$ 257,114,587.00
                    </p>{" "}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
