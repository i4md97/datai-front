import React, { useState, useEffect, useContext } from "react";

// Helpers
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table } from "reactstrap";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";

// Styles
import styled from "styled-components";

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
  }
`;

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
    sizeSteps,
    size,
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


  const tablaCapacidadPago = [
    { title: "INGRESO BRUTO", previa: cedula ? cedula.salary : 0, actual: cedula ? cedula.salary : 0, },
    { title: "(-) CARGAS SOCIALES", previa: formPrevia.cargaSociales, actual: formActual.cargaSociales, },
    { title: "(-) IMPUESTOS DE RENTA", previa: formPrevia.impuestosRenta, actual: formActual.impuestosRenta, },
    { title: "(-) OTRAS DEDUCCIONES", previa: formPrevia.otrasDeducciones, actual: formActual.otrasDeducciones, borderBottom: true },
    { title: "INGRESOS NETOS", previa: formPrevia.ingresoNeto, actual: formActual.ingresoNeto, },
    { title: "(-) CUOTAS DE DEUDAS TOTALES", previa: formPrevia.deudasTotales, actual: formActual.deudasTotales, },
    { title: "CUOTAS DE DEUDAS INTERNAS", previa: formPrevia.deudaInterna, actual: formActual.deudaInterna, },
    { title: "CUOTAS DE DEUDAS EXTERNAS", previa: formPrevia.deudaExternal, actual: formActual.deudaExternal, },
    { title: "CUOTAS TARJETA CRÉDITO VINCULADAS", previa: formPrevia.cuotasTarjetas, actual: formActual.cuotasTarjetas, borderBottom: true },
    { title: "(=) LÍQUIDO ANTES DE CUOTA REFINANCIADA", previa: formPrevia.liquidoAntes, actual: formActual.liquidoAntes, },
    { title: "(-) CUOTA DEL NUEVO CRÉDITO", previa: null, actual: formActual.cuotaMensualRefinanciada, none: true },
    { title: "(=) LÍQUIDO DESPUÉS CUOTA REFINANCIADA", previa: formPrevia.liquidoDespues, actual: formActual.liquidoDespues, },
    { title: "SALARIO LÍQUIDO SI CUMPLE MINIMO", previa: 200000, actual: 200000, },
    { title: "SALARIO LÍQUIDO DISPONIBLE", previa: formPrevia.salarioLiquidoDisponible, actual: formActual.salarioLiquidoDisponible, type: "alert", },
    { title: "LÍQUIDO MENSUAL SEGUN COLILLA DE PAGO", previa: null, actual: null, type: "input", },
    { title: "% ENDEUDAMIENTO", previa: formPrevia.endeudamiento, actual: formActual.endeudamiento, type: "percent", },
    { title: "% CSD", previa: formPrevia.csd, actual: formActual.csd, type: "percent", },
    { title: "NIVEL CAPACIDAD DE PAGO", previa: formPrevia.nivelCapacidadPago, actual: formActual.nivelCapacidadPago, type: "alert2", },
  ]


  const parseValue = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat(["ban", "id"]).format((value || 0).toFixed(2));
  };


  const getTypeOfTable = (value, type) => {
    switch (type) {


      case "percent": return `${parseValue(value || 0)} %`;
      case "alert":
        return <div style={{
          color:
            value < 0
              ? "#dc3545"
              : "#4ce1b6",
          borderRadius: "2px",
          width: "90%",
        }}> ₡ {parseValue(value)}</div>;
      case "alert2": return <div
        style={{
          color:
            value !== "N1"
              ? "#dc3545"
              : "#4ce1b6",
          borderRadius: "2px",
          width: "90%",
        }}
      >
        {value}
      </div>;
      case "input": return pdf ? (
        `${formColillaPago}`
      ) : (
        <div className="form-cedula-field">
          <span className="symbol">₡</span>
          <input
            value={formColillaPago}
            onChange={(e) => {
              setFormColillaPago(e.target.value);
              changeEscenarioPreeliminar({
                ...escenarioPreeliminar,
                colillaPago: e.target.value,
              });
            }}
            type="number"
            className=" mt-0 text-center form-cedula-input"
            style={{
              width: "200px",
              background: "rgb(221,235,247)",
            }}
          />
        </div>
      )
        ;

      case "dollar": return `$ ${parseValue(value)}`
      default: return `₡ ${parseValue(value)}`;
    }

  }

  return (
    <div className={`dashboard capacidad-pago capacidad-pago step__cards ${animation && !pdf && "step__animation"}`}>
      {/* <Row>
        <Col>
            <SizeSteps className="d-flex" name="capacidadPago" />
            <h4 className="page-title general-title">CAPACIDAD DE PAGO</h4>
        </Col>
      </Row> */}
      <Row className="pt-4">
        <Col>
          <StylesContainer pdf={pdf} size2={size} size={sizeSteps.capacidadPago || null}>
            <Card className="">
              <CardBody>
                <Table responsive style={{ minWidth: pdf ? "inherit" : "910px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <th className="w-50">RUBROS</th>
                      <th className="w-25">SITUACIÓN PREVIA</th>
                      <th className="w-25">SITUACIÓN ACTUAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaCapacidadPago.map((element, index) => 
                      <tr align="center" key={`table-row-${index}`} className={`border-bottom${element.borderBottom ? ' break' : ''}`}>
                        <td className={`text-left d-flex w-100 aling-items-center ${element.type === "input" ? "pt-4" : ''}`}>
                          {element.title}
                        </td>
                        <td className={element.type === "input" ? "px-0" : ''}>{!element.none && getTypeOfTable(element.previa, element.type)}</td>
                        <td>{element.type !== "input" && getTypeOfTable(element.actual, element.type)}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <h3 className="pb-3">Sensibilización</h3>
            <Card>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Escenarios</th>
                      <th>0</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Estrés Tasa Colones</td>
                      <td>0%</td>
                      <td>0.25%</td>
                      <td>1.00%</td>
                      <td>2.00%</td>
                      <td>4.00%</td>
                      <td>5.00%</td>
                    </tr>
                    <tr>
                      <td>Estrés Tasa Dólares</td>
                      <td>0%</td>
                      <td>0.10%</td>
                      <td>0.25%</td>
                      <td>1.00%</td>
                      <td>1.75%</td>
                      <td>2.50%</td>
                    </tr>
                    <tr>
                      <td>Estrés Tipo Cambio</td>
                      <td>0%</td>
                      <td>5.00%</td>
                      <td>10.00%</td>
                      <td>15.00%</td>
                      <td>20.00%</td>
                      <td>25.00%</td>
                    </tr>
                    <tr>
                      <td>Estrés Ingreso</td>
                      <td>0%</td>
                      <td>-5.00%</td>
                      <td>-8.00%</td>
                      <td>-10.00%</td>
                      <td>-15.00%</td>
                      <td>-20.00%</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </StylesContainer>
        </Col>
      </Row>
    </div>
  );
}
