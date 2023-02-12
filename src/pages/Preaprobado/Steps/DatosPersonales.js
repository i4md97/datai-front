import React, { useContext, useEffect, useState } from "react";

import { Card, CardBody, Row, Col, Spinner, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
// import SizeSteps from "../../../components/SizeSteps/SizeSteps";

import styled from "styled-components";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
import Check from "../../../components/Check/Check";
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

const StylesContainer = styled.div`
  th,
  .font-card,
  .dashboard__total-stat {
    font-size: ${(props) =>
    props.size ? `${props.size}px` : `${props.size2}px`} !important;
  }
`;

export default function DatosPersonales({
  animation,
  inputCedula,
  setInputCedula,
  handleChange,
  handleChangeRecommend,
  cedula,
  loading,
  loadingRecommend,
  gestionesActivas,
  consultarCliente,
  cliente,
}) {
  const { sizeSteps, size } = useContext(PreaprobadoContext);
  const [checkForm, setCheckForm] = useState("checkOne");

  const idTypes = ["CÉDULA", "DIMEX", "PASAPORTE", "CÉDULA JURÍDICA"];
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [option, setOption] = useState("Elegir Campaña");
  const [option2, setOption2] = useState("Seleccionar Campaña");

  useEffect(() => {
    if (cedula) {
      setInputCedula(cedula.cedula)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setIdTypeHander = (option) => {
    setIdType(option);
  }

  return (
    <div className={`dashboard datos-personales step__cards pb-5 ${animation && "step__animation"}`}>
      <Row className="pt-4">
        <Col>
          <h4 className="page-title general-title">Consulta Cliente</h4>
          <hr />
        </Col>
      </Row>
      <Row className="jusfity-content-center pt-4">
        <Col sm={12} md={6}>
          {/* {cedula && <SizeSteps className="d-block d-md-none d-flex justify-content-end" name="datosPersonales"/>} */}
          <Card>
            <CardBody>

              <label className="text-center general-title text-bold">Tipo Identificación</label>
              <CustomDropdown 
                      id="tipo-identificacion"
                      className="w-100" 
                      defaultOption="Sleccionar"
                      options={idTypes}
                      callback={setIdTypeHander}
              />
              <label>Número Identificación</label>
              <input
                type="text"
                className="text-center dashboard__total-stat form-cedula-input border-content"
                onChange={(e) => setIdNumber(e.target.value)}
                value={idNumber}
              />
              <div className="d-flex justify-content-center">
                <button
                  disabled={!idType || !idNumber}
                  onClick={consultarCliente(idType, idNumber)}
                  type="submit"
                  className="btn btn-secondary mt-3"
                >
                  {loadingRecommend ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "CONSULTAR CLIENTE"
                  )}
                </button>
              </div>
            </CardBody>
          </Card>
          <Card disabled={true} >
            <CardBody>
              <Check className="d-none custom-check check-success" setCheckForm={setCheckForm} checkForm={checkForm} id="checkOne"/>
              <label
                className="text-center general-title text-bold"
                htmlFor="cedula"
              >
                Campaña:
              </label>
              
              <UncontrolledDropdown className="w-100" disabled={checkForm === "checkTwo"}>
                <DropdownToggle className="icon icon--right w-100 d-flex justify-content-between" outline>
                  <p>{checkForm === "checkOne" ? option : "Elegir Campaña"}</p>
                  <ChevronDownIcon />
                </DropdownToggle>
                <DropdownMenu className="dropdown__menu w-100">
                  <DropdownItem disabled>Elegir Campaña</DropdownItem>
                  <DropdownItem onClick={() => setOption("General")}>General</DropdownItem>
                  <DropdownItem onClick={() => setOption("Campaña I-2021")}>Campaña I-2021</DropdownItem>
                  <DropdownItem onClick={() => setOption("Campaña #3")}>Campaña #3</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <div className="d-flex justify-content-center">
                <button
                  disabled={loadingRecommend || checkForm === "checkTwo"}
                  onClick={handleChangeRecommend}
                  type="submit"
                  className="btn btn-secondary mt-3"
                >
                  {loadingRecommend ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Recomendar Cédula"
                  )}
                </button>
              </div>
            </CardBody>
          </Card>

          <Card className="d-none">
            <CardBody>
              <Check className="custom-check check-success" setCheckForm={setCheckForm} checkForm={checkForm} id="checkTwo" />
              <label
                className="text-center general-title text-bold"
                htmlFor="cedula"
              >
                Mis Gestiones Activas
              </label>

              <UncontrolledDropdown 
                className="w-100" 
                disabled={checkForm === "checkOne"}
                id="cedula"
              >
                <DropdownToggle className="icon icon--right w-100 d-flex justify-content-between" outline>
                  <p>{checkForm === "checkTwo" ? option2 : "Seleccionar Campaña"}</p>
                  <ChevronDownIcon />
                </DropdownToggle>
                <DropdownMenu className="dropdown__menu w-100">
                  <DropdownItem disabled>Seleccionar Campaña</DropdownItem>
                  <DropdownItem onClick={() => {setOption2("109410345"); setInputCedula("109410345")}}>109410345</DropdownItem>
                  {gestionesActivas.map((element, index) => (
                    <DropdownItem key={`cedula-option-${index}`} onClick={() => {setOption2(element); setInputCedula(element)}}>{element}</DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>

              <div className="d-flex justify-content-center">
                <button 
                  disabled={loading || checkForm === "checkOne"}
                  onClick={() => {
                    handleChange();
                  }}
                  type="submit"
                  className="btn btn-secondary mt-3"
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Continuar Gestión"
                  )}
                </button>
              </div>
            </CardBody>
          </Card>

          <Card className="d-none">
            <CardBody>
              <div className="d-flex align-items-center">
                <label
                  className="text-center general-title text-bold mr-5 mb-0"
                  htmlFor="cedula"
                >
                  Identificación
                </label>

                <input
                  type="number"
                  value={inputCedula}
                  onChange={(e) => {
                    setInputCedula(e.target.value);
                  }}
                  className="form-cedula-input text-center mt-0  ml-0"
                />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={12} md={6}>
          {/* {cedula && <SizeSteps className="d-none d-lg-flex" name="datosPersonales"/>} */}
          <StylesContainer className="row m-0 p-0" size={sizeSteps.datosPersonales} size2={size}>
            <Card>
              <CardBody>
                <Row>
                  <Col sm={12}>
                    <h4 className="card-title color__background pb-2 text-semibold">Información Personal</h4>
                    
                    <p className="pb-1 text-color font-weight-bold">Nombre del cliente / Razón social</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.nombre_completo || "n.a"}
                      </p>
                    </div>
                    
                    <p className="pb-1 text-color font-weight-bold">Representante legal</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.nombre_completo || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Identificación</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.no_identif || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Nombre Comercial</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.buro?.empresa_2 || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Teléfono personale</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.tel_cel || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Teléfono empresa</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.tel_trab || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Email</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.email || "n.a"}
                      </p>
                    </div>

                    <p className="pb-1 text-color font-weight-bold">Sitio WEB</p>
                    <div className="border-content">
                      <p className="dashboard__total-stat">
                        {cliente?.interno?.url || "n.a"}
                      </p>
                    </div>
                    
                    <hr className="d-md-none" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            
            <Card className="d-none">
              <CardBody>
                <Row>
                  <Col sm={12}>
                    <h4 className="card-title color__background pb-2 text-semibold">Segmentos</h4>

                      <p className="pb-1 text-color">Segmento</p>
                      <div className="border-content">
                        <p className="dashboard__total-stat">
                          {cedula && (cedula.personal_data.segm || "n.a")}
                        </p>
                      </div>

                      <p className="pb-1 text-color">Subsegmento</p>
                      <div className="border-content">
                        <p className="dashboard__total-stat">
                          {cedula && (cedula.personal_data.subseg || "n.a")}
                        </p>
                      </div>

                      <p className="pb-1 text-color">Perfil Socioeconómico"</p>
                      <div className="border-content">
                        <p className="dashboard__total-stat">
                          {cedula &&
                            (cedula.personal_data.perf_socioecon.map(
                              (element, i) =>
                                `${element}${i + 1 !==
                                  cedula.personal_data.perf_socioecon.length
                                  ? ", "
                                  : ""
                                }`
                            ) || "n.a")}
                        </p>
                      </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </StylesContainer>
        </Col>
      </Row>
    </div>
  );
}
