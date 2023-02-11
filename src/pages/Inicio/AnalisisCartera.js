import React from "react";

// Components
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import MenuEvolucionSemanal from "../../components/MenuOptions/MenuEvolucionSemanal";
import BarLines from "../../components/Charts/BarLines";
import CardBars from "../../components/CardComponents/CardBars";

// Styles
import "./Inicio.scss";

function AnalisisCartera({ menuInicio }) {

  const saldosData = [
    {
      title: "Saldos Total activo",
      saldos: [
        { quantity: 1004495.2, label: "Millones" },
        { quantity: 587491.2, label: "Millones SFN" },
        { quantity: 417004, label: " Millones en BancoABC (41% del SFN)" }
      ]
    },
    {
      title: "Saldo total en Tajerta Crédito",
      saldos: [
        { quantity: 47.8, label: "Millones" },
        { quantity: 32.8, label: "Mill en BancoABC" }
      ]
    },
    {
      title: "Saldo total en SBD",
      saldos: [
        { quantity: 1841.3, label: "Millones SFN" },
        { quantity: 177.3, label: "Mill en BancoABC" }
      ]
    },
    {
      title: "Saldo Total Crédito Directo",
      saldos: [
        { quantity: 584553.0, label: "Millones" },
        { quantity: 414918.0, label: "Mill en BancoABC" }
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
        label: "Tarjeta",
        data: [32000, 54000, 35000, 12000, 15000, 5000, 0],
        fill: false,
        backgroundColor: "#f6da6e",
        borderColor: "#f6da6e",
        type: "line",
      },
      {
        label: "SBD",
        data: [52000, 44000, 22000, 32000, 7000, 5000, 0],
        fill: false,
        backgroundColor: '#4ce1b6',
        borderColor: '#4ce1b6',
        type: "line",
      },
      {
        label: "Crédito",
        data: [89000, 72000, 58000, 41000, 30000, 10000, 0],
        fill: true,
        backgroundColor: "#70bbfd",
      }
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0.000001,
      },
      point: {
        radius: 5,
      },
    },
    scales: {
      xAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
            display: false
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .5)',
          }
      }],
      yAxes: [{
          gridLines: {
            color: 'rgba(175, 175, 175, .4)',
          },
          ticks: {
            fontColor: 'rgba(125, 125, 125, .5)',
            stepSize: 20000
          }  
      }]
    },
    maintainAspectRatio: false,
  };

  const evolucionData = [
		{
			title: "Evolución Ingreso Bruto",
			quantity: "1.846,81",
			symbol: "₡",
			measure: "Millones",
			label: "últimos 6 meses",
			chart: [
				{ id: 0, name: 'Month 1', uv: 1000 },
				{ id: 1, name: 'Month 2', uv: 1846.81 },
				{ id: 2, name: 'Month 3', uv: 1600 },
				{ id: 3, name: 'Month 4', uv: 500 },
				{ id: 4, name: 'Month 5', uv: 1200 },
				{ id: 5, name: 'Month 6', uv: 700 },
			]
		},
		{
			title: "Evolución Compra Saldos TC",
			quantity: "647,5",
			symbol: "₡",
			measure: "Miles",
			label: "últimos 6 meses",
			chart: [
				{ id: 0, name: 'Month 1', uv: 320 },
				{ id: 1, name: 'Month 2', uv: 647.5 },
				{ id: 2, name: 'Month 3', uv: 550 },
				{ id: 3, name: 'Month 4', uv: 200 },
				{ id: 4, name: 'Month 5', uv: 400 },
				{ id: 5, name: 'Month 6', uv: 280 },
			]
		},
		{
			title: "Evolución Compra POS",
			quantity: "201,4",
			symbol: "₡",
			measure: "Millones",
			label: "últimos 6 meses",
			chart: [
				{ id: 0, name: 'Month 1', uv: 100 },
				{ id: 1, name: 'Month 2', uv: 201.4 },
				{ id: 2, name: 'Month 3', uv: 170 },
				{ id: 3, name: 'Month 4', uv: 75 },
				{ id: 4, name: 'Month 5', uv: 110 },
				{ id: 5, name: 'Month 6', uv: 130 },
			]
		},
	];
  
  return (
    <div className="analisis-de-cartera">
      {/* SideMenu */}
      <MenuEvolucionSemanal menuInicio={menuInicio} />

      {/* Top cards */}
      <Row className="loop-cards pt-4 cards-flow">
        {saldosData.map((saldo, index) => (
          <Col sm={12} md={6} xl={3} className="mb-3" key={`saldo-item-${index}`}>
            <Card className="pb-3">
              <CardBody className="m-0">
                <CardTitle tag="h4" className="mb-1">{saldo.title}</CardTitle>
                {saldo.saldos.map((item, i) => (
                  <div className="d-flex" key={`item-${index}-${i}`}>
                    { saldo.saldos.length -1 !== i 
                    ? (<h5 className="mb-1 text-bold">₡ {item.quantity.toLocaleString('de-DE')} {item.label}</h5>)
                    : (<p className="last-item">₡ {item.quantity.toLocaleString('de-DE')} {item.label}</p>) }
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart */}
      <Row className="mb-4">
        <Col sm={12}>
          <BarLines 
            title={'Saldos de Colocaciones de Crédito Directo y Tarjetas de Crédito'} 
            subtitle1={'Pareto por Entidad Financiera(90%) sobre los clientes de la Cooperativa'}
            subtitle2={'- Al Cierre de Marzo 2021'}
            options={options}
            dataChart={dataChart}
          />
        </Col>
      </Row>

      <Row className="pb-4 cards-flow">
        {evolucionData.map((element, index) => (
					<Col sm={12} md={6} lg={4} xl={3} className="mb-3" key={`evolucion-item-${index}`}>
						<CardBars element={element} />
					</Col>
				))}
      </Row>

    </div>
  );
}

export default AnalisisCartera;