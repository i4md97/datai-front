import React, { useState, useContext, useEffect, useCallback } from "react";

// Helpers
import PreAprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import { usePreaprobado } from "../../../context/preaprobado/PreaprobadoContext";

// Components
import { Row, Col, Table, Card, CardBody, Button, Spinner } from "reactstrap";
import { 
  CustomDropdown,
  ControlledInput,
  EtapaSolicitud,
  ButtonYesNo
} from "../../../components";
import { detallePasivosOptions } from "../../../db/dropdownsOptions";

import { db_interna } from "../../../db/db_interna";
import { financiamiento } from "../../../db/parametros";
import { db_cic } from "../../../db/db_cic";
import { db_buro } from "../../../db/db_buro";

export default function DetallesPasivos({ animation, cedula, pdf }) {
  const { changeStep } = useContext(PreAprobadoContext);
  const { setDetallesPasivos } = usePreaprobado();

  const [isSaving, setIsSaving] = useState(false);
  const [producto, setProducto] = useState("REFINANCIAMIENTO");

  const [dataProducto, setDataProducto] = useState({});
  const [dataPersonal, setDataPersonal] = useState({});
  const [externosCIC, setExternosCIC] = useState({});
  const [externosBuro, setExternosBuro] = useState({});

  const [pasivosInternos, setPasivosInternos] = useState({
    value: 0,
    ahorroPotencial: 0,
    saldoActual: 0,
    cuotaMensual: 0,
  });

  const [pasivosExternos, setPasivosExternos] = useState({
    value: 0,
    ahorroPotencial: 0,
    saldoActual: 0,
    cuotaMensual: 0,
  });

  const [noRegulados, setNoRegulados] = useState({
    value: 0,
    ahorroPotencial: 0,
    saldoActual: 0,
    cuotaMensual: 0,
  });

  const [composicionFinal, setComposiconFinal] = useState({
    value: 0,
    ahorroPotencial: 0,
    saldoActual: 0,
    cuotaMensual: 0,
  })

  const triggerSetters = useCallback(() => {
    sumColumn(".pasivos-internos-ahorro__td input", "value", setPasivosInternos, 'ahorroPotencial');
    sumColumn(".pasivos-internos-saldo__td", "innerText", setPasivosInternos, "saldoActual");
    sumColumn(".pasivos-internos-cuota__td", "innerText", setPasivosInternos, "cuotaMensual");
    // Pasivos Externos
    sumColumn(".pasivos-externos-ahorro__td input", "value", setPasivosExternos, "ahorroPotencial");
    sumColumn(".pasivos-externos-saldo__td", "innerText", setPasivosExternos, "saldoActual");
    sumColumn(".pasivos-externos-cuota__td", "innerText", setPasivosExternos, "cuotaMensual");
    // Externos no regulados
    sumColumn(".no-regulados-ahorro__td input", "value", setNoRegulados, 'ahorroPotencial')
    sumColumn(".no-regulados-saldo__td", "innerText", setNoRegulados, "saldoActual");
    sumColumn(".no-regulados-cuota__td", "innerText", setNoRegulados, "cuotaMensual");
  }, []);

  useEffect(() => {
    const productFound = financiamiento.find(item => item.producto === producto);
    if (productFound) {
      setDataProducto(productFound);
    }
  }, [producto]);

  useEffect(() => {
    if (cedula) {
      const dbInternaFound = db_interna.find(item => item.no_identif === cedula.personal_data.tipo_id);
      const cicFound = db_cic.find(item => item.no_identif === cedula.personal_data.tipo_id);
      const buroFound = db_buro.find(item => item.no_identif === cedula.personal_data.tipo_id);
      if (cicFound) {
        setExternosCIC(cicFound);
      }
      if (dbInternaFound) {
        setDataPersonal(dbInternaFound);
      }
      if (buroFound) {
        setExternosBuro(buroFound);
      }
      setTimeout(() => {
        triggerSetters();
      });
    }
  },[cedula, triggerSetters]);

  useEffect(() => {
    const sumObject = {
      ahorroPotencial: pasivosInternos.ahorroPotencial + pasivosExternos.ahorroPotencial + noRegulados.ahorroPotencial,
      saldoActual: pasivosInternos.saldoActual + pasivosExternos.saldoActual + noRegulados.saldoActual,
      cuotaMensual: pasivosInternos.cuotaMensual + pasivosExternos.cuotaMensual + noRegulados.cuotaMensual
    }
    setComposiconFinal(sumObject);
    setDetallesPasivos( prev => ({...prev, ...sumObject}));
  }, [pasivosInternos, pasivosExternos, noRegulados, setDetallesPasivos]);

  const productoChangeHandler = (value) => {
    setProducto(value);
  }

  const changeReferenciaHandler = (setter, parameter, value) => {
    setter(prev => ({...prev, [parameter]: value}));
  }

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      changeStep(4);
    }, 1500);
  }

  const sumColumn = (targetClass, selector, stateSetter, option) => {
    if (targetClass) {
      const colElements = document.querySelectorAll(`${targetClass}`);
      const colValues = [...colElements].map(element => element[selector].replace(/[^\d,]+/g, '').replace(/,/g, '.'));
      const colSum = colValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
      stateSetter(prev => ({...prev, [option]: colSum}));
    }
  }

  const updateValueHandler = (setter, property, value) => {
    setter(prev => ({...prev, [property]: value}));
  }

  return (
    <div className={`dashboard detalles-pasivos step__cards ${animation && !pdf && "step__animation"}`}>
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
                    defaultOption={producto}
                    options={detallePasivosOptions.productoOptions}
                    callback={productoChangeHandler}
                  />
                  <p className="text-bold">MONTO MÍNIMO</p>
                  <p className="mt-0">{dataProducto.MONTO_MINIMO}</p>
                  <p className="text-bold">MONTO MÁXIMO</p>
                  <p className="mt-0">{dataProducto.MONTO_MAXIMO}</p>
                </Col>
                <Col sm={4}>
                  <p className="text-bold">TASA</p>
                  <p className="mt-0">{dataProducto.TASA_TOTAL}</p>
                  <p className="text-bold">TIPO TASA</p>
                  <p className="mt-0">{dataProducto.TIPO_DE_TASA}</p>
                  <p className="text-bold">PLAZO</p>
                  <p className="mt-0">{dataProducto.PLAZO_MESES}</p>
                </Col>
                <Col sm={4}>
                  <p className="text-bold">FPP (Frecuencia Pago INT)</p>
                  <p className="mt-0">{dataProducto.FPI_INT}</p>
                  <p className="text-bold">FPP (Frecuencia Pago Principal)</p>
                  <p className="mt-0">{dataProducto.FPP_PRINC}</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12}>
          <h4 className="page-title  general-title">Pasivos Internos</h4>
        </Col>

        <Col xs={12} xl={12}>
          <Card>
            <CardBody className="m-lg-0 pb-4">
              {cedula && dataPersonal
                ? 
                  <Table style={{ minWidth: "800px" }} responsive>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <th style={{minWidth: "110px"}}>Tipo Garantía</th>
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
                        <td>{dataPersonal.gtia}</td>
                        <td>{dataPersonal.tipo_oper}</td>
                        <td className="pasivos-internos-ahorro__td p-1">
                          <ControlledInput 
                            className="bg-green"
                            type="number"
                            defaultOption={pasivosInternos.value}
                            dbValue={"0"}
                            callback={() => {
                              sumColumn(".pasivos-internos-ahorro__td input", "value", setPasivosInternos, 'ahorroPotencial');
                              updateValueHandler(setPasivosInternos, "value")
                            }} 
                          />
                        </td>
                        <td className="pasivos-internos-saldo__td" /* id={`internos-td-saldo-${i}`} */>
                          {dataPersonal.saldo_credito}
                        </td>
                        <td className="pasivos-internos-cuota__td">
                          {dataPersonal.cuota}
                        </td>
                        <td /* className="td-hover" id={`internos-td-tasa-${i}`} */>{dataPersonal.tasa}</td>
                        <td>{dataPersonal.condicion}</td>
                        <td>
                          <ButtonYesNo callback={changeReferenciaHandler} setter={setDataPersonal} parameter="refinancia" />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>Totales</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(pasivosInternos.ahorroPotencial)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(pasivosInternos.saldoActual)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(pasivosInternos.cuotaMensual)}</td>
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
          <h4 className="page-title  general-title">
            Pasivos Externos CIC
          </h4>
        </Col>

        <Col xs={12} xl={12}>
          <Card>
            <CardBody className="m-lg-0 pb-4">
              {cedula && externosCIC
                ? 
                  <Table style={{ minWidth: "800px" }} responsive>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <th style={{minWidth: "110px"}}>Entidad</th>
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
                        <td>{externosCIC.entidad}</td>
                        <td>{externosCIC.tipo_operacion}</td>
                        <td className="p-1 pasivos-externos-ahorro__td">
                          <ControlledInput 
                            className="bg-green" 
                            type="number" 
                            defaultOption={pasivosExternos.value}
                            callback={() => {
                              sumColumn(".pasivos-externos-ahorro__td input", "value", setPasivosExternos, "ahorroPotencial");
                              updateValueHandler(setPasivosExternos, "value");
                            }}
                          />
                        </td>
                        <td className="pasivos-externos-saldo__td">{externosCIC.saldo_credito}</td>
                        <td className="pasivos-externos-cuota__td">{externosCIC.cuota_mensual}</td>
                        <td>{externosCIC.tasa}</td>
                        <td>{externosCIC.condicion}</td>
                        <td><ButtonYesNo callback={changeReferenciaHandler} setter={setExternosCIC} parameter={"refinancia"} /></td>
                      </tr>
                      <tr>
                        <td colSpan={2}>TOTALES</td>
                        <td>₡ {new Intl.NumberFormat("de-DE").format(pasivosExternos.ahorroPotencial)}</td>
                        <td>₡ {new Intl.NumberFormat("de-DE").format(pasivosExternos.saldoActual)}</td>
                        <td>₡ {new Intl.NumberFormat("de-DE").format(pasivosExternos.cuotaMensual)}</td>
                        <td colSpan={"100%"}></td>
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
              { cedula && externosBuro
                ? 
                  <Table style={{ minWidth: "800px" }} responsive>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <th style={{minWidth: "110px"}}>Entidad</th>
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
                      <tr>
                        <td>{externosBuro.endidad}</td>
                        <td>
                          {externosBuro.tipo_operacion}
                        </td>
                        <td className="p-1 no-regulados-ahorro__td">
                          <ControlledInput 
                            className="bg-green" 
                            type="number" 
                            defaultOption={noRegulados.ahorroPotencial}
                            callback={() => {
                              sumColumn(".no-regulados-ahorro__td input", "value", setNoRegulados, 'ahorroPotencial');
                              updateValueHandler(setNoRegulados, "value");
                            }} 
                          />
                        </td>
                        <td className="no-regulados-saldo__td">
                          {externosBuro.saldo_actual}
                        </td>
                        <td className="no-regulados-cuota__td">
                          {externosBuro.cuota_mensual}
                        </td>
                        <td>{externosBuro.tasa}</td>
                        <td>{externosBuro.condicion}</td>
                        <td>
                          <ButtonYesNo callback={changeReferenciaHandler} setter={setExternosBuro} parameter={"refinacia"} />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>TOTALES</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(noRegulados.ahorroPotencial)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(noRegulados.saldoActual)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(noRegulados.cuotaMensual)}</td>
                        <td colSpan={"100%"}></td>
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
          <h4 className="page-title  general-title">Composición Final del Refinanciamiento</h4>
        </Col>

        <Col xs={12} xl={12}>
          <Card>
            <CardBody className="m-lg-0 pb-4">
              {cedula
                ? 
                  <Table style={{ minWidth: "800px" }} responsive>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                        <th>Ahorro potencial</th>
                        <th>Saldo a Refinanciar</th>
                        <th>Cuota que deja de pagar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>₡{new Intl.NumberFormat("de-DE").format(composicionFinal.ahorroPotencial)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(composicionFinal.saldoActual)}</td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(composicionFinal.cuotaMensual)}</td>
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
