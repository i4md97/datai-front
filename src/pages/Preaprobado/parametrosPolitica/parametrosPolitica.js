import React, { useEffect, useState, useContext } from "react";

// Services
// import petition_get from "../../../utils/petitions/petition_get";
import petition_post from "../../../utils/petitions/petition_post";

// Components
import { Row, Col, Table, Spinner, Container, Card, CardBody } from "reactstrap";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import SizeSteps from "../../../components/SizeSteps/SizeSteps"
import styled from "styled-components";

//Context
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Styles
import "../Preaprobado.scss";

const SizeStep = styled.div`

th,
.font-card,
.dashboard__total-stat {
font-size: ${(props) => (props.size ? `${props.size}px` : `${props.size2}px`)} !important; 
}
th{
  font-size: 20px !important;
}
.form-cedula-input{
  min-height: 30px;
  height: auto !important;
}
`
export default function ParametrosPolitica({ modal, setModal, activeStep }) {

  const [riesgoCic, setRiesgoCic] = useState({
    id: "",
    calif_glob_cic: "",
    punt_cic: "",
    dias_atraso_cic: "",
    calif_glob_cic_sbd: "",
    punt_cic_sbd: "",
    dias_atraso_cic_sbd: "",
    oper_est_mayor_1: "",
  });

  toast.configure();

  const [riesgoInterno, setRiesgoInterno] = useState({});
  const [saveRiesgoCic, setSaveRiesgoCic] = useState({});
  const [saveRiesgoInterno, setSaveRiesgoInterno] = useState({});
  const [riesgoChange, setRiesgoChange] = useState({ cic: {}, interno: {} });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  const [activeSave, setActiveSave] = useState(false);

  const {
    sizeSteps, size,
    changeRiesgo,
    riesgo,
    escenarioPreeliminar: escenarioPreliminarContext,
    estructuraFinanciamiento: estructuraFinanciamientoContext,
    global: globalContext,
    changeEscenarioPreeliminar,
    changeEstructuraFinanciamiento,
    changeGlobal

  } = useContext(PreaprobadoContext);

  const { user } = useContext(UsuarioContext);

  const [escenarioPreliminar, setEscenarioPreliminar] = useState({
    mes_mto_max: "",
    ref_plazo: "",
    ref_tasa: "",
    sf_mto_max: "",
    tc_plazo: "",
    tc_tasa: "",
  });

  const [estructuraFinanciamiento, setEstructuraFinanciamiento] = useState({
    recalc_tasa: "",
    recalc_plazo: "",
  });

  const [global, setGlobal] = useState({
    sf_mto_max: "",
    mes_mto_max: "",
  })

  useEffect(() => {
    if (user) {
      const petitions = async () => {
        await petition_post("updateRiesgo", {
          body: { user: { ...user, can_save: false } },
        })
          .then((result) => {
            changeRiesgo({
              cic: result.data.params.cic,
              interno: result.data.params.interno,
            });
            setRiesgoInterno(result.data.params.interno);
            setRiesgoCic(result.data.params.cic);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      if (!riesgo.cic && !riesgo.interno) {
        petitions();
      } else {
        setRiesgoInterno(riesgo.interno);
        setRiesgoCic(riesgo.cic);
      }

      petition_post("escenario", {
        body: { user: { ...user, can_save: false } },
      })
        .then((result) => {


          setEscenarioPreliminar(result.data.params.escen);
          changeEscenarioPreeliminar({
            ...escenarioPreliminarContext,
            default: result.data.params.escen,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      petition_post("estructura", {
        body: { user: { ...user, can_save: false } },
      })
        .then((result) => {

          setEstructuraFinanciamiento(result.data.params.recalc)

          changeEstructuraFinanciamiento({
            ...estructuraFinanciamientoContext,
            default: result.data.params.recalc,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      petition_post("global", {
        body: { user: { ...user, can_save: false } },
      })
        .then((result) => {
          // console.log(result);
          setGlobal(result.data.params.glob)

          changeGlobal({
            ...globalContext,
            ...result.data.params.glob
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    setSaveRiesgoCic(riesgoCic);
    setSaveRiesgoInterno(riesgoInterno);
  }, [modal]);

  const onChangeRiesgoCic = (e) => {
    setActiveSave({ ...activeSave, normativas: true });
    setRiesgoCic({ ...riesgoCic, [e.target.name]: e.target.value });
    setRiesgoChange({
      ...riesgoChange,
      cic: { ...riesgoChange.cic, [e.target.name]: e.target.value },
    });
  };
  const onChangeRiesgoCicDecimal = (e) => {
    let min;
    if (e.target.name === "oper_est_mayor_1") {
      min = 0;
    } else {
      min = 1;
    }
    if (e.target.value >= min || e.target.value === "") {
      setActiveSave({ ...activeSave, normativas: true });

      setRiesgoCic({
        ...riesgoCic,
        [e.target.name]: parseFloat(e.target.value),
      });
      setRiesgoChange({
        ...riesgoChange,
        cic: {
          ...riesgoChange.cic,
          [e.target.name]: parseFloat(e.target.value),
        },
      });
    }
  };
  const onChangeRiesgoCicEntero = (e) => {

    if (e.target.value >= 1 || e.target.value === "") {
      setActiveSave({ ...activeSave, normativas: true });

      setRiesgoCic({ ...riesgoCic, [e.target.name]: parseInt(e.target.value) });
      setRiesgoChange({
        ...riesgoChange,
        cic: { ...riesgoChange.cic, [e.target.name]: parseInt(e.target.value) },
      });
    }
  };
  const onChangeRiesgoInternoEntero = (e) => {
    if (e.target.value >= 0 || e.target.value === "") {
      setActiveSave({ ...activeSave, normativas: true });

      setRiesgoInterno({
        ...riesgoInterno,
        [e.target.name]: parseInt(e.target.value),
      });
      setRiesgoChange({
        ...riesgoChange,
        interno: {
          ...riesgoChange.interno,
          [e.target.name]: parseInt(e.target.value),
        },
      });
    }
  };
  const onChangeRiesgoInterno = (e) => {
    setActiveSave({ ...activeSave, normativas: true });

    setRiesgoInterno({ ...riesgoInterno, [e.target.name]: e.target.value });

    setRiesgoChange({
      ...riesgoChange,
      interno: {
        ...riesgoChange.interno,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onChangeEscenarioPreeliminar = (e) => {
    setActiveSave({ ...activeSave, escenario: true });
    setEscenarioPreliminar({
      ...escenarioPreliminar,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEscenarioEstructuraFinanciamiento = (e) => {
    setActiveSave({ ...activeSave, estructura: true });
    setEstructuraFinanciamiento({
      ...estructuraFinanciamiento,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeGlobal = (e) => {
    setActiveSave({ ...activeSave, global: true });
    setGlobal({
      ...global,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (activeStep) => {
    if (activeStep === 2) {
      setLoading(true);
      petition_post("updateRiesgo", {
        body: { interno: { ...riesgoInterno }, cic: { ...riesgoCic }, user },
      })
        .then((result) => {

          setActiveSave({ ...activeSave, normativas: false });
          setLoading(false);
          toast.info("Nuevos Parámetros Guardados", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          changeRiesgo({
            ...riesgo,
            interno: { ...riesgoInterno },
            cic: { ...riesgoCic },
          });
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error al editar las Normas", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        });
    } else if (activeStep === 4) {
      setLoading2(true)
      const data = {
        mes_mto_max: parseFloat(escenarioPreliminar.mes_mto_max),
        ref_plazo: parseFloat(escenarioPreliminar.ref_plazo),
        ref_tasa: parseFloat(escenarioPreliminar.ref_tasa),
        sf_mto_max: parseFloat(escenarioPreliminar.sf_mto_max),
        tc_plazo: parseFloat(escenarioPreliminar.tc_plazo),
        tc_tasa: parseFloat(escenarioPreliminar.tc_tasa),
      };

      petition_post("escenario", {
        body: { user: { ...user }, escen: data },
      })
        .then((result) => {

          setActiveSave({ ...activeSave, escenario: false });
          setLoading2(false);
          toast.info("Nuevos Parámetros Guardados", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          changeEscenarioPreeliminar({
            ...escenarioPreliminarContext,
            default: data,
          });
        })
        .catch((error) => {
          setLoading2(false);
          toast.error("Error al editar las Normas", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        });
    }
    else if (activeStep === 6) {
      setLoading3(true)
      petition_post("estructura", {
        body: { user: { ...user }, recalc: estructuraFinanciamiento },
      })
        .then((result) => {

          setActiveSave({ ...activeSave, estructura: false });
          setLoading3(false);
          toast.info("Nuevos Parámetros Guardados", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          changeEstructuraFinanciamiento({
            ...estructuraFinanciamientoContext,
            default: estructuraFinanciamiento,
          });
        })
        .catch((error) => {
          setLoading3(false);
          toast.error("Error al editar las Normas", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        });
    }
    else if (activeStep === 0) {

      let globalCopy = global;
      globalCopy.sf_mto_max = parseFloat(globalCopy.sf_mto_max)
      globalCopy.mes_mto_max = parseFloat(globalCopy.mes_mto_max)
      globalCopy.tipo_cambio = parseFloat(globalCopy.tipo_cambio)
      setLoading4(true)
      petition_post("global", {
        body: { user: { ...user }, glob: globalCopy },
      })
        .then((result) => {

          setActiveSave({ ...activeSave, global: false });
          setLoading4(false);
          toast.info("Nuevos Parámetros Guardados", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          changeGlobal({
            ...globalContext,
            ...globalCopy

          });
        })
        .catch((error) => {
          setLoading4(false);
          toast.error("Error al editar los parametros globales", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        });
    }
  };

  return (<>


    <Container
      fluid={true}
      className={`dashboard parametros-politica step__cards px-0 px-md-3`}
    >
      <SizeStep size2={size} size={sizeSteps.ParametrosPolitica || null} >
        
        <Row className="pt-3">
          {/* <SizeSteps name="ParametrosPolitica" className="d-flex" /> */}
          <Col>
            <Card>
              <CardBody>
              <div>
                <h2>PARAMETROS GENERALES:</h2>
                <Table>
                  <tr>
                    <th className="pt-3 text-left">Monto Max (SF)</th>
                    <td>
                      <input
                        name="sf_mto_max"
                        value={global.sf_mto_max}
                        onChange={onChangeGlobal}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-3 text-left">Monto Max (Mes)</th>
                    <td>
                      <input
                        name="mes_mto_max"
                        value={global.mes_mto_max}
                        onChange={onChangeGlobal}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-3 text-left">Tipo de cambio</th>
                    <td>
                      <input
                        name="tipo_cambio"
                        value={global.tipo_cambio}
                        onChange={onChangeGlobal}
                        type="number"
                      />
                    </td>
                  </tr>
                </Table>
                <div className="w-100 text-right my-4 px-2">
                  <button
                    disabled={!activeSave.global || loading4}
                    className="form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
                    onClick={() => { handleSave(0) }}
                  >
                    {loading4 ? (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </div>
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>
                  <h2>VERIFICACIONDE NORMATIVAS:</h2>
                  <hr />
                  <h3>Interno</h3>
                  <Table className="w-100">
                    <tr>
                      <th className="pt-3 text-left">Riesgo de Cumplido</th>
                      <td>
                        {" "}
                        <select
                          name="riesgo_cumpl"
                          value={riesgoInterno.riesgo_cumpl}
                          onChange={onChangeRiesgoInterno}
                          id=""
                        >
                          <option value="NO TIENE">No Tiene</option>
                          <option value="Alertas Confirmadas">
                            Alertas Confirmadas
                          </option>
                          <option value="Alertas Pendientes">
                            Alertas Pendientes
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Score de Atraso</th>
                      <td>
                        {" "}
                        <select
                          name="score_atraso"
                          value={riesgoInterno.score_atraso}
                          onChange={onChangeRiesgoInterno}
                          id=""
                        >
                          <option value="AA">AA</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="N">N</option>
                          <option value="SW">SW</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Rango de Atraso</th>
                      <td>
                        {" "}
                        <select
                          name="rango_atraso_dias"
                          value={riesgoInterno.rango_atraso_dias}
                          onChange={onChangeRiesgoInterno}
                          id=""
                        >
                          <option value="0 días">0 dias</option>
                          <option value="1 - 30 días">1 - 30 dias</option>
                          <option value="31 - 60 días">31 - 60 dias</option>
                          <option value="61 - 90 días">61 - 91 dias</option>
                          <option value="91 - 120 días">91 -120 dias</option>
                          <option value="120 días">120 dias</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Dias de Atraso</th>
                      <td>
                        {" "}
                        <input
                          type="number"
                          name="dias_atraso"
                          value={riesgoInterno.dias_atraso}
                          onChange={onChangeRiesgoInternoEntero}
                          id=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Prorrogas Aplicadas</th>
                      <td>
                        {" "}
                        <input
                          type="number"
                          name="prorr_aplic"
                          value={riesgoInterno.prorr_aplic}
                          onChange={onChangeRiesgoInternoEntero}
                          id=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Nivel de Riesgo</th>
                      <td>
                        {" "}
                        <select
                          name="niv_riesgo"
                          value={riesgoInterno.niv_riesgo}
                          onChange={onChangeRiesgoInterno}
                          id=""
                        >
                          <option value="BAJO">BAJO</option>
                          <option value="MEDIO">MEDIO</option>
                          <option value="ALTO">ALTO</option>
                          <option value="ALTO NO VIABLE">ALTO NO VIABLE</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Categoria de Riesgo</th>
                      <td>
                        {" "}
                        <select
                          name="cat_riesgo"
                          value={riesgoInterno.cat_riesgo}
                          onChange={onChangeRiesgoInterno}
                          id=""
                        >
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                          <option value="C1">C1</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                        </select>
                      </td>
                    </tr>
                  </Table>
                  <hr />
                  <h3>CIC</h3>
                  <Table className="w-100">
                    <tr>
                      <th className="pt-3 text-left">Calificacion Global Cic</th>
                      <td>
                        {" "}
                        <select
                          name="calif_glob_cic"
                          value={riesgoCic.calif_glob_cic}
                          onChange={onChangeRiesgoCic}
                          id=""
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Puntaje Cic</th>
                      <td>
                        <input
                          name="punt_cic"
                          value={riesgoCic.punt_cic}
                          onChange={onChangeRiesgoCicDecimal}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Dias de Atraso en Cic</th>
                      <td>
                        <input
                          name="dias_atraso_cic"
                          value={riesgoCic.dias_atraso_cic}
                          onChange={onChangeRiesgoCicEntero}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">
                        Calificacion Global Cic Sbd
                      </th>
                      <td>
                        {" "}
                        <select
                          name="calif_glob_cic_sbd"
                          value={riesgoCic.calif_glob_cic_sbd}
                          onChange={onChangeRiesgoCic}
                          id=""
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Puntaje Cic Sbd</th>
                      <td>
                        <input
                          name="punt_cic_sbd"
                          value={riesgoCic.punt_cic_sbd}
                          onChange={onChangeRiesgoCicDecimal}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Dias de Atraso en Cic Sbd</th>
                      <td>
                        {" "}
                        <input
                          name="dias_atraso_cic_sbd"
                          value={riesgoCic.dias_atraso_cic_sbd}
                          onChange={onChangeRiesgoCicEntero}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">
                        Operaciones con Estado {`>`} 1
                      </th>
                      <td>
                        {" "}
                        <input
                          name="oper_est_mayor_1"
                          value={riesgoCic.oper_est_mayor_1}
                          onChange={onChangeRiesgoCicDecimal}
                          type="number"
                        />
                      </td>
                    </tr>
                  </Table>
                  <div className="w-100 text-right my-4 px-2">
                    <button
                      disabled={!activeSave.normativas || loading}
                      className="form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
                      onClick={() => { handleSave(2) }}
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
                        "Guardar"
                      )}
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
          <Card>
            <CardBody>
              <div>
                <h2>ESCENARIO PRELIMINAR:</h2>
                <Table>
                  <tr>
                    <th className="pt-3 text-left">Plazo de Refinanciamiento</th>
                    <td>
                      <input
                        name="ref_plazo"
                        value={escenarioPreliminar.ref_plazo}
                        onChange={onChangeEscenarioPreeliminar}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-3 text-left">Tasa de Refinanciamiento</th>
                    <td>
                      <input
                        name="ref_tasa"
                        value={escenarioPreliminar.ref_tasa}
                        onChange={onChangeEscenarioPreeliminar}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-3 text-left">TC Tasa</th>
                    <td>
                      <input
                        name="tc_tasa"
                        value={escenarioPreliminar.tc_tasa}
                        onChange={onChangeEscenarioPreeliminar}
                        type="number"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-3 text-left">TC Plazo</th>
                    <td>
                      <input
                        name="tc_plazo"
                        value={escenarioPreliminar.tc_plazo}
                        onChange={onChangeEscenarioPreeliminar}
                        type="number"
                      />
                    </td>
                  </tr>
                </Table>

                <div className="w-100 text-right my-4 px-2">
                  <button
                    disabled={!activeSave.escenario || loading2}
                    className="form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
                    onClick={() => { handleSave(4) }}
                  >
                    {loading2 ? (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </div>
                
              </div>
            </CardBody>
          </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <div>
                  <h2>ESTRUCTURA DE FINANCIAMIENTO:</h2>
                  <Table>
                    <tr>
                      <th className="pt-3 text-left">Tasa para Disponible</th>
                      <td>
                        <input
                          name="recalc_tasa"
                          value={estructuraFinanciamiento.recalc_tasa}
                          onChange={onChangeEscenarioEstructuraFinanciamiento}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="pt-3 text-left">Plazo para Disponible</th>
                      <td>
                        <input
                          name="recalc_plazo"
                          value={estructuraFinanciamiento.recalc_plazo}
                          onChange={onChangeEscenarioEstructuraFinanciamiento}
                          type="number"
                        />
                      </td>
                    </tr>
                  </Table>

                  <div className="w-100 text-right my-4 px-2">
                    <button
                      disabled={!activeSave.estructura || loading3}
                      className="form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
                      onClick={() => { handleSave(6) }}
                    >
                      {loading3 ? (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        "Guardar"
                      )}
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </SizeStep>
    </Container>
  </>)
}
