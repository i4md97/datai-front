import React, { useEffect, useState, useContext } from "react";

// Helpers
import PreaprobadoContext from "../../../context/preaprobados/PreaprobadoContext";

// Components
import { Card, CardBody, Row, Col, Button, Spinner } from "reactstrap";
import { 
  EtapaSolicitud,
  CustomDropdown
} from "../../../components";
import PdfHeader from "../../../components/PdfHeader/PdfHeader";

import { normativaOptions } from "../../../db/dropdownsOptions";
import { verificacion_normativa } from "../../../db/parametros";

export default function VerificacionNormativa({ animation, cedula, riesgo, pdf }) {
  const { changeStep } = useContext(PreaprobadoContext);
  const [isSaving, setIsSaving] = useState(false);

  const [programa, setPrograma] = useState("SBP MICRO CRÉDITO");
  const [producto, setProducto] = useState("CAPITAL DE INVERSION");
  const [data, setData] = useState({
    condiciones: [],
    interno: [],
    cic: [],
    buro: [],
  });

  const [referencias] = useState({
    interno: {
      riesgo_cumpl: ["NO TIENE", "Alertas Confirmadas", "Alertas Pendientes"],
      score_atraso: ["AA", "A", "B", "C", "D", "E", "N", "SW"],
      rango_atraso_dias: ["0 días", "1 - 30 días", "31 - 60 días", "61 - 90 días", "91 - 120 días", "120 días"],
      niv_riesgo: ["BAJO", "MEDIO", "ALTO", "ALTO NO VIABLE"],
      cat_riesgo: ["A1", "A2", "B1", "C1", "D", "E"],
    },
  });

  useEffect(() => {
    if (cedula) {
      /* setData({
        interno: Object.keys(cedula.internal_risks),
        cic: Object.keys(cedula.cic_risks),
      }); */
      const programFound = verificacion_normativa.find(item => item.programa === programa);
      // console.log(verificacion_normativa.map(item => item.programa));
      if (programFound) {
        setProducto(programFound.producto);
        setData({
          condiciones: programFound.condiciones,
          interno: programFound.internos,
          cic: programFound.cic,
          buro: programFound.buro,
          // condiciones: [],
          // interno: Object.keys(cedula.internal_risks),
          // cic: Object.keys(cedula.cic_risks),
        });
      }
    }
  }, [cedula, programa]);

  const dataCondiciones = [
    {title: "MONTO MÍNIMO", parameter: "", parameterValue: "", value: data?.condiciones?.MONTO_MINIMO},
    {title: "MONTO MÁXIMO", parameter: "", parameterValue: "", value: data?.condiciones?.MONTO_MAXIMO},
    {title: "TIPO TASA", parameter: "Tasa", parameterValue: data?.condiciones?.TIPO_DE_TASA, value: data?.condiciones?.TASA_TOTAL},
    {title: "FPP (Frecuencia Pago INT)", parameter: "Plazo", parameterValue: data?.condiciones?.PLAZO_MESES, value: data?.condiciones?.FPI_INT},
    {title: "FPP (Frecuencia Pago Principal)", parameter: "", parameterValue: "", value: data?.condiciones?.FPP_PRINC},
  ]

  const dataInternos = [
    {title: "Riesgo de Cumplimiento", politica: "{val}", value: data?.interno?.RIESGOS_DE_CUMPLIMIENTO || ""},
    {title: "Score de Atraso", politica: "{val}", value: data?.interno?.SCORE_DE_ATRASO || ""},
    {title: "Rango de Atraso", politica: "{val}", value: data?.interno?.RANGO_DE_ATRASO || ""},
    {title: "Dias de Atraso Máximo", politica: "{val}", value: data?.interno?.DIAS_DE_ATRASO || ""},
    {title: "Prorrogas Aplicadas", politica: "{val}", value: data?.interno?.PRORROGAS_APLICADAS || ""},
    {title: "Nivel de Riesgo", politica: "{val}", value: data?.interno?.NIVEL_DE_RIESGO || ""},
    {title: "Categoria de Riesgo", politica: "{val}", value: data?.interno?.CATEGORIA_DE_RIESGO || ""}
  ];

  const dataCIC = [
    {title: "Calificación Global CicNivel CHP", politica: "{val}", value: data?.cic?.NIVEL_CHP || ""},
    {title: "Puntaje CIC", politica: "{val}", value: data?.cic?.PUNTAJE_CIC || ""},
    {title: "Dias de Atraso en CIC", politica: "{val}", value: data?.cic?.DIAS_ATRASO_EN_CIC || ""},
    {title: "Nivel CHP SBD", politica: "{val}", value: data?.cic?.NIVEL_CHP_SBD || ""},
    {title: "Puntaje CIC SBD", politica: "{val}", value: data?.cic?.PUNTAJE_CIC_SBD || ""},
    {title: "Dias de Atraso CIC SBD", politica: "{val}", value: data?.cic?.DIAS_ATRASO_EN_CIC_SBD || ""},
    {title: "Operaciones con Estado > 1", politica: "{val}", value: data?.cic?.OPERACIONES_CON_ESTADO_1 || ""},
    {title: "Historial – Meses en CIC", politica: "{val}", value: data?.cic?.MESES_CONSULTADOS || ""}
  ]

  const dataBuro = [
    {title: "Juicios Activos", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Juicios_Act_Cantidad, monto_inmuebles: data?.buro?.Juicios_Act_Monto,},
    {title: "Referencias Comerciales", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Ref_Com_Cantidad, monto_inmuebles: data?.buro?.Ref_Com_Monto},{title: "Embargos Bienes Muebles", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Emb_B_Mueb_Cantidad, monto_inmuebles: data?.buro?.Emb_B_Mueb_Monto},
    {title: "Embargos Bienes INMuebles", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Emb_B_InMueb_Cantidad, monto_inmuebles: data?.buro?.Emb_B_InMueb_Monto},
    {title: "Juicios Históricos", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Ref_Com_Hist_Cantidad, monto_inmuebles: data?.buro?.Ref_Com_Hist_Monto},
    {title: "Referencias Comerciales Históricas", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Ref_Com_Hist_Cantidad, monto_inmuebles: data?.buro?.Ref_Com_Hist_Monto},
    {title: "Bienes Prendados", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Bienes_Prendados_Cantidad, monto_inmuebles: data?.buro?.Bienes_Prendados_Monto},
    {title: "Bienes Hipotecados", cantidad_muebles: "{val}", monto_muebles: "{val}", cantidad_inmuebles: data?.buro?.Bienes_Hipotecados_Cantidad, monto_inmuebles: data?.buro?.Bienes_Hipotecados_Monto}
  ]

  /* const dataIngresosImpuestos = [
    {title: "Monto Promedio", }
  ] */

  const labelImpuestosReportados = [
    [["Ingreso reportado útimos meses", "0", "₡0"], ["Patrono reportado", "NA"]],
    [["Impuestos reportados últimos meses", "12", "₡121,000"], ["Sociedad Reportada", "RESTAURANTE BRISAS"]]
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
                    defaultOption="Sleccionar"
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
                    defaultOption="Sleccionar"
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
                    <p>{buro.cantidad_muebles}</p>
                  </Col>
                  <Col xs={9}>
                    {/* <p className="mt-2">Política:</p> */}
                    <p className="total-stat">{buro.monto_muebles}</p>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs={3} className="text-center">
                    <p>{buro.cantidad_inmuebles}</p>
                  </Col>
                  <Col xs={9}>
                    <p className="total-stat">{buro.monto_inmuebles}</p>
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
        {labelImpuestosReportados.map((element, i) => {
          return (
            <Col sm={12} md={6} xl={6} key={`valoracion-card-${i}`}>
              <Card className="aesthetic-card yellow">
                <CardBody className="card-body card-error px-3 py-4">
                  <Row>
                    <Col xs={1} className="text-center">
                      <p>#</p>
                    </Col>
                    <Col sm={11}>
                      <div className="card__title mb-1">
                        <h5 className="text-semibold">Monto Promedio</h5>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pt-2">
                    <Col xs={1}>
                    </ Col>
                    <Col xs={11} className="pb-2">
                      {cedula && <p>{element[0][0]}</p>}
                    </Col>
                  </Row>
                  <Row className="pb-2 border-bottom align-items-center">
                    <Col xs={1} className="text-center">
                      {cedula && <p>{element[0][1]}</p>}
                    </Col>
                    <Col xs={11}>
                      {cedula && <p className="total-stat">{element[0][2]}</p>}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {cedula && <p className="mt-2"><b className="text-bold">{element[1][0]}</b>: {element[1][1]}</p>}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          );
        })}
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
