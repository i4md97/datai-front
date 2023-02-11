import React from "react";
import {Container, Table, Card, CardBody} from "reactstrap";
export default function StepSix({animation}) {
  return (
    <Container
      fluid={true}
      className={`pb-5 dashboard step__cards ${animation && "step__animation"}`}
    >
      <h3 className="page-title pb-4 color__background text-center">
        Detalle de Pasivos Internos (Deudas con la SFN)
      </h3>
      <Card>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th className="th__width">Tipo credito</th>
                <th className="th__width">Tipo de Operacion</th>
                <th>ID Operacion</th>
                <th>c / $</th>
                <th>Saldo</th>
                <th>Cuota</th>
                <th>Tasa</th>
                <th className="th__width-medium">Plazo para vencer</th>
                <th>Garantia</th>
                <th className="th__width">Refinancia op con preaprobado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CONSUMO</td>
                <td>(148-333) AHORRO FINANCIERO </td>
                <td>2102153123213</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>29.00 </td>
                <td>1</td>
                <td>PAGARES</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
              <tr>
                <td>CONSUMO</td>
                <td>(148-333) AHORRO FINANCIERO</td>
                <td>2102153123213</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>29.00 </td>
                <td>1</td>
                <td>PAGARES</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>{" "}
              <tr>
                <td>CONSUMO</td>
                <td>(148-333) AHORRO FINANCIERO</td>
                <td>2102153123213</td>
                <td>CRC</td>
                <td>616,889.68 $</td>
                <td>70,100.00 $</td>
                <td>29.00 </td>
                <td>1</td>
                <td>PAGARES</td>
                <td style={{background: "rgba(76, 225, 182,.5)"}}>SI</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}
