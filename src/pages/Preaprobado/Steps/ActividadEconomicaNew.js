import React,{ useContext, useState } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Button, Form, InputGroup, InputGroupText, Input, Spinner } from "reactstrap";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import UbicacionesDropdowns from "../../../components/Ubicaciones/UbicacionesDropdowns";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";
import { EtapaSolicitud, OptionalInput } from "../../../components";

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
  const { sizeSteps, size, changeStep } = useContext(PreaprobadoContext);
  const [isSaving, setIsSaving] = useState(false);

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(2);
    }, 1500);
  }

  return (
    <div
      className={`dashboard actividad-economica step__cards ${animation && !pdf && "step__animation"}`}
    >
      <StylesContainer size2={size} size={sizeSteps.actividadEconomica || null}>
        <Form>
          <Row className="pt-4">
            <Col sm={12} lg={12}>
              <Card>
                {/* <SizeSteps className="d-flex justify-content-end" name="actividadEconomica" /> */}
                <CardBody>
                  <Row className="pb-3">
                    <Col>
                      <h5 className="text-bold">ACTIVIDAD ECONÓMICA DE LA EMPRESA / NEGOCIO</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4}>
                      <label className="text-center general-title">Formalmente constituida</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Esta inscrito en ATV?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Cantidad de colaboradores</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.companySizeOptions}
                      />
                      <label className="text-center general-title">Soy Repr Legal</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Inscrito en INS?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Tipo Empresa</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.companyTypeOptions}
                      />
                      <label className="text-center general-title">Jefa de Hogar?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">CCSS al día?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Actividad Económica</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Sleccionar"
                        options={actividadOptions.activityOptions}
                      />
                      <label className="text-center general-title">Negocio opera en:</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="TODO"
                        options={[]}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Patente al día?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Seleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Tipo Industria</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Seleccionar"
                        options={actividadOptions.industryOptions}
                      />
                      <label className="text-center general-title">Fecha Constitución</label>
                      <Input type="date" className="mb-4"/>
                      <label className="text-center general-title">Impuestos al día?</label>
                      <CustomDropdown 
                        className="w-100" 
                        defaultOption="Seleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                      <label className="text-center general-title">Cantidad sucursales</label>
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
                      <label className="text-center general-title">Dirección exacta empresa:</label>
                      <Input type="text" className="mb-4"/>
                    </Col>
                  </Row>
                  <UbicacionesDropdowns />
                  <Row>
                    <Col>
                      <label className="text-center general-title">Facebook</label>
                      <OptionalInput 
                        name="facebook"
                      />
                    </Col>
                    <Col>
                      <label className="text-center general-title">Instagram</label>
                      <OptionalInput 
                        name="instagram"
                      />
                    </Col>
                    <Col>
                      <label className="text-center general-title">LinkedIn</label>
                      <OptionalInput 
                        name="linkedin"
                      />
                    </Col>
                    <Col>
                      <label className="text-center general-title">Twitter</label>
                      <OptionalInput 
                        name="twitter"
                      />
                    </Col>
                    <Col>
                      <label className="text-center general-title">Tiktok</label>
                      <OptionalInput 
                        name={"tiktok"}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}>
                      <label className="text-center general-title">Otro Ingreso</label>
                      <CustomDropdown 
                        className="w-100"
                        defaultOption="Seleccionar"
                        options={actividadOptions.incomeOptions}
                      />
                      <label className="text-center general-title">Ingreso Mensual</label>
                      <Input type="text" />
                    </Col>
                    <Col sm={9}>
                      <Row>
                          <Col sm={3}>
                            <label className="text-center general-title">Nombre Empresa</label>
                            <Input type="text" className="mb-4"/>
                          </Col>
                          <Col sm={9}>
                            <label className="text-center general-title">Ubicación</label>
                            <Input type="text" className="mb-4"/>
                          </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label className="text-center general-title">Teléfono</label>
                          <Input type="text" className="mb-4"/>
                        </Col>
                        <Col>
                          <label className="text-center general-title">Email</label>
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
                      <p className="text-bold">MERCADO</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <label className="text-center general-title">Tipo de Producto</label>
                      <Input type="text" className="mb-3"/>
                      <label className="text-center general-title">Calidad del Producto</label>
                      <Input type="text" className="mb-3"/>
                      <label className="text-center general-title">Condiciones del local</label>
                      <Input type="text" className="mb-3"/>
                    </Col>
                    <Col sm={6}>
                      <label className="text-center general-title">Segmentos que atiende</label>
                      <Input type="text" className="mb-3"/>
                      <label className="text-center general-title">Capac atender demanda</label>
                      <Input type="text" className="mb-3"/>
                      <label className="text-center general-title">Condiciones para ventas</label>
                      <Input type="text" className="mb-3"/>
                    </Col>
                    <Col sm={12}>
                      <label className="text-center general-title">Recomendaciones finales</label>
                      <Input type="text" className="mb-3"/>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Row className="pb-3">
                    <Col>
                      <p className="text-bold">DATOS DEL DUEÑO</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <label className="text-center general-title">Dirección exacta dueño:</label>
                      <Input type="text" className="mb-3"/>
                    </Col>
                    <Col sm={6}>
                      <UbicacionesDropdowns />
                      <Row>
                        <Col sm={4}>
                          <label className="text-center general-title">Fecha Nacimiento</label>
                          <Input type="date" className="mb-3"/>
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Sexo:</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.genderOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Estado Cívil</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.civilStatusOptions}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4}>
                          {/* TODO: fetch selected option */}
                          <label className="text-center general-title">Oficio</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            selectedOption="ADMINISTRADOR"
                            options={actividadOptions.jobOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Rol en Empresa</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.rolesEmpresa}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Tipo Residencia</label>
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
                          <label className="text-center general-title">País Residencia</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Costa Rica"
                            options={[]}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">País Nacimiento</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="NICARAGUA"
                            options={[]}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">País Nacionalidad</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="NICARAGUA"
                            options={[]}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4}>
                          <label className="text-center general-title">Cant Hijos</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.quantityOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Familiares dependientes</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.quantityOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Escolaridad</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.levelOptions}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={4}>
                          <label className="text-center general-title">Tipo Vivienda</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.livingOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Tipo Vehículo</label>
                          <CustomDropdown 
                            className=""
                            defaultOption="Seleccionar"
                            options={actividadOptions.vehicleOptions}
                          />
                        </Col>
                        <Col sm={4}>
                          <label className="text-center general-title">Modelo Vehículo</label>
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
                      <label className="text-center general-title">Nivel transaccional mensual</label>
                    </Col>
                    <Col md={3}>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Menos a $1.000" />Menos a $1.000
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Entre $1.000 y $2.500" />Entre $1.000 y $2.500
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Entre $2.500 y $5.000" />Entre $2.500 y $5.000
                      </label>
                    </Col>
                    <Col md={3}>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Entre $5.000 y $10.000" />Entre $5.000 y $10.000
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Entre $10.000 y $20.000" />Entre $10.000 y $20.000
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="Mayor a $20.000" />Mayor a $20.000
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
                      <label className="text-center general-title">Justifique fuente de ingreso</label>
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
                      <p className="general-title py-3">En caso afirmativo, deberá seleccionar una de las siguientes condiciones y presentar la inscripción emitida por la SUGEF</p>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="administracion"/>La administración del dinero, remesas, cuentas bancarias, ahorros, valores u otros activos del cliente.
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="compra-venta" />La compra y venta de bienes inmuebles.
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="operacion" />La operación, la administración de la compra y la venta de personas jurídicas u otras estructuras jurídicas.
                      </label>
                      <label className="d-flex pl-4">
                        <Input type="radio" name="nivel-transaccional" value="propietario" />Propietario de casas de empeño, casinos, compra y venta de metales preciosos.
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5}>
                      <label className="text-center general-title">El asociado es una personas Políticamente Expuesta (PEP’S):</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.yesNoOptions}
                      />
                    </Col>
                    <Col sm={7}>
                      <label className="text-center general-title">Detalle:</label>
                      <Input type="text" />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <EtapaSolicitud />
            </Col>
          </Row>
        </Form>

        <Row>
          <Col>
          <Button color="primary" className="action-button" onClick={saveAndContinueHandler}>
            Guardar y Continuar
            {isSaving && 
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="ml-2"
              />
            }
          </Button>
          </Col>
        </Row>
      </StylesContainer>
    </div>
  );
}

export default ActividadEconomicaNew;