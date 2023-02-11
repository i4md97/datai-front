import React, { useEffect, useState, useContext } from "react";
import { Modal, ModalBody, ModalFooter, Table, Spinner } from "reactstrap";
import petition_get from "../../../utils/petitions/petition_get";
import petition_post from "../../../utils/petitions/petition_post";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Context
import UsuarioContext from "../../../context/usuario/UsuarioContext";
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";
export default function MensajeModal({ modal, setModal, activeStep }) {
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

  const [activeSave, setActiveSave] = useState(false);

  const {
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

  const [global,setGlobal] = useState({
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
          //  console.log(result);
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
    setActiveSave(true);
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
      setActiveSave(true);

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
    // console.log(riesgo);
    if (e.target.value >= 1 || e.target.value === "") {
      setActiveSave(true);

      setRiesgoCic({ ...riesgoCic, [e.target.name]: parseInt(e.target.value) });
      setRiesgoChange({
        ...riesgoChange,
        cic: { ...riesgoChange.cic, [e.target.name]: parseInt(e.target.value) },
      });
    }
  };
  const onChangeRiesgoInternoEntero = (e) => {
    if (e.target.value >= 0 || e.target.value === "") {
      setActiveSave(true);

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
    setActiveSave(true);

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
    setActiveSave(true);
    setEscenarioPreliminar({
      ...escenarioPreliminar,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeEscenarioEstructuraFinanciamiento = (e) => {
    setActiveSave(true);
    setEstructuraFinanciamiento({
      ...estructuraFinanciamiento,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeGlobal = (e) => {
    setActiveSave(true);
    setGlobal({
      ...global,
      [e.target.name]: e.target.value,
    });
  };

const handleSave = () => {
    setLoading(true);
    if (activeStep === 2) {
      petition_post("updateRiesgo", {
        body: { interno: { ...riesgoInterno }, cic: { ...riesgoCic }, user },
      })
        .then((result) => {
          setModal(false);
          setActiveSave(false);
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
          setModal(false);
          setActiveSave(false);
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

          changeEscenarioPreeliminar({
            ...escenarioPreliminarContext,
            default: data,
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
    }
    else if(activeStep === 6 ){
      petition_post("estructura", {
        body: { user: { ...user }, recalc: estructuraFinanciamiento },
      })
        .then((result) => {
          setModal(false);
          setActiveSave(false);
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

          changeEstructuraFinanciamiento({
            ...estructuraFinanciamientoContext,
            default: estructuraFinanciamiento,
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
    }
    else if(activeStep === 0 ){

      let globalCopy = global;
      globalCopy.sf_mto_max = parseFloat(globalCopy.sf_mto_max)
      globalCopy.mes_mto_max = parseFloat(globalCopy.mes_mto_max)
      globalCopy.tipo_cambio = parseFloat(globalCopy.tipo_cambio)

      petition_post("global", {
        body: { user: { ...user }, glob: globalCopy },
      })
        .then((result) => {
          setModal(false);
          setActiveSave(false);
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

          changeGlobal({
            ...globalContext,
            ...globalCopy
            
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
    }
  };

  return (
    <Modal centered size={activeStep === 2 ? "xl" : "lg" } isOpen={modal}>
      <ModalBody>
        {activeStep === 0 && <div className="row" style={{ justifyContent: "space-around" }}>
            <Table className="col-12 col-lg-10 ">
              <thead className="bg-theme">
                <tr style={{ border: "2px solid #239dda" }}>
                  <td className="text-left">Parametros globales</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
              
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Monto Max (SF)</th>
                  <th>
                    <input
                       name="sf_mto_max"
                      value={global.sf_mto_max}
                      onChange={onChangeGlobal} 
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Monto Max (Mes)</th>
                  <th>
                    <input
                       name="mes_mto_max"
                      value={global.mes_mto_max}
                      onChange={onChangeGlobal} 
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Tipo de cambio</th>
                  <th>
                    <input
                       name="tipo_cambio"
                      value={global.tipo_cambio}
                      onChange={onChangeGlobal} 
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
              </tbody>
            </Table>
            
          </div> }
        {activeStep === 2 && (
          <div className="row" style={{ justifyContent: "space-around" }}>
            <Table className="col-12 col-lg-5">
              <thead className="bg-theme">
                <tr style={{ border: "2px solid #239dda" }}>
                  <td className="text-left">Interno</td>
                  <td>Nivel Maximo Permitido (Politica)</td>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Riesgo Cumplido</th>
                  <th>
                    {" "}
                    <select
                      name="riesgo_cumpl"
                      value={riesgoInterno.riesgo_cumpl}
                      onChange={onChangeRiesgoInterno}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
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
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Score de Atraso</th>
                  <th>
                    {" "}
                    <select
                      name="score_atraso"
                      value={riesgoInterno.score_atraso}
                      onChange={onChangeRiesgoInterno}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
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
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Rango de Atraso</th>
                  <th>
                    {" "}
                    <select
                      name="rango_atraso_dias"
                      value={riesgoInterno.rango_atraso_dias}
                      onChange={onChangeRiesgoInterno}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    >
                      <option value="0 días">0 dias</option>
                      <option value="1 - 30 días">1 - 30 dias</option>
                      <option value="31 - 60 días">31 - 60 dias</option>
                      <option value="61 - 90 días">61 - 91 dias</option>
                      <option value="91 - 120 días">91 -120 dias</option>
                      <option value="120 días">120 dias</option>
                    </select>
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Dias de Atraso</th>
                  <th>
                    {" "}
                    <input
                      type="number"
                      name="dias_atraso"
                      value={riesgoInterno.dias_atraso}
                      onChange={onChangeRiesgoInternoEntero}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Prorrogas Aplicadas</th>
                  <th>
                    {" "}
                    <input
                      type="number"
                      name="prorr_aplic"
                      value={riesgoInterno.prorr_aplic}
                      onChange={onChangeRiesgoInternoEntero}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Nivel de Riesgo</th>
                  <th>
                    {" "}
                    <select
                      name="niv_riesgo"
                      value={riesgoInterno.niv_riesgo}
                      onChange={onChangeRiesgoInterno}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    >
                      <option value="BAJO">BAJO</option>
                      <option value="MEDIO">MEDIO</option>
                      <option value="ALTO">ALTO</option>
                      <option value="ALTO NO VIABLE">ALTO NO VIABLE</option>
                    </select>
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Categoria de Riesgo</th>
                  <th>
                    {" "}
                    <select
                      name="cat_riesgo"
                      value={riesgoInterno.cat_riesgo}
                      onChange={onChangeRiesgoInterno}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="C1">C1</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </select>
                  </th>
                </tr>
              </tbody>
            </Table>
            <Table className="col-12 col-lg-5">
              <thead className="bg-theme">
                <tr style={{ border: "2px solid #239dda" }}>
                  <td className="text-left">CIC</td>
                  <td>Nivel Maximo Permitido (Politica)</td>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Calificacion Global Cic</th>
                  <th>
                    {" "}
                    <select
                      name="calif_glob_cic"
                      value={riesgoCic.calif_glob_cic}
                      onChange={onChangeRiesgoCic}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Puntaje Cic</th>
                  <th>
                    <input
                      name="punt_cic"
                      value={riesgoCic.punt_cic}
                      onChange={onChangeRiesgoCicDecimal}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Dias de Atraso en Cic</th>
                  <th>
                    <input
                      name="dias_atraso_cic"
                      value={riesgoCic.dias_atraso_cic}
                      onChange={onChangeRiesgoCicEntero}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">
                    Calificacion Global Cic Sbd
                  </th>
                  <th>
                    {" "}
                    <select
                      name=""
                      name="calif_glob_cic_sbd"
                      value={riesgoCic.calif_glob_cic_sbd}
                      onChange={onChangeRiesgoCic}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      id=""
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Puntaje Cic Sbd</th>
                  <th>
                    <input
                      name="punt_cic_sbd"
                      value={riesgoCic.punt_cic_sbd}
                      onChange={onChangeRiesgoCicDecimal}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Dias de Atraso en Cic Sbd</th>
                  <th>
                    {" "}
                    <input
                      name="dias_atraso_cic_sbd"
                      value={riesgoCic.dias_atraso_cic_sbd}
                      onChange={onChangeRiesgoCicEntero}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">
                    Operaciones con Estado {`>`} 1
                  </th>
                  <th>
                    {" "}
                    <input
                      name="oper_est_mayor_1"
                      value={riesgoCic.oper_est_mayor_1}
                      onChange={onChangeRiesgoCicDecimal}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                {/*  <tr style={{border:"2px solid #e0e0e0"}}>
              <th className="pt-3 text-left"  >Historia Crediticio (Meses de Actividad)</th>
              <th> <input name="id" value={riesgoCic.id} onChange={onChangeRiesgoCicDecimal}  className="form-cedula-input p-0 m-0 pl-2" style={{ height: "30px" }}  type="number"/></th>
            </tr> */}
              </tbody>
            </Table>
          </div>
        )}

        {activeStep === 4 && (
          <div className="row" style={{ justifyContent: "space-around" }}>
            <Table className="col-12 col-lg-10">
              <thead className="bg-theme">
                <tr style={{ border: "2px solid #239dda" }}>
                  <td className="text-left">Escenario Preliminar</td>
                  <td>Parametros Pre Establecidos</td>
                </tr>
              </thead>
              <tbody>
               {/*  <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Monto Max (Mes)</th>
                  <th>
                    <input
                      name="mes_mto_max"
                      value={escenarioPreliminar.mes_mto_max}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Monto Max (SF)</th>
                  <th>
                    <input
                      name="sf_mto_max"
                      value={escenarioPreliminar.sf_mto_max}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr> */}
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Plazo de Refinanciamiento</th>
                  <th>
                    <input
                      name="ref_plazo"
                      value={escenarioPreliminar.ref_plazo}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Tasa de Refinanciamiento</th>
                  <th>
                    <input
                      name="ref_tasa"
                      value={escenarioPreliminar.ref_tasa}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">TC Tasa</th>
                  <th>
                    <input
                      name="tc_tasa"
                      value={escenarioPreliminar.tc_tasa}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">TC Plazo</th>
                  <th>
                    <input
                      name="tc_plazo"
                      value={escenarioPreliminar.tc_plazo}
                      onChange={onChangeEscenarioPreeliminar}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        {activeStep === 6 &&     <div className="row" style={{ justifyContent: "space-around" }}>
            <Table className="col-12 col-lg-10">
              <thead className="bg-theme">
                <tr style={{ border: "2px solid #239dda" }}>
                  <td className="text-left">Estructura de Financiamiento</td>
                  <td>Parametros Pre Establecidos</td>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Tasa para Disponible</th>
                  <th>
                    <input
                      name="recalc_tasa"
                      value={estructuraFinanciamiento.recalc_tasa}
                      onChange={onChangeEscenarioEstructuraFinanciamiento}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
                <tr style={{ border: "2px solid #e0e0e0" }}>
                  <th className="pt-3 text-left">Plazo para Disponible</th>
                  <th>
                    <input
                      name="recalc_tasa"
                      value={estructuraFinanciamiento.recalc_plazo}
                      onChange={onChangeEscenarioEstructuraFinanciamiento}
                      className="form-cedula-input p-0 m-0 pl-2"
                      style={{ height: "30px" }}
                      type="number"
                    />
                  </th>
                </tr>
              </tbody>
            </Table>
          </div> }
      </ModalBody>
      <ModalFooter
        className=" row m-0"
        style={{ justifyContent: "space-around" }}
      >
        <button
          className=" form-cedula-submit col-12 col-md-5 m-0 btn-modal"
          style={{ width: "49%" }}
          color="secondary"
          onClick={() => {
            setModal(false);
            setActiveSave(false);
            setRiesgoCic(saveRiesgoCic);
            setRiesgoInterno(saveRiesgoInterno);
          }}
        >
          Cerrar
        </button>
        <button
          disabled={!activeSave || loading}
          className=" form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
          style={{ width: "50%" }}
          onClick={handleSave}
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
            "Guardar y cerrar"
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}
