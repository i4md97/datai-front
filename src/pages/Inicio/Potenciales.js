import React, { useEffect, useState } from "react";

// Components
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Person from "@material-ui/icons/Person";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Bar, Pie } from "react-chartjs-2";

import MenuEvolucionSemanal from "../../components/MenuOptions/MenuEvolucionSemanal";
import ResponsiveTable from "../../components/TableComponent/ResponsiveTable";

// Styles
import "./Potenciales.scss";

const Potenciales = ({menuInicio}) => {

	const [barThick, setBarThick] = useState(50);

	const resizeHandler = () => {
		if (window.innerWidth > 1320) {
			setBarThick(50);
		} else if (window.innerWidth < 1320 && window.innerWidth > 990 ) {
			setBarThick(25);
		} else if (window.innerWidth < 990 && window.innerWidth > 700 ) {
			setBarThick(40);
		} if (window.innerWidth < 700 ) {
			setBarThick(25);
		}
	}

	useEffect(()=>{
		resizeHandler();
	},[])

	const saldosPotencialesTableData = {
		header: ['Condición', 'Deudor'],
		rows: [
			{columns: ["TIPO DE OPERACION (DETALLE)", 1]},
			{columns: ["OPERACIONES QUE AHORRAN", 1]},
			{columns: ["TIENE DISPONIBLE ADICIONAL?	", 1]},
		],
	}

	const saldosPotencialesTableData2 = {
		header: ["Entidades", "Operaciones", "Saldos a Refinanciar", "Ahorro a Cliente", "Disponible a financiar"],
		rows: [
			{columns: ["POPULAR", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["CAC-SERVIDORES", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["PROMERICA", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["SCOTIABANK", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["BNCR", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["CAC-COOOCIQUE", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["F-CAFSA", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["DAVIVIENDA", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["BACSANJOSE", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["CAC-COOPENAE", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["F-CREDILAT", 13, 51896086.16, 856500.46, 208089448]},
			{columns: ["GRAND TOTAL", 13, 51896086.16, 856500.46, 208089448]},
		]
	}

	const potencialDeMercadoTableData = {
		header: ['Condición', 'Deudor'],
		rows: [
			{columns: ["OPERACIONES QUE AHORRAN", 1]},
			{columns: ["TIENE DISPONIBLE ADICIONAL?", 1]},
			{columns: ["ENTIDAD", "ALL"]},
		]
	}

	const potencialDeMercadoTableData2 = {
		header: ['Tipo de Créditos', 'Contrato del cliente', 'Suma de saldos'],
		rows: [
			{columns: ["CRÉDITO DIRECTO",	21,	116610611]},
			{columns: ["TARJETA DE CRÉDITO",	21,	116610611]},
			{columns: ["GRAND TOTAL",	21,	116610611]},
		]
	}

  const dataChart = {
    labels: ["B. Popular", "B. Nacional", "B. Costa Rica", "BAC San José", "CAC - NAE", "CAC - MEP"],
    datasets: [
      {
        label: "Crédito",
        data: [20, 0, 12, 5, 14, 22],
        fill: true,
        type: "bar",
        backgroundColor: "#4ce1b6",
        borderColor: "#4ce1b6",
      },
      {
        label: "Tarjeta",
        data: [33, 53, 37, 41, 44, 65],
        type: "bar",
        backgroundColor: "#70bbfd",
        borderColor: "#70bbfd",
      },
      {
        label: "SBD",
        data: [44, 69, 77, 50, 60, 75],
        type: "bar",
        backgroundColor: "#f6da6e",
        borderColor: "#f6da6e",
      },
    ],
  };

  const options = {
    legend: {
      position: 'bottom',
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

  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 3, 6],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        borderColor: ["#FFF", "#FFF", "#FFF"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="potenciales">
			{/* Side Options */}
			<MenuEvolucionSemanal menuInicio={menuInicio} />

			{/* Saldos potenciales table */}
			<Row className="pt-4">

				{/* Left Side */}
				<Col lg={6} className="pb-5">
					{/*  Total por entidad */}
					<Row className="mb-3 saldos-potenciales">
						<Col>
							<Card>
								<CardBody className="m-0">
									<div className="d-flex align-items-center text-primary">
										<Person/>
										<h4 className="d-flex align-items-center text-semibold pl-2" >
											Saldos potenciales de nuestros clientes por entidad<br/> Al cierre del último mes
										</h4>
									</div>
									<Col xl={9} className="d-none">
										<ResponsiveTable dataTable={saldosPotencialesTableData} />
									</Col>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
						<Card>
							<CardBody className="m-0">
								<ResponsiveTable dataTable={saldosPotencialesTableData2} />
							</CardBody>
						</Card>
						</Col>
					</Row>

					{/* Total por tipo de crédito */}
					<Row className="mb-3 potencial-mercado">
						<Col>
							<Card>
								<CardBody className="m-0">
									<h4 className="d-flex align-items-center text-semibold text-primary" >
										<CreditCardIcon/>
										Potencial de mercado total por tipo de crédito
									</h4>
									<Col xl={9} className="d-none">
										<ResponsiveTable dataTable={potencialDeMercadoTableData} />
									</Col>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row className="mb-3 no-lines-table">
						<Col>
						<Card>
							<CardBody className="m-0 pb-5">
								<ResponsiveTable dataTable={potencialDeMercadoTableData2} />
							</CardBody>
						</Card>
						</Col>
					</Row>

					{/* Charts */}
					<Row className="mb-3">
						<Col>
						<Card className="chart-card">
							<CardBody className="m-0 pb-5">
								<h4 className="pb-2">Distribución de Saldos de Crédito a Financiar por tipo de crédito</h4>
								<Pie data={pieChartData} />
							</CardBody>
						</Card>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
						<Card className="chart-card">
							<CardBody className="m-0 pb-5">
								<h4 className="pb-2">Cantidad de Clientes a Vincular por tipo de crédito</h4>
								<Pie data={pieChartData} />
							</CardBody>
						</Card>
						</Col>
					</Row>
				</Col>

				{/* Right Side */}
				<Col lg={6} className="pb-5">
					<Row className="mb-3">
						<Col>
						<Card className="card-bar-potencial">
							<CardBody className="m-0">
								<h4 className="text-semibold pb-3">Saldos de crédito a Refinanciar</h4>
								<Bar data={dataChart} options={options} height={190} />
							</CardBody>
						</Card>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
						<Card className="card-bar-potencial">
							<CardBody className="m-0">
								<h4 className="text-semibold pb-3">Pareto por Entidad Financiera (90%)</h4>
								<Bar data={dataChart} options={options} height={190} />
							</CardBody>
						</Card>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
						<Card className="card-bar-potencial">
							<CardBody className="m-0">
								<h4 className="text-semibold pb-3">Otros Saldos de Crédito a Financiar</h4>
								<Bar data={dataChart} options={options} height={190} />
							</CardBody>
						</Card>
						</Col>
					</Row>
					<Row className="mb-3">
						<Col>
						<Card className="card-bar-potencial">
							<CardBody className="m-0">
								<h4 className="text-semibold pb-3">Cantidad de Clientes a Vincular</h4>
								<Bar data={dataChart} options={options} height={190} />
							</CardBody>
						</Card>
						</Col>
					</Row>
				</Col>
			</Row>
    </div>
  );
}

export default Potenciales;