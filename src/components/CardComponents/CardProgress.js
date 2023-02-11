// Components
import { Row, Col, Card, CardBody, Progress } from "reactstrap";

// Styles
import './CardProgress.scss';

const CardProgress = ({element}) => {
  return (
    <Card className="card-progress m-0">
      <CardBody className="m-0 pb-4">
        <div className="card-top">
          <h5 className="title">{element.title}</h5>
          <p className="values">
            {element.symbol && (<span style={{ paddingRight: "5px" }}>{element.symbol}</span>)}
            {element.quantity.toLocaleString('de-DE')}
            <span className="value-label pl-1">{element.measure}</span>
          </p>
        </div>
        <Row className="card-bottom">
          <Col xs={12}>
            <p className="percentage mt-1">
              <strong>{element.percentage}%</strong> {element.label}
            </p>
          </Col>
          <Col xs={9}>
            <Progress value={element.percentage} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardProgress;