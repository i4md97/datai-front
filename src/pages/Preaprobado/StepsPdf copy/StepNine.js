import React from "react";
import {Container, Card, CardBody, Col, Table} from "reactstrap";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";
export default function StepNine({animation}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards  ${animation && "step__animation"} `}
      style={{padding: "0 15px"}}
    >
      <Card className="padding-th">
        <CardBody
          style={{border: "1.5px solid #DFE0EB", boxShadow: "none"}}
          className=" m-lg-0  "
        >
          <h4 className="page-title  general-title py-4 ">
            MONTOS TOTALES A FINANCIAR
          </h4>

          <Table>
            <thead>
              <tr style={{borderBottom: "1px solid #e0e0e0"}}>
                <td></td>
                <td style={{width: "150px"}}></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left"> MONTO DISPONIBLE ADICIONAL</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>
              <tr>
                <td className="text-left"> REFINANCIAMIENTOS EXTERNOS</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left pt-3">
                  {" "}
                  SALDOS ADICIONALES POR TARJETAS DE CREDITO EXTERNAS
                </td>
                <th>
                  ₡{" "}
                  <input
                    type="number"
                    className=" ml-1 mt-0 text-center  form-cedula-input"
                    style={{width: "100px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  SALDOS ADICIONALES OTRAS OPERACIONES EXTERNAS
                </td>
                <th>
                  ₡{" "}
                  <input
                    type="number"
                    className=" ml-1 mt-0 text-center  form-cedula-input"
                    style={{width: "100px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  SALDOS ADICIONALES DEUDAS NO REGULADAS
                </td>
                <th>
                  ₡{" "}
                  <input
                    type="number"
                    className=" ml-1 mt-0 text-center  form-cedula-input"
                    style={{width: "100px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
              </tr>
              <tr>
                <td className="text-left">
                  MONTO ADICIONAL PARA GASTOS PERSONALES
                </td>
                <th>
                  ₡{" "}
                  <input
                    type="number"
                    className=" ml-1 mt-0 text-center  form-cedula-input"
                    style={{width: "100px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
              </tr>
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>
              <tr>
                <td className="text-left">REFINANCIAMIENTOS INTERNOS</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">
                  SALDOS ADICIONALES DEUDAS INTERNAS
                </td>
                <th>
                  ₡{" "}
                  <input
                    type="number"
                    className=" ml-1 mt-0 text-center  form-cedula-input"
                    style={{width: "100px", background: "rgb(221,235,247)"}}
                  />{" "}
                </th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <strong>SUBTOTAL A FINANCIAR </strong>{" "}
                </td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>{" "}
              <tr>
                <td className="text-left"></td>
                <th className="text-center"></th>
              </tr>
              <tr>
                <td className="text-left">PRIMER CUOTA</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">AJUSTE INTERES</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">CAPITAL SOC PRIMER CUOTA</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">PROGRAMA SOCIAL</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">POLIZA ASEGURAM CARTERA</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">PAPELERIA</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">IMPREVISTOS</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">COMISION</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">CAPITALIZACION</td>
                <th className="text-center">₡----</th>
              </tr>
              <tr>
                <td className="text-left">
                  {" "}
                  <strong> GASTOS ADICIONALES </strong>{" "}
                </td>
                <th className="text-center">₡----</th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <br />
      <br />
      <PdfHeader pagination="11" />
      <Card>
        <CardBody
          style={{border: "1.5px solid #DFE0EB", boxShadow: "none"}}
          className=" m-lg-0  "
        >
          <Table className="mt-5">
            <thead>
              <tr style={{borderBottom: "1px solid #e0e0e0"}}>
                <td> </td>
                <td> MONTO PERMITIDO </td>
                <td>MONTO ACTUAL</td>
                <td>RESOLUCION</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  {" "}
                  MONTO DE EXPOSICION MAXIMA SIN FIADOR
                </td>
                <th className="text-center">₡----</th>
                <th className="text-center">₡----</th>
                <th className="text-center">
                  {" "}
                  <div
                    className="py-1"
                    style={{backgroundColor: "#5bbd91", color: "white"}}
                  >
                    {" "}
                    MONTO DENTRO DE LO NORMADO{" "}
                  </div>
                </th>
              </tr>
              <tr>
                <td className="text-left"> MONTO MAXIMA DE PARA ESTE MES</td>
                <th className="text-center">₡----</th>
                <th className="text-center">₡----</th>
                <th className="text-center">
                  {" "}
                  <div
                    className="py-1"
                    style={{backgroundColor: "#5bbd91", color: "white"}}
                  >
                    {" "}
                    MONTO DENTRO DE LO NORMADO{" "}
                  </div>
                </th>
              </tr>
            </tbody>
          </Table>

          <h4 className="page-title  general-title py-4 mt-5 mb-4 ">
            DETALLES
          </h4>

          <textarea
            type="number"
            className=" ml-1 mt-0 text-center  form-cedula-input"
            style={{minHeight: "150px", background: "rgb(221,235,247)"}}
          />
          <textarea
            type="number"
            className=" mt-3 ml-1 mt-0 text-center  form-cedula-input"
            style={{minHeight: "50px", background: "rgb(221,235,247)"}}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
