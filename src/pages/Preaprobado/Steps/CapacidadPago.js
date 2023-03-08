import React, { useState, useEffect } from "react";

// Helpers
// import UsuarioContext from "../../../context/usuario/UsuarioContext";
// import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { ControlledInput, EtapaSolicitud, MultipleTestingAnalytics } from "../../../components";

export default function CapacidadPago({
  animation
}) {

  // Balance General
  const [balanceGeneral, setBalanceGeneral] = useState({});
  const [totalActivos, setTotalActivos] = useState(0);
  const [totalPasPat, setTotalPasPat] = useState(0);
  
  // Flujo Neto Efectivo
  const currentDate = new Date().toISOString().substring(0, 10);;
  const [month, setMonth] = useState(currentDate);
  // -- Ingresos
  const [ingresos, setIngresos] = useState({});
  const [ingresosTotals, setIngresosTotals] = useState({total_month_1: "-", total_month_1_perc: ""});
  // -- Gastos
  const [gastos, setGastos] = useState({});
  const [gastosTotals, setGastosTotals] = useState({});

  // Flujo Neto de Efectivo
  const [flujoNeto, setFlujoNeto] = useState({});
  // const [flujoNetoTotals, setFlujoNetoTotals] = useState({});
  // Flujo de Efectivo
  const [flujoEfectivo, setFlujoEfectivo] = useState({});
  
  const flujoNetoData = {
    chartData: [
      { name: 'Nov-22', a: -1500, b: 500, c: 0, d: 2000 },
      { name: 'Dec-22', a: -3500, b: -2000, c: 0, d: 1500 },
      { name: 'Jan-23', a: -500, b: -1700, c: 0, d: 1000 },
      { name: 'Feb-23', a: -500, b: -1500, c: 0, d: 1000 },
      { name: 'Mar-23', a: -500, b: -1000, c: 0, d: 1000 },
      { name: 'Apr-23', a: -500, b: -500, c: 0, d: 1200 },
      { name: 'May-23', a: -1000, b: -500, c: 0, d: 1000 },
      { name: 'Jun-23', a: -500, b: 0, c: 0, d: 1000 },
      { name: 'Jul-23', a: -500, b: 300, c: 0, d: 1000 },
      { name: 'Aug-23', a: -500, b: 800, c: 0, d: 1000 },
      { name: 'Sep-23', a: -500, b: 1000, c: 0, d: 1000 },
      { name: 'Oct-23', a: -500, b: 1500, c: 0, d: 1000 },
      { name: 'Nov-23', a: -500, b: 2000, c: 0, d: 1000 },
    ],
    legends: ["INCOMES", "SPENDS", "CF", "CERO"],
  };

  // Balance General
  useEffect(()=>{
    sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
    sumColumnHandler(".paviso-sum__td input", "value", setTotalPasPat);
  },[]);

  const getCellsSum = (target, selector) => {
    const sumCells = document.querySelectorAll(target);
    const cellValues = [...sumCells].map(element => element[selector].replace("₡", "").replaceAll(".", ""));
    const colSum = cellValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
    return colSum;
  }

  useEffect(()=>{
    setTimeout(() => {
      const colSum = getCellsSum(".ingreso-sum__input", "value");
      // right section
      const months2Sum = getCellsSum(".ingresos-sum-month_2__input", "value");
      const months3Sum = getCellsSum(".ingresos-sum-month_3__input", "value");
      const months4Sum = getCellsSum(".ingresos-sum-month_4__input", "value");
      const months5Sum = getCellsSum(".ingresos-sum-month_5__input", "value");
      const months6Sum = getCellsSum(".ingresos-sum-month_6__input", "value");
      const months7Sum = getCellsSum(".ingresos-sum-month_7__input", "value");
      const months8Sum = getCellsSum(".ingresos-sum-month_8__input", "value");
      const months9Sum = getCellsSum(".ingresos-sum-month_9__input", "value");
      const months10Sum = getCellsSum(".ingresos-sum-month_10__input", "value");
      const months11Sum = getCellsSum(".ingresos-sum-month_11__input", "value");
      const months12Sum = getCellsSum(".ingresos-sum-month_12__input", "value");
      const months13Sum = getCellsSum(".ingresos-sum-month_13__input", "value");
      const proySum = getCellsSum(".ingresos-sum-proy1__td", "innerText");

      setIngresosTotals(prev => ({
        ...prev, 
        total_month_1: colSum,
        total_month_1_perc: ingresos.ventas_no * (ingresos.ventas_fijos * (ingresos.month_1_perc / 100)),
        total_month_2: months2Sum,
        total_month_3: months3Sum,
        total_month_4: months4Sum,
        total_month_5: months5Sum,
        total_month_6: months6Sum,
        total_month_7: months7Sum,
        total_month_8: months8Sum,
        total_month_9: months9Sum,
        total_month_10: months10Sum,
        total_month_11: months11Sum,
        total_month_12: months12Sum,
        total_month_13: months13Sum,
        total_proy_1: proySum,
        total_proy_2: proySum,
        total_proy_3: proySum,
      }));
    });
  },[ingresos]);

  useEffect(()=>{
    setTimeout(() => {
      // left table
      const colSum = getCellsSum(".gastos-sum__td", "innerText");
      const ventasSum = getCellsSum(".gasto-ventas-sum__input", "value");
      const opSum = getCellsSum(".gasto-op-sum__input", "value");
      const manoObraSum = getCellsSum(".gasto-costo-mano-obra-sum__input", "value");
      const costoFamiliaSum = getCellsSum(".gasto-costo-familia-sum__input", "value");
      const costoFinancieroSum = getCellsSum(".gasto-costo-financiero-sum__input", "value");
      // right table
      const costoVentasDesc = getCellsSum(".costo-ventas-desc-sum__input", "value");
      const operativos1Sum = getCellsSum(".gasto-op-1-sum__input", "value");
      const operativo2Sum = getCellsSum(".gasto-op-2-sum__input", "value");
      const operativo3Sum = getCellsSum(".gasto-op-3-sum__input", "value");
      const operativo4Sum = getCellsSum(".gasto-op-4-sum__input", "value");
      const operativo5Sum = getCellsSum(".gasto-op-5-sum__input", "value");
      // admin
      const manoObraMonthsSum = getCellsSum(".adm-mano-obra-sum__input", "value");
      const cargasSocialesSum = getCellsSum(".sd-cargas-sociales-sum__input", "value");
      const pensionAlimenticiaSum = getCellsSum(".pension-alimenticia-sum__input", "value");
      const gastoFamiliarSum = getCellsSum(".gasto-familiar-sum__input", "value");
      const otrasDeduccionesSum = getCellsSum(".otras-deducciones-sum__input", "value");
      const cuotaHipotecariaSum = getCellsSum(".cuota-hipotecarios-months-sum__input", "value");
      const cuotaEmpSum = getCellsSum(".cuota-emp-months-sum__input", "value");
      const cuotaPersonalesSum = getCellsSum(".cuota-personales-months-sum__input", "value");

      setGastosTotals(prev => ({
        ...prev, 
        total_month_1: colSum,
        costo_ventas_month_1: ventasSum,
        operativo_total_month_1: opSum,
        admin_total_month_1: manoObraSum + costoFamiliaSum + costoFinancieroSum,
        costo_familia_total_month_1: costoFamiliaSum,
        financiero_total_month_1: costoFinancieroSum,
        costo_ventas_months: costoVentasDesc,
        operativo_1_months: operativos1Sum,
        operativo_2_months: operativo2Sum,
        operativo_3_months: operativo3Sum,
        operativo_4_months: operativo4Sum,
        operativo_5_months: operativo5Sum,
        mano_obra_otros_months: manoObraMonthsSum,
        cargas_sociales_months: cargasSocialesSum,
        pension_alimenticia_months: pensionAlimenticiaSum,
        gastos_familiares_months: gastoFamiliarSum,
        otras_deducciones_months: otrasDeduccionesSum,
        cuota_hipotecaria_months: cuotaHipotecariaSum,
        cuota_emp_months: cuotaEmpSum,
        cuota_personales_months: cuotaPersonalesSum,
      }));
    });
  },[gastos]);
  
  useEffect(()=>{
    setTimeout(() => {
      const colSumTds = getCellsSum(".flujo-efectivo-sum__td", "innerText");
      const colSumInputs = getCellsSum(".flujo-efectivo-sum__input", "value");
      const reinversionSum = getCellsSum(".reinversion-sum__input", "value");
      
      setFlujoEfectivo(prev => ({
        ...prev, 
        total_month_1: colSumTds + colSumInputs,
        reinversion_months: reinversionSum,
      }));
    });
  },[flujoEfectivo]);

  const sumColumnHandler = (targetClass, selector, stateSetter) => {
    if (targetClass) {
      const colElements = document.querySelectorAll(`${targetClass}`);
      const colValues = [...colElements].map(element => element[selector].replace(/[^\d,]+/g, '').replace(/,/g, ''));
      const colSum = colValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
      stateSetter(colSum);
    }
  }
  const updateValueHandler = (setter, property, value) => {
    if (property) {
      setter(prev => ({...prev, [property]: value}));
    } else {
      setter(value);
    }
  }
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = (date, monthsAdded) => {
    const newDate = new Date(date);
    const dateMonth = newDate.getMonth() + monthsAdded;
    // If value is greater than 12 is another year
    const year = months[dateMonth] ? newDate.getFullYear() : newDate.getFullYear() + 1;
    const labelMonth = months[dateMonth] ? months[dateMonth] : months[dateMonth - 12];
    return `${labelMonth}-${year.toString().substring(2)}`;
  }

  return (
    <div className={`dashboard capacidad-pago capacidad-pago step__cards ${animation ? "step__animation" : ""}`}>
      <Row className="pt-4">
        <Col>
          <Card>
            <CardBody>
              <Row className="pb-3">
                <Col>
                  <h5 className="text-bold">Balance General</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Activos Circulantes</th>
                        <th>Valor Estimado</th>
                      </tr>
                  </thead>
                    <tbody>
                      <tr>
                        <td>Inventario e inversiones</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡500,000" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "inventario_inversiones");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Otros AC</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡0" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "otros_ac");
                          }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-bold">Activos Fijos</td>
                        <td className="text-bold">Valor Estimado</td>
                      </tr>
                      <tr>
                        <td>Propiedades actuales</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡25,000,000" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "propiedades_actuales");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Vehículos actuales</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡1,000,000" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "vehiculos_actuales");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Mobiliario y equipo</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡1,500,000" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "mobiliario_equipo");
                          }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Otros AF</td>
                        <td className="p-0 activos-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡0" 
                            callback={() => {
                              sumColumnHandler(".activos-sum__td input", "value", setTotalActivos);
                              updateValueHandler(setBalanceGeneral, "otros_af");
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12} sm={6}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Pasivo</th>
                        <th>Valor Estimado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pasivo CP</td>
                        <td className="p-0 paviso-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡1,500,000" 
                            callback={() => {
                              sumColumnHandler(".paviso-sum__td input", "value", setTotalPasPat);
                              updateValueHandler(setBalanceGeneral, "pasivo_cp");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Pasivo LP</td>
                        <td className="p-0 paviso-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡25,000,000" 
                            callback={() => {
                              sumColumnHandler(".paviso-sum__td input", "value", setTotalPasPat);
                              updateValueHandler(setBalanceGeneral, "pasivo_lp");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-bold">Patrimonio</td>
                        <td className="text-bold">Valor Estimado</td>
                      </tr>
                      <tr>
                        <td>Capital Soc</td>
                        <td className="p-0 paviso-sum__td">
                          <ControlledInput className="bg-green" defaultValue="₡1,500,000" 
                            callback={() => {
                              sumColumnHandler(".paviso-sum__td input", "value", setTotalPasPat);
                              updateValueHandler(setBalanceGeneral, "capital_soc");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={6}>
                  <Table>
                    <tbody>
                      <tr>
                        <td className="text-bold">Total Activos</td>
                        <td className="text-bold">₡{new Intl.NumberFormat("de-DE").format(totalActivos)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col xs={6}>
                  <Table>
                    <tbody>
                      <tr>
                        <td className="text-bold">Total Pas y Pat</td>
                        <td className="text-bold">₡{new Intl.NumberFormat("de-DE").format(totalPasPat)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row className="pb-3">
                <Col>
                  <h5 className="text-bold">FLUJO NETO EFECTIVO</h5>
                </Col>
              </Row>
              <Row className="normalize-table-section">
                <Col className="pr-0 bg-white sticky-table-left">
                  <Table striped>
                    <thead>
                      <tr className="bg-white">
                        <th style={{minWidth: "140px", textAlign: "center"}}>Rubros de ingresos y gastos</th>
                        <th style={{minWidth: "60px"}}>#</th>
                        <th>Fijos</th>
                        <th style={{minWidth: "40px"}}>%</th>
                        <th className="p-1">
                          <ControlledInput 
                            type="date"
                            dateFormat="MM-YY"
                            defaultValue={month}
                            className="bg-green"
                            callback={(e) => updateValueHandler(setMonth, null, e)}
                          />
                        </th>
                      </tr>
                  </thead>
                    <tbody>
                      <tr>
                        <td className="text-bold">Ingresos</td>
                        <td colSpan={3}></td>
                        <td className="ingresos-sum-proy1__td">₡{new Intl.NumberFormat("de-DE").format(ingresosTotals.total_month_1)}</td>
                      </tr>
                      <tr>
                        <td>Ventas</td>
                        <td className="p-1">
                          <ControlledInput className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ventas_no", e);
                            }}
                           />
                        </td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            defaultValue="300000"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ventas_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange ingreso-sum__input"
                            defaultValue="300000"
                            mask="₡"
                            isTriggered
                            updatedValue={ingresos.ventas_no * (ingresos.ventas_fijos * (ingresos.month_1_perc / 100))}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Estacionalidad %</td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "estacionalidad_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="0.0"
                            mask={"₡"}
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "estacionalidad_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            defaultValue="100.0"
                            mask="%"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "month_1_perc", e);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Ingresos estimados</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="15000"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "estimados", e);
                            }}
                          />
                        </td>
                        <td>₡{!isNaN(ingresos.estimados * ingresos.detalle_no) ? ingresos.estimados * ingresos.detalle_no : "-"}</td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange ingreso-sum__input"
                            defaultValue="450000"
                            isTriggered
                            mask="₡"
                            updatedValue={ingresos.estimados * ingresos.detalle_no}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            placeholder="Detalle:"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "estimado_detalle", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            defaultValue="30"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "detalle_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "detalle_fijos", e);
                            }}
                          />
                        </td>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Ayudas, Donaciones, IMAS, etc</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ayudas_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="110000"
                            isTriggered
                            mask={"₡"}
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ayudas_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange ingreso-sum__input"
                            defaultValue="110000"
                            isTriggered
                            mask={"₡"}
                            updatedValue={ingresos.ayudas_no * ingresos.ayudas_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Financiamiento Empresarial</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "financiamiento_emp_no", e);
                            }}
                          />
                        </td>
                        <td className="bg-light">₡1,500,000{/* TODO {escenario_pre?.capital_de_trabajo.value + escenario_pre?.capital_de_inversion.value */}</td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green ingreso-sum__input"
                            defaultValue="1000000"
                            isTriggered
                            mask={"₡"}
                            callback={(e) => {
                              updateValueHandler(setIngresos, "financiamiento_emp_month_1", e);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Financiamiento Personal</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "financiamiento_per_no", e);
                            }}
                          />
                        </td>
                        <td>₡0{/* TODO {escenario_pre?.gastos_personales.value*/}</td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green ingreso-sum__input"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "financiamiento_per_month_1", e);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Otros ingresos familiares</td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "otros_ingresos_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "otros_ingresos_fijos", e);
                            }}
                          />
                        </td>
                        <td className="p-1"></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green ingreso-sum__input"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setIngresos, "otros_ingresos_month_1", e);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-bold">GASTOS</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(gastosTotals.total_month_1)}</td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Inversiones</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="gastos-sum__td">₡{gastos.inversiones_month_1}</td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Compra Activos: mueb e Inmueb"
                            callback={(e) => {
                              updateValueHandler(setGastos, "inversionse_detalle", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "inversiones_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "inversiones_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green gastos-sum__input"
                            defaultValue="-800000"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setGastos, "inversiones_month_1", e);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Costo de Ventas</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="gastos-sum__td">₡{new Intl.NumberFormat("de-DE").format(gastosTotals.costo_ventas_month_1)}</td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Costo de Ventas (insumos)"
                            callback={(e) => {
                              updateValueHandler(setGastos, "costo_ventas_desc", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "costo_ventas_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-200000"
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setGastos, "costo_ventas_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-ventas-sum__input costo-ventas-desc-sum__input"
                            defaultValue="-200000"
                            mask="₡"
                            isTriggered
                            updatedValue={gastos.costo_ventas_no * gastos.costo_ventas_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto operativo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="gastos-sum__td">₡{new Intl.NumberFormat("de-DE").format(gastosTotals.operativo_total_month_1)}</td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Servicios subcontratados"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_1_desc", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_1_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-75000" 
                            mask="₡"
                            isTriggered
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_1_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-op-sum__input gasto-op-1-sum__input"
                            defaultValue="-75000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Servicios públicos"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_2_desc", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_2_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-68000"
                            isTriggered
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_2_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-op-sum__input gasto-op-2-sum__input"
                            defaultValue="-68000" 
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Alquileres"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_3_desc", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_3_no", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-180000"
                            isTriggered
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_3_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-op-sum__input gasto-op-3-sum__input"
                            defaultValue="-180000" 
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos}
                          />
                          </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="CCSS / INS"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_4_desc", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_4_no", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-24000"
                            isTriggered
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_4_fjos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-op-sum__input gasto-op-4-sum__input"
                            defaultValue="-24000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.operativo_4_no * gastos.operativo_4_fjos}
                          />
                          </td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Mantenimiento Planta y Eq"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_5_desc", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_5_no", e);
                            }}
                          />
                          </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-17000"
                            isTriggered
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_5_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-op-sum__input gasto-op-5-sum__input"
                            defaultValue="-17000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos}
                          />
                          </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto administrativo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="gastos-sum__td">₡{new Intl.NumberFormat("de-DE").format(gastosTotals.admin_total_month_1)}</td>
                      </tr>
                      <tr>
                        <td>Mano de Obra / Otros Salarios</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "mano_obra_otros_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-75000"
                            isTriggered
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "mano_obra_otros_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-mano-obra-sum__input adm-mano-obra-sum__input"
                            defaultValue="-75000"
                            mask="₡"
                            isTriggered
                            updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Salario Dueño (Costo Familia)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(gastosTotals.costo_familia_total_month_1)}</td>
                      </tr>
                      <tr>
                        <td>Cargas Sociales</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cargas_sociales_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-25000" 
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cargas_sociales_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-familia-sum__input sd-cargas-sociales-sum__input"
                            defaultValue="-25000" 
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Pensión alimenticia</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "pension_alimenticia_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-50000"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "pension_alimenticia_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-familia-sum__input pension-alimenticia-sum__input"
                            defaultValue="-50000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gastos Familiares</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "gastos_familiares_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-15000"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "gastos_familiares_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-familia-sum__input gasto-familiar-sum__input"
                            defaultValue="-15000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Otras deducciones</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "otras_deducciones_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-15000"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "otras_deducciones_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-familia-sum__input otras-deducciones-sum__input"
                            defaultValue="-15000"
                            isTriggered
                            mask="₡"
                            updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto Financiero</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="gastos-sum__td">₡{gastosTotals.financiero_total_month_1}</td>
                      </tr>
                      <tr>
                        <td>Cuota hipotecarios</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_hipotecaria_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_hipotecaria_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-financiero-sum__input cuota-hipotecarios-months-sum__input"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Cuota empresariales</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_emp_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_emp_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-financiero-sum__input cuota-emp-months-sum__input"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Cuota personales</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_personales_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cuota_personales_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange gasto-costo-financiero-sum__input cuota-personales-months-sum__input"
                            defaultValue="0"
                            mask="₡"
                            isTriggered
                            updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">FLUJO NETO DE EFECTIVO</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="flujo-efectivo-sum__td">₡{new Intl.NumberFormat("de-DE").format(ingresosTotals.total_month_1 + gastosTotals.total_month_1)}</td>
                      </tr>
                      <tr>
                        <td>Reinversión</td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setFlujoNeto, "reinversion_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="50000"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setFlujoNeto, "reinversion_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange flujo-efectivo-sum__input reinversion-sum__input"
                            defaultValue="50000"
                            mask="₡"
                            updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">FLUJO DE EFECTIVO</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡{new Intl.NumberFormat("de-DE").format(flujoEfectivo.total_month_1)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col className="pl-0 sticky-table-right">
                  <Table striped>
                    <thead>
                      <tr className="bg-white">
                        {months.map((m, i) => 
                          <th key={`cp-month-${i}`}>{formattedDate(month, i + 1)}</th>
                        )}
                        <th>"PROY AÑO 1"</th>
                        <th>"PROYAÑO 2"</th>
                        <th>"PROYAÑO 3"</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_2}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_3}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_4}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_5}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_6}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_7}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_8}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_9}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_10}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_11}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_12}</td>
                        <td className="ingresos-sum-proy1__td">₡{ingresosTotals.total_month_13}</td>
                        <td>₡{ingresosTotals.total_proy_1}</td>
                        <td>₡{ingresosTotals.total_proy_2 + (ingresosTotals.total_proy_2 * (ingresos.estacionalidad_proy_2 / 100))}</td>
                        <td>₡{ingresosTotals.total_proy_3 + (ingresosTotals.total_proy_3 * (ingresos.estacionalidad_proy_3 / 100))}</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_2__input" defaultValue="270000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_2} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_3__input" defaultValue="240000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_3} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_4__input" defaultValue="240000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_4} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_5__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_5} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_6__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_6} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_7__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_7} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_8__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_8} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_9__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_9} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_10__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_10} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_11__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_11} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_12__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_12} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_13__input" defaultValue="300000" mask="₡" updatedValue={ingresosTotals.total_month_1_perc * ingresos.month_13} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="90" mask="%" callback={e => {updateValueHandler(setIngresos, "month_2", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="80" mask="%" callback={e => {updateValueHandler(setIngresos, "month_3", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="80" mask="%" callback={e => {updateValueHandler(setIngresos, "month_4", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_5", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_6", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_7", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_8", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_9", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_10", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_11", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_12", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100" mask="%" callback={e => {updateValueHandler(setIngresos, "month_13", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="%" callback={e => {updateValueHandler(setIngresos, "estacionalidad_proy_1", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5" mask="%" callback={e => {updateValueHandler(setIngresos, "estacionalidad_proy_2", e)}} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="10" mask="%" callback={e => {updateValueHandler(setIngresos, "estacionalidad_proy_3", e)}} /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_2__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_3__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_4__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_5__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_6__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_7__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_8__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_9__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_10__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_11__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_12__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_13__input" defaultValue="450000" mask="₡" updatedValue={ingresos.estimados * ingresos.detalle_no}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_2__input" defaultValue="110000" mask="₡" updatedValue={ingresos.ayudas_no * ingresos.ayudas_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_3__input" defaultValue="110000" mask="₡" updatedValue={ingresos.ayudas_no * ingresos.ayudas_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_4__input" defaultValue="110000" mask="₡" updatedValue={ingresos.ayudas_no * ingresos.ayudas_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_5__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_6__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_7__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_8__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_9__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_10__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_11__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_12__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange ingresos-sum-month_13__input" defaultValue="120000" mask="₡" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_2__input" defaultValue="500000" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_3__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_3", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_4__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_4", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_5__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_5", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_6__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_6", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_7__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_7", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_8__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_8", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_9__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_9", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_10__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_10", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_11__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_11", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_12__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_12", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_13__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_month_13", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_proy_1", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_proy_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_emp_proy_3", e)} /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_2__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_3__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_3", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_4__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_4", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_5__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_5", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_6__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_6", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_7__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_7", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_8__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_8", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_9__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_9", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_10__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_10", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_11__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_11", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_12__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_12", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_13__input" mask="₡" callback={e => updateValueHandler(setIngresos, "financiamiento_per_month_13", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_per_proy_1", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_per_proy_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "financiamiento_per_proy_3", e)} /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_2__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_3__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_3", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_4__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_4", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_5__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_5", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_6__input" defaultValue="300000" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_6", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_7__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_7", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_8__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_8", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_9__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_9", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_10__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_10", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_11__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_11", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_12__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_12", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green ingresos-sum-month_13__input" mask="₡" callback={e => updateValueHandler(setIngresos, "otros_ingresos_month_13", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "otros_ingresos_proy_1", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "otros_ingresos_proy_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setIngresos, "otros_ingresos_proy_3", e)} /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>-₡3,544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡844,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡544,000</td>
                        <td>-₡11,372,000</td>
                        <td>-₡11,940,600</td>
                        <td>-₡12,537,630</td>
                      </tr>
                      <tr>
                        <td>-₡2,000,000.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>-₡300,000.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>-₡3,100,000.00</td>
                        <td>-₡3,255,000.00</td>
                        <td>-₡3,417,750.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-2000000" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_3", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_4", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_5", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_6", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-300000" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_7", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_8", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_9", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_10", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_11", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_12", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" mask="₡" callback={e => updateValueHandler(setGastos, "inversionees_desc_month_13", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" callback={e => updateValueHandler(setGastos, "inversionees_desc_proy_1", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5.0" mask="%" callback={e => updateValueHandler(setGastos, "inversionees_desc_proy_2", e)} /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5.0" mask="%" callback={e => updateValueHandler(setGastos, "inversionees_desc_proy_3", e)} /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>-₡1,000,000.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>-₡1,200,000.00</td>
                        <td>-₡1,260,000.00</td>
                        <td>-₡1,323,000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" defaultValue="-1000000" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange costo-ventas-desc-sum__input" mask="₡"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-1200000" mask="₡" updatedValue={gastosTotals.costo_ventas_months}/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%"/></td>
                      </tr>
                      <tr>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡364,000.00</td>
                        <td>-₡4,732,000.00</td>
                        <td>-₡4,968,600.00</td>
                        <td>-₡5,217,030.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-1-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.operativo_1_no * gastos.operativo_1_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-975000" mask="₡" updatedValue={gastosTotals.operativo_1_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-2-sum__input" defaultValue="-68000" mask="₡" updatedValue={gastos.operativo_2_no * gastos.operativo_2_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-884000" mask="₡" updatedValue={gastosTotals.operativo_2_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-3-sum__input" defaultValue="-180000" mask="₡" updatedValue={gastos.operativo_3_no * gastos.operativo_3_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-2340000" mask="₡" updatedValue={gastosTotals.operativo_3_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-4-sum__input" defaultValue="-24000" mask="₡" updatedValue={gastos.operativo_4_no * gastos.operativo_4_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-312000" mask="₡" updatedValue={gastosTotals.operativo_4_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-op-5-sum__input" defaultValue="-17000" mask="₡" updatedValue={gastos.operativo_5_no * gastos.operativo_5_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-221000" mask="₡" updatedValue={gastosTotals.operativo_5_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡180,000.00</td>
                        <td>-₡2,340,000.00</td>
                        <td>-₡2,457,000.00</td>
                        <td>-₡2,579,850.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange adm-mano-obra-sum__input" defaultValue="-75000" mask="₡" updatedValue={gastos.mano_obra_otros_no * gastos.mano_obra_otros_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-975000" mask="₡" updatedValue={gastosTotals.mano_obra_otros_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡105,000.00</td>
                        <td>-₡1,365,000.00</td>
                        <td>-₡1,433,250.00</td>
                        <td>-₡1,504,912.50</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange sd-cargas-sociales-sum__input" defaultValue="-25000" mask="₡" updatedValue={gastos.cargas_sociales_no * gastos.cargas_sociales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-325000" mask="₡" updatedValue={gastosTotals.cargas_sociales_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange pension-alimenticia-sum__input" defaultValue="-50000" mask="₡" updatedValue={gastos.pension_alimenticia_no * gastos.pension_alimenticia_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-650000" mask="₡" updatedValue={gastosTotals.pension_alimenticia_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange gasto-familiar-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.gastos_familiares_no * gastos.gastos_familiares_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-195000" mask="₡" updatedValue={gastosTotals.gastos_familiares_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange otras-deducciones-sum__input" defaultValue="-15000" mask="₡" updatedValue={gastos.otras_deducciones_no * gastos.otras_deducciones_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-195000" mask="₡" updatedValue={gastosTotals.otras_deducciones_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-hipotecarios-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_hipotecaria_no * gastos.cuota_hipotecaria_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="0" mask="₡" updatedValue={gastosTotals.cuota_hipotecaria_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0" mask="%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-emp-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_emp_no * gastos.cuota_emp_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="0.00" mask="₡" updatedValue={gastosTotals.cuota_emp_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange cuota-personales-months-sum__input" defaultValue="" mask="₡" updatedValue={gastos.cuota_personales_no * gastos.cuota_personales_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="0.00" mask="₡" updatedValue={gastosTotals.cuota_personales_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>-₡1,898,000.00</td>
                        <td>-₡1,642,000.00</td>
                        <td>-₡1,386,000.00</td>
                        <td>-₡1,060,000.00</td>
                        <td>-₡434,000.00</td>
                        <td>-₡408,000.00</td>
                        <td>-₡82,000.00</td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡244,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡570,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡896,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡1,222,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡1,548,000.00" /></td>
                        <td>-₡2,114,000.00</td>
                        <td>-₡488,600.00</td>
                        <td>₡1,896,370.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="100000" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="235000" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="100000" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="50000" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="200000" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange reinversion-sum__input" defaultValue="0" mask="₡" updatedValue={flujoNeto.reinversion_no * flujoNeto.reinversion_fijos} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="735000" mask="₡" updatedValue={flujoNeto.reinversion_months} /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td>-₡1,998,000.00</td>
                        <td>-₡1,877,000.00</td>
                        <td>-₡1,486,000.00</td>
                        <td>-₡1,060,000.00</td>
                        <td>-₡484,000.00</td>
                        <td>-₡608,000.00</td>
                        <td>-₡82,000.00</td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡244,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡570,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡896,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡1,222,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡1,548,000.00" /></td>
                        <td>-₡2,749,000.00</td>
                        <td>-₡488,600.00</td>
                        <td>₡1,896,370.00</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <EtapaSolicitud />

          <Card>
            <CardBody>
              <Row className="justify-content-center">
                <Col xs={12} sm={6}>
                  <Row className="px-5 [b">
                    <Col xs={12} className="pb-3 text-center"><h5>Escenario 0</h5></Col>
                    <Col md={4}><p>T 0%</p></Col>
                    <Col md={4}><p>I 0%</p></Col>
                    <Col md={4}><p>G 0%</p></Col>
                  </Row>
                  <MultipleTestingAnalytics 
                    data={flujoNetoData} 
                    dir={'left'}
                    title={'Flujo Neto de Efectivo'}
                    subtitle1={'Escenario Realista 0'}
                    subtitle2={'-Proyección proximo 12 meses'}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Row className="px-5 [b">
                    <Col xs={12} className="pb-3 text-center"><h5>Escenario 1</h5></Col>
                    <Col md={4}><p>T 0%</p></Col>
                    <Col md={4}><p>I 5%</p></Col>
                    <Col md={4}><p>G 5%</p></Col>
                  </Row>
                  <MultipleTestingAnalytics 
                    data={flujoNetoData} 
                    dir={'left'}
                    title={'Flujo Neto de Efectivo'}
                    subtitle1={'Escenario Realista 1'}
                    subtitle2={'-Proyección proximo 12 meses'}
                  />
                </Col>
                <Col xs={12} sm={8}>
                  <Row className="px-5 [b">
                    <Col xs={12} className="pb-3 text-center"><h5>Escenario 0</h5></Col>
                    <Col md={4}><p>T 0%</p></Col>
                    <Col md={4}><p>I -5%</p></Col>
                    <Col md={4}><p>G 10%</p></Col>
                  </Row>
                  <MultipleTestingAnalytics 
                    data={flujoNetoData} 
                    dir={'left'}
                    title={'Flujo Neto de Efectivo'}
                    subtitle1={'Escenario Realista 2'}
                    subtitle2={'-Proyección proximo 12 meses'}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
