import React, {useState, useEffect, useContext} from "react";
import {Container, Card, CardBody, Col, Table} from "reactstrap";
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";

export default function CapacidadPago({animation, escenarioPreeliminar, cedula}) {
  const {user} = useContext(UsuarioContext);
  const {stepFourCheck, changeEscenarioPreeliminar,changeCapacidadPago} =
    useContext(PreaprobadoContext);

  const [formSituacion, setFormSituacion] = useState({
    previa: "",
    actual: "",
  });

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
      previa: escenarioPreeliminar.previa || "",
      actual: escenarioPreeliminar.previa || "",
    });
  }, []);

  useEffect(() => {
    if (formSituacion.previa && cedula) {
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
          console.log(find);
          if (find.type === "interno") {
            cuotaInternalActual += find.data[11] + find.data[12];
          } else {
            cuotaExternalActual += find.data[11] + find.data[12];
          }
        }
      });

      let flagCuotas = false;

      let cuotasTarjetasCopy = 0;
      if (escenarioPreeliminar.check) {
        escenarioPreeliminar.check.map((element) => {
          if (element === "2") {
            cuotasTarjetasCopy = parseFloat(
              escenarioPreeliminar.ahorroDisponible
                .replaceAll(".", "")
                .replaceAll(",", ".")
            );
          }
          if (element === "1") {
            flagCuotas = true;
          }
        });
      }

      let deudasTotalesCopy =
        cuotasTarjetasCopy +
        deudaInternaCopy +
        deudaExternalCopy -
        (flagCuotas ? cuotaExternalActual - cuotaInternalActual : 0);
      let deudasTotalesCopy2 = deudaInternaCopy + deudaExternalCopy;

      //INGRESO BRUTO

      let ingresoBruto = formSituacion.previa;

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
          ? parseFloat(
              escenarioPreeliminar.cuota
                .replaceAll(".", "")
                .replaceAll(",", ".")
            )
          : 0;

      //Calculamos CSD ACTUAL
      let csdCopy = escenarioPreeliminar.cuota
        ? ((saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar) /
            ingresoBruto) *
          100
        : 0;

      //CALCULAMOS ENDEUDAMIENTO ACTUAL
      let endeudamientoCopy = escenarioPreeliminar.cuota
        ? ((saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar) /
            saveIngresoNeto) *
          100
        : 0;

      //CALCULAMOS LIQUIDO DESPUES ACTUAL

      let liquidoDespuesCopy = escenarioPreeliminar.cuota
        ? saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar
        : 0;

      //CALCULAMOS CUOTA MENSUAL REFINANCIADA ACTUAL

      let cuotaMensualRefinanciadaCopy = escenarioPreeliminar.cuota
        ? cuotaEscenarioPreeliminar
        : 0;

      //CALCULAMOS SALARIO LIQUIDO DISPONIBLE

      let salarioLiquidoDisponibleCopy = escenarioPreeliminar.cuota
        ? saveIngresoNeto -
          deudasTotalesCopy -
          cuotaEscenarioPreeliminar -
          200000
        : 0;

      //CALCULAMOS NIVEL CAPACIDAD DE PAGO ACTUAL

      let nivelCapacidadPagoCopy = escenarioPreeliminar.cuota
        ? saveIngresoNeto - deudasTotalesCopy - cuotaEscenarioPreeliminar >
          200000
          ? "N1"
          : "N2"
        : "";

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
        nivelCapacidadPago:
          saveIngresoNeto - deudasTotalesCopy2 > 200000 ? "N1" : "N2",
      });

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
        liquidoAntes: saveIngresoNeto - deudasTotalesCopy,
        ingresoNeto: saveIngresoNeto,
        otrasDeducciones: otrasDeducciones,
        impuestosRenta: impuestoRenta,
        cargaSociales: cargasSociales,
        nivelCapacidadPago: nivelCapacidadPagoCopy,
      });

      changeCapacidadPago({
        previa: {   ...formPrevia,
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
          cargaSociales:cargasSociales,
          nivelCapacidadPago:  saveIngresoNeto - deudasTotalesCopy2 > 200000 ? "N1" : "N2",
      },
        actual: {
          ...formActual,
          csd: csdCopy  ,
          deudasTotales: deudasTotalesCopy,
          cuotasTarjetas: cuotasTarjetasCopy,
          deudaInterna: deudaInternaCopy - (flagCuotas ? cuotaInternalActual : 0),
          deudaExternal:
            deudaExternalCopy - (flagCuotas ? cuotaExternalActual : 0),
          endeudamiento: endeudamientoCopy,
          liquidoDespues: liquidoDespuesCopy,
          cuotaMensualRefinanciada: cuotaMensualRefinanciadaCopy,
          salarioLiquidoDisponible: salarioLiquidoDisponibleCopy,
          liquidoAntes: saveIngresoNeto - deudasTotalesCopy,
          ingresoNeto: saveIngresoNeto,
          otrasDeducciones: otrasDeducciones,
          impuestosRenta: impuestoRenta,
          cargaSociales: cargasSociales,
          nivelCapacidadPago: nivelCapacidadPagoCopy
        }
      })
    }
  }, [formSituacion]);
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <Card className="">
        <CardBody
          style={{border: "1.5px solid #DFE0EB", boxShadow: "none"}}
          className=" m-lg-0  "
        >
          <h4 className="page-title  general-title py-4 ">CAPACIDAD DE PAGO</h4>
          <Table>
            <thead>
              <tr style={{borderBottom: "1px solid #e0e0e0"}}>
                <td className="text-left">Rubros</td>
                <td style={{width: "300px"}} className="">
                  SITUACION PREVIA
                </td>
                <td
                  /* style={{ width: "50px" }} */ className="text-left px-0"
                ></td>
                <td style={{width: "300px"}} className="">
                  SITUACION ACTUAL
                </td>
                <td
                  /* style={{ width: "50px" }} */ className="text-left px-0"
                ></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  {" "}
                  <strong> INGRESO BRUTO </strong>
                </td>
                <th>
                  ₡{" "}
                  <input
                    value={formSituacion.previa}
                    onChange={(e) => {
                      setFormSituacion({
                        ...formSituacion,
                        previa: e.target.value,
                      });
                      changeEscenarioPreeliminar({
                        ...escenarioPreeliminar,
                        previa: e.target.value,
                      });
                    }}
                    type="number"
                    className=" mt-0 text-center  form-cedula-input"
                    style={{width: "200px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formSituacion.previa &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formSituacion.previa
                    )}{" "}
                </th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (-) CARGAS SOCIALES </>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.cargaSociales &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.cargaSociales.toFixed(2)
                    )}{" "}
                </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.cargaSociales &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.cargaSociales.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (-) IMPUESTOS DE RENTA</>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.impuestosRenta &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.impuestosRenta.toFixed(2)
                    )}{" "}
                </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.impuestosRenta &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.impuestosRenta.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (-) OTRAS DEDUCCIONES</>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.otrasDeducciones &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.otrasDeducciones.toFixed(2)
                    )}{" "}
                </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.otrasDeducciones &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.otrasDeducciones.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <strong> INGRESOS NETOS </strong>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.ingresoNeto &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.ingresoNeto.toFixed(2)
                    )}{" "}
                </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.ingresoNeto &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.ingresoNeto.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (-) CUOTAS DE DEUDAS TOTALES </>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.deudasTotales &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.deudasTotales.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.deudasTotales &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.deudasTotales.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr className="py-0 m-0">
                <td className="text-left pl-5 py-0">
                  {" "}
                  <> CUOTAS DE DEUDAS INTERNAS</>
                </td>
                <th className="py-0">
                  ₡{" "}
                  {formPrevia.deudaInterna &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.deudaInterna.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
                <th className="py-0">
                  ₡{" "}
                  {formActual.deudaInterna &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.deudaInterna.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
              </tr>
              <tr className="py-0 m-0">
                <td className="text-left pl-5 py-0">
                  {" "}
                  <> CUOTAS DE DEUDAS EXTERNAS</>
                </td>
                <th className="py-0">
                  ₡{" "}
                  {formPrevia.deudaExternal &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.deudaExternal.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
                <th className="py-0">
                  ₡{" "}
                  {formActual.deudaExternal &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.deudaExternal.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
              </tr>
              <tr className="py-0 m-0">
                <td className="text-left pl-5 py-0">
                  {" "}
                  <> CUOTAS TARJETA CREDITO VINCULADAS</>
                </td>
                <th className="py-0">
                  ₡{" "}
                  {formPrevia.cuotasTarjetas &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.cuotasTarjetas.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
                <th className="py-0">
                  ₡{" "}
                  {formActual.cuotasTarjetas &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.cuotasTarjetas.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left py-0"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (=) LIQUIDO ANTES DE CUOTA REFINANCIADA</>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.liquidoAntes &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.liquidoAntes.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.liquidoAntes &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.liquidoAntes.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (-) CUOTA DEL NUEVO CREDITO </>
                </td>
                <th> </th>
                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.cuotaMensualRefinanciada &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.cuotaMensualRefinanciada.toFixed(2)
                    )}
                </th>
                <th className="text-left"></th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <br />
      <br />
      <PdfHeader pagination="9" />
      <Card>
        <CardBody
          style={{border: "1.5px solid #DFE0EB", boxShadow: "none"}}
          className=" m-lg-0  "
        >
          <Table>
            <thead>
              <tr>
                <td className="text-left"></td>
                <td style={{width: "300px"}} className=""></td>
                <td
                  /* style={{ width: "50px" }} */ className="text-left px-0"
                ></td>
                <td style={{width: "300px"}} className=""></td>
                <td
                  /* style={{ width: "50px" }} */ className="text-left px-0"
                ></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  {" "}
                  <> (=) LIQUIDO DESPUES CUOTA REFINANCIADA </>
                </td>
                <th>
                  ₡{" "}
                  {formPrevia.liquidoDespues &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.liquidoDespues.toFixed(2)
                    )}{" "}
                </th>

                <th className="text-left"></th>
                <th>
                  ₡{" "}
                  {formActual.liquidoDespues &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.liquidoDespues.toFixed(2)
                    )}
                </th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  <div
                    style={{
                      color: "white",
                      backgroundColor: "#5bbd91",
                      padding: "5px 10px",
                    }}
                  >
                    {" "}
                    SALARIO LIQUIDO SI CUMPLE MINIMO
                  </div>
                </td>
                <th>₡ 200.000</th>
                <th className="text-left"></th>
                <th>₡ 200.000</th>
                <th className="text-left"></th>
              </tr>

              <tr>
                <td className="text-left">
                  {" "}
                  <strong> SALARIO LIQUIDO DISPONIBLE </strong>
                </td>
                <th>
                  {" "}
                  {formPrevia.salarioLiquidoDisponible ? (
                    <div
                      style={{
                        background:
                          formPrevia.salarioLiquidoDisponible < 200000
                            ? "#f46a6a"
                            : "#5bbd91",
                        borderRadius: "2px",
                        width: "90%",
                        margin: "0 auto",
                        color: "white",
                      }}
                    >
                      {" "}
                      ₡{" "}
                      {formPrevia.salarioLiquidoDisponible &&
                        new Intl.NumberFormat(["ban", "id"]).format(
                          formPrevia.salarioLiquidoDisponible.toFixed(2)
                        )}
                    </div>
                  ) : (
                    "₡"
                  )}
                </th>
                <th className="text-left"></th>
                <th>
                  {formActual.salarioLiquidoDisponible ? (
                    <div
                      style={{
                        background:
                          formActual.salarioLiquidoDisponible < 200000
                            ? "#f46a6a"
                            : "#5bbd91",
                        borderRadius: "2px",
                        width: "90%",
                        margin: "0 auto",
                        color: "white",
                      }}
                    >
                      {" "}
                      ₡{" "}
                      {formActual.salarioLiquidoDisponible &&
                        new Intl.NumberFormat(["ban", "id"]).format(
                          formActual.salarioLiquidoDisponible.toFixed(2)
                        )}
                    </div>
                  ) : (
                    "₡"
                  )}
                </th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> LIQUIDO MENSUAL SEGUN COLILLA DE PAGO </>
                </td>
                <th> </th>
                <th className="text-left"></th>
                <th></th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> % ENDEUDAMIENTO </>
                </td>
                <th>
                  {" "}
                  {formPrevia.endeudamiento &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.endeudamiento.toFixed(2)
                    )}{" "}
                  %
                </th>
                <th className="text-left"></th>
                <th>
                  {" "}
                  {formActual.endeudamiento &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.endeudamiento.toFixed(2)
                    )}{" "}
                  %
                </th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> % CSD </>
                </td>
                <th>
                  {" "}
                  {formPrevia.csd &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formPrevia.csd.toFixed(2)
                    )}{" "}
                  %
                </th>
                <th className="text-left"></th>
                <th>
                  {" "}
                  {formActual.csd &&
                    new Intl.NumberFormat(["ban", "id"]).format(
                      formActual.csd.toFixed(2)
                    )}{" "}
                  %
                </th>
                <th className="text-left"></th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <> NIVEL CAPACIDAD DE PAGO </>
                </td>
                <th>
                  {" "}
                  {formPrevia.nivelCapacidadPago && (
                    <div
                      style={{
                        background:
                          formPrevia.nivelCapacidadPago !== "N1"
                            ? "#f46a6a"
                            : "#5bbd91",
                        borderRadius: "2px",
                        width: "90%",
                        margin: "0 auto",
                        color: "white",
                      }}
                    >
                      {formPrevia.nivelCapacidadPago}
                    </div>
                  )}
                </th>
                <th className="text-left"></th>
                <th>
                  {" "}
                  {formPrevia.nivelCapacidadPago && (
                    <div
                      style={{
                        background:
                          formPrevia.nivelCapacidadPago !== "N1"
                            ? "#f46a6a"
                            : "#5bbd91",
                        borderRadius: "2x`px",
                        width: "90%",
                        margin: "0 auto",
                        color: "white",
                      }}
                    >
                      {formPrevia.nivelCapacidadPago}
                    </div>
                  )}
                </th>
                <th className="text-left"></th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}
