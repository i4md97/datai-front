import React from "react";
import {Card,Row,Col} from "reactstrap";
import { Bar } from "react-chartjs-2";



export default function PotencialesColocacion() {
 const dataChart= {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Credito",
      data: [20, 0, 12, 5, 14, 22],
      fill: true,
      type:"bar",
      backgroundColor: "orange",
      borderColor: "orange"
    },
    {
      label: "Tarjeta",
      data: [33, 53, 37, 41, 44, 65],
      type:"bar",
      backgroundColor: "#5e50f9",
      borderColor: "#5e50f9",
   
    },
    {
      label: "SBD",
      data: [44, 69, 77, 50, 60, 75],
      type:"bar",
      backgroundColor: "rgb(166,166,166)",
      borderColor: "rgb(166,166,166)",
   
    },
   
  ]
};

const options={
  legend: {
      display: false,
  },
  tooltips: {
    displayColors: false
  },
  scales: {
    yAxes: [
      {
        display: true,
        // stacked: true,
        ticks: {
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        display: true,
        stacked: true,
        barThickness: 50,
        ticks: {
          beginAtZero: true
        }
      }
    ]
    
  },
  title: {
      display: "block",
      text: "POTENCIALES POR SEGMENTO"
     }
};
const options2={
  legend: {
      display: false,
  },
  tooltips: {
    displayColors: false
  },
  scales: {
    yAxes: [
      {
        display: true,
        // stacked: true,
        ticks: {
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        display: true,
        stacked: true,
        barThickness: 50,
        ticks: {
          beginAtZero: true
        }
      }
    ]
    
  },
  title: {
      display: "block",
      text: "MONTOS POR SEGMENTO"
     }
};

  return (
    <>
      <div className="row m-0 p-2">
        <div className="col-12 col-md-12 p-0 m-0  ">
          <Card body className="m-0" style={{ border: "1.5px solid #DFE0EB", boxShadow: "none",overflow: "auto", minHeight: "70vh"}}>
          <Row> 
            <Col className="col-12 col-md-6 border-right-custom">  <Bar options={options} data={dataChart} height={"220%"} />
            
                <hr className="d-md-none"/>
             </Col>
            <Col className="col-12 col-md-6 ">  <Bar options={options2} data={dataChart} height={"220%"} /> </Col>
           </Row>
          </Card>
        </div>
      </div>
    </>
  );
}
