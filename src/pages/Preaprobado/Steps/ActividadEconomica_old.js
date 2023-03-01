import React from "react";

// Components
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { CustomDropdown } from "../../../components";
import SizeSteps from "../../../components/SizeSteps/SizeSteps";

export default function ActividadEconomica({ animation, pdf }) {
  const profesiones = [
    "Accionista",
    "Representante legal",
    "Co-propietario (< = 50% Acciones)",
    "Propietario (+ 50% Acciones)",
    "Consultor",
    "Director",
    "Gerente",
    "Supervisor",
    "Analista",
    "Tecnico profesional",
    "Tecnico especialista",
    "Administrativo",
    "Operario"
  ];

  const tiposEmpresas = [
    "Micro (1-10 empls)",
    "Pequeña (11-30)",
    "Mediana (31-100)",
    "Grande (100-200)",
    "Corporativa (+200)",
    "Institución Pública",
    "ONG",
    "Empresa Multinacional"

  ]

  const tipoIndustrias = [
    "A- Agricultura, ganadería, caza y actividades de servicios conexas",
    "B- Pesca y acuacultura",
    "C- Explotación de minas y canteras",
    "D- Industria Manufacturera",
    "E- Electricidad, telecomunicaciones, gas y agua",
    "F- Construcción, compra y reparación de inmuebles",
    "G- Comercio",
    "H- Hotel y restaurante",
    "I- Transporte",
    "J- Actividad financiera y bursátil",
    "K- Actividades inmobiliarias, empresariales y de alquiler",
    "M- Enseñanza (El deudor ofrece este servicio)",
    "R- Servicios (El deudor ofrece este servicio)",
    "S- Consumo (el deudor consume el bien o servicio)",
    "X- Otras actividades del sector privado no financiero",
    "Y- Administración pública",
    "Z- Actividades de entidades y órganos extraterritoriales"
  ];

  const tipoActividades = [
    "Servicios",
    "Comercio",
    "Comercio y servicios",
    "Industria",
    "Industria y comercio",
    "Industria y comercio y servicios",
    "Industria y servicios"
  ];

  return (
    <div
      className={`dashboard actividad-economica step__cards ${animation && !pdf && "step__animation"}`}
    >
      <Row className="pt-4">
        <Col sm={12} lg={6}>
          <Card>
            {/* <SizeSteps className="d-flex justify-content-end" name="actividadEconomica" /> */}
            <CardBody>
              <Row>
                <Col>
                  <h5>Fecha de Inicio de Labores (DD/MM/AAA)</h5>
                  {/* <p className="dashboard__total-stat">09/02/2021</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Antiguedad Laboral (DD/MM/AAA)</h5>
                  {/* <p className="dashboard__total-stat">12.1</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Antiguedad Laboral (DD/MM/AAA)</h5>
                  {/* <p className="dashboard__total-stat">1.0</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Profesión u Oficio</h5>
                  {/* <p className="dashboard__total-stat">Tecnico Profecional</p> */}
                  <CustomDropdown 
                    id="profesion-oficio"
                    className="w-100 striped" 
                    defaultOption="Seleccionar"
                    options={profesiones}
                  />

                  <h5>Cantidad Aproximada de Empleados</h5>
                  {/* <p className="dashboard__total-stat">200 empls o mas</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Tipo de Empresa</h5>
                  {/* <p className="dashboard__total-stat">CORPORATIVA</p> */}
                  <CustomDropdown 
                    className="w-100 striped" 
                    defaultOption="Seleccionar" 
                    options={tiposEmpresas} 
                  />
                  <h5>Tipo de Industria</h5>
                  {/* <p className="dashboard__total-stat">Servicios</p> */}
                  <CustomDropdown 
                    id="tipo-industria"
                    className="w-100 striped" 
                    defaultOption="Seleccionar" 
                    options={tipoIndustrias} 
                  />

                  <h5>Tipo Actividad Económica</h5>
                  {/* <p className="dashboard__total-stat">SALUD</p> */}
                  <CustomDropdown
                    id="tipo-actividad-economica" 
                    className="w-100 striped" 
                    defaultOption="Seleccionar" 
                    options={tipoActividades} 
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} lg={6}>
          <SizeSteps name="actividadEconomica" />
          <Card>
            {/* <SizeSteps className="d-flex justify-content-end" name="actividadEconomica" /> */}
            <CardBody>
              <Row>
                <Col>
                  <h5>Segmento</h5>
                  {/* <p className="dashboard__total-stat">Asalario Publico</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Nombre Empresa / Institución</h5>
                  {/* <p className="dashboard__total-stat">Ministro de obras publicas y transporte</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Sucursal / Región / Área / Seccion / Departamento</h5>
                  {/* <p className="dashboard__total-stat">La Sabana Oficinas Centrales</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Telefono / Oficina / Extensión</h5>
                  {/* <p className="dashboard__total-stat">2211-3000 / 1345</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Email Trabjo</h5>
                  {/* <p className="dashboard__total-stat">juancarlos@ccss.sa</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Salario / Pensión Bruto Mensual</h5>
                  {/*  <p className="dashboard__total-stat">Si</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Ingresos Mensual x Actividad Empresarial</h5>
                  {/* <p className="dashboard__total-stat">A 2500 // Acueductos a alcantarillados</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
                  <h5>Ingresos Mensual x Servicios Profesionales</h5>
                  {/* <p className="dashboard__total-stat">A 2500 // Acueductos a alcantarillados</p> */}
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content"
                  />
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
    </div>
  );
}
