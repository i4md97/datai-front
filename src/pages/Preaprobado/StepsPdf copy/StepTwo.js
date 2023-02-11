import React from "react";
import {Container, Card, CardBody, Row, Col, Spinner} from "reactstrap";

export default function StepTwo({
  animation,
  inputCedula,
  setInputCedula,
  handleChange,
  cedula,
  loading,
}) {
  return (
    <Container
      fluid={true}
      className={`dashboard step__cards ${animation && "step__animation"}`}
    >
      <Card>
        <CardBody style={{boxShadow: "none"}} className="p-0 m-lg-0 row ">
          <Col className="col-12 p-0 mt-5"></Col>

          {/*    <Col className="col-lg-3 col-12  p-3 text-left">
         
        <div  className=" d-flex d-lg-block "> 
        <label className="text-center general-title" htmlFor="cedula" style={{fontSize:"14px",fontWeight:"400",display:"flex",width:"100%", alignItems:"center"}}>
            IDENTIFICACION:
            </label>
         
             <select
              value={inputCedula}
              onChange={(e) => {
                setInputCedula(e.target.value);
              }}
              type="number"
              id="cedula"
              placeholder="Ejem: 123123123"
              className={`form-cedula-input text-center  mt-0  ml-3 ml-lg-0`}
   
            >
              <option value=""> Select One </option>
              <option value="103910662">103910662</option>
              <option value="104590717">104590717</option>
              <option value="104750358">104750358</option>
              <option value="106750650">106750650</option>
              <option value="109240535">109240535</option>
              <option value="109360295">109360295</option>
              <option value="109410345">109410345</option>
              <option value="111790700">111790700</option>
              <option value="111900307">111900307</option>
              <option value="113200298">113200298</option>
              <option value="115190434">115190434</option>
              <option value="117040688">117040688</option>
              <option value="205410466">205410466</option>
              <option value="501110220">501110220</option>
              <option value="503310324">503310324</option>
              <option value="503890573">503890573</option>
              <option value="601360527">601360527</option>
              <option value="701780308">701780308</option>
              <option value="702220974">702220974</option>
              <option value="900440528">900440528</option>
          </select>
          
        </div>


        
          <button
              disabled={loading}
              onClick={handleChange}
              type="submit"
              className="form-cedula-submit "
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
                "CONSULTAR"
              )}
            </button>
             <hr className="d-md-none"/>
        </Col> */}
          <Col className="col-lg-12 col-12 ">
            <Row>
              <Col className="col-12 col-md-6 p-3 border-right-custom ">
                <h4
                  className=" page-title color__background m-0 mb-2 pl-2 "
                  style={{fontSize: "1.3rem"}}
                >
                  INFORMACION PERSONAL
                </h4>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">NOMBRE COMPLETO:</h5>
                  <p className="  dashboard__total-stat border-content">
                    {cedula && (cedula.personal_data.nom_compl || "n.a")}
                  </p>
                </div>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">
                    TIPO DE IDENTIFICACION:
                  </h5>{" "}
                  <p className="  dashboard__total-stat  border-content">
                    {cedula && (cedula.personal_data.tipo_id || "n.a")}
                  </p>
                </div>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">CEDULA:</h5>
                  <p className="  dashboard__total-stat  border-content">
                    {cedula && (cedula.cedula || "n.a")}
                  </p>
                </div>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">CODIGO DE CLIENTE:</h5>
                  <p className="  dashboard__total-stat border-content ">
                    {cedula && (cedula.personal_data.cod_asoc || "n.a")}
                  </p>
                </div>
                <div
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                  className="card__title h-auto  text-left"
                >
                  <h5 className=" text-left">EMAIL:</h5>
                  <p className="  dashboard__total-stat border-content ">
                    {cedula && (cedula.personal_data.email_pers || "n.a")}
                  </p>
                </div>
                <div
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                  className="card__title h-auto  text-left"
                >
                  <h5 className=" text-left">TELEFONOS:</h5>
                  <p className="  dashboard__total-stat  border-content">
                    {cedula && (cedula.personal_data.telefs || "n.a")}
                  </p>
                </div>
                <hr className="d-md-none" />
              </Col>

              <Col className="col-12 col-md-6  p-3 pb-lg-0">
                <h4
                  className=" color__background page-title m-0 mb-2 pl-2"
                  style={{fontSize: "1.3rem"}}
                >
                  SEGMENTOS
                </h4>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">SEGMENTO:</h5>
                  <p className="  dashboard__total-stat border-content">
                    {cedula && (cedula.personal_data.segm || "n.a")}
                  </p>
                </div>
                <div
                  className="card__title h-auto "
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                >
                  <h5 className="text-left">SUBSEGMENTO:</h5>
                  <p className="  dashboard__total-stat border-content">
                    {cedula && (cedula.personal_data.subseg || "n.a")}
                  </p>
                </div>
                <div
                  style={{paddingLeft: "1rem", margin: "0 auto"}}
                  className="card__title h-auto  text-left"
                >
                  <h5 className=" text-left">
                    PERFIL SOCIOECONOMICO"
                  </h5>
                  <p className="  dashboard__total-stat border-content">
                    {cedula &&
                      (cedula.personal_data.perf_socioecon.map(
                        (element, i) =>
                          `${element}${
                            i + 1 !== cedula.personal_data.perf_socioecon.length
                              ? ", "
                              : ""
                          }`
                      ) ||
                        "n.a")}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </CardBody>
      </Card>
    </Container>
  );
}
