import { useEffect, useState } from "react";

// Components
import { Col, Row, Table, Button } from "reactstrap";
import { ControlledInput, CustomDropdown } from "..";

const keyNecesidad = "fe_ep_necesidad_";

const TableRow = ({
  id = 0,
  title = "",
  setTableRows = () => {},
  removeRow = () => {},
  setSaldoFinanciar = () => {},
  setNecesidades,
}) => {
  const removeRowHandler = () => {
    removeRow(id);
    setTimeout(() => {
      sumCol();
    });
  }

  const sumCol = (value) => {
    setTableRows(prev => {
      return prev.map(row => {
        if (row.id === id ){
          return {
            ...row,
            amount: value,
          }
        }
        return row;
      })
    })

    setTimeout(() => {
      const colElements = document.querySelectorAll(`.fnft-amount__td input`);
      const colValues = [...colElements].map(element => element.value.replace(/[^\d,]+/g, '').replace(/,/g, '.'));
      const colSum = colValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
      setSaldoFinanciar(colSum);

      setNecesidades(prev => ({
        ...prev,
        [keyNecesidad+id+"_value"]: value,
      }));
    });
  }

  return (
    <tr>
      {id !== 0 ?
        <td className="py-0" style={{ minWidth: "10px", width:"10px"}}>
          <Button onClick={removeRowHandler} className="mb-0 px-1" style={{minWidth: "40px"}}>-</Button>
        </td>
        :
        <td style={{ minWidth: "10px", width:"10px"}}>
        </td>
      }
      <td><p>{title}</p></td>
      <td className="fnft-amount__td p-1">
        <ControlledInput id={id} className="bg-green" placeholder="₡0" callback={sumCol} />
      </td>
    </tr>
  )
}

export const NecesidadesFinanciamientoTable = ({
  balance = 0,
  cuota = 0,
  ahorroPotencial,
  setNecesidades = () => {},
}) => {
  const rowsLimit = 5;
  const [tableRows, setTableRows] = useState([
    {
      id: 0,
      title: "CAPITAL DE TRABAJO",
      amount: 0,
      description: ""
    }
  ]);
  const [rowId, setRowId] = useState(1);
  const conditionalRender = tableRows.length <= rowsLimit -1;

  // logic
  const [saldoFinanciar, setSaldoFinanciar] = useState(0);

  useEffect(() => {
    setNecesidades({
      [keyNecesidad+0]: "CAPITAL DE TRABAJO",
      [keyNecesidad+0+"_value"]: "0",
      [keyNecesidad+0+"_description"]: "",
    });
  },[setNecesidades]);

  const addRow = () => {
    if (conditionalRender) {
      setTableRows(prev => [...prev, {
        id: rowId,
        title: "CAPITAL DE TRABAJO",
        amount: 0,
        description: `Refinanciamiento Deudas`
      }]);
      setRowId(prev => prev + 1);
    }

    setNecesidades(prev => ({
      ...prev,
      [keyNecesidad+rowId]: "0",
      [keyNecesidad+rowId+"_value"]: "CAPITAL DE TRABAJO",
      [keyNecesidad+rowId+"_description"]: "",
    }));
  }

  const removeRow = (id) => {
    setNecesidades(prev => {
      delete prev[keyNecesidad+id]; 
      delete prev[keyNecesidad+id+"_value"];
      delete prev[keyNecesidad+id+"_description"];
      return prev;
    });

    setTableRows(prev => {
      return prev.filter(row => row.id !== id);
    });

  }

  const renderLeftRows = () => {
    return tableRows.map((row, i) => 
      <TableRow 
        key={`fnft-r-row-${row.id}`}
        id={row.id}
        title={row.title}
        amount={row.amount}
        setTableRows={setTableRows}
        removeRow={removeRow}
        setSaldoFinanciar={setSaldoFinanciar}
        setNecesidades={setNecesidades}
      />
    )
  }

  const renderRightRows = () => {
    const descriptionChange = (value, id) => {
      setTableRows(prev => {
        return prev.map(row => {
          if (row.id === id ){
            return {
              ...row,
              description: value,
            }
          }
          return row;
        })
      });

      setNecesidades(prev => ({
        ...prev,
        [keyNecesidad+id+"_description"]: value,
      }));
    }

    return tableRows.map((row, i) => 
      <tr key={`fnft-l-row-${row.id}`}>
        <td id={`fnft-l-description-${row.id}`} className="p-1">
          <ControlledInput id={row.id} className="bg-green" placeholder="Descripcción" callback={descriptionChange} />
        </td>
      </tr>
    )
  }

  return (
    <Row>
      <Col xs={12}>
        <Row className="overflow-auto flex-nowrap">
          <Col>
            <Table className="text-left" responsive>
              <tbody>
                {renderLeftRows()}
                {conditionalRender && <tr>
                  <td colSpan={"100%"} className="pr-0">
                    <Button 
                      onClick={addRow}
                      className="w-100 mb-0"
                    >
                        +
                    </Button>
                  </td>
                </tr>}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table className="text-left" responsive>
              <tbody>
                {/* <tr>
                  <th colSpan="2" className="py-4">PLAN DE INVERSÓN</th>
                </tr> */}
                {renderRightRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Table responsive>
          <tbody>
            <tr>
              <td className="text-left w-25">Crédito Empresarial y Personal</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((saldoFinanciar))}</td>
              <td className="text-left w-25 pl-4">Cuota por Financiamiento Empresarial y Personal</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((cuota))}</td>
            </tr>
            <tr>
              <td className="w-25 text-left">TOTAL A FINANCIAR</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((balance + saldoFinanciar))}</td>
              <td className="w-25 text-left pl-4">Incremento cuota / Ahorro mensual por créditos nuevos</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((cuota - ahorroPotencial))}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}