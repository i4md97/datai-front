import React, { useState, useEffect, useContext } from "react";

// Helpers
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table, Input } from "reactstrap";
import { EtapaSolicitud, MultipleTestingAnalytics } from "../../../components";

export default function CapacidadPago({
  animation,
  escenarioPreeliminar,
  cedula,
  pdf,
}) {
  const { user } = useContext(UsuarioContext);
  const {
    stepFourCheck,
    changeEscenarioPreeliminar,
    changeCapacidadPago,
  } = useContext(PreaprobadoContext);
  const [reloadCalc, setRealodCalc] = useState(false);
  const [formSituacion, setFormSituacion] = useState({
    previa: cedula ? cedula.salary : 0,
    actual: cedula ? cedula.salary : 0,
  });

  const [formColillaPago, setFormColillaPago] = useState("");

  const [formPrevia, setFormPrevia] = useState({
    cargaSociales: "",
    impuestosRenta: "",
    otrasDeducciones: "",
    ingresoNeto: "",
  });
  const [formActual, setFormActual] = useState({
    cargaSociales: "",
    impuestosRenta: "",
    otrasDeducciones: "",
    ingresoNeto: "",
    deudaInterna: "",
    deudaExternal: "",
    cuotasTarjetas: "",
    deudasTotales: "",
    liquidoAntes: "",
  });

  useEffect(() => {
    setFormSituacion({
      previa: cedula ? cedula.salary : 0,
      actual: cedula ? cedula.salary : 0,
    });
    setFormColillaPago(escenarioPreeliminar.colillaPago || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cedula || (!reloadCalc && cedula)) {
      setRealodCalc(true);

      //CALCULO DEUDAS
      let deudaInternaCopy = 0;
      let deudaExternalCopy = 0;
      let cuotaInternalActual = 0;
      let cuotaExternalActual = 0;
      cedula.debts.data.map((element, i) => {
        if (element[2] === user.firm_c) {
          deudaInternaCopy += element[11] + element[12];
        } else {
          deudaExternalCopy += element[11] + element[12];
        }

        const find = stepFourCheck.find((elementTwo) => elementTwo.index === i);
        if (find) {
          if (find.type === "interno") {
            cuotaInternalActual += find.data[11] + find.data[12];
          } else {
            cuotaExternalActual += find.data[11] + find.data[12];
          }
        }
      });

      let flagCuotas = true;

      let cuotasTarjetasCopy = 0;
      if (escenarioPreeliminar.check) {
        escenarioPreeliminar.check.map((element) => {
          if (element === "2") {
            cuotasTarjetasCopy = parseFloat(
              escenarioPreeliminar.ahorroDisponible
            );
          }
        });
      }

      let deudasTotalesCopy =
        cuotasTarjetasCopy +
        deudaInternaCopy -
        (flagCuotas ? cuotaInternalActual : 0) +
        deudaExternalCopy -
        (flagCuotas ? cuotaExternalActual : 0);
      let deudasTotalesCopy2 = deudaInternaCopy + deudaExternalCopy;

      //INGRESO BRUTO
      let ingresoBruto = cedula.salary;

      //CALCULAR IMPUESTOS DE RENTA
      let impuestoRenta = 0;

      if (ingresoBruto > 842000) {
        let value = ingresoBruto > 1236000 ? 1236000 : ingresoBruto;
        impuestoRenta += (value - 842000) * 0.1;
      }

      if (ingresoBruto > 1236000) {
        let value = ingresoBruto > 2169000 ? 2169000 : ingresoBruto;
        impuestoRenta += (value - 1236000) * 0.15;
      }

      if (ingresoBruto > 2169000) {
        let value = ingresoBruto > 4337000 ? 4337000 : ingresoBruto;
        impuestoRenta += (value - 2169000) * 0.2;
      }

      if (ingresoBruto > 4337000) {
        impuestoRenta += (ingresoBruto - 4337000) * 0.25;
      }

      //CALCULAMOS CARGAS SOCIALES
      let cargasSociales = ingresoBruto * 0.1065;

      //CALCULAMOS OTRAS DEDUCCIONES
      let otrasDeducciones = ingresoBruto * 0.095;

      // CALCULAMOS INGRESO NETO

      let saveIngresoNeto =
        ingresoBruto - impuestoRenta - cargasSociales - otrasDeducciones;

      //OBTENEMOS LA CUOTA MENSUAL DEL STEP ANTERIOR
      let cuotaEscenarioPreeliminar =
        escenarioPreeliminar.cuota && flagCuotas
          ? parseFloat(escenarioPreeliminar.cuota)
          : 0;

      //Calculamos CSD ACTUAL
      let csdCopy =
        ((saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar) /
          ingresoBruto) *
        100;

      //CALCULAMOS ENDEUDAMIENTO ACTUAL
      console.log(escenarioPreeliminar);
      let endeudamientoCopy =
        ((saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar) /
          saveIngresoNeto) *
        100;

      //CALCULAMOS CUOTA MENSUAL REFINANCIADA ACTUAL

      let cuotaMensualRefinanciadaCopy = escenarioPreeliminar.cuota
        ? cuotaEscenarioPreeliminar
        : 0;

      //SALARIO LIQUIDO ANTES PREVIA

      let liquidoAntes = deudasTotalesCopy2
        ? saveIngresoNeto - deudasTotalesCopy2
        : "";

      //SALARIO LIQUIDO DESPUES ACTUAL
      let liquidoDespues = deudasTotalesCopy2
        ? saveIngresoNeto - deudasTotalesCopy2
        : "";

      //SALARIO LIQUIDO DISPONIBLE
      let salarioLiquidoDisponible = deudasTotalesCopy2
        ? saveIngresoNeto - deudasTotalesCopy2 - 200000
        : "";

      //CALCULAMOS LIQUIDO DESPUES ACTUAL

      let liquidoDespuesCopy = escenarioPreeliminar.cuota
        ? saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar
        : liquidoDespues;

      //CALCULAMOS SALARIO LIQUIDO DISPONIBLE

      let salarioLiquidoDisponibleCopy = escenarioPreeliminar.cuota
        ? saveIngresoNeto -
        deudasTotalesCopy -
        cuotaEscenarioPreeliminar -
        200000
        : salarioLiquidoDisponible;

      //CALCULAMOS NIVEL CAPACIDAD DE PAGO ACTUAL

      let nivelCapacidadPagoCopy =
        salarioLiquidoDisponibleCopy > 0 ? "N1" : "N2";

      //CSD PREVIA

      let csd = deudasTotalesCopy2
        ? ((saveIngresoNeto - deudasTotalesCopy2) / ingresoBruto) * 100
        : "";

      //ENDEUDAMIENTO PREVIA

      let endeudamiento = deudasTotalesCopy2
        ? ((saveIngresoNeto - deudasTotalesCopy2) / saveIngresoNeto) * 100
        : "";

      setFormPrevia({
        ...formPrevia,
        csd,
        deudasTotales: deudasTotalesCopy2,
        cuotasTarjetas: 0,
        deudaInterna: deudaInternaCopy,
        deudaExternal: deudaExternalCopy,
        endeudamiento,
        liquidoAntes,
        liquidoDespues,
        salarioLiquidoDisponible,
        ingresoNeto: saveIngresoNeto,
        otrasDeducciones,
        impuestosRenta: impuestoRenta,
        cargaSociales: cargasSociales,
        nivelCapacidadPago: salarioLiquidoDisponible > 0 ? "N1" : "N2",
      });

      let otrasDeduccionesActual = otrasDeducciones;
      let saveIngresoNetoActual = saveIngresoNeto;
      if (formColillaPago) {
        otrasDeduccionesActual =
          otrasDeduccionesActual - parseFloat(formColillaPago) + liquidoAntes;
        saveIngresoNetoActual =
          ingresoBruto -
          impuestoRenta -
          cargasSociales -
          otrasDeduccionesActual;
        liquidoDespuesCopy =
          saveIngresoNetoActual - deudasTotalesCopy - cuotaEscenarioPreeliminar;
        salarioLiquidoDisponibleCopy =
          saveIngresoNetoActual -
          deudasTotalesCopy -
          cuotaEscenarioPreeliminar -
          200000;
        csdCopy =
          ((saveIngresoNetoActual -
            deudasTotalesCopy -
            cuotaEscenarioPreeliminar) /
            ingresoBruto) *
          100;
        endeudamientoCopy =
          ((saveIngresoNetoActual -
            deudasTotalesCopy -
            cuotaEscenarioPreeliminar) /
            saveIngresoNeto) *
          100;
      }

      setFormActual({
        ...formActual,
        csd: csdCopy,
        deudasTotales: deudasTotalesCopy,
        cuotasTarjetas: cuotasTarjetasCopy,
        deudaInterna: deudaInternaCopy - (flagCuotas ? cuotaInternalActual : 0),
        deudaExternal:
          deudaExternalCopy - (flagCuotas ? cuotaExternalActual : 0),
        endeudamiento: endeudamientoCopy,
        liquidoDespues: liquidoDespuesCopy,
        cuotaMensualRefinanciada: cuotaMensualRefinanciadaCopy,
        salarioLiquidoDisponible: salarioLiquidoDisponibleCopy,
        liquidoAntes: saveIngresoNetoActual - deudasTotalesCopy,
        ingresoNeto: saveIngresoNetoActual,
        otrasDeducciones: otrasDeduccionesActual,
        impuestosRenta: impuestoRenta,
        cargaSociales: cargasSociales,
        nivelCapacidadPago: nivelCapacidadPagoCopy,
      });

      changeCapacidadPago({
        previa: {
          ...formPrevia,
          csd,
          deudasTotales: deudasTotalesCopy2,
          cuotasTarjetas: 0,
          deudaInterna: deudaInternaCopy,
          deudaExternal: deudaExternalCopy,
          endeudamiento,
          liquidoAntes,
          liquidoDespues,
          salarioLiquidoDisponible,
          ingresoNeto: saveIngresoNeto,
          otrasDeducciones,
          impuestosRenta: impuestoRenta,
          cargaSociales: cargasSociales,
          nivelCapacidadPago: salarioLiquidoDisponible > 0 ? "N1" : "N2",
        },
        actual: {
          ...formActual,
          csd: csdCopy,
          deudasTotales: deudasTotalesCopy,
          cuotasTarjetas: cuotasTarjetasCopy,
          deudaInterna:
            deudaInternaCopy - (flagCuotas ? cuotaInternalActual : 0),
          deudaExternal:
            deudaExternalCopy - (flagCuotas ? cuotaExternalActual : 0),
          endeudamiento: endeudamientoCopy,
          liquidoDespues: liquidoDespuesCopy,
          cuotaMensualRefinanciada: cuotaMensualRefinanciadaCopy,
          salarioLiquidoDisponible: salarioLiquidoDisponibleCopy,
          liquidoAntes: saveIngresoNetoActual - deudasTotalesCopy,
          ingresoNeto: saveIngresoNetoActual,
          otrasDeducciones: otrasDeduccionesActual,
          impuestosRenta: impuestoRenta,
          cargaSociales: cargasSociales,
          nivelCapacidadPago: nivelCapacidadPagoCopy,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSituacion, reloadCalc]);

  useEffect(() => {
    if (formColillaPago && formActual.otrasDeducciones && formColillaPago > 0) {
      setFormActual({
        ...formActual,
        otrasDeducciones:
          formPrevia.otrasDeducciones -
          parseFloat(formColillaPago) +
          formPrevia.liquidoDespues,
      });
      changeEscenarioPreeliminar({
        ...escenarioPreeliminar,
        actual: {
          ...escenarioPreeliminar.actual,
          otrasDeducciones:
            formPrevia.otrasDeducciones -
            parseFloat(formColillaPago) +
            formPrevia.liquidoDespues,
        },
      });
      setRealodCalc(false);
    }
    if (!formColillaPago) {
      setRealodCalc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formColillaPago]);

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
                        <td className="p-0"><Input placeholder="₡500,000" /></td>
                      </tr>
                      <tr>
                        <td>Otros AC</td>
                        <td className="p-0"><Input placeholder="₡0" /></td>
                      </tr>
                      <tr>
                        <td>Activos Fijos</td>
                        <td>Valor Estimado</td>
                      </tr>
                      <tr>
                        <td>Propiedades actuales</td>
                        <td className="p-0"><Input placeholder="₡25,000,000" /></td>
                      </tr>
                      <tr>
                        <td>Vehículos actuales</td>
                        <td className="p-0"><Input placeholder="₡1,000,000" /></td>
                      </tr>
                      <tr>
                        <td>Mobiliario y equipo</td>
                        <td className="p-0"><Input placeholder="₡1,500,000" /></td>
                      </tr>
                      <tr>
                        <td>Otros AF</td>
                        <td className="p-0"><Input placeholder="₡0" /></td>
                      </tr>
                      <tr>
                        <td>Total Activos</td>
                        <td>₡28,000,000</td>
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
                        <td className="p-0"><Input placeholder="₡1,500,000" /></td>
                      </tr>
                      <tr>
                        <td>Pasivo LP</td>
                        <td className="p-0"><Input placeholder="₡25,000,000" /></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Patrimonio</td>
                        <td>Valor Estimado</td>
                      </tr>
                      <tr>
                        <td>Capital Soc</td>
                        <td className="p-0"><Input placeholder="₡1,500,000" /></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Total Pas y Pat</td>
                        <td>₡28,000,000</td>
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
              <Row>
                <Col>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th style={{minWidth: "250px"}}>Rubros de ingresos y gastos</th>
                        <th>#</th>
                        <th>Fijos</th>
                        <th>%</th>
                        <th>Nov-22</th>
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
                        <td className="text-bold">Ingresos</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡1,860,000</td>
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
                        <td>Ventas</td>
                        <td></td>
                        <td>₡300,000</td>
                        <td></td>
                        <td>₡300,000</td>
                        <td>₡270,000</td>
                        <td>₡240,000</td>
                        <td>₡240,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td>₡300,000</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Estacionalidad %</td>
                        <td></td>
                        <td>0.0%</td>
                        <td></td>
                        <td>100.0%</td>
                        <td>90.0%</td>
                        <td>80.0%</td>
                        <td>80.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td>100.0%</td>
                        <td></td>
                        <td>5.0%</td>
                        <td>10.0%</td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Ingresos estimados</td>
                        <td>15000</td>
                        <td>₡450,000</td>
                        <td></td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td>₡450,000</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Detalle: Gasto telefónico X 30</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>Ayudas, Donaciones, IMAS, etc</td>
                        <td></td>
                        <td>₡110,000</td>
                        <td></td>
                        <td>₡110,000</td>
                        <td>₡110,000</td>
                        <td>₡110,000</td>
                        <td>₡110,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td>₡120,000</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Financiamiento Empresarial</td>
                        <td></td>
                        <td>₡1,500,000</td>
                        <td></td>
                        <td>₡1,000,000</td>
                        <td>₡500,000</td>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Financiamiento Personal</td>
                        <td></td>
                        <td>₡0</td>
                        <td></td>
                        <td>₡0</td>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Otros ingresos familiares</td>
                        <td></td>
                        <td>₡0</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡300,000</td>
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
                        <td className="text-semibold">Inversiones</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡800,000.00</td>
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
                        <td>Compra Activos: mueb e Inmueb</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡800,000.00</td>
                        <td>-₡2,000,000.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡300,000.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>5.0%</td>
                        <td>5.0%</td>
                      </tr>
                      <tr>
                        <td colSpan={"100%"}></td>
                      </tr>
                      <tr>
                        <td>Costo de Ventas</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡200,000.00</td>
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
                        <td className="text-semibold">Costo de Ventas (insumos)</td>
                        <td></td>
                        <td>-₡200,000</td>
                        <td></td>
                        <td>-₡200,000.00</td>
                        <td>-₡1,000,000.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>-₡1,200,000.00</td>
                        <td>5.0%</td>
                        <td>5.0%</td>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto operativo</td>
                        <td></td>
                        <td></td>
                        <td></td>
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
                        <td>-₡364,000.00</td>
                        <td>-₡4,732,000.00</td>
                        <td>-₡4,968,600.00</td>
                        <td>-₡5,217,030.00</td>
                      </tr>
                      <tr>
                        <td>Servicios subcontratados</td>
                        <td></td>
                        <td>-₡75,000</td>
                        <td></td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡975,000.00</td>
                        <td>5.0%</td>
                        <td>5.0%</td>
                      </tr>
                      <tr>
                        <td>Servicios públicos</td>
                        <td></td>
                        <td>-₡68,000</td>
                        <td></td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡68,000.00</td>
                        <td>-₡884,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Alquileres</td>
                        <td></td>
                        <td>-₡180,000</td>
                        <td></td>
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
                        <td>-₡180,000.00</td>
                        <td>-₡2,340,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>CCSS / INS</td>
                        <td></td>
                        <td>-₡24,000</td>
                        <td></td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡24,000.00</td>
                        <td>-₡312,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Mantenimiento Planta y Eq</td>
                        <td></td>
                        <td>-₡17,000</td>
                        <td></td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡17,000.00</td>
                        <td>-₡221,000.00</td>
                        <td></td>
                        <td></td>
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
                        <td>Mano de Obra / Otros Salarios</td>
                        <td></td>
                        <td>-₡75,000</td>
                        <td></td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡75,000.00</td>
                        <td>-₡975,000.00</td>
                        <td>5.0%</td>
                        <td>5.0%</td>
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
                        <td>Cargas Sociales</td>
                        <td></td>
                        <td>-₡25,000</td>
                        <td></td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡25,000.00</td>
                        <td>-₡325,000.00</td>
                        <td>5.0%</td>
                        <td>5.0%</td>
                      </tr>
                      <tr>
                        <td>Pensión alimenticia</td>
                        <td></td>
                        <td>-₡50,000</td>
                        <td></td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡50,000.00</td>
                        <td>-₡650,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Gastos Familiares</td>
                        <td></td>
                        <td>-₡15,000</td>
                        <td></td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡195,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Otras deducciones</td>
                        <td></td>
                        <td>-₡15,000</td>
                        <td></td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡15,000.00</td>
                        <td>-₡195,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                      </tr>
                      <tr>
                        <td className="text-semibold">Gasto Financiero</td>
                        <td></td>
                        <td></td>
                        <td></td>
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
                        <td>₡0.00</td>
                      </tr>
                      <tr>
                        <td>Cuota hipotecarios</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td>5.0%</td>
                        <td>5.0%</td>
                      </tr>
                      <tr>
                        <td>Cuota empresariales</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Cuota personales</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡0.00</td>
                        <td></td>
                        <td></td>
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
                        <td>-₡1,898,000.00</td>
                        <td>-₡1,642,000.00</td>
                        <td>-₡1,386,000.00</td>
                        <td>-₡1,060,000.00</td>
                        <td>-₡434,000.00</td>
                        <td>-₡408,000.00</td>
                        <td>-₡82,000.00</td>
                        <td>₡244,000.00</td>
                        <td>₡570,000.00</td>
                        <td>₡896,000.00</td>
                        <td>₡1,222,000.00</td>
                        <td>₡1,548,000.00</td>
                        <td>-₡2,114,000.00</td>
                        <td>-₡488,600.00</td>
                        <td>₡1,896,370.00</td>
                      </tr>
                      <tr>
                        <td>Reinversión</td>
                        <td></td>
                        <td>₡50,000</td>
                        <td></td>
                        <td>₡50,000.00</td>
                        <td>₡100,000.00</td>
                        <td>₡235,000.00</td>
                        <td>₡100,000.00</td>
                        <td>₡0.00</td>
                        <td>₡50,000.00</td>
                        <td>₡200,000.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡0.00</td>
                        <td>₡735,000.00</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">FLUJO DE EFECTIVO</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₡366,000.00</td>
                        <td>-₡1,998,000.00</td>
                        <td>-₡1,877,000.00</td>
                        <td>-₡1,486,000.00</td>
                        <td>-₡1,060,000.00</td>
                        <td>-₡484,000.00</td>
                        <td>-₡608,000.00</td>
                        <td>-₡82,000.00</td>
                        <td>₡244,000.00</td>
                        <td>₡570,000.00</td>
                        <td>₡896,000.00</td>
                        <td>₡1,222,000.00</td>
                        <td>₡1,548,000.00</td>
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
                  <MultipleTestingAnalytics 
                    data={flujoNetoData} 
                    dir={'left'}
                    title={'Flujo Neto de Efectivo'}
                    subtitle1={'Escenario Realista 0'}
                    subtitle2={'-Proyección proximo 12 meses'}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <MultipleTestingAnalytics 
                    data={flujoNetoData} 
                    dir={'left'}
                    title={'Flujo Neto de Efectivo'}
                    subtitle1={'Escenario Realista 1'}
                    subtitle2={'-Proyección proximo 12 meses'}
                  />
                </Col>
                <Col xs={12} sm={8}>
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
