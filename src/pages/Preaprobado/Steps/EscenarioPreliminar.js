import React, { useEffect, useState, useContext } from "react";
// import { FormName } from "redux-form";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import TasaPlazo from "../../../components/TasaPlazo/TasaPlazo"
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
    min-width: 50px ;
    width: 200px ;
  }
`;

export default function EscenarioPreliminar({ animation, StepFourCheck, pdf }) {
  const {
    escenarioPreeliminar,
    changeEscenarioPreeliminar,
    cedula,
    global,
    sizeSteps,
    size,
  } = useContext(PreaprobadoContext);

  const [activeCheckFive, setActiveCheckFive] = useState([]);
  const [reload, setReload] = useState(false);

  const [plazo, setPlazo] = useState("");
  const [tasa, setTasa] = useState("");
  const [plazoTarjeta, setPlazoTarjeta] = useState("");
  const [tasaTarjeta, setTasaTarjeta] = useState("");

  const [form, setForm] = useState({});

  const handleClickStepFourCheck = (val) => {
    const findOne = activeCheckFive.find((element) => element === val);
    let newActiveCheck;
    if (findOne) {
      newActiveCheck = activeCheckFive.filter((element) => element !== val);
    } else {
      newActiveCheck = activeCheckFive;
      newActiveCheck.push(val);
    }
    setReload(!reload);
    setActiveCheckFive(newActiveCheck);

    changeEscenarioPreeliminar({
      ...escenarioPreeliminar,
      check: newActiveCheck,
    });
  };

  useEffect(() => {
    if (cedula) {
      let internal = 0;
      let external = 0;
      let cuotaInternal = 0;
      let cuotaExternal = 0;

      let saldoNo = 0;
      let cuotaNo = 0;
      cedula.debts.data.map((element, i) => {
        const find = StepFourCheck.find((elementTwo) => elementTwo.index === i);
        if (find) {
          if (find.type === "interno") {
            internal += element[7];
            cuotaInternal += element[11] + element[12];
          } else {
            external += element[7];
            cuotaExternal += element[11] + element[12];
          }
        } else {
          saldoNo += element[7];
          cuotaNo += element[11] + element[12];
        }
      });

      const rate_per_period = escenarioPreeliminar.default.ref_tasa / 100 / 12;
      const number_of_payments = escenarioPreeliminar.default.ref_plazo;
      const present_value = internal + external;
      const future_value = 0;
      var q = Math.pow(1 + rate_per_period, number_of_payments);
      var nuevaCuotaRefinanciada =
        (rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * 0));

      // console.log(nuevaCuotaRefinanciada);

      const rate_per_period2 = escenarioPreeliminar.tasaTarjeta / 100 / 12;

      var limiteTarjeta =
        ((cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada) /
          rate_per_period2) *
        (1 -
          Math.pow(1 + rate_per_period2, -escenarioPreeliminar.plazoTarjeta));

      let flag = false;
      activeCheckFive.map((element) => {
        if (element === "2") {
          flag = true;
        }
      });

      setForm({
        saldoNo: saldoNo,
        cuotaNo: cuotaNo,
        saldo: internal + external,
        cuota: nuevaCuotaRefinanciada ? nuevaCuotaRefinanciada : 0,
        saldoTarjeta: limiteTarjeta && flag ? limiteTarjeta : 0,
        cuotaTarjeta:
          nuevaCuotaRefinanciada && flag ? nuevaCuotaRefinanciada : 0,
        saldoTotal: limiteTarjeta
          ? saldoNo + internal + external + (flag ? limiteTarjeta : 0)
          : 0,
        cuotaTotal:
          cuotaNo +
          nuevaCuotaRefinanciada +
          (flag ? nuevaCuotaRefinanciada : 0),
        saldoSi: internal + external,
        ahorroDisponible: nuevaCuotaRefinanciada
          ? cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada
          : 0,
        montoExposicion: limiteTarjeta
          ? internal + external + (flag ? limiteTarjeta : 0)
          : internal + external,
        montoExposicionSave: limiteTarjeta
          ? internal + external + (flag ? limiteTarjeta : 0)
          : internal + external,
        cuotaSuma: cuotaExternal + cuotaInternal,
        tarjetaCredito: limiteTarjeta ? limiteTarjeta / global.tipo_cambio : 0,

        saldoTotalSave: saldoNo,
        cuotaTotalSave: cuotaNo + nuevaCuotaRefinanciada,
        saldoSiInternal: internal,
        saldoSiExternal: external,
      });

      changeEscenarioPreeliminar({
        ...escenarioPreeliminar,
        saldoNo: saldoNo,
        cuotaNo: cuotaNo,
        saldo: internal + external,
        cuota: nuevaCuotaRefinanciada ? nuevaCuotaRefinanciada : 0,
        saldoTarjeta: limiteTarjeta && flag ? limiteTarjeta : 0,
        cuotaTarjeta:
          nuevaCuotaRefinanciada && flag ? nuevaCuotaRefinanciada : 0,
        saldoTotal: limiteTarjeta
          ? saldoNo + internal + external + (flag ? limiteTarjeta : 0)
          : 0,
        cuotaTotal:
          cuotaNo +
          nuevaCuotaRefinanciada +
          (flag ? nuevaCuotaRefinanciada : 0),
        saldoSi: internal + external,
        ahorroDisponible: nuevaCuotaRefinanciada
          ? cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada
          : 0,
        montoExposicion: limiteTarjeta
          ? internal + external + (flag ? limiteTarjeta : 0)
          : internal + external,
        montoExposicionSave: limiteTarjeta
          ? internal + external + (flag ? limiteTarjeta : 0)
          : internal + external,
        cuotaSuma: cuotaExternal + cuotaInternal,
        tarjetaCredito: limiteTarjeta ? limiteTarjeta / global.tipo_cambio : 0,

        saldoTotalSave: saldoNo,
        cuotaTotalSave: cuotaNo + nuevaCuotaRefinanciada,
        saldoSiInternal: internal,
        saldoSiExternal: external,
        cuotaTotalSi: cuotaInternal + cuotaExternal,
      });

      setActiveCheckFive(escenarioPreeliminar.check || []);
      setPlazo(escenarioPreeliminar.default.ref_plazo);
      setTasa(escenarioPreeliminar.default.ref_tasa);
      setPlazoTarjeta(escenarioPreeliminar.default.tc_plazo);

      setTasaTarjeta(escenarioPreeliminar.default.tc_tasa);
    } else {
      setForm({
        saldoNo: 0,
        cuotaNo: 0,
        saldo: 0,
        cuota: 0,
        saldoTarjeta: 0,
        cuotaTarjeta: 0,
        saldoTotal: 0,
        cuotaTotal: 0,
      });
    }
  }, [StepFourCheck, global, reload]);

  const parseValue = (value) => {
    return new Intl.NumberFormat(["ban", "id"]).format((value || 0).toFixed(2));
  };

  useEffect(() => {
    setPlazo(escenarioPreeliminar.default.ref_plazo);
    setTasa(escenarioPreeliminar.default.ref_tasa);
    setPlazoTarjeta(escenarioPreeliminar.default.tc_plazo);
    setTasaTarjeta(escenarioPreeliminar.default.tc_tasa);
  }, [escenarioPreeliminar.default]);

  useEffect(() => {
    if (plazo && tasa) {
      const rate_per_period = tasa / 100 / 12;
      const number_of_payments = plazo;
      const present_value = form.saldoSi;
      const future_value = 0;
      var q = Math.pow(1 + rate_per_period, number_of_payments);
      var result =
        (rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * 0));

      let result2 = null;
      const rate_per_period2 = tasaTarjeta / 100 / 12;

      if (plazoTarjeta && tasaTarjeta) {
        result2 =
          ((escenarioPreeliminar.cuotaSuma - result) / rate_per_period2) *
          (1 - Math.pow(1 + rate_per_period2, -plazoTarjeta));
      }

      let flag = false;

      activeCheckFive.map((element) => {
        if (element === "2") {
          flag = true;
        }
      });

      setForm({
        ...form,
        ahorroDisponible: result ? escenarioPreeliminar.cuotaSuma - result : 0,
        cuota: result || 0,
        tarjetaCredito: result2 ? result2 / global.tipo_cambio : 0,
        saldoTarjeta: result2 && flag ? result2 : 0,
        cuotaTarjeta:
          result && flag ? escenarioPreeliminar.cuotaSuma - result : 0,
        saldoTotal: result2
          ? escenarioPreeliminar.saldoTotalSave +
          escenarioPreeliminar.saldoSi +
          (flag ? result2 : 0)
          : 0,
        cuotaTotal: result
          ? escenarioPreeliminar.cuotaTotalSave +
          (flag ? escenarioPreeliminar.cuotaSuma - result : 0)
          : 0,
        montoExposicion: result2
          ? (escenarioPreeliminar.saldoSi || 0) + (flag ? result2 : 0)
          : escenarioPreeliminar.saldoSi || 0,
        montoExposicionSave: result2
          ? escenarioPreeliminar.saldoSi + (flag ? result2 : 0)
          : escenarioPreeliminar.saldoSi,
      });
      changeEscenarioPreeliminar({
        ...escenarioPreeliminar,
        plazo,
        tasa,
        plazoTarjeta,
        tasaTarjeta,
        ahorroDisponible: result ? escenarioPreeliminar.cuotaSuma - result : 0,
        cuota: result || 0,
        tarjetaCredito: result2 ? result2 / global.tipo_cambio : 0,
        saldoTarjeta: result2 && flag ? result2 : 0,
        cuotaTarjeta:
          result && flag ? escenarioPreeliminar.cuotaSuma - result : 0,
        saldoTotal: result2
          ? escenarioPreeliminar.saldoTotalSave +
          escenarioPreeliminar.saldoSi +
          (flag ? result2 : 0)
          : 0,
        cuotaTotal: result
          ? escenarioPreeliminar.cuotaTotalSave +
          (flag ? escenarioPreeliminar.cuotaSuma - result : 0)
          : 0,
        montoExposicion: result2
          ? (escenarioPreeliminar.saldoSi || 0) + (flag ? result2 : 0)
          : escenarioPreeliminar.saldoSi || 0,
        montoExposicionSave: result2
          ? escenarioPreeliminar.saldoSi + (flag ? result2 : 0)
          : escenarioPreeliminar.saldoSi,
      });
    }
  }, [plazo, tasa, plazoTarjeta, tasaTarjeta, global, reload]);

  const tablaDataDeudas = [
    { title: "SALDO CON RESTO DEL SISTEMA FINANCIERO NACIONAL", saldos: form.saldoNo, cuotas: form.cuotaNo },
    { title: "MONTO TOTAL REFINANCIAR", percent: true, saldos: form.saldo, cuotas: form.cuota },
    { title: "SALDO A OTORGAR EN TARJETA DE CREDITO", saldos: form.saldoTarjeta, cuotas: form.cuotaTarjeta },
    { title: "SALDO TOTAL", saldos: form.saldoTotal, cuotas: form.cuotaTotal },
  ]
  const tablaEscenarioPreeliminar = [
    { title: "LIMITE DISPONIBLE EN TARJETA DE CREDITO", percent: true, montos: form.tarjetaCredito, button: "2", currency: "$" },
    { title: "AHORRO DISPONIBLE", montos: form.ahorroDisponible, button: "1", alert: true, currency: "₡" },
    { title: 'MEDIO DE PAGO "DEDUCCION DE PLANILLA"', montos: null, button: "3", currency: "₡" },
    { title: "CLIENTE TRASPASA PAGO DE SALARIO", montos: null, button: "4", currency: "₡" },
  ]

  return (
    <div className={`dashboard escenario-preliminar step__cards ${animation && !pdf && "step__animation"}`} >
      <SizeStep pdf={pdf} size2={size} size={sizeSteps.escenarioPreeliminar || null}>
        <Row className="pt-4">
          <Col xs={12} xl={12}>
            {/* <SizeSteps className="d-flex" name="escenarioPreeliminar" /> */}
            <h4 className="page-title general-title">Detalle consolidado de deudas internas y externas</h4>
          </Col>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <Table responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                  <thead>
                    <tr>
                      <th className="table-name"></th>
                      {/* <th className="table-custom-input">Tasa</th>
                      <th className="table-custom-input">Plazo/Meses</th> */}
                      <th className="w-thin">Saldos</th>
                      <th className="w-thin">Cuotas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaDataDeudas.map((element, index) => 
                      <tr key={`detalle-table-row-${index}`}>
                        <td 
                          className="text-left table-name"
                          style={{ alignItems: "center" }}
                          {... element.percent && {id: `deudas-td-tasa-tooltip-${index}`, className: 'text-left table-name td-hover'}} 
                        >
                          {element.title}
                        </td>
                        {/* {element.percent && <TasaPlazo plazo={plazo} setPlazo={setPlazo} pdf={pdf} tasa={tasa} setTasa={setTasa} />}
                        {!element.percent && <td colSpan={2}></td>} */}
                        <td className="w-thin" {... element.percent && {id: `deudas-td-plazo-meses-tooltip-${index}`, className: 'td-hover'}}>₡ {parseValue(element.saldos)}</td>
                        <td className="w-thin">₡ {parseValue(element.cuotas)}</td>
                        {element.percent && <CustomTooltip className="td-tooltip" id={`deudas-td-tasa-tooltip-${index}`} tooltipText={`Tasa: ${tasa} %`} />}
                        {element.percent && <CustomTooltip className="td-tooltip" id={`deudas-td-plazo-meses-tooltip-${index}`} tooltipText={`Plazo/Meses: ${plazo} Meses`} />}
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} xl={12}>
            <h4 className="page-title general-title">Escenario Preliminar</h4>
          </Col>
          <Col md={12} lg={12} >
            <Card>
              <CardBody>
                <Table responsive style={{ minWidth: pdf ? "inherit" : "450px" }}>
                  <thead>
                    <tr>
                      <th className="table-name-2"></th>
                      {/* <th>Tasa</th>
                      <th>Plazo/Meses</th> */}
                      <th className="w-thin">Montos</th>
                      <th className="w-thin">Vincula producto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaEscenarioPreeliminar.map((element, index) => 
                      <tr key={`detalle-table-row-${index}`}>
                        <td 
                          className="text-left table-name-2"
                          {... element.percent && {id: `tarjeta-td-tasa-tooltip-${index}`, className: 'text-left table-name-2 td-hover'}}
                        >
                          {element.title}
                        </td>
                        {/* {element.percent && <TasaPlazo plazo={plazoTarjeta} setPlazo={setPlazoTarjeta} pdf={pdf} tasa={tasaTarjeta} setTasa={setTasaTarjeta} />}
                        {!element.percent && <td colSpan={2}></td>} */}
                        <td 
                          className="w-thin"
                          {... element.percent && {id: `tarjeta-td-plazo-meses-tooltip-${index}`, className: 'text-center table-name-2 td-hover'}}
                        > 
                          {element.montos && element.alert  ? 
                            <span
                              style={{ background: element.montos[0] === "-" ? "#f46a6a" : "#5bbd91" }}
                            >
                              ₡ {parseValue(element.montos)}
                            </span> 
                            : `${element.currency} ${parseValue(element.montos)}`
                          }
                        </td>
                        <td className="w-thin">
                          <button
                            onClick={() => { handleClickStepFourCheck(element.button); }}
                            className={` ${activeCheckFive.find((elementTwo) => elementTwo === element.button)
                              ? "checkButtonActive"
                              : "checkButton"
                              }`}
                          >
                            {activeCheckFive.find((elementTwo) => elementTwo === element.button)
                              ? "SI"
                              : "NO"
                            }
                          </button>
                        </td>
                        {element.percent && <CustomTooltip className="td-tooltip" id={`tarjeta-td-tasa-tooltip-${index}`} tooltipText={`Tasa: ${tasaTarjeta} %`} />}
                        {element.percent && <CustomTooltip className="td-tooltip" id={`tarjeta-td-plazo-meses-tooltip-${index}`} tooltipText={`Plazo/Meses: ${plazoTarjeta} Meses`} />}
                      </tr>
                    )}
                  </tbody>
                </Table >
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12} xl={12}>
            <h4 className="page-title general-title">Valoración de límites normativas</h4>
          </Col>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <Table className="table-3" responsive style={{ minWidth: pdf ? "inherit" : "850px" }}>
                  <thead>
                    <tr>
                      <th className="table-name-2"></th>
                      <th>Resolución</th>
                      <th>Monto Permitido</th>
                      <th className="w-thin">Monto Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left table-name-2">
                        Monto de exposición máxima para este tipo de operación
                      </td>
                      {form.montoExposicionSave <
                        (global ? global.sf_mto_max : 0) ? (
                        <td>
                          <div className="table-feedback bg-success text-white">
                            Monto dentro de lo normado
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div className="table-feedback bg-danger text-white">
                            Sobrepasa monto normado
                          </div>
                        </td>
                      )}
                      <td className="text-center">
                        ₡
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          global ? global.sf_mto_max : 0
                        )}
                      </td>
                      <td className="text-center">
                        ₡ {parseValue(form.montoExposicion)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left">
                        Monto máximo de para este mes
                      </td>
                      {form.montoExposicionSave <
                        (global ? global.mes_mto_max : 0) ? (
                        <td className="w-wide">
                          <div className="table-feedback bg-success text-white">
                            Monto dentro de lo normado
                          </div>
                        </td>
                      ) : (
                        <td className="w-wide">
                          <div className="table-feedback bg-danger text-white">
                            Sobrepasa monto normado
                          </div>
                        </td>
                      )}
                      <td className="text-center w-thin">
                        ₡
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          global ? global.mes_mto_max : 0
                        )}
                      </td>
                      <td className="text-center w-thin">₡ {parseValue(form.montoExposicion)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody >
            </Card >
          </Col>
        </Row>
      </SizeStep >
    </div >
  );
}