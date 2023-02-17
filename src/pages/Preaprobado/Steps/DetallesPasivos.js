import React, { useState, useContext, useEffect } from "react";

// Helpers
import PreAprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../../context/usuario/UsuarioContext";

// Components
import { Row, Col, Table, Card, CardBody, Input, Button, Spinner } from "reactstrap";
import { 
  CustomDropdown 
} from "../../../components";
import CustomTooltip from "../CustomTooltip";

// Styles
import styled from "styled-components";

import { detallePasivosOptions } from "../../../db/dropdownsOptions";

const StylesContainer = styled.div`
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
  const { stepFourCheck, changeStepFourCheck, changeStep, sizeSteps, size } = useContext(PreAprobadoContext);
  const { user } = useContext(UsuarioContext);

  const [isSaving, setIsSaving] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /* const handleChangeSelect = (e, type) => {
    setForm({ ...form, [type]: { ...form[type], [e.target.name]: e.target.value } })
    changeCedula({ ...cedula, selected: { ...form, [type]: { ...form[type], [e.target.name]: e.target.value } } })
  } */

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(4);
    }, 1500);
  }

  return (
    <div className={`dashboard detalles-pasivos step__cards ${animation && !pdf && "step__animation"}`}>
      <StylesContainer pdf={pdf} size2={size} size={sizeSteps.detallesPasivos || null}>

        <Row className="pt-4">
          <Col>
            <Card>
              <CardBody>
                <h5 className="text-bold pb-4">Producto</h5>
                <Row>
                  <Col sm={4}>
                    <CustomDropdown 
                      id="tipo-identificacion"
                      className="mb-0" 
                      classNameButton="mb-0"
                      defaultOption="REFINANCIAMIENTO"
                      options={["CAPITAL DE INVERSIÓN", "CAPITAL DE TRABAJO", "REFINANCIAMIENTO"]}
                    />
                    <p className="text-bold">MONTO MÍNIMO</p>
                    <p className="mt-0">COLONES</p>
                    <p className="text-bold">MONTO MÁXIMO</p>
                    <p className="mt-0">₡50,000</p>
                  </Col>
                  <Col sm={4}>
                    <p className="text-bold">TASA</p>
                    <p className="mt-0">4.00%</p>
                    <p className="text-bold">TIPO TASA</p>
                    <p className="mt-0">56800.00%</p>
                    <p className="text-bold">PLAZO</p>
                    <p className="mt-0">0</p>
                  </Col>
                  <Col sm={4}>
                    <p className="text-bold">FPP (Frecuencia Pago INT)</p>
                    <p className="mt-0">180</p>
                    <p className="text-bold">FPP (Frecuencia Pago Principal)</p>
                    <p className="mt-0">MENSUAL</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
            {/* <SizeSteps className="d-flex" name="detallesPasivos"/> */}
            <h4 className="page-title  general-title">
              Detalles Pasivos Internos
            </h4>
          </Col>

          <Col xs={12} xl={12}>
            <Card>
              <CardBody className="m-lg-0 pb-4">
                {suma.saldoInterno
                  ? 
                    <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                          <th>Tipo Garantía</th>
                          <th>Tipo de Operación</th>
                          <th>Ahorro Potencial</th>
                          <th>Saldo Actual</th>
                          <th>Cuota Mensual</th>
                          <th>Tasa</th>
                          <th>Condición</th>
                          <th>Referencia (Si/No)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cedula?.debts?.data.map((element, i) => {
                          if (element[2] === user.firm_c) {
                            return (
                              <tr key={`pasivos-internos-tr-${i}`}>
                                <td>{element[2]}</td>
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

                                  {!pdf ? 
                                    <>
                                      {/* <Input value={element[10].toFixed(2)} onChange={()=>{}} /> */}
                                      {element[10]}
                                    </>
                                    : // cedula.selected ? (cedula.selected.internos[`internos${i}`] || "Seleccionar") : "Seleccionar"
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
                    </Table> 
                  : 
                  <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
            <h4 className="page-title  general-title">
              Pasivos Externos CIC
            </h4>
          </Col>

          <Col xs={12} xl={12}>
            <Card>
              <CardBody className="m-lg-0 pb-4">
                {true
                  ? 
                    <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                          <th>Entidad</th>
                          <th>Tipo de Operación</th>
                          <th>Ahorro Potencial</th>
                          <th>Saldo Actual</th>
                          <th>Cuota Mensual</th>
                          <th>Tasa</th>
                          <th>Condición</th>
                          <th>Refinancia (SI / NO)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>BAC SAN JOSÉ</td>
                          <td>1</td>
                          <td><Input value="₡35,000" onChange={() => {}} /></td>
                          <td>₡7,500,000</td>
                          <td>₡125,000</td>
                          <td>19%</td>
                          <td>DEUDOR</td>
                          <td>SI</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>NA</td>
                        </tr>
                        <tr>
                          <td colSpan={2}>TOTALES</td>
                          <td>₡35,000</td>
                          <td>₡7,500,000</td>
                          <td>₡125,000</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table> 
                  : 
                  <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
              <h4 className="page-title general-title">Detalles Pasivos Externos No Regulados</h4>
          </Col>
          <Col xs={12} xl={12}>
            <Card>
              <CardBody>
                {suma.saldoExterno 
                  ? 
                    <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                          <th>Entidad</th>
                          <th>Tipo de Operación</th>
                          <th>Ahorro Potencial</th>
                          <th>Saldo Actual</th>
                          <th>Cuota Mensual</th>
                          <th>Tasa</th>
                          <th>Condición</th>
                          <th className="th__width-medium">Refinancia (Si/No)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cedula?.debts?.data.map((element, i) => {
                          if (element[2] !== user.firm_c) {
                            return (
                              <tr key={`pasivos-externos-tr-${i}`}>
                                <td>{element[2]} </td>
                                <td>
                                  {element[13] === 1 && "NA"}
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
                                      {/* {element[10].toFixed(2)} */}
                                      {element[10]}
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
                    </Table> 
                  : 
                    <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} xl={12}>
            {/* <SizeSteps className="d-flex" name="detallesPasivos"/> */}
            <h4 className="page-title  general-title">Composición Final del Refinanciamiento</h4>
          </Col>

          <Col xs={12} xl={12}>
            <Card>
              <CardBody className="m-lg-0 pb-4">
                {true
                  ? 
                    <Table style={{ minWidth: pdf ? "inherit" : "800px" }} responsive>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                          <th>Ahorro potencial</th>
                          <th>Saldo a Refinanciar</th>
                          <th>Cuota que deja de pagar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>₡64,000</td>
                          <td>₡7,678,000</td>
                          <td>₡257,500</td>
                        </tr>
                      </tbody>
                    </Table> 
                  : 
                  <p style={{ fontSize: "14px" }}>No posee registro para esta tabla</p>
                }
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
                           
                            defaultOption="Seleccionar"
                            options={detallePasivosOptions.statusOptions}
                          />
                        </Col>
                        <Col>
                          <label className="text-center general-title">ETAPA</label>
                          <CustomDropdown 
                           
                            defaultOption="Seleccionar"
                            options={detallePasivosOptions.stageOptions}
                          />
                        </Col>
                        <Col>
                          <label className="text-center general-title">STAND BY</label>
                          <CustomDropdown 
                           
                            defaultOption="Seleccionar"
                            options={detallePasivosOptions.standByOptions}
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
