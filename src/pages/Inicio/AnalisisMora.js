import React, { useEffect, useState } from "react";

// Components
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import MenuEvolucionSemanal from "../../components/MenuOptions/MenuEvolucionSemanal";

// Styles
import "./AnalisisMora.scss";

const AnalisisMora = ({ menuInicio }) => {

  const [barThick, setBarThick] = useState(50);

  const resizeHandler = () => {
    if (window.innerWidth > 720) {
      setBarThick(50);
    } else if (window.innerWidth < 720) {
      setBarThick(25);
    }
  }

  useEffect(() => {
    resizeHandler();
  },[]);

  const saldosData = [
    {
      title: "% Total Moroso",
      saldos: [
        { quantity: 10.5, label: "Total" },
        { quantity: 11.5, label: "Resto SFN" },
        { quantity: 10.1, label: "BancoABC" }
      ]
    },
    {
      title: "% Moroso en Crédito Directo",
      saldos: [
        { quantity: 18, label: "Total" },
        { quantity: 22, label: "Resto SFN" },
        { quantity: 7, label: "BancoABC" }
      ]
    },
    {
      title: "% Moroso en Tarjeta Crédito",
      saldos: [
        { quantity: 27, label: "Total" },
        { quantity: 16, label: "Resto SFN" },
        { quantity: 29, label: "BancoABC" }
      ]
    },
    {
      title: "% Moroso en SBD",
      saldos: [
        { quantity: 12, label: "Total" },
        { quantity: 14, label: "Resto SFN" },
        { quantity: 12, label: "BancoABC" }
      ]
    }
  ]

  const dataChart = {
    labels: [
      "B Popular",
      "B Nacional",
      "B Costa Rica",
      "COOPENAE",
      "COOPESERVIDORES",
      "BAC SAN JOSE",
    ],

    datasets: [
      {
        label: "Crédito",
        data: [20, 0, 12, 5, 14, 22],
        fill: true,
        type: "bar",
        backgroundColor: "#ff6384",
        borderColor: "#ff6384",
      },
      {
        label: "Tarjeta",
        data: [33, 53, 37, 41, 44, 65],
        type: "bar",
        backgroundColor: "#ffa500",
        borderColor: "#ffa500",
      },
      {
        label: "SBD",
        data: [44, 69, 77, 50, 60, 75],
        type: "bar",
        backgroundColor: "#a6a6a6",
        borderColor: "#a6a6a6",
      },
    ]
  };

  const dataChartLine = {
    labels: ["OCTUBRE", "NOVIEMBRE", "DICIEMBRE", "ENERO", "FEBRERO", "MARZO"],
    datasets: [
      {
        label: "Crédito",
        fill: false,
        borderColor: "#7deaca",
        data: [33, 53, 85, 41, 44, 65],
      },

      {
        label: "Tarjeta",
        fill: false,
        borderColor: "#85c5fd",
        data: [22, 45, 55, 10, 21, 42],
      },
      {
        label: "SBD",
        fill: false,
        borderColor: "#f8e188",
        data: [14, 32, 45, 19, 25, 2],
      },
    ],
  };

  const evolucionesData = [
    {
      title: "Evolución Mora Crédito Directo",
      subtitle: "(ultimos 6 meses)",
      data: {
        labels: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"],
        datasets: [
          {
            label: "First dataset",
            data: [1, 3, 2, 1, 2, 3],
            fill: false,
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
          },
          {
            label: "Second dataset",
            data: [2, 1, 0, 1, 3, 1.5],
            fill: false,
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
          }
        ],
      }
    },
    {
      title: "Evolución Mora Tarjeta Crédito",
      subtitle: "(ultimos 6 meses)",
      data: {
        labels: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"],
        datasets: [
          {
            label: "First dataset",
            data: [3, 2, 3, 1, 2, 2],
            fill: false,
            backgroundColor: "#36a2eb",
            borderColor: "#36a2eb",
          },
        ],
      }
    },
    {
      title: "Evolución Mora SBD",
      subtitle: "(ultimos 6 meses)",
      data: {
        labels: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"],
        datasets: [
          {
            label: "First dataset",
            data: [1, 1, 2, 3, 3, 2],
            fill: false,
            backgroundColor: "#ff6384",
            borderColor: "#ff6384",
          },
        ],
      }
    }
  ]

  const options = {
    legend: {
      position: 'bottom',
    },
    tooltips: {
      displayColors: false,
    },
    scales: {
      xAxes: [{
          barThickness: barThick,
          maxBarThickness: 50,
          stacked: true,
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            borderDash: [1,2],
          },
          ticks: {
            fontColor: '#878996',
            beginAtZero: true
          }
      }],
      yAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            borderDash: [1,2],
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .5)',
            stepSize: 10,
            beginAtZero: true
          }
      }]
    },
    onResize: resizeHandler,
  };

  const options2 = {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle : false,
      },
      pointStyle: 'triangle'
    },
    elements: {
      point: {
        borderWidth: 2,
        backgroundColor: '#FFF',
        hoverRadius: 3,
        hoverBorderWidth: 1,
        radius: 4,
        hitRadius: 10,
      },
      line: {
        borderWidth: 1.5,
      }
    },
    scales: {
      xAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            borderDash: [1,2]
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .7)',
          }
      }],
      yAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            borderDash: [1,2]
          },
          ticks: {
            stepSize: 25,
            fontColor: 'rgba(125, 125, 125, .5)',
          }
      }]
    }
  };

  const options3 = {
    legend: {
      display: false,
      // position: 'bottom',
    },
    elements: {
      point: {
        fill: true,
        borderWidth: 0,
        hoverRadius: 1,
        hoverBorderWidth: 1,
        radius: 1.5,
        hitRadius: 10,
      },
      line: {
        borderWidth: 1.5,
        tension: .5,
      }
    },
    scales: {
      xAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            borderDash: [1,2]
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .5)',
          }
      }],
      yAxes: [{
          gridLines: {
            color: 'rgba(125, 125, 125, .4)',
            borderDash: [1,2]
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .5)',
          }
      }]
    }
  };

  return (
    <div className="analisis-mora">
      {/* Side Options */}
      <MenuEvolucionSemanal menuInicio={menuInicio} />

      {/* Top cards */}
      <Row className="text-cards pt-4 cards-flow">
        {saldosData.map((saldo, index) => (
          <Col sm={12} md={6} xl={3} className="mb-3" key={`saldo-item-${index}`}>
            <Card className="pb-3">
              <CardBody className="m-0">
                <CardTitle tag="h4" className="text-bold">{saldo.title}</CardTitle>
                {saldo.saldos.map((item, i) => (
                  <div className="d-flex" key={`item-${index}-${i}`}>
                    { saldo.saldos.length -1 !== i 
                    ? (<h5 className="mb-1 text-semibold">{item.quantity.toLocaleString('de-DE')}% {item.label}</h5>)
                    : (<p className="last-item pt-1">{item.quantity.toLocaleString('de-DE')}% {item.label}</p>) }
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bar Charts */}
      <Row className="mb-4">
          <Col sm={12} lg={12} xl={6} className="mb-3 mb-xl-0">
            <Card className="card-chart">
              <CardBody className="m-0 py-4">
                <div className="text-container mb-3">
                  <h4 className="text-semibold pb-1">Saldos Moroso en Crédito Directo, Tarjeta de Crédito y SBD</h4>
                  <h5 className="text-semibold">Pareto por Entidad Financiera (90%) sobre los clientes de la Cooperativa</h5>
                  <h5 className="text-semibold">- Al Cierre de Marzo 2021 -</h5>
                </div>
                <div className="chart">
                  <Bar data={dataChart} options={options} height={230} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm={12} lg={12} xl={6}>
            <Card className="card-chart">
              <CardBody className="m-0 py-4">
                <div className="text-container mb-3">
                  <h4 className="text-semibold">BANCOABC</h4>
                  <h5 className="text-semibold">Evolución de la morosidad en Crédito Directo, Tarjeta de Crédito y SBD</h5>
                  <h5 className="text-semibold">-Ultimos 6 meses-</h5>
                </div>
                <Line data={dataChartLine} options={options2} height={230} />
              </CardBody>
            </Card>
          </Col>
      </Row>

      <Row className="pb-4">
        {evolucionesData.map((evolucion, index) => (
          <Col sm={12} md={6} xl={4} className="mb-3" key={`evolucion-item-${index}`}>
            <Card className="card-lines pb-3">
              <CardBody className="m-0">
                <div className="text-container mb-3">
                  <h4 className="text-semibold">{evolucion.title}</h4>
                  <p className="mt-1">{evolucion.subtitle}</p>
                </div>
                <Line data={evolucion.data} options={options3} height={230} />
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
}

export default AnalisisMora;