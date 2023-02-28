import { useEffect, useState } from "react";

import { Row, Col } from "reactstrap";
import { CustomDropdown } from "../";

import { ubicaciones } from "../../db/ubicaciones";

const UbicacionesDropdowns = ({
  setter = null,
  property = "",
  callback = () => {},
}) => {
  const provinciasOptions = ubicaciones.map(ubicacion => ubicacion.provincia);
  
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [cantonDropdown, setCantonDropdown] = useState({options: [], disabled: true, selected: ""});
  const [distritoDropdown, setDistritoDropdown] = useState({options: [], disabled: true, selected: ""});

  useEffect(() => {
    if (callback) {
      callback(
        setter, 
        {
          provincia: provincia,
          canton: canton,
          distrito: distrito,
        },
        property
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provincia, canton, distrito]);
  
  const provinciaChangeHandler = (option) => {
    setProvincia(option);
    setCanton("");
    setDistrito("");
    const cantones = ubicaciones.find(ubicacion => ubicacion.provincia === option).cantones.map(place => place.canton);
    if (cantones) {
      setCantonDropdown({options: cantones, disabled: false, selected: option});
      setDistritoDropdown({options: [], disabled: true, selected: ""});
    }
  }
  
  const cantonChangeHandler = (option) => {
    setCanton(option);
    setDistrito("");
    const distritos = ubicaciones.find(ubicacion => 
      ubicacion.provincia === cantonDropdown.selected).cantones.find(place => place.canton === option).distritos;
    if (distritos) {
      setDistritoDropdown({options: distritos, disabled: false, selected: option});
    }
  }

  const distritoChangeHandler = (option) => {
    setDistrito(option);
  }

  return (
    <Row>
      <Col sm={4}>
        <label className="text-center general-title">Provincia</label>
        <CustomDropdown 
          className="w-100" 
          defaultOption="Seleccionar"
          options={provinciasOptions}
          callback={provinciaChangeHandler}
        />
      </Col>
      <Col sm={4}>
        <label className="text-center general-title">Cantón</label>
        <CustomDropdown 
          className="w-100" 
          defaultOption="Seleccionar"
          options={cantonDropdown.options}
          disabled={cantonDropdown.disabled}
          selectedOption={cantonDropdown.selected}
          callback={cantonChangeHandler}
        />
      </Col>
      <Col sm={4}>
        <label className="text-center general-title">Distrito</label>
        <CustomDropdown 
          className="w-100"
          defaultOption="Seleccionar"
          options={distritoDropdown.options}
          disabled={distritoDropdown.disabled}
          selectedOption={distritoDropdown.selected}
          callback={distritoChangeHandler}
        />
      </Col>
    </Row>
  )
}

export default UbicacionesDropdowns;