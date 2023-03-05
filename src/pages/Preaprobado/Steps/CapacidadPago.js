import React, { useState, useEffect, useContext } from "react";

// Helpers
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { ControlledInput, EtapaSolicitud, MultipleTestingAnalytics } from "../../../components";

export default function CapacidadPago({
  animation,
  escenarioPreeliminar,
  cedula,
  pdf,
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
  // -- Gastos
  const [gastos, setGastos] = useState({});

  // Flujo Neto de Efectivo
  const [flujoNetoFinal, setFlujoNetoFianl] = useState(0);
  // Flujo de Efectivo
  const [flujoEfectivoFinal, setFlujoNetoFinal] = useState(0);
  
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
    const day = newDate.getDate() + 1;
    // If value is greater than 12 starts again
    const labelMonth = months[dateMonth] ? months[dateMonth] : months[dateMonth - 12];
    return `${labelMonth}-${day}`;
  }

  useEffect(()=>{
    // console.log(ingresos);
  },[ingresos]);

  return (
    <div className={`dashboard capacidad-pago capacidad-pago step__cards ${animation && !pdf && "step__animation"}`}>
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
                        <td>₡{ingresos.total_month_1}</td>
                      </tr>
                      <tr>
                        <td>Ventas</td>
                        <td className="p-1">
                          <ControlledInput className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ventas_no", e);
                              // calculate?
                            }}
                           />
                        </td>
                        <td className="p-1">
                          <ControlledInput 
                            className="bg-green"
                            defaultValue="0"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ventas_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue=""
                            mask="₡"
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
                            callback={(e) => {
                              updateValueHandler(setIngresos, "estimados", e);
                            }}
                          />
                        </td>
                        <td>₡{ingresos.estimados * ingresos.detalle_no || "" }</td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            mask={"₡"}
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
                            callback={(e) => {
                              updateValueHandler(setIngresos, "detalle_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask={"₡"}
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
                            mask={"₡"}
                            callback={(e) => {
                              updateValueHandler(setIngresos, "ayudas_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="110000"
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
                            className="bg-green"
                            defaultValue="1000000"
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
                            className="bg-green"
                            defaultValue="0"
                            mask="₡"
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
                            callback={(e) => {
                              updateValueHandler(setIngresos, "otros_ingresos_fijos", e);
                            }}
                          />
                        </td>
                        <td className="p-1"></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            mask="₡"
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
                        <td>₡{gastos.total_month_1}</td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Inversiones</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡{gastos.inversiones_month_1}</td>
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
                            className="bg-green"
                            defaultValue="-80000000"
                            mask="₡"
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
                        <td>₡{gastos.cosoto_ventas_month_1}</td>
                      </tr>
                      <tr>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="Costo de Ventas (insumos)"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cosoto_ventas_desc", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cosoto_ventas_no", e);
                            }}
                          />
                        </td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-green"
                            defaultValue="-200000"
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "cosoto_ventas_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-20000000"
                            mask="₡"
                            updatedValue={gastos.cosoto_ventas_no * gastos.cosoto_ventas_fijos}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto operativo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡{gastos.operativo_total_month_1}</td>
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
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_1_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-7500000"
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
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_2_fijos", e);
                            }}
                          />
                        </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-6800000" 
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
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_3_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-18000000" 
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
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_4_fjos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-2400000"
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
                            mask="₡"
                            callback={(e) => {
                              updateValueHandler(setGastos, "operativo_5_fijos", e);
                            }}
                          />
                          </td>
                        <td></td>
                        <td className="p-1">
                          <ControlledInput
                            className="bg-orange"
                            defaultValue="-1700000"
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
                        <td>-₡180,000.00</td>
                      </tr>
                      <tr>
                        <td>Mano de Obra / Otros Salarios</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡75,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Salario Dueño (Costo Familia)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡105,000.00</td>
                      </tr>
                      <tr>
                        <td>Cargas Sociales</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡25,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Pensión alimenticia</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡50,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Gastos Familiares</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡15,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Otras deducciones</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡15,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto Financiero</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                      </tr>
                      <tr>
                        <td>Cuota hipotecarios</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                      </tr>
                      <tr>
                        <td>Cuota empresariales</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                      </tr>
                      <tr>
                        <td>Cuota personales</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">FLUJO NETO DE EFECTIVO</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡316,000.00</td>
                      </tr>
                      <tr>
                        <td>Reinversión</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡50,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡50,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">FLUJO DE EFECTIVO</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡366,000.00</td>
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
                        <td>₡1,330,000</td>
                        <td>₡800,000</td>
                        <td>₡800,000</td>
                        <td>₡870,000</td>
                        <td>₡1,170,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡870,000</td>
                        <td>₡12,920,000</td>
                        <td>₡13,566,000</td>
                        <td>₡14,922,600</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡270,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡240,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡240,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="90.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="80.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="80.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="10.0%" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡500,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="₡300,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡2,000,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="-₡300,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultValue="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡1,000,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡1,200,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡975,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡884,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡2,340,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡312,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡221,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡975,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡325,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡650,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡195,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="-₡195,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡100,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡235,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡100,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡200,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultValue="₡735,000.00" /></td>
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
