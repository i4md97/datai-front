import { useEffect, useState } from "react";

// Components
import { Col, Row, Table, Button } from "reactstrap";
import { ControlledInput, CustomDropdown } from "..";

const keyProducto = "fe_ep_producto_crediticio_";

const TableRow = ({
  id = "", 
  options = [], 
  amount = 0,
  setTableRows = () => {},
  removeRow = () => {},
  setSaldoFinanciar = () => {},
  setRefinanciamiento
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
    });

    setTimeout(() => {
      const colElements = document.querySelectorAll(`.frt-amount__td input`);
      const colValues = [...colElements].map(element => element.value.replace(/[^\d,]+/g, '').replace(/,/g, '.'));
      const colSum = colValues.reduce((a, b) => parseFloat(a ? a : 0) + parseFloat(b ? b : 0), 0);
      setSaldoFinanciar(colSum);

      setRefinanciamiento(prev => ({
        ...prev,
        [keyProducto+id+"_value"]: value,
      }));

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
    });

    setRefinanciamiento(prev => ({
      ...prev,
      [keyProducto+rowId]: option,
      [keyProducto+rowId+"_plan"]: option,
    }));
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
      <td className="px-0 pt-0">
        <CustomDropdown 
          options={options}
          selectedOption="REFINANCIAMIENTO"
          classNameButton="mb-0"
          id={`frt-r-description-${id}`}
          callback={optionChangeHanlder}
        />
      </td>
      <td className="frt-amount__td p-1">
        <ControlledInput id={id} className="bg-green" defaultOption={`₡${amount}`} callback={sumCol} />
      </td>
    </tr>
  )
}

export const RefinanciamientoTable = ({
  saldo = 0,
  ahorro = 0,
  options = [],
  setGlobalBalance = () => {},
  setRefinanciamiento = () => {},
}) => {
  const rowsLimit = 5;
  const [tableRows, setTableRows] = useState([{
    id: 0, 
    option: "REFINANCIAMIENTO",
    amount: 0,
    description: `Refinanciamiento Deudas`
  }]);
  const [rowId, setRowId] = useState(1);
  const conditionalRender = tableRows.length <= rowsLimit -1;

  // logic
  const [saldoFinanciar, setSaldoFinanciar] = useState(0);

  useEffect(()=>{
    setRefinanciamiento({
      [keyProducto+0]: "REFINANCIAMIENTO",
      [keyProducto+0+"_value"]: "0",
      [keyProducto+0+"_plan"]: "Refinanciamiento Deudas",
    });
  },[setRefinanciamiento]);

  const addRow = () => {
    if (conditionalRender) {
      setTableRows(prev => [...prev, {
        id: rowId, 
        option: "REFINANCIAMIENTO",
        amount: 0,
        description: `Refinanciamiento Deudas`
      }]);
      setRowId(prev => prev + 1);

      setRefinanciamiento(prev => ({
        ...prev,
        [keyProducto+rowId]: "0",
        [keyProducto+rowId+"_value"]: "REFINANCIAMIENTO",
        [keyProducto+rowId+"_plan"]: "Refinanciamiento Deudas",
      }));
    }
  }

  const removeRow = (id) => {
    setTableRows(prev => {
      return prev.filter(row => row.id !== id);
    });

    setRefinanciamiento(prev => {
      delete prev[keyProducto+id]; 
      delete prev[keyProducto+id+"_value"];
      delete prev[keyProducto+id+"_plan"];
      return prev;
    });
  }

  const renderLeftRows = () => {
    return tableRows.map((row, i) => 
      <TableRow 
        key={`frt-r-row-${row.id}`}
        id={row.id}
        options={options}
        amount={row.amount}
        setTableRows={setTableRows}
        removeRow={removeRow}
        setSaldoFinanciar={setSaldoFinanciar}
        setRefinanciamiento={setRefinanciamiento}
      />
    )
  }

  const renderRightRows = () => {
    return tableRows.map((row, i) => 
      <tr key={`frt-l-row-${row.id}`} style={{height: "54px"}}>
        <td id={`frt-l-description-${row.id}`}>{row.description}</td>
      </tr>
    )
  }

  useEffect(() => {
    setGlobalBalance(saldo - saldoFinanciar);
  }, [saldo, saldoFinanciar, setGlobalBalance]);

  return (
    <Row>
      <Col xs={12}>
        <Row className="overflow-auto flex-nowrap">
          <Col>
            <p className="text-bold pl-2 pb-2">PRODUCTOS CREDITICIOS PARA REFINANCIAR</p>
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
            <p className="text-bold pl-2 pb-2">PLAN DE INVERSÓN</p>
            <Table className="text-left" responsive>
              <tbody>
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
              <td className="text-left w-25">Saldo a Refinanciar</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((saldoFinanciar))}</td>
              <td className="pl-4 text-left w-25">Ahorro del Refinanciamiento</td>
              <td className="w-25 text-left">₡{new Intl.NumberFormat(["ban", "id"]).format((ahorro))}</td>
            </tr>
            <tr>
              <td className="w-25 text-left">Balance</td>
              <td className="w-25">₡{new Intl.NumberFormat(["ban", "id"]).format((saldo - saldoFinanciar))}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}