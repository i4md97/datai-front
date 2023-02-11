import React, {useState, useRef} from "react";
import {Card} from "reactstrap";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "reactstrap-date-picker";
export default function Pronosticos() {
  /* States */
  const options2={
    legend: {
        display: false,
    },
    title: {
      display: "block",
      text: "PRONOSTICOS"
     }
  };
  const [data, setData] = useState({
    globales: {
      zona: [],
      sucursal: [],
      cartera: [],
    },
    producto: [],
    comerciales: {grupo: [], ejecutivos: [], empresas: []},
    date: {
      first_date: "",
      last_date: "",
    },
  });


  const dataChart= {
    labels: ["1", "2", "3", "4", "5"],
  datasets: [
    {
      label: "Second dataset",
      data: [1, 2, 3, 4, 3],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

  const animatedComponents = makeAnimated();

  /* Options */

  const options = {
    globales: {
      zona: [
        {label: "Zona 1", value: "zona_1"},
        {label: "Zona 2", value: "zona_2"},
        {label: "Zona 3", value: "zona_3"},
      ],
      sucursal: [
        {label: "Sucursal 1", value: "sucursal_1"},
        {label: "Sucursal 2", value: "sucursal_2"},
        {label: "Sucursal 3", value: "sucursal_3"},
        {label: "Sucursal 4", value: "sucursal_4"},
        {label: "Sucursal 5", value: "sucursal_5"},
        {label: "Sucursal 6", value: "sucursal_6"},
        {label: "Sucursal 7", value: "sucursal_7"},
        {label: "Sucursal 8", value: "sucursal_8"},
        {label: "Sucursal 9", value: "sucursal_9"},
        {label: "Sucursal 10", value: "sucursal_10"},
      ],
      cartera: [
        {label: "Cartera 1", value: "cartera_1"},
        {label: "Cartera 2", value: "cartera_2"},
        {label: "Cartera 3", value: "cartera_3"},
        {label: "Cartera 4", value: "cartera_4"},
        {label: "Cartera 5", value: "cartera_5"},
      ],
    },
    comerciales: {
      grupo: [
        {label: "Grupo 1", value: "grupo_1"},
        {label: "Grupo 2", value: "grupo_2"},
        {label: "Grupo 3", value: "grupo_3"},
        {label: "Grupo 4", value: "grupo_4"},
        {label: "Grupo 5", value: "grupo_5"},
      ],
      ejecutivos: [
        {label: "Ejecutivos 1", value: "ejecutivos_1"},
        {label: "Ejecutivos 2", value: "ejecutivos_2"},
        {label: "Ejecutivos 3", value: "ejecutivos_3"},
        {label: "Ejecutivos 4", value: "ejecutivos_4"},
        {label: "Ejecutivos 5", value: "ejecutivos_5"},
        {label: "Ejecutivos 6", value: "ejecutivos_6"},
        {label: "Ejecutivos 7", value: "ejecutivos_7"},
        {label: "Ejecutivos 8", value: "ejecutivos_8"},
        {label: "Ejecutivos 9", value: "ejecutivos_9"},
        {label: "Ejecutivos 10", value: "ejecutivos_10"},
      ],
      empresas: [
        {label: "Empresas 1", value: "empresas_1"},
        {label: "Empresas 2", value: "empresas_2"},
        {label: "Empresas 3", value: "empresas_3"},
        {label: "Empresas 4", value: "empresas_4"},
        {label: "Empresas 5", value: "empresas_5"},
        {label: "Empresas 6", value: "empresas_6"},
        {label: "Empresas 7", value: "empresas_7"},
        {label: "Empresas 8", value: "empresas_8"},
        {label: "Empresas 9", value: "empresas_9"},
        {label: "Empresas 10", value: "empresas_10"},
        {label: "Empresas 11", value: "empresas_11"},
        {label: "Empresas 12", value: "empresas_12"},
        {label: "Empresas 13", value: "empresas_13"},
        {label: "Empresas 14", value: "empresas_14"},
        {label: "Empresas 15", value: "empresas_15"},
        {label: "Empresas 16", value: "empresas_16"},
        {label: "Empresas 17", value: "empresas_17"},
        {label: "Empresas 18", value: "empresas_18"},
        {label: "Empresas 19", value: "empresas_19"},
        {label: "Empresas 20", value: "empresas_20"},
        {label: "Empresas 21", value: "empresas_21"},
        {label: "Empresas 22", value: "empresas_22"},
        {label: "Empresas 23", value: "empresas_23"},
        {label: "Empresas 24", value: "empresas_24"},
        {label: "Empresas 25", value: "empresas_25"},
        {label: "Empresas 26", value: "empresas_26"},
        {label: "Empresas 27", value: "empresas_27"},
        {label: "Empresas 28", value: "empresas_28"},
        {label: "Empresas 29", value: "empresas_29"},
        {label: "Empresas 30", value: "empresas_30"},
        {label: "Empresas 31", value: "empresas_31"},
        {label: "Empresas 32", value: "empresas_32"},
        {label: "Empresas 33", value: "empresas_33"},
        {label: "Empresas 34", value: "empresas_34"},
        {label: "Empresas 35", value: "empresas_35"},
        {label: "Empresas 36", value: "empresas_36"},
        {label: "Empresas 37", value: "empresas_37"},
        {label: "Empresas 38", value: "empresas_38"},
        {label: "Empresas 39", value: "empresas_39"},
        {label: "Empresas 40", value: "empresas_40"},
        {label: "Empresas 41", value: "empresas_41"},
        {label: "Empresas 42", value: "empresas_42"},
        {label: "Empresas 43", value: "empresas_43"},
        {label: "Empresas 44", value: "empresas_44"},
        {label: "Empresas 45", value: "empresas_45"},
        {label: "Empresas 46", value: "empresas_46"},
        {label: "Empresas 47", value: "empresas_47"},
        {label: "Empresas 48", value: "empresas_48"},
        {label: "Empresas 49", value: "empresas_49"},
        {label: "Empresas 50", value: "empresas_50"},
      ],
    },
    producto: [
      {label: "Producto 1", value: "producto_1"},
      {label: "Producto 2", value: "producto_2"},
      {label: "Producto 3", value: "producto_3"},
      {label: "Producto 4", value: "producto_4"},
      {label: "Producto 5", value: "producto_5"},
      {label: "Producto 6", value: "producto_6"},
      {label: "Producto 7", value: "producto_7"},
      {label: "Producto 8", value: "producto_8"},
      {label: "Producto 9", value: "producto_9"},
      {label: "Producto 10", value: "producto_10"},
    ],
  };

  const pickerOne = useRef();
  return (
    <div className="">
      <div className="row m-0 p-1 d-none d-md-flex">
        <div className="col-12 col-md-3 p-1 ">
          <Card
            body
            className="ml-0"

            style={{ border: "1.5px solid #DFE0EB", boxShadow: "none",height: "70vh", overflow: "auto" }}
          >
            <h2 className="business-title general-title">Globales</h2>
            <h4 className="business-subtitle">Zona</h4>
            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {zona: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.zona}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.zona}
            />
            <h4 className="business-subtitle ">Sucursal</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {sucursal: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.sucursal}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.sucursal}
            />

            <h4 className="business-subtitle ">Cartera</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {cartera: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.cartera}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.cartera}
            />
            <br />
            <hr className="m-0" />
            <h2 className="business-title pt-1  general-title">Comerciales</h2>

            <h4 className="business-subtitle">Grupo</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {grupo: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.grupo}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.grupo}
            />
            <h4 className="business-subtitle ">Ejecutivos</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {ejecutivos: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.ejecutivos}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.ejecutivos}
            />
            <h4 className="business-subtitle">Empresas</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {empresas: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.empresas}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.empresas}
            />

            <br />
            <hr className="m-0" />
            <h2 className="business-title pt-1  general-title">Producto</h2>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, producto: [...value]});
              }}
              components={animatedComponents}
              options={options.producto}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.producto}
            />
            <br />
            <hr className="m-0" />
            <h2 className="business-title general-title ">Periodo</h2>
            <div className="container-datepicker">
              <DatePicker
                className="datepicker"
                ref={pickerOne}
                onChange={(value) => {
                  const newDate = value.split("-");
                  switch (parseInt(newDate[1])) {
                    case 1:
                      newDate[1] = "ENE";
                      break;
                    case 2:
                      newDate[1] = "FEB";
                      break;
                    case 3:
                      newDate[1] = "MAR";
                      break;
                    case 4:
                      newDate[1] = "ABR";
                      break;
                    case 5:
                      newDate[1] = "MAY";
                      break;
                    case 6:
                      newDate[1] = "JUN";
                      break;
                    case 7:
                      newDate[1] = "JUL";
                      break;
                    case 8:
                      newDate[1] = "AGO";
                      break;
                    case 9:
                      newDate[1] = "SEP";
                      break;
                    case 10:
                      newDate[1] = "OCT";
                      break;
                    case 11:
                      newDate[1] = "NOV";
                      break;
                    case 12:
                      newDate[1] = "DIC";
                      break;
                    default:
                      break;
                  }
                  newDate[2] = newDate[2].split("T")[0];
                  setData({
                    ...data,
                    date: {first_date: newDate.toString().replaceAll(",", "/")},
                  });
                }}
              />
              <span className="result-picker">{data.date.first_date}</span>
            </div>
            <br />
            <DatePicker className="datepicker" />
          </Card>
        </div>
        <div className="col-12 col-md-9 p-1  ">
          <Card
            body
            id="card-plot"
            className="ml-0 p-0"
            style={{ border: "1.5px solid #DFE0EB", boxShadow: "none",overflow: "auto", height: "50vh" }}
          >
              <Line data={dataChart} options={options2} height={"100%"} />
    
          </Card>

          <Card body className="ml-0 "  style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" ,height: "19vh"}}>
            <h2 className="business-title text-center general-title">
              {" "}
              Metricas Financieras Informativas
            </h2>
          </Card>
        </div>
      </div>
      <div className="col-12 col-md-3  p-2 d-md-none">
        <Card body   style={{ border: "1.5px solid #DFE0EB", boxShadow: "none" }}  className="ml-0 ">
        

            <h2 className="business-title general-title">Globales</h2>
            <h4 className="business-subtitle">Zona</h4>
            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {zona: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.zona}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.zona}
            />
            <h4 className="business-subtitle ">Sucursal</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {sucursal: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.sucursal}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.sucursal}
            />

            <h4 className="business-subtitle ">Cartera</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, globales: {cartera: [...value]}});
              }}
              components={animatedComponents}
              options={options.globales.cartera}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.globales.cartera}
            />
            <br />
            <hr className="m-0" />
            <h2 className="business-title pt-1  general-title">Comerciales</h2>

            <h4 className="business-subtitle">Grupo</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {grupo: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.grupo}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.grupo}
            />
            <h4 className="business-subtitle ">Ejecutivos</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {ejecutivos: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.ejecutivos}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.ejecutivos}
            />
            <h4 className="business-subtitle">Empresas</h4>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, comerciales: {empresas: [...value]}});
              }}
              components={animatedComponents}
              options={options.comerciales.empresas}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.comerciales.empresas}
            />

            <br />
            <hr className="m-0" />
            <h2 className="business-title pt-1  general-title">Producto</h2>

            <Select
              isMulti
              onChange={(value) => {
                setData({...data, producto: [...value]});
              }}
              components={animatedComponents}
              options={options.producto}
              placeholder="Select One"
              removeSelected={false}
              simpleValue
              value={data.producto}
            />
            <br />
            <hr className="m-0" />
            <h2 className="business-title general-title ">Periodo</h2>
            <div className="container-datepicker">
              <DatePicker
                className="datepicker"
                ref={pickerOne}
                onChange={(value) => {
                  const newDate = value.split("-");
                  switch (parseInt(newDate[1])) {
                    case 1:
                      newDate[1] = "ENE";
                      break;
                    case 2:
                      newDate[1] = "FEB";
                      break;
                    case 3:
                      newDate[1] = "MAR";
                      break;
                    case 4:
                      newDate[1] = "ABR";
                      break;
                    case 5:
                      newDate[1] = "MAY";
                      break;
                    case 6:
                      newDate[1] = "JUN";
                      break;
                    case 7:
                      newDate[1] = "JUL";
                      break;
                    case 8:
                      newDate[1] = "AGO";
                      break;
                    case 9:
                      newDate[1] = "SEP";
                      break;
                    case 10:
                      newDate[1] = "OCT";
                      break;
                    case 11:
                      newDate[1] = "NOV";
                      break;
                    case 12:
                      newDate[1] = "DIC";
                      break;
                    default:
                      break;
                  }
                  newDate[2] = newDate[2].split("T")[0];
                  setData({
                    ...data,
                    date: {first_date: newDate.toString().replaceAll(",", "/")},
                  });
                }}
              />
              <span className="result-picker">{data.date.first_date}</span>
            <br />
          <DatePicker className="datepicker" />
            </div>
          <hr/>
          <Line data={dataChart} options={options2} height={"200%"} />
          <hr />
               <h2 className="business-title text-center general-title pb-5">
              
              Metricas Financieras Informativas
            </h2>
        </Card>
        
     </div>


    </div>
  );
}
