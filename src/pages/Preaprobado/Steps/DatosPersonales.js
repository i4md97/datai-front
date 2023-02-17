import React, { useContext, useEffect, useState } from "react";

import { Card, CardBody, Row, Col, Spinner, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Button, Input } from "reactstrap";
import { CustomDropdown } from "../../../components";

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
  const { sizeSteps, size, changeStep } = useContext(PreaprobadoContext);

  const [checkForm, setCheckForm] = useState("checkOne");

  const idTypes = ["CÉDULA", "DIMEX", "PASAPORTE", "CÉDULA JURÍDICA"];
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [option, setOption] = useState("Elegir Campaña");
  const [option2, setOption2] = useState("Seleccionar Campaña");

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (cedula) {
      setInputCedula(cedula.cedula)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(1);
    }, 1500);
  }

  return (
    <div className={`dashboard datos-personales step__cards pb-5 ${animation && "step__animation"}`}>
      <Row className="pt-4">
        <Col sm={12}>
          <Card>
            <CardBody>
              <Row className="pb-3">
                <Col>
                  <h5 className="text-bold">Consultar cliente</h5>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <label className="text-center general-title">Tipo Identificación <span className="text-danger">*</span></label>
                  <CustomDropdown 
                    id="tipo-identificacion"
                    className="mb-0" 
                    classNameButton="mb-0"
                    defaultOption="Sleccionar"
                    options={idTypes}
                    callback={setIdType}
                  />
                </Col>
                <Col sm={6}>
                  <label>Número Identificación <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="text-center dashboard__total-stat form-cedula-input border-content my-0"
                    onChange={(e) => setIdNumber(e.target.value)}
                    value={idNumber}
                  />
                </Col>
                <Col sm={12} className="pt-3">
                  <button
                    disabled={!idType || !idNumber}
                    onClick={consultarCliente(idType, idNumber)}
                    type="submit"
                    className="btn btn-primary my-0"
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
                      "Consultar Cliente"
                    )}
                  </button>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="jusfity-content-center">
        <Col sm={12} md={6}>
          <Card disabled={true} >
            <CardBody>
              <Check className="custom-check check-success" setCheckForm={setCheckForm} checkForm={checkForm} id="checkOne"/>
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
                    "Recomendar Cliente"
                  )}
                </button>
              </div>
            </CardBody>
          </Card>

          <Card className="">
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
          <StylesContainer className="row m-0 p-0" size={sizeSteps.datosPersonales} size2={size}>
            <Card>
              <CardBody>
                <Row>
                  <Col sm={12}>
                    <h5 className="color__background pb-2 text-bold">Información Personal</h5>
                    
                    <p className="pb-1 text-color text-semibold">Nombre del cliente / Razón social</p>
                    <Input 
                      className="editable-field" 
                      name="nombre_cliente" 
                      value={cliente?.interno?.nombre_completo || "n.a"} 
                      onChange={() => {}}
                    />
                    
                    <p className="pb-1 text-color text-semibold">Representante legal</p>
                    <Input 
                      className="editable-field" 
                      name="representante" 
                      value={cliente?.interno?.nombre_completo || "n.a"} 
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Identificación</p>
                    <Input 
                      className="editable-field" 
                      name="identificacion" 
                      value={cliente?.interno?.no_identif || "n.a"} 
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Nombre Comercial</p>
                    <Input 
                      className="editable-field" 
                      name="nombre_comercial" 
                      value={cliente?.buro?.empresa_2 || "n.a"}
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Teléfono personal</p>
                    <Input 
                      className="editable-field" 
                      name="telefono-personal" 
                      value={cliente?.interno?.tel_cel || "n.a"}
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Teléfono empresa</p>
                    <Input 
                      className="editable-field" 
                      name="telefono-empresa" 
                      value={cliente?.interno?.tel_trab || "n.a"}
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Email</p>
                    <Input 
                      className="editable-field" 
                      name="email" 
                      value={cliente?.interno?.email || "n.a"}
                      onChange={() => {}}
                    />

                    <p className="pb-1 text-color text-semibold">Sitio WEB</p>
                    <Input 
                      className="editable-field" 
                      name="url" 
                      value={cliente?.interno?.url || "n.a"}
                      onChange={() => {}}
                    />
                    
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
