import React from "react";

// Components
import { Row, Col } from "reactstrap";
import MenuEvolucionSemanal from "../../components/MenuOptions/MenuEvolucionSemanal";
import CardProgress from "../../components/CardComponents/CardProgress";
import ABTestingAnalytics from '../../components/Charts/ABTestingAnalytics';
import CardBars from "../../components/CardComponents/CardBars";

import "./Inicio.scss";

export default function EvolucionSemanal({ menuInicio }) {

  // console.log(menuInicio);

	const saldosData = [
		{
			title: "Saldos Colocados en Crédito",
			quantity: "7,382.25",
			measure: "Millones",
			symbol: "₡",
			percentage: 67,
			label: "de la meta mensual",
		},
		{
			title: "Límite de Saldo: Tarjeta de crédito",
			quantity: "2,59",
			measure: "Millones",
			symbol: "₡",
			percentage: 88,
			label: "de la meta mensual",
		},
		{
			title: "Saldos Captados en Ahorros Plazo",
			quantity: "641,33",
			measure: "Millones",
			symbol: "₡",
			percentage: 51,
			label: "de la meta mensual",
		},
		{
			title: "Clientes Vinculados",
			quantity: "592",
			measure: "Clientes",
			symbol: null,
			percentage: 44,
			label: "de la meta mensual",
		}
	];

  const evolucionChartData = [
    { name: 'Jan', a: 33, b: 33 },
    { name: 'Feb', a: 53, b: 25 },
    { name: 'Mar', a: 85, b: 35 },
    { name: 'Apr', a: 41, b: 51 },
    { name: 'May', a: 44, b: 54 },
    { name: 'Jun', a: 65, b: 76 },
    { name: 'Jul', a: 45, b: 90 }
  ];

	const evolucionData = [
		{
			title: "Evolución Compra Saldos Crédito Directo",
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
			title: "Evolución Saldos Captados en Ahorros",
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
		{
			title: "Evolución Clientes Vinculados",
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
    <div className="evolucion-semanal">
			{/* Side Menu */}
			<MenuEvolucionSemanal menuInicio={menuInicio} />

			{/* Top Cards */}
			<Row className="mb-2 pt-4 saldos cards-flow cards-column">
				{saldosData.map((element, index) => (
					<Col sm={12} md={6} lg={4} xl={3} className="mb-3 mb-lg-0" key={`saldo-item-${index}`}>
						<CardProgress element={element} />
					</Col>
				))}
			</Row>

			{/* Evolucion semanal chart */}
			<Row className="mb-2">
				<Col sm={12}>
					<ABTestingAnalytics 
						data={evolucionChartData} 
						dir={'left'}
						title={'Evolución de Colocaciones de Crédito VS Meta'}
						subtitle1={'De Enero al cierre de Junio'}
						subtitle2={'-1er Semestre del 2020'}
					/>
				</Col>
			</Row>

			{/* Bottom Cards */}
			<Row className="pb-3 evolucion-data cards-flow">
				{evolucionData.map((element, index) => (
					<Col sm={12} md={6} lg={4} xl={3} className="mb-3" key={`evolucion-item-${index}`}>
						<CardBars element={element} />
					</Col>
				))}
			</Row>
    </div>
  );
}
