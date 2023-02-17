import React, { useState, useContext, useEffect } from "react";

// Helpers
import PreAprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../../context/usuario/UsuarioContext";

// Components
import { Row, Col, Table, Card, CardBody } from "reactstrap";
import CustomTooltip from "../CustomTooltip";

// Styles
import styled from "styled-components";

const SizeStep = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.pdf
      ? `8px`
      : props.size
        ? `${props.size}px`
        : `${props.size2}px`} !important;
  }
  td {
    font-size: ${(props) => (props.pdf ? `7px` : "inherit")};
    min-width: 50px !important;
    width: 200px !important;
  }
`;


export default function DetallesPasivos({ animation, cedula, pdf }) {
  const { stepFourCheck, changeStepFourCheck, sizeSteps, size, changeCedula } = useContext(PreAprobadoContext);
  const { user } = useContext(UsuarioContext);

  const [activeCheck, setActiveCheck] = useState(stepFourCheck);
  const [suma, setSuma] = useState({
    saldoInterno: "",
    cuotaInterno: "",
    salgoExterno: "",
    cuotaExterno: "",
  });
  const [form, setForm] = useState({
    internos: {},
    externos: {}
  })

  useEffect(() => {
    if (cedula && user) {
      let saldoInterno = 0;
      let cuotaInterno = 0;
      let saldoExterno = 0;
      let cuotaExterno = 0;

      cedula.debts.data.map((element, i) => {
        if (element[2] === user.firm_c) {
          saldoInterno += element[7];
          cuotaInterno += element[11] + element[12];
        } else {
          saldoExterno += element[7];
          cuotaExterno += element[11] + element[12];
        }
      });

      setForm(cedula.selected || {
        internos: {},
        externos: {}
      })

      setSuma({
        saldoInterno,
        cuotaInterno,
        saldoExterno,
        cuotaExterno,
      });
    }
  }, [cedula]);

  const handleClickStepFourCheck = (val) => {
    const findOne = activeCheck.find((element) => element.index === val.index);
    let newActiveCheck;
    if (findOne) {
      newActiveCheck = activeCheck.filter(
        (element) => element.index !== val.index
      );
    } else {
      newActiveCheck = activeCheck;
      newActiveCheck.push(val);
    }
    setActiveCheck(newActiveCheck);
    changeStepFourCheck(newActiveCheck);
  };

  const handleChangeSelect = (e, type) => {
    setForm({ ...form, [type]: { ...form[type], [e.target.name]: e.target.value } })
    changeCedula({ ...cedula, selected: { ...form, [type]: { ...form[type], [e.target.name]: e.target.value } } })
  }

  return (
    <div className={`dashboard detalles-pasivos step__cards ${animation && !pdf && "step__animation"}`}>
      <SizeStep pdf={pdf} size2={size} size={sizeSteps.detallesPasivos || null}>

        <Row className="pt-4">
          <Col xs={12} xl={12}>
            {/* <SizeSteps className="d-flex" name="detallesPasivos"/> */}
            <h4 className="page-title  general-title">
              Detalles Pasivos Internos
            </h4>
          </Col>

          <Col xs={12} xl={12}>
            <Card>
              <CardBody className="m-lg-0 pb-4">
                {suma.saldoInterno ? <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <th className="th__width-medium-test">Garantía</th>
                      <th className="">Tipo de Operación</th>
                      <th className="th__width-medium-test">Plan de Inversión</th>
                      {/* <th className="th__width-test">Monto Formalizado</th> */}
                      <th className="th__width-test">Saldo</th>
                      <th className="th__width-test">Cuota Mensual Real</th>
                      {/* <th className="th__width-medium-test">Plazo Restante (meses)</th> */}
                      <th className="">Tasa</th>
                      <th className="">Condición</th>
                      <th className="th__width-test">Referencia (Si/No)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cedula &&
                      cedula.debts.data.map((element, i) => {
                        if (element[2] === user.firm_c) {
                          return (
                            <tr key={`step-four-tr-${i}`}>
                              <td>{element[2]} </td>
                              <td>
                                {element[13] === 1 && "Directa"}
                                {element[13] === 2 &&
                                  "Creditos con obligacion de desembolso"}
                                {element[13] === 3 && "Tarjeta de credito"}
                                {element[13] === 4 &&
                                  "Lineas de utilizacion automatica excepto tarjetas de credito"}
                                {element[13] === 5 &&
                                  "Lineas de credito con compromiso de desembolsar"}
                                {element[13] === 6 &&
                                  "Lineas de credito u operaciones crediticias"}
                              </td>
                              <td>


                                {!pdf ? (
                                  <>
                                    { element[10].toFixed(2) }
                                  </>
                                ) : // cedula.selected ? (cedula.selected.internos[`internos${i}`] || "Seleccionar") : "Seleccionar"
                                    element[10].toFixed(2)
                                }


                              </td>
                              {/* <td>
                                ₡{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[8].toFixed(2)
                                )}{" "}
                              </td> */}
                              <td className="td-hover" id={`internos-td-saldo-${i}`}>
                                ₡{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[7].toFixed(2)
                                )}{" "}
                              </td>
                              <td>
                                ₡{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  (element[11] + element[12]).toFixed(11)
                                )}{" "}
                              </td>
                              {/* <td>
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[30].toFixed(2)
                                )}{" "}
                              </td> */}

                              <td className="td-hover" id={`internos-td-tasa-${i}`}>{element[18]} </td>
                              <td>{element[15]} </td>
                              <td>
                                {" "}
                                <button
                                  onClick={() => {
                                    handleClickStepFourCheck({
                                      data: element,
                                      type: "interno",
                                      index: i,
                                    });
                                  }}
                                  className={` ${activeCheck.find(
                                    (element) => element.index === i
                                  )
                                    ? "checkButtonActive"
                                    : "checkButton"
                                    }`}
                                >
                                  SI
                                </button>
                              </td>
                              <CustomTooltip 
                                id={`internos-td-saldo-${i}`}
                                tooltipText={`Monto Formalizado: ₡ ${new Intl.NumberFormat(["ban", "id"]).format(element[7].toFixed(2))}`} 
                                className="td-tooltip" 
                              />
                              <CustomTooltip 
                                id={`internos-td-tasa-${i}`}
                                tooltipText={`Plazo Restante (meses): ${new Intl.NumberFormat(["ban", "id"]).format(element[30].toFixed(2))}`} 
                                className="td-tooltip" 
                              />
                            </tr>
                          );
                        }
                      })}
                    {cedula && (
                      <tr>
                        <td colSpan={3}></td>
                        <td>
                          <span className="text-bold">
                            {suma.saldoInterno
                              ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(
                                suma.saldoInterno
                              )}`
                              : ""}{" "}
                          </span>{" "}
                        </td>
                        <td>
                          <span className="text-bold">
                            {suma.cuotaInterno
                              ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(
                                suma.cuotaInterno
                              )}`
                              : ""}{" "}
                          </span>{" "}
                        </td>
                        <td colSpan={3}></td>
                      </tr>
                    )}
                  </tbody>
                </Table> : <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
              <h4 className="page-title general-title">Detalles Pasivos Externos</h4>
          </Col>
          <Col xs={12} xl={12}>
            <Card>
              <CardBody>
                {suma.saldoExterno ? <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <th className="th__width-medium-test">Entidades</th>
                      <th className="">Tipo de Operación</th>
                      <th className="th__width-medium-test">Ahorro</th>
                      {/* <th className="th__width-test">Monto Formalizado</th> */}
                      <th className="th__width-test">Saldo</th>
                      <th className="th__width-test">Cuota Mensual Real</th>
                      {/* <th className="th__width-medium-test">Plazo Restante (meses)</th> */}
                      <th className="">Tasa</th>
                      <th className="">Condición</th>
                      <th className="th__width-medium">Refinancia (Si/No)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cedula &&
                      cedula.debts.data.map((element, i) => {
                        if (element[2] !== user.firm_c) {
                          return (
                            <tr key={`step-four-cedula-${i}`}>
                              <td>{element[2]} </td>
                              <td>
                                {element[13] === 1 && "Directa"}
                                {element[13] === 2 &&
                                  "Creditos con obligacion de desembolso"}
                                {element[13] === 3 && "Tarjeta de credito"}
                                {element[13] === 4 &&
                                  "Lineas de utilizacion automatica excepto tarjetas de credito"}
                                {element[13] === 5 &&
                                  "Lineas de credito con compromiso de desembolsar"}
                                {element[13] === 6 &&
                                  "Lineas de credito u operaciones crediticias"}
                              </td>
                              <td>
                                {!pdf ? (
                                  <>
                                    {element[10].toFixed(2)}
                                  </>
                                ) : (
                                  // cedula.selected ? (cedula.selected.externos[`externos${i}`] || "Seleccionar") : "Seleccionar"
                                  element[7].toFixed(2)
                                )}

                              </td>
                              {/* <td>
                                ₡{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[8].toFixed(2)
                                )}{" "}
                              </td> */}
                              <td className="td-hover" id={`externos-td-saldo-${i}`}>
                                ₡{" "}
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[7].toFixed(2)
                                )}{" "}
                              </td>
                              <td>
                                ₡
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  (element[11] + element[12]).toFixed(2)
                                )}{" "}
                              </td>
                              {/* <td>
                                {new Intl.NumberFormat(["ban", "id"]).format(
                                  element[30].toFixed(2)
                                )}{" "}
                              </td> */}

                              <td className="td-hover" id={`externos-td-tasa-${i}`}>{element[18]} </td>
                              <td>{element[15]} </td>
                              <td>
                                {" "}
                                <button
                                  onClick={() => {
                                    handleClickStepFourCheck({
                                      data: element,
                                      type: "externo",
                                      index: i,
                                    });
                                  }}
                                  className={` ${activeCheck.find(
                                    (element) => element.index === i
                                  )
                                    ? "checkButtonActive"
                                    : "checkButton"
                                    }`}
                                >
                                  {activeCheck.find((element) => element.index === i)
                                    ? "SI"
                                    : "NO"
                                  }
                                </button>
                              </td>
                              <CustomTooltip 
                                id={`externos-td-saldo-${i}`} 
                                tooltipText={`Monto Formalizado: ₡ ${new Intl.NumberFormat(["ban", "id"]).format( element[8].toFixed(2))}`} 
                                className="td-tooltip" 
                              />
                              <CustomTooltip 
                                id={`externos-td-tasa-${i}`} 
                                tooltipText={`Plazo Restante (meses): ${new Intl.NumberFormat(["ban", "id"]).format( element[30].toFixed(2) )}`} 
                                className="td-tooltip"
                              />
                            </tr>
                          );
                        }
                      })}

                    {cedula && (
                      <tr>
                        <td colSpan={3}></td>
                        <td>
                          <span className="text-bold">
                            {suma.saldoExterno
                              ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(
                                suma.saldoExterno
                              )}`
                              : ""}
                          </span>
                        </td>
                        <td >
                          <span className="text-bold">
                            {suma.cuotaExterno
                              ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(
                                suma.cuotaExterno
                              )}`
                              : ""}
                          </span>
                        </td>
                        <td colSpan={3}></td>
                      </tr>
                    )}
                  </tbody>
                </Table> : <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </SizeStep>
    </div>
  );
}