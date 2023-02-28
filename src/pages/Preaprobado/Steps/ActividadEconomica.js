import React,{ useContext, useState } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Row, Col, Card, CardBody, Button, Input, Spinner } from "reactstrap";
import { 
  EtapaSolicitud, 
  OptionalInput, 
  CustomDropdown 
} from "../../../components";
import UbicacionesDropdowns from "../../../components/Ubicaciones/UbicacionesDropdowns";

import {actividadOptions} from "../../../db/dropdownsOptions";

const ActividadEconomica = ({ animation, pdf }) => {
  const { changeStep } = useContext(PreaprobadoContext);
  const [isSaving, setIsSaving] = useState(false);
  
  const [actividad, setActividad] = useState({});
  const [mercado, setMercado] = useState({});
  const [datosDueno, setDatosDueno] = useState({});

  const updateStateHandler = (setter, value, property) => {
    setter(prev => ({...prev, [property]: value}));
  }

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(2);
    }, 1500);
    console.log({actividad, mercado, datosDueno});
  }

  return (
    <div className={`dashboard actividad-economica step__cards ${animation && !pdf && "step__animation"}`}>
      <Row className="pt-4">
        <Col sm={12} lg={12}>
          <Card>
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
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"constituida"}
                  />
                  <label className="text-center general-title">Esta inscrito en ATV?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"inscrito_atv"}
                  />
                  <label className="text-center general-title">Cantidad de colaboradores</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.companySizeOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"cantidad_colaboradores"}
                  />
                  <label className="text-center general-title">Soy Repr Legal</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"repr_legal"}
                  />
                  <label className="text-center general-title">Inscrito en INS?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"inscrito_ins"}
                  />
                </Col>
                <Col sm={4}>
                  <label className="text-center general-title">Tipo Empresa</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.companyTypeOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"tipo_empresa"}
                  />
                  <label className="text-center general-title">Jefa de Hogar?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"jefa_hogar"}
                  />
                  <label className="text-center general-title">CCSS al día?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"ccss_dia"}
                  />
                  <label className="text-center general-title">Actividad Económica</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Sleccionar"
                    options={actividadOptions.activityOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"actividad_economica"}
                  />
                  <label className="text-center general-title">Negocio opera en:</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="TODO"
                    options={[]}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"operan_en"}
                  />
                </Col>
                <Col sm={4}>
                  <label className="text-center general-title">Patente al día?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Seleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"patente_dia"}
                  />
                  <label className="text-center general-title">Tipo Industria</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Seleccionar"
                    options={actividadOptions.industryOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"tipo_industria"}
                  />
                  <label className="text-center general-title">Fecha Constitución</label>
                  <input 
                    type="date" 
                    className="mb-4 bg-green"
                    onChange={(e) => updateStateHandler(setActividad, e.target.value, "fecha_constitucion")}
                  />
                  <label className="text-center general-title">Impuestos al día?</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Seleccionar"
                    options={actividadOptions.yesNoOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"impuesto_dia"}
                  />
                  <label className="text-center general-title">Cantidad sucursales</label>
                  <CustomDropdown 
                    className="w-100" 
                    defaultOption="Seleccionar"
                    options={actividadOptions.quantityOptions}
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"cantidad_sucursales"}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col sm={12}>
                  <label className="text-center general-title">Dirección exacta empresa:</label>
                  <Input 
                    type="text"
                    className="mb-4 bg-green"
                    onChange={(e) => updateStateHandler(setActividad, e.target.value, "direccion_exacta")}
                  />
                </Col>
              </Row>
              <UbicacionesDropdowns 
                callback={updateStateHandler}
                setter={setActividad}
                property={"ubicacion"}
              />
              <Row>
                <Col className="col-12 col-sm-6 col-md-auto">
                  <label className="text-center general-title">Facebook</label>
                  <OptionalInput
                    className="bg-green" 
                    setter={setActividad}
                    callback={updateStateHandler}
                    property={"facebook"}
                  />
                </Col>
                <Col className="col-12 col-sm-6 col-md-auto">
                  <label className="text-center general-title">Instagram</label>
                  <OptionalInput
                    className="bg-green" 
                    setter={setActividad}
                    callback={updateStateHandler}
                    property={"instagram"}
                  />
                </Col>
                <Col className="col-12 col-sm-6 col-md-auto">
                  <label className="text-center general-title">LinkedIn</label>
                  <OptionalInput
                    className="bg-green" 
                    setter={setActividad}
                    callback={updateStateHandler}
                    property={"linkedin"}
                  />
                </Col>
                <Col className="col-12 col-sm-6 col-md-auto">
                  <label className="text-center general-title">Twitter</label>
                  <OptionalInput 
                    className="bg-green"
                    setter={setActividad}
                    callback={updateStateHandler}
                    property={"twitter"}
                  />
                </Col>
                <Col className="col-12 col-sm-6 col-md-auto">
                  <label className="text-center general-title">Tiktok</label>
                  <OptionalInput 
                    className="bg-green"
                    setter={setActividad}
                    callback={updateStateHandler}
                    property={"tiktok"}
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
                    callback={updateStateHandler}
                    setter={setActividad}
                    property={"otro_ingreso"}
                  />
                  <label className="text-center general-title">Ingreso Mensual</label>
                  <Input
                    type="text"
                    className="mb-4
                    bg-green"
                    placeholder="₡1,000,000"
                    onChange={(e) => updateStateHandler(setActividad, e.target.value, "oi_ingreso_mensual")}
                  />
                </Col>
                <Col sm={9}>
                  <Row>
                      <Col sm={3}>
                        <label className="text-center general-title">Nombre Empresa</label>
                        <Input
                          type="text"
                          className="mb-4 bg-green"
                          onChange={(e) => updateStateHandler(setActividad, e.target.value, "oi_nombre_empresa")}
                        />
                      </Col>
                      <Col sm={9}>
                        <label className="text-center general-title">Ubicación</label>
                        <Input
                          type="text"
                          className="mb-4 bg-green"
                          onChange={(e) => updateStateHandler(setActividad, e.target.value, "oi_ubicacion")}
                        />
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label className="text-center general-title">Teléfono</label>
                      <Input
                        type="text"
                        className="mb-4 bg-green"
                        onChange={(e) => updateStateHandler(setActividad, e.target.value, "oi_telefono")}
                      />
                    </Col>
                    <Col>
                      <label className="text-center general-title">Email</label>
                      <Input
                        type="text"
                        className="mb-4 bg-green"
                        onChange={(e) => updateStateHandler(setActividad, e.target.value, "oi_email")}
                      />
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
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "tipo_producto")}
                  />
                  <label className="text-center general-title">Calidad del Producto</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "cantidad_producto")}
                  />
                  <label className="text-center general-title">Condiciones del local</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "condiciones_local")}
                  />
                </Col>
                <Col sm={6}>
                  <label className="text-center general-title">Segmentos que atiende</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "segmentos_atiende")}
                  />
                  <label className="text-center general-title">Capacidad atender demanda</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "capacidad_demanda")}
                  />
                  <label className="text-center general-title">Condiciones para ventas</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "condiciones_ventas")}
                  />
                </Col>
                <Col sm={12}>
                  <label className="text-center general-title">Recomendaciones finales</label>
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setMercado, e.target.value, "recomendaciones_finales")}
                  />
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
                  <Input
                    type="text"
                    className="mb-3 bg-green"
                    onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "direccion_exacta")}
                  />
                </Col>
                <Col sm={6}>
                  <UbicacionesDropdowns 
                    callback={updateStateHandler}
                    setter={setDatosDueno}
                    property={"ubicacion"}
                  />
                  <Row>
                    <Col sm={4}>
                      <label className="text-center general-title">Fecha Nacimiento</label>
                      <Input
                        type="date"
                        className="mb-3 bg-green"
                        onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "fecha_nacimiento")}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Sexo:</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.genderOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"sexo"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Estado Cívil</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.civilStatusOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"estado_civil"}
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
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"oficio"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Rol en Empresa</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.rolesEmpresa}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"rol_empresa"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Tipo Residencia</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.residenceOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"tipo_residencia"}
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
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"pais_residencia"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">País Nacimiento</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="NICARAGUA"
                        options={[]}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"pais_nacimiento"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">País Nacionalidad</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="NICARAGUA"
                        options={[]}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"pais_nacionalidad"}
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
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"cantidad_hijos"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Familiares dependientes</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.quantityOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"familiares_dependientes"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Escolaridad</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.levelOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"escolaridad"}
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
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"tipo_vivienda"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Tipo Vehículo</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.vehicleOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"tipo_vehiculo"}
                      />
                    </Col>
                    <Col sm={4}>
                      <label className="text-center general-title">Modelo Vehículo</label>
                      <CustomDropdown 
                        className=""
                        defaultOption="Seleccionar"
                        options={actividadOptions.modelYearOptions}
                        callback={updateStateHandler}
                        setter={setDatosDueno}
                        property={"modelo_vehiculo"}
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
                    <Input
                      type="radio"
                      value="Menos a $1.000"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Menos a $1.000
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="Entre $1.000 y $2.500"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Entre $1.000 y $2.500
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="Entre $2.500 y $5.000"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Entre $2.500 y $5.000
                  </label>
                </Col>
                <Col md={3}>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="Entre $5.000 y $10.000"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Entre $5.000 y $10.000
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="Entre $10.000 y $20.000"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Entre $10.000 y $20.000
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="Mayor a $20.000"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "nive_transaccional_mensual")}
                    />
                    Mayor a $20.000
                  </label>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-start">
                  <CustomDropdown 
                    className=""
                    defaultOption="Seleccionar"
                    options={actividadOptions.currencyOptions}
                    callback={updateStateHandler}
                    setter={setDatosDueno}
                    property={"moneda"}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="text-center general-title">Justifique fuente de ingreso</label>
                  <Input
                    type="text"
                    className="bg-green"
                    onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "ingreso_justificacion")}
                  />
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
                    callback={updateStateHandler}
                    setter={setDatosDueno}
                    property={"legal"}
                  />
                </Col>
                <Col md={12}>
                  <p className="general-title py-3">En caso afirmativo, deberá seleccionar una de las siguientes condiciones y presentar la inscripción emitida por la SUGEF</p>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="administracion"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "inscripcion")}
                    />
                    La administración del dinero, remesas, cuentas bancarias, ahorros, valores u otros activos del cliente.
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="compra-venta"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "inscripcion")}
                    />
                    La compra y venta de bienes inmuebles.
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="operacion"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "inscripcion")}
                    />
                    La operación, la administración de la compra y la venta de personas jurídicas u otras estructuras jurídicas.
                  </label>
                  <label className="d-flex pl-4">
                    <Input
                      type="radio"
                      value="propietario"
                      onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "inscripcion")}
                    />
                    Propietario de casas de empeño, casinos, compra y venta de metales preciosos.
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
                    callback={updateStateHandler}
                    setter={setDatosDueno}
                    property={"peps"}
                  />
                </Col>
                <Col sm={7}>
                  <label className="text-center general-title">Detalle:</label>
                  <Input
                    type="text"
                    className="bg-green"
                    onChange={(e) => updateStateHandler(setDatosDueno, e.target.value, "detalle")}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>

          <EtapaSolicitud />
        </Col>
      </Row>

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
    </div>
  );
}

export default ActividadEconomica;