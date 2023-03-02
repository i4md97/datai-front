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
  const [month, setMonth] = useState('2022-11-22');
  // -- Ingresos
  const [ingresos, setIngresos] = useState();
  // -- Gastos
  const [gastos, setGastos] = useState();

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
    setter(prev => ({...prev, [property]: value}));
  }

  useEffect(()=>{},[balanceGeneral]);

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
                          <ControlledInput className="bg-green" defaultOption="₡500,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡0" 
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
                          <ControlledInput className="bg-green" defaultOption="₡25,000,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡1,000,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡1,500,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡0" 
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
                          <ControlledInput className="bg-green" defaultOption="₡1,500,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡25,000,000" 
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
                          <ControlledInput className="bg-green" defaultOption="₡1,500,000" 
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
                        <th style={{minWidth: "40px"}}>#</th>
                        <th>Fijos</th>
                        <th style={{minWidth: "40px"}}>%</th>
                        <th className="p-1">
                          <ControlledInput type="date" dateFormat="MM-YY" defaultOption={month} className="bg-green" />
                        </th>
                      </tr>
                  </thead>
                    <tbody>
                      <tr>
                        <td className="text-bold">Ingresos</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡1,860,000</td>
                      </tr>
                      <tr>
                        <td>Ventas</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                      </tr>
                      <tr>
                        <td>Estacionalidad %</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="0.0%" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Ingresos estimados</td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="15000" /></td>
                        <td>₡450,000</td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Detalle: Gasto telefónico X 30" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="30" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Ayudas, Donaciones, IMAS, etc</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡110,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡110,000"/></td>
                      </tr>
                      <tr>
                        <td>Financiamiento Empresarial</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td>₡1,500,000</td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡1,000,000"/></td>
                      </tr>
                      <tr>
                        <td>Financiamiento Personal</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td>₡0</td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡0"/></td>
                      </tr>
                      <tr>
                        <td>Otros ingresos familiares</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡0"/></td>
                        <td className="p-1"></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-bold">GASTOS</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡1,544,000</td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Inversiones</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡800,000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Compra Activos: mueb e Inmueb" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡800,000.00" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Costo de Ventas</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡200,000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Costo de Ventas (insumos)" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡200,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡200,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto operativo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡364,000.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Servicios subcontratados" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡75,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Servicios públicos" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡68,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Alquileres" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡180,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="CCSS / INS" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡24,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="Mantenimiento Planta y Eq" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡17,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡75,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡25,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Pensión alimenticia</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡50,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Gastos Familiares</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡15,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                      </tr>
                      <tr>
                        <td>Otras deducciones</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡15,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                      </tr>
                      <tr>
                        <td>Cuota empresariales</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                      </tr>
                      <tr>
                        <td>Cuota personales</td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡50,000" /></td>
                        <td></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡50,000.00" /></td>
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
                        <th>Dec-22</th>
                        <th>Jan-23</th>
                        <th>Feb-23</th>
                        <th>Mar-23</th>
                        <th>Apr-23</th>
                        <th>May-23</th>
                        <th>Jun-23</th>
                        <th>Jul-23</th>
                        <th>Aug-23</th>
                        <th>Sep-23</th>
                        <th>Oct-23</th>
                        <th>Nov-23</th>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡270,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡240,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡240,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡300,000" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="90.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="80.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="80.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="100.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="10.0%" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡450,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡110,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡120,000"/></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡500,000"/></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡300,000"/></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡2,000,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="-₡300,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡1,000,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡1,200,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡975,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡68,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡884,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡180,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡2,340,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡24,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡312,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡17,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡221,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡75,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡975,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡25,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡325,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡650,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡195,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡15,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="-₡195,000.00" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="5.0%" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
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
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡244,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡570,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡896,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡1,222,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡1,548,000.00" /></td>
                        <td>-₡2,114,000.00</td>
                        <td>-₡488,600.00</td>
                        <td>₡1,896,370.00</td>
                      </tr>
                      <tr>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡100,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡235,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡100,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡50,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡200,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡0.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="₡735,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                        <td className="p-1"><ControlledInput className="bg-orange" defaultOption="" /></td>
                      </tr>
                      <tr>
                        <td>-₡1,998,000.00</td>
                        <td>-₡1,877,000.00</td>
                        <td>-₡1,486,000.00</td>
                        <td>-₡1,060,000.00</td>
                        <td>-₡484,000.00</td>
                        <td>-₡608,000.00</td>
                        <td>-₡82,000.00</td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡244,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡570,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡896,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡1,222,000.00" /></td>
                        <td className="p-1"><ControlledInput className="bg-green" defaultOption="₡1,548,000.00" /></td>
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
