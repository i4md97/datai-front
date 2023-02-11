import React, { useEffect, useState, useContext } from "react";
import NumberFormat from "react-number-format"

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import TasaPlazo from "../../../components/TasaPlazo/TasaPlazo"
// import PdfHeader from "../../../components/PdfHeader/PdfHeader";

// Style
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

  }
`;
export default function StepNine({ animation, pdf }) {
  const [plazo, setPlazo] = useState("");
  const [tasa, setTasa] = useState("");

  const {
    sizeSteps,
    size,
    capacidadPago,
    escenarioPreeliminar,
    estructuraFinanciamiento,
    changeEstructuraFinanciamiento,
    global,
  } = useContext(PreaprobadoContext);

  const [formActual, setFormActual] = useState({
    montoDisponibleAdicional: 0,
    deudaInterna: 0,
    deudaExterna: 0,
    primerCuota: 0,
    subtotalFinanciar: 0,
    gastosAdicionales: 0,
    total: 0,
    totalMonto: 0,
    montoAdicionalNew: 0,
  });

  const [formInputs, setFormInputs] = useState({
    saldoAdicionalTarjeta: "0",
    saldoAdicionalOperaciones: "0",
    saldoAdicionalDeudas: "0",
    montoAdicionalGastos: "0",
    saldoAdicionalesDeudasInternas: "0",
    ajusteInteres: "0",
    capitalSoc: "0",
    programaSocial: "0",
    polizaAseguram: "0",
    papeleria: "0",
    imprevistos: "0",
    comision: "0",
    capitalizacion: "0",
  });

  useEffect(() => {
    if (capacidadPago.actual) {
      //MONTO DISPONIBLE ADICIONAL
      let result2 = null;
      const rate_per_period2 = tasa / 100 / 12;

      if (plazo && tasa) {
        result2 =
          ((capacidadPago.actual
            ? capacidadPago.actual.salarioLiquidoDisponible
            : 0) /
            rate_per_period2) *
          (1 - Math.pow(1 + rate_per_period2, -plazo));
      }
      setFormActual({
        ...formActual,
        montoDisponibleAdicional: result2 || 0,
        deudaInterna: escenarioPreeliminar.saldoSiInternal || 0,
        deudaExterna: escenarioPreeliminar.saldoSiExternal || 0,
        primerCuota: escenarioPreeliminar.cuota || 0,
      });

      console.log(escenarioPreeliminar);

      changeEstructuraFinanciamiento({
        ...estructuraFinanciamiento,
        montoDisponibleAdicional: result2 || 0,
        plazo,
        tasa,
        deudaInterna: escenarioPreeliminar.saldoSiInternal || 0,
        deudaExterna: escenarioPreeliminar.saldoSiExternal || 0,
        primerCuota: escenarioPreeliminar.cuota || 0,
      });
    } else {
      changeEstructuraFinanciamiento({
        ...estructuraFinanciamiento,
        plazo,
        tasa,
        deudaInterna: escenarioPreeliminar.saldoSiInternal || 0,
        deudaExterna: escenarioPreeliminar.saldoSiExternal || 0,
        primerCuota: escenarioPreeliminar.cuota || 0,
      });
    }
  }, [plazo, tasa]);

  useEffect(() => {
    setPlazo(
      estructuraFinanciamiento.plazo ||
      estructuraFinanciamiento.default.recalc_plazo
    );
    setTasa(
      estructuraFinanciamiento.tasa ||
      estructuraFinanciamiento.default.recalc_tasa
    );
  }, []);

  useEffect(() => {
    const sumaAll =
      (parseInt(formInputs.saldoAdicionalTarjeta) || 0) +
      (parseInt(formInputs.saldoAdicionalOperaciones) || 0) +
      (parseInt(formInputs.saldoAdicionalDeudas) || 0) +
      (parseInt(formInputs.montoAdicionalGastos) || 0) +
      (parseInt(formInputs.saldoAdicionalesDeudasInternas) || 0) +
      (escenarioPreeliminar.saldoSiExternal || 0) +
      (escenarioPreeliminar.saldoSiInternal || 0);

    let sumaGastosAdicionales = 0;

    sumaGastosAdicionales =
      (escenarioPreeliminar.cuota
        ? parseFloat(escenarioPreeliminar.cuota)
        : 0) +
      (parseInt(formInputs.ajusteInteres) || 0) +
      (parseInt(formInputs.capitalSoc) || 0) +
      (parseInt(formInputs.programaSocial) || 0) +
      (parseInt(formInputs.polizaAseguram) || 0) +
      (parseInt(formInputs.papeleria) || 0) +
      (parseInt(formInputs.imprevistos) || 0) +
      (parseInt(formInputs.comision) || 0) +
      (parseInt(formInputs.capitalizacion) || 0);

    const rate_per_period2 = tasa / 100 / 12;
    let result2 = 0;
    if (plazo && tasa) {
      result2 =
        ((capacidadPago.actual
          ? capacidadPago.actual.salarioLiquidoDisponible
          : 0) /
          rate_per_period2) *
        (1 - Math.pow(1 + rate_per_period2, -plazo));
    }

    let montoAdicionalNew = 0;

    if (
      (global ? global.sf_mto_max : 0) - sumaAll + sumaGastosAdicionales <
      result2
    ) {
      montoAdicionalNew =
        (global ? global.sf_mto_max : 0) - sumaAll + sumaGastosAdicionales;
    } else {
      montoAdicionalNew = result2;
    }

    setFormActual({
      ...formActual,
      montoAdicionalNew,
      montoDisponibleAdicional: result2 || 0,
      subtotalFinanciar: sumaAll,
      gastosAdicionales: sumaGastosAdicionales,
      deudaInterna: escenarioPreeliminar.saldoSiInternal || 0,
      deudaExterna: escenarioPreeliminar.saldoSiExternal || 0,
      total:
        sumaAll && sumaGastosAdicionales && sumaAll + sumaGastosAdicionales,
      totalMonto:
        sumaAll && sumaGastosAdicionales && sumaAll + sumaGastosAdicionales,
      primerCuota: escenarioPreeliminar.cuota || 0,
    });
    changeEstructuraFinanciamiento({
      ...estructuraFinanciamiento,
      ...formActual,
      montoAdicionalNew,
      montoDisponibleAdicional: result2 || 0,
      subtotalFinanciar: sumaAll,
      gastosAdicionales: sumaGastosAdicionales,
      deudaInterna: escenarioPreeliminar.saldoSiInternal || 0,
      deudaExterna: escenarioPreeliminar.saldoSiExternal || 0,
      total:
        sumaAll && sumaGastosAdicionales && sumaAll + sumaGastosAdicionales,
      totalMonto:
        sumaAll && sumaGastosAdicionales && sumaAll + sumaGastosAdicionales,
      primerCuota: escenarioPreeliminar.cuota || 0,
    });

  }, [formInputs, plazo, tasa]);

  const onChangeFormActual = (e) => {
    console.log(e)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const tablaEstructuraFinanciamiento = [
    { title: "MONTO DISPONIBLE TOTAL", tasa: true, value: formActual.montoDisponibleAdicional, type: "text", bold:true },
    { title: "MONTO DISPONIBLE ADICIONAL", value: formActual.montoAdicionalNew, type: "text", borderBottom: true, bold:false },
    { title: "REFINANCIAMIENTOS EXTERNOS", value: formActual.deudaExterna, type: "text", bold:true },
    { title: "SALDOS ADICIONALES POR TARJETAS DE CRÉDITO EXTERNAS", value: "saldoAdicionalTarjeta", type: "input", bold:false },
    { title: "SALDOS ADICIONALES OTRAS OPERACIONES EXTERNAS", value: "saldoAdicionalOperaciones", type: "input", bold:false },
    { title: "SALDOS ADICIONALES DEUDAS NO REGULADAS", value: "saldoAdicionalDeudas", type: "input", bold:false },
    { title: "MONTO ADICIONAL PARA GASTOS PERSONALES", value: "montoAdicionalGastos", type: "input", borderBottom: true, bold:false },
    { title: "REFINANCIAMIENTOS INTERNOS", value: formActual.deudaInterna, type: "text", bold:true },
    { title: "SALDOS ADICIONALES DEUDAS INTERNAS", value: "saldoAdicionalesDeudasInternas", type: "input", borderBottom: true, bold:false },
    { title: "SUBTOTAL A FINANCIAR", value: formActual.subtotalFinanciar, type: "text", bold:true },
    { title: "PRIMER CUOTA", value: formActual.primerCuota, type: "text", bold:false },
    { title: "AJUSTE INTERÉS", value: "ajusteInteres", type: "input", bold:false },
    { title: "CAPITAL SOC PRIMER CUOTA", value: "capitalSoc", type: "input", bold:false },
    { title: "PROGRAMA SOCIAL", value: "programaSocial", type: "input", bold:false },
    { title: "PÓLIZA ASEGURAM CARTERA", value: "polizaAseguram", type: "input", bold:false },
    { title: "PAPELERÍA", value: "papeleria", type: "input", bold:false },
    { title: "IMPREVISTOS", value: "imprevistos", type: "input", bold:false },
    { title: "COMISIÓN", value: "comision", type: "input", bold:false },
    { title: "CAPITALIZACIÓN", value: "capitalizacion", type: "input", bold:false },
    { title: "GASTOS ADICIONALES", value: formActual.gastosAdicionales, type: "text", bold:false },
    { title: "TOTAL", value: formActual.total, type: "text", bold:true },
  ]

  const parseValue = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat(["ban", "id"]).format((value || 0).toFixed(2));
  };


  const getTypeOfTable = (value, type) => {
    switch (type) {

      case "text": return `₡ ${parseValue(value)}`;

      case "input": return pdf ? (
        `${formInputs[value]}`
      ) : (
        <>
          <NumberFormat
            className="mt-0 form-cedula-input"
            thousandSeparator={true} 
            prefix={'₡'}
            name={value}
            value={formInputs[value]}
            onValueChange={(e) => { onChangeFormActual({ target: { value: e.value, name: value } }) }}
          />

          {/*  <input
            type="number"
            name={value}
            value={formInputs[value]}
            onChange={onChangeFormActual}
            className=" ml-1 mt-0 text-center  form-cedula-input"
            style={{
              width: "100px",
              background: "rgb(221,235,247)",
            }}
          /> */}
        </>
      )


      default: return `₡ ${parseValue(value)}`;
    }

  }

  return (
    <div className={`dashboard montos-financiar step__cards  ${animation && !pdf && "step__animation"} `}>
      <SizeStep pdf={pdf} size2={size} size={sizeSteps.estructuraFinanciamiento || null}>
        <Row className="pt-4">
          <Col>
              {!pdf && (
                <h4 className="page-title  general-title">
                  Montos totales a financiar
                </h4>
              )}
              {/* <SizeSteps className="d-flex" name="estructuraFinanciamiento" /> */}
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12} className="first-container">
            <Card className="padding-th">
              <CardBody>

                <Table responsive style={{ minWidth: pdf ? "inherit" : "910px" }}>
                  <thead>
                    <tr>
                      <th className="table-name"></th>
                      <th>Tasa</th>
                      <th>Plazo/Meses</th>
                      <th colSpan={2}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablaEstructuraFinanciamiento.map((element, index) => 
                      <tr key={`capacidad-table-row-${index}`} className={`border-bottom${element.borderBottom ? ' break' : ''}`}>
                        <td className={`text-left ${element.bold ? 'font-weight-bolder' : ''}`} style={{ alignItems: "center" }} >
                          {element.title}
                        </td>
                        {element.tasa 
                          ? <TasaPlazo plazo={plazo} setPlazo={setPlazo} pdf={pdf} tasa={tasa} setTasa={setTasa} />
                          : <td colSpan={2}></td>
                        }
                        <td className="table-blank"> </td>
                        <td className="w-10">
                          {getTypeOfTable(element.value, element.type)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col sm={12} className="third-container">
            
            <Card>
              <CardBody>
                <Table className="table-bottom" responsive style={{ minWidth: pdf ? "inherit" : "910px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                      <th> </th>
                      <th>Monto permitido</th>
                      <th>Monto actual</th>
                      <th className="text-center">Resolución</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        MONTO DE EXPOSICIÓN MÁXIMA PARA ESTE TIPO DE OPERACIÓN
                      </td>
                      <td>
                        ₡{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          global ? global.sf_mto_max : 0
                        )}
                      </td>
                      <td>
                        ₡{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          formActual.totalMonto.toFixed(2)
                        )}
                      </td>
                      {formActual.totalMonto < (global ? global.sf_mto_max : 0) ? (
                        <td className="text-center">
                          <div className="bg-success">
                            MONTO DENTRO DE LO NORMADO
                          </div>
                        </td>
                      ) : (
                        <td className="text-center">
                          <div className="bg-danger">
                            SOBREPASA MONTO NORMADO
                          </div>
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td> MONTO MÁXIMA DE PARA ESTE MES</td>
                      <td>
                        ₡{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          global ? global.mes_mto_max : 0
                        )}
                      </td>
                      <td>
                        ₡{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          formActual.totalMonto.toFixed(2)
                        )}
                      </td>
                      {formActual.totalMonto < (global ? global.mes_mto_max : 0) ? (
                        <td className="text-center">
                          <div className="bg-success">
                            MONTO DENTRO DE LO NORMADO
                          </div>
                        </td>
                      ) : (
                        <td className="text-center">
                          <div className="bg-danger">
                            SOBREPASA MONTO NORMADO
                          </div>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col md={12} lg={12} className="second-container">
            <Card className="pb-3 anotations-card">
              <CardBody className="p-3">
                <h4 className="text-left">Anotaciones de la gestión</h4>
                <textarea
                  type="number"
                  className="ml-1 mt-0 text-left form-cedula-input"
                  style={{ fontWeight: "500" }}
                  placeholder="Anotaciones"
                />
              </CardBody>
            </Card>
            <div className="section-actions d-flex justify-content-end">
                <Button>Editar</Button>
                <Button color="primary">Guardar</Button>
            </div>
          </Col>
        </Row>
      </SizeStep>
    </div>
  );
}
