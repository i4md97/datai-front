import React from 'react';

// Components
import { Table } from 'reactstrap';

const ResponsiveTable = ({dataTable}) => {

  const headerData = dataTable.header;
  const bodyData = dataTable.rows;

  return (
    <Table responsive className="table--bordered">
      <thead>
        <tr>
          {headerData.map((item, index) => (
            <th className="text-left" key={`table-header-${index}`}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyData.map((row, index) => (
          <tr key={`table-row-${index}`}>
            {row.columns.map((column, i) => (
              <td className="text-left" key={`table-column-${index}-${i}`}>{typeof column === 'number' ? column.toLocaleString('de-DE') : column }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResponsiveTable;