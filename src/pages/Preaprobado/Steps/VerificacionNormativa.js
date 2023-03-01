import React, { useEffect, useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Card, CardBody, Row, Col, Button, Spinner } from "reactstrap";
import { 
  EtapaSolicitud,
  CustomDropdown
} from "../../../components";

import { normativaOptions } from "../../../db/dropdownsOptions";
import { verificacion_normativa } from "../../../db/parametros";
import { db_interna } from "../../../db/db_interna";
import { db_cic } from "../../../db/db_cic";
import { db_buro } from "../../../db/db_buro";

export default function VerificacionNormativa({ animation, cedula, riesgo, pdf }) {
  const { changeStep } = useContext(PreaprobadoContext);
  const [isSaving, setIsSaving] = useState(false);

  const [programa, setPrograma] = useState("SBP MICRO CRÉDITO");
  const [producto, setProducto] = useState("CAPITAL DE INVERSION");
  const [data, setData] = useState({
    condiciones: {},
    interno: {},
    cic: {},
    buro: {},
    interno_int: {},
    cic_int: {},
    buro_int: {},
  });

  useEffect(() => {
    if (cedula) {
      const programFound = verificacion_normativa.find(item => item.programa === programa);
      const dbInternaFound =  db_interna.find(id => id.no_identif === cedula.personal_data.tipo_id);
      const dbCICFound =  db_cic.find(id => id.no_identif === cedula.personal_data.tipo_id);
      const dbBuroFound = db_buro.find(id => id.no_identif === cedula.personal_data.tipo_id);
      if (programFound) {
        setProducto(programFound.producto);
        setData({
          condiciones: programFound.condiciones,
          interno: programFound.internos,
          cic: programFound.cic,
          buro: programFound.buro,
        });
      }
      if (dbInternaFound) {
        setData(prev => ({...prev, interno_int: dbInternaFound}));
      };
      if (dbCICFound) {
        setData(prev => ({...prev, cic_int: dbCICFound}));
      };
      if (dbBuroFound) {
        setData(prev => ({...prev, buro_int: dbBuroFound}));
      };
    }
  }, [cedula, programa]);

  const dataCondiciones = [
    {title: "MONTO MÍNIMO", parameter: "", parameterValue: "", value: data.condiciones.MONTO_MINIMO},
    {title: "MONTO MÁXIMO", parameter: "", parameterValue: "", value: data.condiciones.MONTO_MAXIMO},
    {title: "TIPO TASA", parameter: "Tasa", parameterValue: data.condiciones.TIPO_DE_TASA, value: data.condiciones.TASA_TOTAL},
    {title: "FPP (Frecuencia Pago INT)", parameter: "Plazo", parameterValue: data.condiciones.PLAZO_MESES, value: data.condiciones.FPI_INT},
    {title: "FPP (Frecuencia Pago Principal)", parameter: "", parameterValue: "", value: data.condiciones.FPP_PRINC},
  ];

  const dataInternos = [
    {title: "Riesgo de Cumplimiento", politica: data.interno_int.riesgo_cumplimiento, value: data.interno.RIESGOS_DE_CUMPLIMIENTO},
    {title: "Score de Atraso", politica: data.interno_int.score_atraso, value: data.interno.SCORE_DE_ATRASO},
    {title: "Rango de Atraso", politica: data.interno_int.rango_atraso, value: data.interno.RANGO_DE_ATRASO},
    {title: "Dias de Atraso Máximo", politica: data.interno_int.dias_atraso_max, value: data.interno.DIAS_DE_ATRASO},
    {title: "Prorrogas Aplicadas", politica: data.interno_int.prorrogas_aplicadas, value: data.interno.PRORROGAS_APLICADAS},
    {title: "Nivel de Riesgo", politica: data.interno_int.nivel_riesgo, value: data.interno.NIVEL_DE_RIESGO},
    {title: "Categoria de Riesgo", politica: data.interno_int.categoria_riesgo, value: data.interno.CATEGORIA_DE_RIESGO}
  ];

  const dataCIC = [
    {title: "Calificación Global CicNivel CHP", politica: data.cic_int.nivel_chp, value: data?.cic?.NIVEL_CHP},
    {title: "Puntaje CIC", politica: data.cic_int.puntaje, value: data?.cic?.PUNTAJE_CIC},
    {title: "Dias de Atraso en CIC", politica: data.cic_int.dias_atraso_max, value: data?.cic?.DIAS_ATRASO_EN_CIC},
    {title: "Nivel CHP SBD", politica: data.cic_int.nivel_chp_sbd, value: data?.cic?.NIVEL_CHP_SBD},
    {title: "Puntaje CIC SBD", politica: data.cic_int.puntaje_sbd, value: data?.cic?.PUNTAJE_CIC_SBD},
    {title: "Dias de Atraso CIC SBD", politica: data.cic_int.dias_atraso_max_sbd, value: data?.cic?.DIAS_ATRASO_EN_CIC_SBD},
    {title: "Operaciones con Estado > 1", politica: data.cic_int.operacions_con_estado_1, value: data?.cic?.OPERACIONES_CON_ESTADO_1},
    {title: "Historial – Meses en CIC", politica: data.cic_int.meses_contados, value: data?.cic?.MESES_CONSULTADOS}
  ];

  const dataBuro = [
    {title: "Juicios Activos", cantidad1: data.buro_int.cantidad_juicios_activos, monto1: data.buro_int.monto_juicios_activos, cantidad2: data.buro.Juicios_Act_Cantidad, monto2: data.buro.Juicios_Act_Monto,},
    {title: "Referencias Comerciales", cantidad1: data.buro_int.cantidad_referencias_comerciales, monto1: data.buro_int.monto_referencias_comerciales, cantidad2: data.buro.Ref_Com_Cantidad, monto2: data.buro.Ref_Com_Monto},
    {title: "Embargos Bienes Muebles", cantidad1: data.buro_int.cantidad_embargo_muebles, monto1: data.buro_int.monto_embargo_muebles, cantidad2: data.buro.Emb_B_Mueb_Cantidad, monto2: data.buro.Emb_B_Mueb_Monto},
    {title: "Embargos Bienes INMuebles", cantidad1: data.buro_int.cantidad_embargo_inmuebles, monto1: data.buro_int.monto_embargo_inmuebles, cantidad2: data.buro.Emb_B_InMueb_Cantidad, monto2: data.buro.Emb_B_InMueb_Monto},
    {title: "Juicios Históricos", cantidad1: data.buro_int.cantidad_juicios_historicos, monto1: data.buro_int.monto_juicios_historicos, cantidad2: data.buro.Ref_Com_Hist_Cantidad, monto2: data.buro.Ref_Com_Hist_Monto},
    {title: "Referencias Comerciales Históricas", cantidad1: data.buro_int.cantidad_referencias_comerciales_hist, monto1: data.buro_int.monto_referencias_comerciales_hist, cantidad2: data.buro.Ref_Com_Hist_Cantidad, monto2: data.buro.Ref_Com_Hist_Monto},
    {title: "Bienes Prendados", cantidad1: data.buro_int.cantidad_bienes_prendados, monto1: data.buro_int.monto_bienes_prendados, cantidad2: data.buro.Bienes_Prendados_Cantidad, monto2: data.buro.Bienes_Prendados_Monto},
    {title: "Bienes Hipotecados", cantidad1: data.buro_int.cantidad_bienes_hipotecados, monto1: data.buro_int.montos_bienes_hipotecados, cantidad2: data.buro.Bienes_Hipotecados_Cantidad, monto2: data.buro.Bienes_Hipotecados_Monto}
  ];

  const dataIngresosImpuestos = [
    {title: "Monto Promedio", label: "Ingreso reportado útimos meses", meses: data.buro_int.meses_salario, monto: data.buro_int.salario_promedio, label2: "Patrono reportado", value2: data.buro_int.empresa},
    {title: "Monto Promedio", label: "Impuestos reportados últimos meses", meses: data.buro_int.meses_impuestos, monto: data.buro_int.impuesto_promedio, label2: "Sociedad Reportada", value2: data.buro_int.empresa_2},
  ];

  const programChangeHandler = (value) => {
    setPrograma(value);
  }

  const saveAndContinueHandler = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      changeStep(3);
    }, 1500);
  }

  return (
    <div className={`dashboard verificacion-normativa py-3 step__cards ${animation && !pdf && "step__animation"}`}>
      <Row className="pt-4 justify-content-center">
        <Col sm={12}>
          <Card>
            <CardBody>
              <Row>
                <Col sm={6}>
                  <label className="text-center general-title text-bold">PROGRAMA APLICABLE</label>
                  <CustomDropdown 
                    className="w-100" 
                    classNameButton="bg-light"
                    defaultOption="Seleccionar"
                    selectedOption="SBP MICRO CRÉDITO"
                    options={normativaOptions.creditoOptions}
                    callback={programChangeHandler}
                  />
                </Col>
                <Col sm={6}>
                  <label className="text-center general-title text-bold">PRODUCTO APLICABLE</label>
                  <p>{producto}</p>
                  {/* <CustomDropdown 
                    className="w-100" 
                    classNameButton="bg-light"
                    defaultOption="Seleccionar"
                    selectedOption={"CAPITAL DE TRABAJO"}
                    options={normativaOptions.capitalOptions}
                  /> */}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {dataCondiciones.map(((condicion, i) => 
          <Col sm={12} md={6} xl={3} key={`vn-condicion-card-${i}`}>
            <Card className="aesthetic-card green">
              <CardBody className="card-body card-error px-3 py-4">
                <div className="card__title my-2">
                  <h5 className="text-semibold">{condicion.title}</h5>
                </div>
                {condicion.parameter 
                  ? <p className="mb-0">{condicion.parameter}: {condicion.parameterValue}</p>
                  : <p className="mb-0">&nbsp;</p>
                }
                {cedula && <p className="total-stat text-center">{condicion.value}</p>}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="pt-4">
        <Col>
          <h4 className="page-title general-title">INDICADORES INTERNOS</h4>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {dataInternos.map(((interno, i) => 
          <Col sm={12} md={6} xl={3} key={`vn-card-interno-${i}`}>
            <Card className="aesthetic-card green">
              <CardBody
                className={`card-body "card-confirm"`}
              >
                <div className="card__title mb-1">
                  <h5 className="text-semibold">{interno.title}</h5>
                </div>
                <p className="mt-2">Política: {interno.politica}</p>
                <p className="total-stat text-center">
                  {interno.value}
                </p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row>
        <Col>
          <h4 className="page-title general-title">INDICADORES EXTERNOS CIC</h4>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {dataCIC.map(((cic, i) => 
          <Col sm={12} md={6} xl={3} key={`vn-card-interno-${i}`}>
            <Card className="aesthetic-card yellow">
              <CardBody
                className={`card-body "card-confirm"`}
              >
                <div className="card__title mb-1">
                  <h5 className="text-semibold">{cic.title}</h5>
                </div>
                <p className="mt-2">Política: {cic.politica}</p>
                <p className="total-stat text-center">
                  {cic.value}
                </p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row>
        <Col>
            <h4 className="page-title pt-0 general-title">INDICADORES EXTERNOS BURÓ</h4>
            <hr/>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {dataBuro.map((buro, i) => 
          <Col sm={12} md={6} xl={pdf ? 4 : 3} key={`valoracion-card-${i}`}>
            <Card className="aesthetic-card green">
              <CardBody className="card-body card-error px-3 py-4">
                <Row className="pb-2">
                  <Col xs={3} className="text-center">
                    <p>#</p>
                  </Col>
                  <Col xs={9}>
                    <div className="card__title mb-2">
                      {<h5 className="text-semibold">{buro.title}</h5>}
                    </div>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs={3} className="text-center">
                    <p>{buro.cantidad1}</p>
                  </Col>
                  <Col xs={9}>
                    {/* <p className="mt-2">Política:</p> */}
                    <p className="total-stat">{buro.monto1}</p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs={3} className="text-center">
                    <p>{buro.cantidad2}</p>
                  </Col>
                  <Col xs={9}>
                    <p className="total-stat">{buro.monto2}</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      <Row>
        <Col>
            <h4 className="page-title pt-0 general-title">Ingresos e impuestos reportados según BURÓ</h4>
            <hr/>
        </Col>
      </Row>
      <Row className="justify-content-start">
        {dataIngresosImpuestos.map((buro, i) => 
          <Col sm={12} md={6} xl={6} key={`vn-ingreso-impuesto-card-${i}`}>
            <Card className="aesthetic-card yellow">
              <CardBody className="card-body card-error px-3 py-4">
                <Row>
                  <Col xs={1} className="text-center">
                    <p>#</p>
                  </Col>
                  <Col sm={11}>
                    <div className="card__title mb-1">
                      <h5 className="text-semibold">{buro.title}</h5>
                    </div>
                  </Col>
                </Row>
                <Row className="pt-2">
                  <Col xs={1}>
                  </ Col>
                  <Col xs={11} className="pb-2">
                    <p>{buro.label}</p>
                  </Col>
                </Row>
                <Row className="pb-2 border-bottom align-items-center">
                  <Col xs={1} className="text-center">
                    <p>{buro.meses}</p>
                  </Col>
                  <Col xs={11}>
                    <p className="total-stat">{buro.monto}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="mt-2"><b className="text-bold">{buro.label2}</b>: {buro.value2}</p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
      
      <Row>
        <Col>
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
