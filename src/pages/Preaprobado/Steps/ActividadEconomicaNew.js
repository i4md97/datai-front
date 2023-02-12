import React,{ useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Button, InputGroup, InputGroupText, Input } from "reactstrap";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import UbicacionesDropdowns from "../../../components/Ubicaciones/UbicacionesDropdowns";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";

import {actividadOptions} from "../../../db/dropdownsOptions";
// import { ubicaciones } from "../../../db/ubicaciones";

// Styles
import styled from "styled-components";

const StylesContainer = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.size ? `${props.size}px` : `${props.size2}px`} !important;
  }
`;

const ActividadEconomicaNew = ({ animation, pdf }) => {
  const { sizeSteps, size } = useContext(PreaprobadoContext);

  return (
    <div
      className={`dashboard actividad-economica step__cards ${animation && !pdf && "step__animation"}`}
    >
      <StylesContainer size2={size} size={sizeSteps.actividadEconomica || null}>
        <Row className="pt-4">
          <Col>
            <h4 className="page-title general-title">Actividad Económica de la Empresa</h4>
            <hr />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col sm={12} lg={12}>
            <Card>
              {/* <SizeSteps className="d-flex justify-content-end" name="actividadEconomica" /> */}
              <CardBody>
                <Row className="pb-3">
                  <Col>
                    <p>ACTIVIDAD ECONÓMICA DE LA EMPRESA / NEGOCIO</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <label className="text-center general-title text-bold">Formalmente constituida</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Esta inscrito en ATV?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Cantidad de colaboradores</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.companySizeOptions}
                    />
                    <label className="text-center general-title text-bold">Soy Repr Legal</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Inscrito en INS?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                  </Col>
                  <Col sm={4}>
                    <label className="text-center general-title text-bold">Tipo Empresa</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.companyTypeOptions}
                    />
                    <label className="text-center general-title text-bold">Jefa de Hogar?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">CCSS al día?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Actividad Económica</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={actividadOptions.activityOptions}
                    />
                    <label className="text-center general-title text-bold">Negocio opera en:</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="TODO"
                      options={[]}
                    />
                  </Col>
                  <Col sm={4}>
                    <label className="text-center general-title text-bold">Patente al día?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Seleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Tipo Industria</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Seleccionar"
                      options={actividadOptions.industryOptions}
                    />
                    <label className="text-center general-title text-bold">Fecha Constitución</label>
                    <Input type="date" className="mb-4"/>
                    <label className="text-center general-title text-bold">Impuestos al día?</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Seleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                    <label className="text-center general-title text-bold">Cantidad sucursales</label>
                    <CustomDropdown 
                      className="w-100" 
                      defaultOption="Seleccionar"
                      options={actividadOptions.quantityOptions}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={12}>
                    <label className="text-center general-title text-bold">Dirección exacta empresa:</label>
                    <Input type="text" className="mb-4"/>
                  </Col>
                </Row>
                <UbicacionesDropdowns />
                <Row>
                  <Col>
                    <label className="text-center general-title text-bold">Facebook</label>
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                        />
                      </InputGroupText>
                      <Input type="text"/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <label className="text-center general-title text-bold">Instagram</label>
                    
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                        />
                      </InputGroupText>
                      <Input type="text"/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <label className="text-center general-title text-bold">Linkedin</label>
                    
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                        />
                      </InputGroupText>
                      <Input type="text"/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <label className="text-center general-title text-bold">Twitter</label>
                    
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                        />
                      </InputGroupText>
                      <Input type="text"/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <label className="text-center general-title text-bold">Tiktok</label>
                    
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                        />
                      </InputGroupText>
                      <Input type="text"/>
                    </InputGroup>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <label className="text-center general-title text-bold">Otro Ingreso</label>
                    <CustomDropdown 
                      className="w-100"
                      defaultOption="Seleccionar"
                      options={actividadOptions.incomeOptions}
                    />
                    <label className="text-center general-title text-bold">Ingreso Mensual</label>
                    <Input type="text" />
                  </Col>
                  <Col sm={9}>
                    <Row>
                        <Col sm={3}>
                          <label className="text-center general-title text-bold">Nombre Empresa</label>
                          <Input type="text" className="mb-4"/>
                        </Col>
                        <Col sm={9}>
                          <label className="text-center general-title text-bold">Ubicación</label>
                          <Input type="text" className="mb-4"/>
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label className="text-center general-title text-bold">Teléfono</label>
                        <Input type="text" className="mb-4"/>
                      </Col>
                      <Col>
                        <label className="text-center general-title text-bold">Email</label>
                        <Input type="text" className="mb-4"/>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Row className="pb-3">
                  <Col>
                    <p>MERCADO</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <label className="text-center general-title text-bold">Tipo de Producto</label>
                    <Input type="text" className="mb-3"/>
                    <label className="text-center general-title text-bold">Calidad del Producto</label>
                    <Input type="text" className="mb-3"/>
                    <label className="text-center general-title text-bold">Condiciones del local</label>
                    <Input type="text" className="mb-3"/>
                  </Col>
                  <Col sm={6}>
                    <label className="text-center general-title text-bold">Segmentos que atiende</label>
                    <Input type="text" className="mb-3"/>
                    <label className="text-center general-title text-bold">Capac atender demanda</label>
                    <Input type="text" className="mb-3"/>
                    <label className="text-center general-title text-bold">Condiciones para ventas</label>
                    <Input type="text" className="mb-3"/>
                  </Col>
                  <Col sm={12}>
                    <label className="text-center general-title text-bold">Recomendaciones finales</label>
                    <Input type="text" className="mb-3"/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Row className="pb-3">
                  <Col>
                    <p>DATOS DEL DUEÑO</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <label className="text-center general-title text-bold">Dirección exacta dueño:</label>
                    <Input type="text" className="mb-3"/>
                  </Col>
                  <Col sm={6}>
                    <UbicacionesDropdowns />
                    <Row>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Fecha Nacimiento</label>
                        <Input type="date" className="mb-3"/>
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Sexo:</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.genderOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Estado Cívil</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.civilStatusOptions}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Oficio</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.jobOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Rol en Empresa</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.rolesEmpresa}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Tipo Residencia</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.residenceOptions}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">País Residencia</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Costa Rica"
                          options={[]}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">País Nacimiento</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="NICARAGUA"
                          options={[]}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">País Nacionalidad</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="NICARAGUA"
                          options={[]}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Cant Hijos</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.quantityOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Familiares dependientes</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.quantityOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Escolaridad</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.levelOptions}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Tipo Vivienda</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.livingOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Tipo Vehículo</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.vehicleOptions}
                        />
                      </Col>
                      <Col sm={4}>
                        <label className="text-center general-title text-bold">Modelo Vehículo</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.modelYearOptions}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col sm={12}>
                    <label className="text-center general-title text-bold">Nivel transaccional mensual</label>
                  </Col>
                  <Col md={3}>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Menos a $1.000
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Entre $1.000 y $2.500
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Entre $2.500 y $5.000
                    </label>
                  </Col>
                  <Col md={3}>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Entre $5.000 y $10.000
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Entre $10.000 y $20.000
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Mayor a $20.000
                    </label>
                  </Col>
                  <Col md={6} className="d-flex align-items-center justify-content-start">
                    <CustomDropdown 
                      className=""
                      defaultOption="Seleccionar"
                      options={actividadOptions.currencyOptions}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label className="text-center general-title text-bold">Justifique fuente de ingreso</label>
                    <Input type="text" />
                  </Col>
                </Row>
                <Row className="py-4">
                  <Col md={10}>
                    <p>Maneja fondos de terceros o realiza alguna de las siguientes actividades descritas en el Artículo 15 y 15 bis de la Ley 7786 y sus reformas: Persona física o jurídica que administra recursos de terceros o realizan algún tipo de actividad financiera. Ejemplos: Fideicomisos, Abogado, Casas de Cambio, Remesadoras, Contador, Prestamista, Propietario de Casino, Joyería, Administrador de fondos y fideicomisos, Compra y Venta de Bienes Raíces.</p>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <CustomDropdown 
                      className=""
                      defaultOption="Seleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                  </Col>
                  <Col md={12}>
                    <p className="general-title text-bold py-3">En caso afirmativo, deberá seleccionar una de las siguientes condiciones y presentar la inscripción emitida por la SUGEF</p>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />La administración del dinero, remesas, cuentas bancarias, ahorros, valores u otros activos del cliente.
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />La compra y venta de bienes inmuebles.
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />La operación, la administración de la compra y la venta de personas jurídicas u otras estructuras jurídicas.
                    </label>
                    <label className="d-flex pl-4">
                      <Input type="radio" name="nivel-transaccional" />Propietario de casas de empeño, casinos, compra y venta de metales preciosos.
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col sm={5}>
                    <label className="text-center general-title text-bold">El asociado es una personas Políticamente Expuesta (PEP’S):</label>
                    <CustomDropdown 
                      className=""
                      defaultOption="Seleccionar"
                      options={actividadOptions.yesNoOptions}
                    />
                  </Col>
                  <Col sm={7}>
                    <label className="text-center general-title text-bold">Detalle:</label>
                    <Input type="text" />
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row className="pb-3">
                  <Col>
                    <p>ETAPA DE LA SOLICITUD</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <label className="text-center general-title text-bold">ESTATUS</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.statusOptions}
                        />
                      </Col>
                      <Col>
                        <label className="text-center general-title text-bold">ETAPA</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.stageOptions}
                        />
                      </Col>
                      <Col>
                        <label className="text-center general-title text-bold">STAND BY</label>
                        <CustomDropdown 
                          className=""
                          defaultOption="Seleccionar"
                          options={actividadOptions.standByOptions}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <label className="text-center general-title text-bold">DETALLE</label>
                    <Input type="text" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button className="action-button">Editar</Button>
            <Button color="primary" className="action-button">Guardar</Button>
          </Col>
        </Row>
      </StylesContainer>
    </div>
  );
}

export default ActividadEconomicaNew;