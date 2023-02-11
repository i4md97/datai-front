import React from "react";
import {Card,Row,Col} from "reactstrap";
import { Bar ,HorizontalBar} from "react-chartjs-2";


export default function CarteraMensual() {
 const dataChart= {
  labels: ["AA", "A", "B", "D", "C", "N", "SW", "E"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65,32,50],
      fill: true,
      backgroundColor: "#5e50f9",
      borderColor: "#5e50f9"
    },

  ]
};
 const dataChartH= {
  labels: [">120", "91-120", "61-90", "31-60", "1-30","0"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "#5e50f9",
      borderColor: "#5e50f9"
    },

  ]
};

const options={
  legend: {
      display: false,
  },
};
const options2={
  legend: {
      display: false,
  },
  title: {
    display: "block",
    text: "POTENCIALES POR SEGMENTO"
   }
};

  return (
    <>
      <div className="row m-2">
        <div className="col-12  mb-3 pl-lg-0 p-0  ">
          <Card body className="m-0"   style={{overflow: "auto", minHeight: "71vh",border: "1.5px solid #DFE0EB", boxShadow: "none"}}>
          <Row> 
                 <Col className="col-12 px-0 d-md-none  ">  <HorizontalBar options={options2} data={dataChartH} height={"200%"} /> <hr/>  </Col>
                 <Col className="col-12 px-0 d-none d-md-block  ">  <HorizontalBar options={options2} data={dataChartH} height={"50%"} /> <hr/>  </Col>

                 <Col className="col-12 px-0 d-md-none  ">  <Bar options={options} data={dataChart} height={"200%"} /> <hr/>  </Col>
                 <Col className="col-6 px-0 d-none d-md-block  ">  <Bar options={options} data={dataChart} height={"100%"} />  </Col>

                 <Col className="col-12 px-0 d-md-none  ">  <Bar options={options} data={dataChart} height={"200%"} />   </Col>
                 <Col className="col-6 px-0 d-none d-md-block  ">  <Bar options={options} data={dataChart} height={"100%"} />  </Col>

         
           </Row>
          </Card>
        </div>

      </div>
    </>
  );
}
