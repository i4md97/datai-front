import React, { useState } from "react";

// Components
import { useFormik } from "formik";
import { Row, Col, Card, CardBody, Button, Spinner  } from "reactstrap";
import { toast } from "react-toastify";
import CustomInput from "../../components/CustomInput/CustomInput";

// Helpers
import * as yup from "yup";
import petition_post from "../../utils/petitions/petition_post"

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./NuevosProspectos.scss";

const NuevosProspectos = () => {

  const [activeCheck, setActiveCheck] = useState(false);
  const [dataValue, setDataValue] = useState(null);
  const [loading, setLoading] = useState(false);

  toast.configure();

  const data = [
    { title: "Identificación", value: "identificacion" },
    { title: "Sexo", value: "sexo" },
    { title: "Edad", value: "edad" },
    { title: "Estado Civil", value: "estadoCivil" },
    { title: "Nivel Académico", value: "nivelProfesional" },
    { title: "Total de Hijos", value: "cantidadHijos" },
    { title: "Nivel Salarial", value: "nivelSalarial" },
    { title: "Segmento", value: "segmento" },
    { title: "Tamaño Empresa", value: "tamanoEmpresa" },
    { title: "Propiedades a su Nombre", value: "propiedadesNombre" },
    { title: "Bienes Muebles a su Nombre", value: "bienesMuebles" },
    { title: "Antiguedad Laboral", value: "antiguedadLaboral" },
    { title: "Puntaje CIC", value: "puntajeCic" },
    { title: "Nivel Cic", value: "nivelCic" },
    { title: "Historico en CIC", value: "historicoCic" },
    { title: "Embargos Judiciales", value: "embargoJudicial" },
    { title: "Monto de Solicitud", value: "montoDeSolicitud" },
    { title: "Plan de Inversion", value: "planDeInversion" },
    { title: "Cuota a Pagar", value: "cuotaPagar" },
    { title: "Plazo a otorgar", value: "plazoOtorgar" },
    // Informacion Personal changes
    { title: "Nombre Completo", value: "nombreCompleto" },
    { title: "Fecha Nacimiento", value: "fechaNacimiento" },
    { title: "Nacionalidad", value: "nacionalidad" },
    { title: "Propiedad de la Vivienda", value: "propiedadVivienda" },
    { title: "Provincia", value: "provincia" },
    { title: "Cantón", value: "canton" },
    { title: "Distrito", value: "distrito" },
    { title: "Tipo de Residencia", value: "tipoResidencia" },
    // Informacion Laboral changes
    { title: "Tipo de Empleo 1", value: "tipoEmpleo1" },
    { title: "Tipo de Empleo 2", value: "tipoEmpleo2" },
    { title: "Ingreso Mensual Bruto 1", value: "ingresoMensualBruto1" },
    { title: "Ingreso Mensual Bruto 2", value: "ingresoMensualBruto2" },
    { title: "Ingreso Mensual Neto 1", value: "ingresoMensualNeto1" },
    { title: "Ingreso Mensual Neto 2", value: "ingresoMensualNeto2" },
    { title: "Porcentaje de ingreso en ML (Moneda Local)", value: "porcentajeIngresoML" },
    { title: "Porcentaje de ingreso en ME (Moneda Extranjera)", value: "porcentajeIngresoME" },
    { title: "Antigüedad Laboral (en años) en empleo actual", value: "antiguedadLaboralActual" },
    { title: "Continuidad Laboral (en años) - años ininterrumpidos de labores -", value: "continuidadLaboral" },
    { title: "Fecha de último ingreso en ML", value: "fechaUltimoIngreoML" },
    { title: "Fecha de último ingreso en ME", value: "fechaUltimoIngreoME" },
    { title: "Profesión - oficio", value: "profesionOficio" },
    { title: "Condición Laboral", value: "condicionLaboral" },
    // Informacion del bureau changes
    { title: "Cantidad de Autos", value: "cantidadAutos" },
    { title: "Cantidad de Motocicletas", value: "cantidadMotocicletas" },
    { title: "Cantidad de propiedades libres", value: "cantidadPropiedadesLibres" },
    { title: "Cantidad de propiedades hipotecadas", value: "cantidadPropiedadesHipotecas" },
    { title: "Cantidad de embargos inmuebles", value: "cantidadEmbargosInmuebles" },
    { title: "Cantidad de embargos muebles", value: "cantidadEmbargosMuebles" },
    { title: "Cantidad de referencias -", value: "cantidadReferencia" },
    { title: "Cantidad de juicios comerciales", value: "cantidadJuiciosComerciales" },
    // Informacion tipo de credito
    { title: "Tipo de Crédito", value: "tipoCredito" },
    { title: "Producto", value: "producto" },
    { title: "Monto del Crédito", value: "montoCredito" },
    { title: "Plan de Inversión", value: "planInversion" },

  ];

  const formik = useFormik({
    initialValues: {
      identificacion: "",
      sexo: "0",
      edad: "40",
      estadoCivil: "1",
      nivelProfesional: "4",
      cantidadHijos: "4",
      nivelSalarial: "3000000",
      segmento: "5",
      tamanoEmpresa: "4",
      propiedadesNombre: "1",
      bienesMuebles: "2",
      antiguedadLaboral: "2",
      puntajeCic: "1.1",
      nivelCic: "1",
      historicoCic: "1.1",
      embargoJudicial: "0",
      montoDeSolicitud: "",
      planDeInversion: "",
      cuotaPagar: "",
      plazoOtorgar: "",
      // Informacion Personal changes
      nombreCompleto: "JIMMY FERNANDO ARIAS QUIEL",
      fechaNacimiento: "",
      nacionalidad: "",
      propiedadVivienda: "",
      provincia: "",
      canton: "",
      distrito: "",
      tipoResidencia: "",
      // Informacion Laboral changes
      tipoEmpleo1: "",
      tipoEmpleo2: "",
      ingresoMensualBruto1: "",
      ingresoMensualBruto2: "",
      ingresoMensualNeto1: "",
      ingresoMensualNeto2: "",
      porcentajeIngresoML: "",
      porcentajeIngresoME: "",
      antiguedadLaboralActual: "",
      continuidadLaboral: "",
      fechaUltimoIngreoML: "",
      fechaUltimoIngreoME: "",
      profesionOficio: "",
      condicionLaboral: "",
      // Informacion del bureau changes
      cantidadAutos: "",
      cantidadMotocicletas: "",
      cantidadPropiedadesLibres: "",
      cantidadPropiedadesHipotecas: "",
      cantidadEmbargosInmuebles: "",
      cantidadEmbargosMuebles: "",
      cantidadReferencia: "",
      cantidadJuiciosComerciales: "",
      // Informacion tipo de credito
      tipoCredito: "",
      producto: "",
      montoCredito: "",
      planInversion: "",
    },

    validationSchema: yup.object({
      identificacion: yup.string(),
      sexo: yup.string().required("Es Requerido el Usuario"),
      edad: yup.string().required("Es Requerido el Usuario"),
      estadoCivil: yup.string().required("Es Requerido el Usuario"),
      nivelProfesional: yup.string().required("Es Requerido el Usuario"),
      cantidadHijos: yup.string().required("Es Requerido el Usuario"),
      nivelSalarial: yup.string().required("Es Requerido el Usuario"),
      segmento: yup.string().required("Es Requerido el Usuario"),
      tamanoEmpresa: yup.string().required("Es Requerido el Usuario"),
      propiedadesNombre: yup.string().required("Es Requerido el Usuario"),
      bienesMuebles: yup.string().required("Es Requerido el Usuario"),
      antiguedadLaboral: yup.string().required("Es Requerido el Usuario"),
      puntajeCic: yup.string().required("Es Requerido el Usuario"),
      nivelCic: yup.string().required("Es Requerido el Usuario"),
      historicoCic: yup.string().required("Es Requerido el Usuario"),
      embargoJudicial: yup.string().required("Es Requerido el Usuario"),
      // Informacion Personal changes
      nombreCompleto: yup.string().required("Es Requerido el Usuario"),
      fechaNacimiento: yup.string().required("Es Requerido el Usuario"),
      nacionalidad: yup.string().required("Es Requerido el Usuario"),
      propiedadVivienda: yup.string().required("Es Requerido el Usuario"),
      provincia: yup.string().required("Es Requerido el Usuario"),
      canton: yup.string().required("Es Requerido el Usuario"),
      distrito: yup.string().required("Es Requerido el Usuario"),
      tipoResidencia: yup.string().required("Es Requerido el Usuario"),
      // Informacion Laboral changes
      tipoEmpleo1: yup.string().required("Es Requerido el Usuario"),
      tipoEmpleo2: yup.string().required("Es Requerido el Usuario"),
      ingresoMensualBruto1: yup.string().required("Es Requerido el Usuario"),
      ingresoMensualBruto2: yup.string().required("Es Requerido el Usuario"),
      ingresoMensualNeto1: yup.string().required("Es Requerido el Usuario"),
      ingresoMensualNeto2: yup.string().required("Es Requerido el Usuario"),
      porcentajeIngresoML: yup.string().required("Es Requerido el Usuario"),
      porcentajeIngresoME: yup.string().required("Es Requerido el Usuario"),
      antiguedadLaboralActual: yup.string().required("Es Requerido el Usuario"),
      continuidadLaboral: yup.string().required("Es Requerido el Usuario"),
      fechaUltimoIngreoML: yup.string().required("Es Requerido el Usuario"),
      fechaUltimoIngreoME: yup.string().required("Es Requerido el Usuario"),
      profesionOficio: yup.string().required("Es Requerido el Usuario"),
      condicionLaboral: yup.string().required("Es Requerido el Usuario"),
      // Informacion del bureau changes
      cantidadAutos: yup.string().required("Es Requerido el Usuario"),
      cantidadMotocicletas: yup.string().required("Es Requerido el Usuario"),
      cantidadPropiedadesLibres: yup.string().required("Es Requerido el Usuario"),
      cantidadPropiedadesHipotecas: yup.string().required("Es Requerido el Usuario"),
      cantidadEmbargosInmuebles: yup.string().required("Es Requerido el Usuario"),
      cantidadEmbargosMuebles: yup.string().required("Es Requerido el Usuario"),
      cantidadReferencia: yup.string().required("Es Requerido el Usuario"),
      cantidadJuiciosComerciales: yup.string().required("Es Requerido el Usuario"),
      // Informacion tipo de credito
      tipoCredito: yup.string().required("Es Requerido el Usuario"),
      producto: yup.string().required("Es Requerido el Usuario"),
      montoCredito: yup.string().required("Es Requerido el Usuario"),
      planInversion: yup.string().required("Es Requerido el Usuario"),
      
      montoDeSolicitud: yup.string(),
      planDeInversion: yup.string(),
      cuotaPagar: yup.string(),
      plazoOtorgar: yup.string(),
    }),

    onSubmit: (e) => {
      delete e.cuotaPagar
      delete e.montoDeSolicitud
      delete e.planDeInversion
      delete e.plazoOtorgar
      delete e.identificacion

      setLoading(true);


      petition_post("precalif", { body: e })
        .then((result) => {
          // console.log(result);
          /*    
              setDataValue( millify(result.data, {
                units: ['', 'Miles', "Millones"],
                space: true,
                precision: 1,
                decimalSeparator: ',',
              
              }) ) */

          let lengthResult = parseInt(result.data).toString().length

          if (lengthResult <= 6) {
            lengthResult = lengthResult - 2
          }
          else {
            lengthResult = lengthResult - 3
          }

          setLoading(false);

          let value = Math.round(result.data / Math.pow(10, lengthResult)) * Math.pow(10, lengthResult)
          // console.log(value);
          setDataValue(new Intl.NumberFormat(["ban", "id"]).format(value))


          toast.success("Pre Calificación Lograda", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.log(error)


          toast.error("Pre Calificación fallida.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      console.log(e);
    },
  });

  const handleCalcularResolucion = (e) => {
    // e.preventDefault();
    setActiveCheck(!activeCheck);
    formik.handleSubmit();
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  }

  return (
    <div className="nuevos-prospectos">

      <Row className="mt-4 pb-4">
        {/* Left side */}
        <Col lg={9}>
          <Row className="mb-3">
            <Col sm={12}>
              <Card>
                <CardBody className="m-0">
                  <Row className="align-items-center">
                    <Col lg={4}>
                      <h3>Información Personal Básica</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* ID */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[0].value}
                        title={data[0].title}
                        value={formik.values[data[0].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[0].value] &&
                          formik.touched[data[0].value]
                        }
                      />
                      {/* Nombre */}
                      <CustomInput
                        placeholder="Nombre Apellido"
                        id={data[20].value}
                        title={data[20].title}
                        value={formik.values[data[20].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[20].value] &&
                          formik.touched[data[20].value]
                        }
                      />
                      {/* Genero */}
                      <CustomInput
                        id={data[1].value}
                        dropdown={[{ content: "Masculino", key: 0 }, { content: "Femenino", key: 1 }]}
                        title={data[1].title}
                        value={formik.values[data[1].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[1].value] &&
                          formik.touched[data[1].value]
                        }
                      />
                      {/* Edad */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[2].value}
                        title={data[2].title}
                        value={formik.values[data[2].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[2].value] &&
                          formik.touched[data[2].value]
                        }
                      />
                      {/* Estado Civil */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[3].value}
                        title={data[3].title}
                        value={formik.values[data[3].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[3].value] &&
                          formik.touched[data[3].value]
                        }
                      />
                      {/* Nivel Profesional */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[4].value}
                        title={data[4].title}
                        value={formik.values[data[4].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[4].value] &&
                          formik.touched[data[4].value]
                        }
                      />
                      {/* Cantidad de Hijos */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[5].value}
                        title={data[5].title}
                        value={formik.values[data[5].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[5].value] &&
                          formik.touched[data[5].value]
                        }
                      />
                      {/* Fecha Nacimiento */}
                      <CustomInput
                        placeholder="dd/Mes/yyyy"
                        id={data[21].value}
                        title={data[21].title}
                        value={formik.values[data[21].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[21].value] &&
                          formik.touched[data[21].value]
                        }
                      />
                      {/* Nacionalidad */}
                      <CustomInput
                        placeholder=""
                        id={data[22].value}
                        title={data[22].title}
                        value={formik.values[data[22].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[22].value] &&
                          formik.touched[data[22].value]
                        }
                      />
                      {/* Propiedad de la Vivienda */}
                      <CustomInput
                        placeholder=""
                        id={data[23].value}
                        title={data[23].title}
                        value={formik.values[data[23].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[23].value] &&
                          formik.touched[data[23].value]
                        }
                      />
                      {/* Provincia */}
                      <CustomInput
                        placeholder=""
                        id={data[24].value}
                        title={data[24].title}
                        value={formik.values[data[24].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[24].value] &&
                          formik.touched[data[24].value]
                        }
                      />
                      {/* Cantón */}
                      <CustomInput
                        placeholder=""
                        id={data[25].value}
                        title={data[25].title}
                        value={formik.values[data[25].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[25].value] &&
                          formik.touched[data[25].value]
                        }
                      />
                      {/* Distrito */}
                      <CustomInput
                        placeholder=""
                        id={data[26].value}
                        title={data[26].title}
                        value={formik.values[data[26].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[26].value] &&
                          formik.touched[data[26].value]
                        }
                      />
                      {/* Tipo de Residencia */}
                      <CustomInput
                        placeholder=""
                        id={data[27].value}
                        title={data[27].title}
                        value={formik.values[data[27].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[27].value] &&
                          formik.touched[data[27].value]
                        }
                      />
                    </Col>
                  </Row>
                  <hr />
                  
                  {/* Salario y Patrono */}
                  <Row className="align-items-center d-none">
                    <Col lg={4}>
                      <h3>Salario y Patrono</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* NIVEL SALARIAL */}
                      <CustomInput
                        number={"0"}
                        placeholder="En Unidades"
                        id={data[6].value}
                        title={data[6].title}
                        value={formik.values[data[6].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[6].value] &&
                          formik.touched[data[6].value]
                        }
                      />
                      {/* SEGMENTO */}
                      <CustomInput
                        dropdown={[{ content: "Segmento-1", key: 0 }, { content: "Segmento-2", key: 1 }, { content: "Segmento-3", key: 2 }, { content: "Segmento-4", key: 3 }, { content: "Segmento-5", key: 4 }, { content: "Segmento-6", key: 5 }, { content: "Segmento-7", key: 6 }, { content: "Segmento-8", key: 7 }, { content: "Segmento-9", key: 8 }, { content: "Segmento-10", key: 9 },]}
                        id={data[7].value}
                        title={data[7].title}
                        value={formik.values[data[7].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[7].value] &&
                          formik.touched[data[7].value]
                        }
                      />
                      {/* TAMAÑO EMPRESA */}
                      <CustomInput
                        dropdown={[{ content: "1-5 Empleados", key: 0 }, { content: "6-20 Empleados", key: 1 }, { content: "20-50 Empleados", key: 2 }, { content: "50-500 Empleados", key: 3 }, { content: "500+ Empleados", key: 4 }]}
                        id={data[8].value}
                        title={data[8].title}
                        value={formik.values[data[8].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[8].value] &&
                          formik.touched[data[8].value]
                        }
                      />
                      {/* PROPIEDADES A SU NOMBRE */}
                      <CustomInput
                        dropdown={[{ content: "0 Propiedades", key: 0 }, { content: "1 Propiedad", key: 1 }, { content: "2 Propiedades", key: 2 }, { content: "3 Propiedades", key: 3 }, { content: "4+ Propiedades", key: 4 }]}
                        id={data[9].value}
                        title={data[9].title}
                        value={formik.values[data[9].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[9].value] &&
                          formik.touched[data[9].value]
                        }
                      />
                      {/* BIENES MUEBLES A SU NOMBRE */}
                      <CustomInput
                        dropdown={[{ content: "0 Bienes", key: 0 }, { content: "1 Bienes", key: 1 }, { content: "2 Bienes", key: 2 }, { content: "3 Bienes", key: 3 }, { content: "4+ Bienes", key: 4 }]}
                        id={data[10].value}
                        title={data[10].title}
                        value={formik.values[data[10].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[10].value] &&
                          formik.touched[data[10].value]
                        }
                      />
                      {/* ANTIGUEDAD LABORAL */}
                      <CustomInput
                        dropdown={[
                          { content: "< 1 año", key: 0 },
                          { content: "2 año", key: 2 },
                          { content: "3 año", key: 3 },
                          { content: "4 año", key: 4 },
                          { content: "5 año", key: 5 },
                          { content: "6 año", key: 6 },
                          { content: "7 año", key: 7 },
                          { content: "8 año", key: 8 },
                          { content: "9 año", key: 9 },
                          { content: "10 año", key: 10 },
                          { content: "11 año", key: 11 },
                          { content: "12 año", key: 12 },
                          { content: "13 año", key: 13 },
                          { content: "14 año", key: 14 },
                          { content: "15 año", key: 15 },
                          { content: "16 año", key: 16 },
                          { content: "17 año", key: 17 },
                          { content: "18 año", key: 18 },
                          { content: "19 año", key: 19 },
                          { content: "20 año", key: 20 },
                          { content: "21 año", key: 21 },
                          { content: "22 año", key: 22 },
                          { content: "23 año", key: 23 },
                          { content: "24 año", key: 24 },
                          { content: "25 año", key: 25 },
                          { content: "26 año", key: 26 },
                          { content: "27 año", key: 27 },
                          { content: "28 año", key: 28 },
                          { content: "29 año", key: 29 },
                          { content: "30 año", key: 30 },
                          { content: "31 año", key: 31 },
                          { content: "32 año", key: 32 },
                          { content: "33 año", key: 33 },
                          { content: "34 año", key: 34 },
                          { content: "35 año", key: 35 },
                          { content: "36 año", key: 36 },
                          { content: "37 año", key: 37 },
                          { content: "38 año", key: 38 },
                          { content: "39 año", key: 39 },
                          { content: "40 año", key: 40 }
                        ]}
                        id={data[11].value}
                        title={data[11].title}
                        value={formik.values[data[11].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[11].value] &&
                          formik.touched[data[11].value]
                        }
                      />
                    </Col>
                  </Row>
                  <hr className="d-none" />
                  
                  {/* Datos CIC */}
                  <Row className="align-items-center d-none">
                    <Col lg={4}>
                      <h3>Datos CIC</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* PUNTAJE CIC */}
                      <CustomInput
                        number={1}
                        id={data[12].value}
                        title={data[12].title}
                        value={formik.values[data[12].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[12].value] &&
                          formik.touched[data[12].value]
                        }
                      />
                      {/* NIVEL CIC */}
                      <CustomInput
                        dropdown={[{ content: "1", key: 0 }, { content: "2", key: 1 }, { content: "3", key: 2 }, { content: "4", key: 3 }]}

                        id={data[13].value}
                        title={data[13].title}
                        value={formik.values[data[13].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[13].value] &&
                          formik.touched[data[13].value]
                        }
                      />
                      {/* HISTORICO EN CIC */}
                      <CustomInput
                        number={1}
                        id={data[14].value}
                        title={data[14].title}
                        value={formik.values[data[14].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[14].value] &&
                          formik.touched[data[14].value]
                        }
                      />
                      {/* EMBARGOS JUDICIALES */}
                      <CustomInput
                        dropdown={[{ content: "SI", key: 0 }, { content: "NO", key: 1 }]}

                        id={data[15].value}
                        title={data[15].title}
                        value={formik.values[data[15].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[15].value] &&
                          formik.touched[data[15].value]
                        }
                      />
                    </Col>
                  </Row>
                  <hr className="d-none" />
                  
                  {/* Información Laboral */}
                  <Row className="align-items-center">
                    <Col lg={4}>
                      <h3>Información Laboral</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* Tipo de Empleo 1 */}
                      <CustomInput
                        placeholder=""
                        id={data[28].value}
                        title={data[28].title}
                        value={formik.values[data[28].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[28].value] &&
                          formik.touched[data[28].value]
                        }
                      />
                      {/* Tipo de Empleo 2 */}
                      <CustomInput
                        placeholder=""
                        id={data[29].value}
                        title={data[29].title}
                        value={formik.values[data[29].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[29].value] &&
                          formik.touched[data[29].value]
                        }
                      />
                      {/* Ingreso Mensual Bruto 1 */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[30].value}
                        title={data[30].title}
                        value={formik.values[data[30].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[30].value] &&
                          formik.touched[data[30].value]
                        }
                      />
                      {/* Ingreso Mensual Bruto 2 */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[31].value}
                        title={data[31].title}
                        value={formik.values[data[31].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[31].value] &&
                          formik.touched[data[31].value]
                        }
                      />
                      {/* Ingreso Mensual Neto 1 */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[32].value}
                        title={data[32].title}
                        value={formik.values[data[32].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[32].value] &&
                          formik.touched[data[32].value]
                        }
                      />
                      {/* Ingreso Mensual Neto 2 */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[33].value}
                        title={data[33].title}
                        value={formik.values[data[33].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[33].value] &&
                          formik.touched[data[33].value]
                        }
                      />
                      {/* Porcentaje de ingreso en ML */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[34].value}
                        title={data[34].title}
                        value={formik.values[data[34].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[34].value] &&
                          formik.touched[data[34].value]
                        }
                      />
                      {/* Porcentaje de ingreso en ME */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[35].value}
                        title={data[35].title}
                        value={formik.values[data[35].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[35].value] &&
                          formik.touched[data[35].value]
                        }
                      />
                      {/* Antigüedad Laboral */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[36].value}
                        title={data[36].title}
                        value={formik.values[data[36].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[36].value] &&
                          formik.touched[data[36].value]
                        }
                      />
                      {/* Continuidad Laboral */}
                      <CustomInput
                        number={"0"}
                        placeholder="Ejem. 12345"
                        id={data[37].value}
                        title={data[37].title}
                        value={formik.values[data[37].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[37].value] &&
                          formik.touched[data[37].value]
                        }
                      />
                      {/* Fecha de último ingreso en ML */}
                      <CustomInput
                        placeholder="dd/Mes/yyyy"
                        id={data[38].value}
                        title={data[38].title}
                        value={formik.values[data[38].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[38].value] &&
                          formik.touched[data[38].value]
                        }
                      />
                      {/* Fecha de último ingreso en ME */}
                      <CustomInput
                        placeholder="dd/Mes/yyyy"
                        id={data[39].value}
                        title={data[39].title}
                        value={formik.values[data[39].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[39].value] &&
                          formik.touched[data[39].value]
                        }
                      />
                      {/* Profesión - oficio */}
                      <CustomInput
                        placeholder=""
                        id={data[40].value}
                        title={data[40].title}
                        value={formik.values[data[40].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[40].value] &&
                          formik.touched[data[40].value]
                        }
                      />
                      {/* Condición Laboral */}
                      <CustomInput
                        placeholder=""
                        id={data[41].value}
                        title={data[41].title}
                        value={formik.values[data[41].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[41].value] &&
                          formik.touched[data[41].value]
                        }
                      />
                    </Col>
                  </Row>
                  <hr />
                  
                  {/* Información del Bureau */}
                  <Row className="align-items-center">
                    <Col lg={4}>
                      <h3>Información del Bureau</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* Cantidad de Autos */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[42].value}
                        title={data[42].title}
                        value={formik.values[data[42].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[42].value] &&
                          formik.touched[data[42].value]
                        }
                      />
                      {/* Cantidad de Motocicletas */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[43].value}
                        title={data[43].title}
                        value={formik.values[data[43].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[43].value] &&
                          formik.touched[data[43].value]
                        }
                      />
                      {/* Cantidad de propiedades libres */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[44].value}
                        title={data[44].title}
                        value={formik.values[data[44].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[44].value] &&
                          formik.touched[data[44].value]
                        }
                      />
                      {/* Cantidad de propiedades hipotecadas */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[45].value}
                        title={data[45].title}
                        value={formik.values[data[45].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[45].value] &&
                          formik.touched[data[45].value]
                        }
                      />
                      {/* Cantidad de embargos inmuebles */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[46].value}
                        title={data[46].title}
                        value={formik.values[data[46].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[46].value] &&
                          formik.touched[data[46].value]
                        }
                      />
                      {/* Cantidad de embargos muebles */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[47].value}
                        title={data[47].title}
                        value={formik.values[data[47].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[47].value] &&
                          formik.touched[data[47].value]
                        }
                      />
                      {/* Cantidad de referencias - */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[48].value}
                        title={data[48].title}
                        value={formik.values[data[48].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[48].value] &&
                          formik.touched[data[48].value]
                        }
                      />
                      {/* Cantidad de juicios comerciales */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[49].value}
                        title={data[49].title}
                        value={formik.values[data[49].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[49].value] &&
                          formik.touched[data[49].value]
                        }
                      />
                    </Col>
                  </Row>
                  <hr />

                  {/* Información Tipo de Crédito */}
                  <Row className="align-items-center">
                    <Col lg={4}>
                      <h3>Información Tipo de Crédito</h3>
                    </Col>
                    <Col lg={8} className="d-flex inputs-container">
                      {/* Tipo de Crédito */}
                      <CustomInput
                        placeholder=""
                        id={data[50].value}
                        title={data[50].title}
                        value={formik.values[data[50].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[50].value] &&
                          formik.touched[data[50].value]
                        }
                      />
                      {/* Producto */}
                      <CustomInput
                        placeholder=""
                        id={data[51].value}
                        title={data[51].title}
                        value={formik.values[data[51].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[51].value] &&
                          formik.touched[data[51].value]
                        }
                      />
                      {/* Monto del Crédito */}
                      <CustomInput
                        number={"0"}
                        placeholder=""
                        id={data[52].value}
                        title={data[52].title}
                        value={formik.values[data[52].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[52].value] &&
                          formik.touched[data[52].value]
                        }
                      />
                      {/* Plan de Inversión */}
                      <CustomInput
                        placeholder=""
                        id={data[53].value}
                        title={data[53].title}
                        value={formik.values[data[53].value]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[data[53].value] &&
                          formik.touched[data[53].value]
                        }
                      />
                    </Col>
                  </Row>
                  

                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Consultar button */}
          <Row>
            <Col sm={12} className="d-flex justify-content-center">
              <Button onClick={handleCalcularResolucion} className={`btn btn-primary text-white ${loading ? ' px-5' : ''}`} disabled={loading} >
                {loading 
                ? <Spinner size={"sm"} />
                : 'Consultar Calificación'}
              </Button>
            </Col>
          </Row>

          {/* Inversion Section */}
          {dataValue && (
            <Row>
              <Col sm={12} className="mb-3">
                <Card>
                  <CardBody>
                  <Row className="align-items-center">
                      <Col lg={4}>
                        <h3>Inversión</h3>
                      </Col>
                      <Col lg={8} className="d-flex inputs-container">
                        {/* MONTO DE SOLICITUD */}
                        <CustomInput
                          id={data[16].value}
                          title={data[16].title}
                          value={formik.values[data[16].value]}
                          placeholder={"Ingresar Monto"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[data[16].value] &&
                            formik.touched[data[16].value]
                          }
                        />
                        {/* PLAN DE INVERSION */}
                        <CustomInput
                          id={data[17].value}
                          title={data[17].title}
                          value={formik.values[data[17].value]}
                          placeholder={"Ingresar Plan"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[data[17].value] &&
                            formik.touched[data[17].value]
                          }
                        />
                        {/* CUOTA A PAGAR */}
                        <CustomInput
                          id={data[18].value}
                          title={data[18].title}
                          placeholder={"Ingresar Cuota"}
                          value={formik.values[data[18].value]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[data[18].value] &&
                            formik.touched[data[18].value]
                          }
                        />
                        {/* PLAZO A OTORGAR */}
                        <CustomInput
                          id={data[19].value}
                          title={data[19].title}
                          placeholder={"Ingresar Plazo"}
                          value={formik.values[data[19].value]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[data[19].value] &&
                            formik.touched[data[19].value]
                          }
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} className="d-flex justify-content-center">
                <Button 
                  onClick={submitHandler}
                  className="btn btn-primary text-white"
                >
                    Registrar Ofrecimiento
                </Button>
              </Col>
            </Row>
          )}

        </Col>

        {/* Right side */}
        <Col lg={3} className="monto-maximo">
          <Card className="fit-card"> 
            <CardBody className="m-0">
              <h3>Disponible en Crédito Personal:</h3>
              <p>Requisitos</p>
              <div className="d-flex flex-column align-items-center">
                {dataValue && (
                  <>
                  <h4 className="value">{`₡${ dataValue.toLocaleString('de-DE')}`}</h4>
                  </>
                )}
              </div>
              </CardBody>
          </Card>
          <Card className="fit-card"> 
            <CardBody className="m-0">
              <h3>Disponible en Crédito Vehículo:</h3>
              <p>Requisitos</p>
              <div className="d-flex flex-column align-items-center">
                {dataValue && (
                  <>
                  <h4 className="value">{`₡${ dataValue.toLocaleString('de-DE')}`}</h4>
                  </>
                )}
              </div>
              </CardBody>
          </Card>
          <Card className="fit-card"> 
            <CardBody className="m-0">
              <h3>Disponible en Crédito Hipotecario:</h3>
              <p>Requisitos</p>
              <div className="d-flex flex-column align-items-center">
                {dataValue && (
                  <>
                  <h4 className="value">{`₡${ dataValue.toLocaleString('de-DE')}`}</h4>
                  </>
                )}
              </div>
              </CardBody>
          </Card>
          <Card className="fit-card"> 
            <CardBody className="m-0">
              <h3>Disponible en Crédito Salud:</h3>
              <p>Requisitos</p>
              <div className="d-flex flex-column align-items-center">
                {dataValue && (
                  <>
                  <h4 className="value">{`₡${ dataValue.toLocaleString('de-DE')}`}</h4>
                  </>
                )}
              </div>
              </CardBody>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

export default NuevosProspectos;