import React, { useEffect, useState, useContext } from "react";
import { Container, Card, CardBody, Table } from "reactstrap";
import { FormName } from "redux-form";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

export default function StepFive({ animation, StepFourCheck }) {
  const { escenarioPreeliminar, changeEscenarioPreeliminar, cedula,global } =
    useContext(PreaprobadoContext);
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
          if (element.type === "interno") {
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

      const rate_per_period = escenarioPreeliminar.tasa / 100 / 12;
      const number_of_payments = escenarioPreeliminar.plazo;
      const present_value = internal + external;
      const future_value = 0;
      var q = Math.pow(1 + rate_per_period, number_of_payments);
      var nuevaCuotaRefinanciada =
        (rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * 0));

      const rate_per_period2 = escenarioPreeliminar.tasaTarjeta / 100 / 12;
      var limiteTarjeta =
        ((cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada) /
          rate_per_period2) *
        (1 -
          Math.pow(1 + rate_per_period2, -escenarioPreeliminar.plazoTarjeta));

      setForm({
        saldoNo: new Intl.NumberFormat(["ban", "id"]).format(
          saldoNo.toFixed(2)
        ),
        cuotaNo: new Intl.NumberFormat(["ban", "id"]).format(
          cuotaNo.toFixed(2)
        ),
        saldo: new Intl.NumberFormat(["ban", "id"]).format(
          (internal + external).toFixed(2)
        ),
        cuota: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              nuevaCuotaRefinanciada.toFixed(2)
            )
          : 0,
        saldoTarjeta: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              limiteTarjeta.toFixed(2)
            )
          : 0,
        cuotaTarjeta: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              nuevaCuotaRefinanciada.toFixed(2)
            )
          : 0,
        saldoTotal: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (saldoNo + internal + external + limiteTarjeta).toFixed(2)
            )
          : 0,
        cuotaTotal: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                cuotaNo +
                cuotaInternal +
                cuotaExternal +
                nuevaCuotaRefinanciada
              ).toFixed(2)
            )
          : 0,
        saldoSi: internal + external,
        ahorroDisponible: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada).toFixed(
                2
              )
            )
          : 0,
        tarjetaCredito: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              limiteTarjeta.toFixed(2)
            )
          : 0,
        montoExposicion: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (internal + external + limiteTarjeta).toFixed(2)
            )
          : new Intl.NumberFormat(["ban", "id"]).format(
              (internal + external).toFixed(2)
            ),
        montoExposicionSave: limiteTarjeta
          ? internal + external + limiteTarjeta
          : internal + external,
        saldoTotalSave: saldoNo,
        cuotaTotalSave: cuotaNo,
      });

      changeEscenarioPreeliminar({
        ...escenarioPreeliminar,
        saldoNo: new Intl.NumberFormat(["ban", "id"]).format(
          saldoNo.toFixed(2)
        ),
        cuotaNo: new Intl.NumberFormat(["ban", "id"]).format(
          cuotaNo.toFixed(2)
        ),
        saldo: new Intl.NumberFormat(["ban", "id"]).format(
          (internal + external).toFixed(2)
        ),
        cuota: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              nuevaCuotaRefinanciada.toFixed(2)
            )
          : 0,
        saldoTarjeta: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              limiteTarjeta.toFixed(2)
            )
          : 0,
        cuotaTarjeta: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              nuevaCuotaRefinanciada.toFixed(2)
            )
          : 0,
        saldoTotal: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (saldoNo + internal + external + limiteTarjeta).toFixed(2)
            )
          : 0,
        cuotaTotal: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                cuotaNo +
                nuevaCuotaRefinanciada +
                nuevaCuotaRefinanciada
              ).toFixed(2)
            )
          : 0,
        saldoSi: internal + external,
        ahorroDisponible: nuevaCuotaRefinanciada
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (cuotaInternal + cuotaExternal - nuevaCuotaRefinanciada).toFixed(
                2
              )
            )
          : 0,
        montoExposicion: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (internal + external + limiteTarjeta).toFixed(2)
            )
          : new Intl.NumberFormat(["ban", "id"]).format(
              (internal + external).toFixed(2)
            ),
        montoExposicionSave: limiteTarjeta
          ? internal + external + limiteTarjeta
          : internal + external,
        cuotaSuma: cuotaExternal + cuotaInternal,
        tarjetaCredito: limiteTarjeta
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (limiteTarjeta / global.tipo_cambio).toFixed(2)
            )
          : 0,

        saldoTotalSave: saldoNo,
        cuotaTotalSave: cuotaNo,
        cuotaTotalSi: cuotaInternal + cuotaExternal,
      });

      setActiveCheckFive(escenarioPreeliminar.check || []);

      setPlazo(
        escenarioPreeliminar.plazo || escenarioPreeliminar.default.ref_plazo
      );
      setTasa(
        escenarioPreeliminar.tasa || escenarioPreeliminar.default.ref_tasa
      );
      setPlazoTarjeta(
        escenarioPreeliminar.plazoTarjeta ||
          escenarioPreeliminar.default.tc_plazo
      );

      setTasaTarjeta(
        escenarioPreeliminar.tasaTarjeta || escenarioPreeliminar.default.tc_tasa
      );
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
  }, [StepFourCheck]);

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

      console.log(result);
      const rate_per_period2 = tasaTarjeta / 100 / 12;

      if (plazoTarjeta && tasaTarjeta) {
        result2 =
          ((escenarioPreeliminar.cuotaSuma - result) / rate_per_period2) *
          (1 - Math.pow(1 + rate_per_period2, -plazoTarjeta));
      }

      setForm({
        ...form,
        ahorroDisponible: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.cuotaSuma - result).toFixed(2)
            )
          : 0,
        cuota: new Intl.NumberFormat(["ban", "id"]).format(result.toFixed(2)),
        tarjetaCredito: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (result2 / global.tipo_cambio).toFixed(2)
            )
          : 0,
        saldoTarjeta: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(result2.toFixed(2))
          : 0,
        cuotaTarjeta: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.cuotaSuma - result).toFixed(2)
            )
          : 0,
        saldoTotal: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                escenarioPreeliminar.saldoTotalSave +
                escenarioPreeliminar.saldoSi +
                result2
              ).toFixed(2)
            )
          : 0,
        cuotaTotal: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                escenarioPreeliminar.cuotaTotalSave +
                escenarioPreeliminar.cuotaSuma
              ).toFixed(2)
            )
          : 0,
        montoExposicion: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.saldoSi + result2).toFixed(2)
            )
          : new Intl.NumberFormat(["ban", "id"]).format(
              escenarioPreeliminar.saldoSi.toFixed(2)
            ),
        montoExposicionSave: result2
          ? escenarioPreeliminar.saldoSi + result2
          : escenarioPreeliminar.saldoSi,
      });

      changeEscenarioPreeliminar({
        ...escenarioPreeliminar,
        plazo,
        tasa,
        plazoTarjeta,
        tasaTarjeta,
        saldoTarjeta: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(result2.toFixed(2))
          : 0,
        cuotaTarjeta: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.cuotaSuma - result).toFixed(2)
            )
          : 0,
        ahorroDisponible: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.cuotaSuma - result).toFixed(2)
            )
          : 0,
        cuota: new Intl.NumberFormat(["ban", "id"]).format(result.toFixed(2)),
        tarjetaCredito: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (result2 / global.tipo_cambio).toFixed(2)
            )
          : 0,
        saldoTotal: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                escenarioPreeliminar.saldoTotalSave +
                escenarioPreeliminar.saldoSi +
                result2
              ).toFixed(2)
            )
          : 0,
        cuotaTotal: result
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (
                escenarioPreeliminar.cuotaTotalSave +
                escenarioPreeliminar.cuotaSuma
              ).toFixed(2)
            )
          : 0,
        montoExposicion: result2
          ? new Intl.NumberFormat(["ban", "id"]).format(
              (escenarioPreeliminar.saldoSi + result2).toFixed(2)
            )
          : new Intl.NumberFormat(["ban", "id"]).format(
              escenarioPreeliminar.saldoSi.toFixed(2)
            ),
        montoExposicionSave: result2
          ? escenarioPreeliminar.saldoSi + result2
          : escenarioPreeliminar.saldoSi,
      });
    }
  }, [plazo, tasa, plazoTarjeta, tasaTarjeta]);

  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <Card>
        <CardBody
          style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" }}
          className=" m-lg-0  "
        >
          <h4 className="page-title  general-title py-4">
            ESCENARIO PRELIMINAR
          </h4>
          <Table className="" responsive style={{ minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td className=""></td>
                <td className=""></td>
                <td className="">MONTO</td>
                <td className="">CUOTA</td>
                <td className="">VINCULA PRODUCTO</td>
              </tr>
            </thead>
            <tbody className="pt-5">
              <tr>
                <td
                  style={{
                    minWidth: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  AHORRO DISPONIBLE
                </td>
                <td>{/* <input type="text"/> */} </td>
                {form.ahorroDisponible ? (
                  <th>
                    <span
                      style={{
                        padding: "0.4rem 0.7rem",
                        borderRadius: "2px",
                        color: "white",
                        background:
                          form.ahorroDisponible[0] === "-"
                            ? "#f46a6a"
                            : "#5bbd91",
                      }}
                    >
                      ₡ {form.ahorroDisponible}
                    </span>
                  </th>
                ) : (
                  <th> ₡ 0 </th>
                )}
                <th> </th>
                <th>
                  <button
                    onClick={() => {
                      handleClickStepFourCheck("1");
                    }}
                    className={` ${
                      activeCheckFive.find((element) => element === "1")
                        ? "checkButtonActive"
                        : "checkButton"
                    }`}
                  >
                    SI
                  </button>
                </th>
              </tr>
              <tr>
                <td
                  style={{
                    minWidth: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  LIMITE DISPONIBLE EN TARJETA DE CREDITO
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <div
                      className="d-flex pr-4"
                      style={{ alignItems: "center" }}
                    >
                      <p style={{ width: "50px", margin: "0px" }}> TASA</p>
                      <input
                        value={tasaTarjeta}
                        onChange={(e) => {
                          setTasaTarjeta(e.target.value);
                        }}
                        type="number"
                        className=" mt-0 text-center  form-cedula-input"
                        style={{
                          width: "50px",
                          background: "rgb(221,235,247)",
                        }}
                      />
                      <p
                        style={{
                          width: "20px",
                          paddingLeft: "5px",
                          margin: "0px",
                        }}
                      >
                        {tasaTarjeta && `%`}
                      </p>
                    </div>

                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <p style={{ width: "50px", margin: "0px" }}> PLAZO </p>
                      <input
                        value={plazoTarjeta}
                        onChange={(e) => {
                          setPlazoTarjeta(e.target.value);
                        }}
                        type="number"
                        className=" mt-0 ml-2 text-center  form-cedula-input"
                        style={{
                          width: "50px",
                          background: "rgb(221,235,247)",
                        }}
                      />
                      <p
                        style={{
                          width: "50px",
                          paddingLeft: "5px",
                          margin: "0px",
                        }}
                      >
                        {plazoTarjeta && ` Meses`}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{/* <input type="text"/>  */}</td>
                <th>$ {form.tarjetaCredito} </th>
                <th> </th>

                <th>
                  <button
                    onClick={() => {
                      handleClickStepFourCheck("2");
                    }}
                    className={` ${
                      activeCheckFive.find((element) => element === "2")
                        ? "checkButtonActive"
                        : "checkButton"
                    }`}
                  >
                    SI
                  </button>
                </th>
              </tr>
              <tr>
                <td className="text-left">
                  MEDIO DE PAGO "DEDUCCION DE PLANILLA"
                </td>
                <th> </th>
                <th> </th>
                <th> </th>
                <th>
                  <button
                    onClick={() => {
                      handleClickStepFourCheck("3");
                    }}
                    className={` ${
                      activeCheckFive.find((element) => element === "3")
                        ? "checkButtonActive"
                        : "checkButton"
                    }`}
                  >
                    SI
                  </button>
                </th>
              </tr>
              <tr>
                <td className="text-left">CLIENTE TRASPASA PAGO DE SALARIO</td>
                <th> </th>
                <th> </th>
                <th> </th>
                <th>
                  <button
                    onClick={() => {
                      handleClickStepFourCheck("4");
                    }}
                    className={` ${
                      activeCheckFive.find((element) => element === "4")
                        ? "checkButtonActive"
                        : "checkButton"
                    }`}
                  >
                    SI
                  </button>
                </th>
              </tr>
              {/*   <tr>
                <td className="text-left">Renegocia Plazo (En Meses)</td>
                <th>  </th>
                <th> </th>
                <th> </th>
                <th> </th>
              </tr> */}
            </tbody>
          </Table>

          <h4 className="page-title  general-title mt-5 py-4 ">
            DETALLE CONSOLIDADO DE DEUDAS INTERNAS Y EXTERNAS
          </h4>
          <Table className="mb-5" responsive style={{ minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td className=""></td>
                <td style={{ width: "250px" }} className="">
                  SALDOS
                </td>
                <td style={{ width: "250px" }} className="">
                  CUOTAS
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  SALDO CON RESTO DEL SISTEMA FINANCIERO NACIONAL
                </td>
                <th>₡ {form.saldoNo} </th>
                <th>₡ {form.cuotaNo} </th>
              </tr>

              <tr>
                <td
                  style={{
                    minWidth: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  MONTO TOTAL REFINANCIAR
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <div
                      className="d-flex pr-4"
                      style={{ alignItems: "center" }}
                    >
                      <p style={{ width: "50px", margin: "0px" }}> TASA</p>
                      <input
                        value={tasa}
                        onChange={(e) => {
                          setTasa(e.target.value);
                        }}
                        type="number"
                        className=" mt-0 text-center  form-cedula-input"
                        style={{
                          width: "50px",
                          background: "rgb(221,235,247)",
                        }}
                      />
                      <p
                        style={{
                          width: "20px",
                          paddingLeft: "5px",
                          margin: "0px",
                        }}
                      >
                        {tasa && `%`}
                      </p>
                    </div>

                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <p style={{ width: "50px", margin: "0px" }}> PLAZO </p>
                      <input
                        value={plazo}
                        onChange={(e) => {
                          setPlazo(e.target.value);
                        }}
                        type="number"
                        className=" mt-0 ml-2 text-center  form-cedula-input"
                        style={{
                          width: "50px",
                          background: "rgb(221,235,247)",
                        }}
                      />
                      <p
                        style={{
                          width: "50px",
                          paddingLeft: "5px",
                          margin: "0px",
                        }}
                      >
                        {plazo && ` Meses`}
                      </p>
                    </div>
                  </div>
                </td>
                <th>₡ {form.saldo} </th>
                <th>₡ {form.cuota} </th>
              </tr>
              <tr>
                <td className="text-left">
                  SALDO A OTORGAR EN TARJETA DE CREDITO
                </td>
                <th>₡ {form.saldoTarjeta} </th>
                <th>₡ {form.cuotaTarjeta} </th>
              </tr>
              <tr style={{ height: "30px" }}></tr>
              <tr>
                <td className="text-left">
                  <strong> SALDO TOTAL </strong>
                </td>
                <th>₡ {form.saldoTotal} </th>
                <th>₡ {form.cuotaTotal}</th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <PdfHeader pagination="7" />
      <Card>
        <CardBody
          style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" }}
          className=" m-lg-0  "
        >
          <h4 className="page-title  general-title  py-4 ">
            VALORACION DE LIMITES NORMATIVOS
          </h4>
          <Table responsive className="mt-5" style={{ minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td style={{ width: "350px" }}></td>
                <td style={{ width: "200px" }} className="">
                  MONTO PERMITIDO
                </td>
                <td style={{ width: "200px" }} className="">
                  MONTO ACTUAL
                </td>
                <td style={{ width: "300px" }} className="">
                  RESOLUCION
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  <strong> MONTO DE EXPOSICION MAXIMA SIN FIADOR</strong>
                </td>
                <th className="text-center">
                  ₡{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    escenarioPreeliminar.default.sf_mto_max
                  )}
                </th>

                <th className="text-center">₡ {form.montoExposicion} </th>
                {form.montoExposicionSave <
                escenarioPreeliminar.default.sf_mto_max ? (
                  <th>
                    <div
                      style={{
                        color: "white",
                        backgroundColor: "#5bbd91",
                        borderRadius: "2px",
                      }}
                    >
                      MONTO DENTRO DE LO NORMADO
                    </div>
                  </th>
                ) : (
                  <th>
                    <div
                      style={{
                        color: "white",
                        backgroundColor: "#f46a6a",
                        borderRadius: "2px",
                      }}
                    >
                      SOBREPASA MONTO NORMADO
                    </div>
                  </th>
                )}
              </tr>
              <tr>
                <td className="text-left">
                  <strong> MONTO MAXIMO DE PARA ESTE MES</strong>
                </td>
                <th className="text-center">
                  ₡{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    escenarioPreeliminar.default.mes_mto_max
                  )}
                </th>
                <th className="text-center">₡ {form.montoExposicion} </th>
                {form.montoExposicionSave <
                escenarioPreeliminar.default.mes_mto_max ? (
                  <th>
                    <div
                      style={{
                        color: "white",
                        backgroundColor: "#5bbd91",
                        borderRadius: "2px",
                      }}
                    >
                      MONTO DENTRO DE LO NORMADO
                    </div>
                  </th>
                ) : (
                  <th>
                    <div
                      style={{
                        color: "white",
                        backgroundColor: "#f46a6a",
                        borderRadius: "2px",
                      }}
                    >
                      SOBREPASA MONTO NORMADO
                    </div>
                  </th>
                )}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}
