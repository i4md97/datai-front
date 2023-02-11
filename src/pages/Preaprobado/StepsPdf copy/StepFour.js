import React, { useState, useContext, useEffect } from "react";
import PreAprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

import { Container, Table, Card, CardBody } from "reactstrap";
import UsuarioContext from "../../../context/usuario/UsuarioContext";
export default function StepFour({ animation, cedula }) {
  const { stepFourCheck, changeStepFourCheck } = useContext(PreAprobadoContext);
  const { user } = useContext(UsuarioContext);

  const [activeCheck, setActiveCheck] = useState(stepFourCheck);
  const [suma,setSuma] = useState({
    saldoInterno: "",
    cuotaInterno: "",
    salgoExterno: "",
    cuotaExterno: "",

  })

  const handleClickStepFourCheck = (val) => {
    const findOne = activeCheck.find((element) => element.index === val.index);
    let newActiveCheck;
    if (findOne) {
      newActiveCheck = activeCheck.filter(
        (element) => element.index !== val.index
      );
    } else {
      newActiveCheck = activeCheck;
      newActiveCheck.push(val);
    }
    setActiveCheck(newActiveCheck);
    changeStepFourCheck(newActiveCheck);
  };


  useEffect(()=> {

    if(cedula && user){

      let saldoInterno = 0;
      let cuotaInterno = 0;
      let saldoExterno = 0;
      let cuotaExterno = 0;

      cedula.debts.data.map((element,i)=> {
        if(element[2] === user.firm_cic){

           saldoInterno += element[7]
           cuotaInterno += element[11] + element[12]

        }else{
          saldoExterno += element[7]
          cuotaExterno += element[11] + element[12]
        }
      })


      setSuma({
        saldoInterno,
        cuotaInterno,
        saldoExterno,
        cuotaExterno,
      })

    }

  },[cedula])

  return (
    <Container
      fluid={true}
      className={` dashboard step__cards ${animation && "step__animation"}`}
    >
      <Card>
        <CardBody
          className="m-lg-0 p-0 pb-4"
          style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" }}
        >
          <h4 className="page-title  general-title p-4 ">
            Detalles Pasivos Internos
          </h4>
          <Table responsive>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td className="th__width-medium">GARANTIA</td>
                <td className="">TIPO DE OPERACION</td>
                <td className="th__width-medium">SALDO</td>
                <td className="th__width-medium">CUOTA MENSUAL REAL</td>
                <td className="">TASA</td>
                <td className="">CONDICION</td>
                <td className="th__width">REFINANCIA (SI/NO)</td>
              </tr>
            </thead>
            <tbody>
              {cedula &&
                cedula.debts.data.map((element, i) => {
                  if (element[2] === user.firm_cic) {
                    return (
                      <tr key={i}>
                        <th>{element[2]} </th>
                        <th>
                          {element[13] === 1 && "Directa"}
                          {element[13] === 2 &&
                            "Creditos con obligacion de desembolso"}
                          {element[13] === 3 && "Tarjeta de credito"}
                          {element[13] === 4 &&
                            "Lineas de utilizacion automatica excepto tarjetas de credito"}
                          {element[13] === 5 &&
                            "Lineas de credito con compromiso de desembolsar"}
                          {element[13] === 6 &&
                            "Lineas de credito u operaciones crediticias"}
                        </th>
                        <th>
                          ₡{" "}
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            element[7].toFixed(2)
                          )}{" "}
                        </th>
                        <th>
                          ₡{" "}
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            (element[11] + element[12]).toFixed(11)
                          )}{" "}
                        </th>
                        <th>{element[18]} </th>
                        <th>{element[15]} </th>
                        <th>
                          {" "}
                          <button
                            onClick={() => {
                              handleClickStepFourCheck({
                                data: element,
                                type: "interno",
                                index: i,
                              });
                            }}
                            className={` ${
                              activeCheck.find((element) => element.index === i)
                                ? "checkButtonActive"
                                : "checkButton"
                            }`}
                          >
                            SI
                          </button>
                        </th>
                      </tr>
                    );
                  }
                })}
            {cedula &&  <tr>
                <th> </th>
                <th></th>
                <th> <span style={{borderTop: suma.saldoExterno && "2px solid black"}}>{suma.saldoInterno ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(suma.saldoInterno) }` : ""} </span>   </th>
                <th > <span style={{borderTop: suma.saldoExterno && "2px solid black"}}>{suma.cuotaInterno ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(suma.cuotaInterno) }` : ""} </span>   </th>
                <th> </th>
                <th></th>
                <th></th>
              </tr>}
           
            </tbody>
          </Table>
          <h4 className="page-title  mt-5 general-title p-4  ">
            Detalles Pasivos Externos
          </h4>
          <Table responsive>
            <thead>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td className="th__width-medium">ENTIDAD</td>
                <td className="">TIPO DE OPERACION</td>
                <td className="th__width-medium">SALDO</td>
                <td className="th__width-medium">CUOTA MENSUAL REAL</td>
                <td className="">TASA</td>
                <td className="">CONDICION</td>
                {/*  <td className="th__width-medium">c / $</td>
                <td className="th__width-medium">Saldo</td>
                <td className="th__width">Cuota Mensual</td>
                <td>FREC</td>
                <td>Tasa</td>
                <td>SBD</td>
                <td className="th__width-medium">Plazo para vencer</td>
                <td>VIV</td>
                <td>Condicion</td> */}
                <td className="th__width"> REFINANCIA (SI/NO)</td>
              </tr>
            </thead>
            <tbody>
              {cedula &&
                cedula.debts.data.map((element, i) => {
                  if (element[2] !== user.firm_cic) {
                    return (
                      <tr key={i}>
                        <th>{element[2]} </th>
                        <th>
                          {element[13] === 1 && "Directa"}
                          {element[13] === 2 &&
                            "Creditos con obligacion de desembolso"}
                          {element[13] === 3 && "Tarjeta de credito"}
                          {element[13] === 4 &&
                            "Lineas de utilizacion automatica excepto tarjetas de credito"}
                          {element[13] === 5 &&
                            "Lineas de credito con compromiso de desembolsar"}
                          {element[13] === 6 &&
                            "Lineas de credito u operaciones crediticias"}
                        </th>
                        <th>
                          ₡{" "}
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            element[7].toFixed(2)
                          )}{" "}
                        </th>
                        <th>
                          ₡{" "}
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            (element[11] + element[12]).toFixed(2)
                          )}{" "}
                        </th>
                        <th>{element[18]} </th>
                        <th>{element[15]} </th>
                        <th>
                          {" "}
                          <button
                            onClick={() => {
                              handleClickStepFourCheck({
                                data: element,
                                type: "externo",
                                index: i,
                              });
                            }}
                            className={` ${
                              activeCheck.find((element) => element.index === i)
                                ? "checkButtonActive"
                                : "checkButton"
                            }`}
                          >
                            SI
                          </button>
                        </th>
                      </tr>
                    );
                  }
                })}

              {cedula &&  <tr>
                <th> </th>
                <th></th>
                <th > <span style={{borderTop: suma.saldoExterno && "2px solid black"}}>{suma.saldoExterno ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(suma.saldoExterno) }`: ""}</span>   </th>
                <th > <span style={{borderTop: suma.saldoExterno && "2px solid black"}}>{suma.cuotaExterno ? `₡ ${new Intl.NumberFormat(["ban", "id"]).format(suma.cuotaExterno) }` : ""} </span>   </th>
                <th> </th>
                <th></th>
                <th></th>
              </tr>}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    </Container>
  );
}
