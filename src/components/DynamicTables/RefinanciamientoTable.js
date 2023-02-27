import { useState } from "react";

// Components
import { Col, Row, Table, Button } from "reactstrap";
import { ControlledInput, CustomDropdown } from "..";

const TableRow = ({
  id = "", 
  options = [], 
  amount = 0,
  setTableRows = () => {},
  removeRow = () => {},
  setSaldoFinanciar = () => {} 
}) => {
  const removeRowHandler = () => {
    removeRow(id);
    setTimeout(() => {
      sumCol();
    });
  }

  const sumCol = (value, id) => {
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
      const colElements = document.querySelectorAll(`.fdt-amount__td input`);
      const colValues = [...colElements].map(element => element.value.replace(/[^\d,]+/g, '').replace(/,/g, '.'));
      const colSum = colValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
      setSaldoFinanciar(colSum);
    });
  }

  const optionChangeHanlder = (option, id) => {
    const rowId = parseInt(id.replace(/[^0-9.]/gm, ''));
    setTableRows(prev => {
      return prev.map(row => {
        if (row.id === rowId ){
          return {
            ...row,
            option: option,
            description: `${option} Selected`
          }
        }
        return row;
      })
    })
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
      <th className="pt-0">
        <CustomDropdown 
          options={options}
          selectedOption="REFINANCIAMIENTO"
          classNameButton="mb-0"
          id={`fdt-r-description-${id}`}
          callback={optionChangeHanlder}
        />
      </th>
      <td className="fdt-amount__td p-1">
        <ControlledInput id={id} className="bg-green" defaultOption={`₡${amount}`} callback={sumCol} />
      </td>
    </tr>
  )
}

export const RefinanciamientoTable = ({
  saldo = 0,
  ahorro = 0,
  options = [],
}) => {
  const rowsLimit = 5;
  const [tableRows, setTableRows] = useState([
    {
      id: 0, 
      option: "REFINANCIAMIENTO",
      amount: 0,
      description: `Refinanciamiento Deudas`
    }
  ]);
  const [rowId, setRowId] = useState(1);
  const conditionalRender = tableRows.length <= rowsLimit -1;

  // logic
  const [saldoFinanciar, setSaldoFinanciar] = useState(0);

  const addRow = () => {
    if (conditionalRender) {
      setTableRows(prev => [...prev, {
        id: rowId, 
        option: "REFINANCIAMIENTO",
        amount: 0,
        description: `Refinanciamiento Deudas`
      }]);
      setRowId(prev => prev + 1);
    }
  }

  const removeRow = (id) => {
    setTableRows(prev => {
      return prev.filter(row => row.id !== id);
    });
  }

  const renderLeftRows = () => {
    return tableRows.map((row, i) => 
      <TableRow 
        key={`fdt-r-row-${row.id}`}
        id={row.id}
        options={options}
        amount={row.amount}
        setTableRows={setTableRows}
        removeRow={removeRow}
        setSaldoFinanciar={setSaldoFinanciar}
      />
    )
  }

  const renderRightRows = () => {
    return tableRows.map((row, i) => 
      <tr key={`fdt-l-row-${row.id}`} style={{height: "54px"}}>
        <td id={`fdt-l-description-${row.id}`}>{row.description}</td>
      </tr>
    )
  }

  return (
    <Row>
      <Col xs={12} md={6}>
        <Table className="text-left" responsive>
          <tbody>
            <tr>
              <th style={{ minWidth: "5px", width:"40px"}}>&nbsp;</th>
              <th className="py-4">PRODUCTOS CREDITICIOS PARA REFINANCIAR</th>
              <td></td>
            </tr>
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
      <Col xs={12} md={6}>
        <Table className="text-left" responsive>
          <tbody>
            <tr>
              <th colSpan="2" className="py-4">PLAN DE INVERSÓN</th>
            </tr>
            {renderRightRows()}
          </tbody>
        </Table>
      </Col>
      <Col xs={12}>
        <Table>
          <tbody>
            <tr>
              <td className="text-left w-25">Saldo a Refinanciar</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((saldoFinanciar))}</td>
              <td className="pl-4 text-left w-25">Ahorro del Refinanciamiento</td>
              <td className="w-25 text-left">₡{new Intl.NumberFormat(["ban", "id"]).format((ahorro))}</td>
            </tr>
            <tr>
              <td className="w-25 text-left">Balance</td>
              <td className="w-25">₡ {new Intl.NumberFormat(["ban", "id"]).format((saldo - saldoFinanciar))}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}