
import { Col, Row, Card, CardBody, Input } from "reactstrap";
import { CustomDropdown } from "../";

import { etapaSolicitudOptions } from "../../db/dropdownsOptions";

export const EtapaSolicitud = () => {
  return (
    <Card>
      <CardBody>
        <Row className="pb-3">
          <Col>
            <p className="text-bold">ETAPA DE LA SOLICITUD</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={5}>
            <Row>
              <Col>
                <label className="text-center general-title">ESTATUS</label>
                <CustomDropdown 
                  className=""
                  defaultOption="Seleccionar"
                  options={etapaSolicitudOptions.statusOptions}
                />
              </Col>
              <Col>
                <label className="text-center general-title">ETAPA</label>
                <CustomDropdown 
                  className=""
                  defaultOption="Seleccionar"
                  options={etapaSolicitudOptions.stageOptions}
                />
              </Col>
              <Col>
                <label className="text-center general-title">STAND BY</label>
                <CustomDropdown 
                  className=""
                  defaultOption="Seleccionar"
                  options={etapaSolicitudOptions.standByOptions}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={7}>
            <label className="text-center general-title">DETALLE</label>
            <Input className="w-100" type="text" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}