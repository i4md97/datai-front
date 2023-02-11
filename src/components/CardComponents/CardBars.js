import { useState } from "react";

// Components
import { Row, Col, Card, CardBody } from "reactstrap";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

// Styles
import './CardBars.scss';

const CardBars = ({element}) => {
  
  const charData = element.chart;
  
  const [activeIndex, setActiveIndex] = useState(1);
  const activeItem = charData[activeIndex];
  
  const clickBarHandler = (item) => {
    const index = charData.indexOf(item.payload);
    setActiveIndex(index);
  }

  return (
    <Card className="card-bars">
      <CardBody className="m-0">
        <Row className="content justify-content-center justify-content-lg-between justify-content-xl-center">
          <Col>
            <h4 className="pb-2">{element.title}</h4>
          </Col>
          <Col className="pr-0 body-text">
            <p className="quantity">
              {element.symbol && (<span style={{ paddingRight: "5px" }} >{element.symbol}</span>)}
              {activeItem.uv.toLocaleString('de-DE')}
              <span> {element.measure}</span>
            </p>
            <p className="label">
              {element.label}
            </p>
          </Col>
          <Col className="px-3 px-md-2 px-xl-1 bars-container">
            <ResponsiveContainer height={50}>
              <BarChart data={charData}>
                <Bar onClick={clickBarHandler} dataKey="uv">
                  {charData.map((entry, i) => (
                    <Cell
                      key={`barcell-${entry.id}-${i}`}
                      cursor="pointer"
                      fill={i === activeIndex ? '#4ce1b6' : '#ff4861'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardBars;