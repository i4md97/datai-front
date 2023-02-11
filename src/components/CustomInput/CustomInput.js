import React from "react";
export default function CustomInput({
  value,
  id,
  onChange,
  onBlur,
  title,
  error,
  dropdown,
  placeholder,
  number
}) {
  const handleChange = (e) => {
    
    if(number && (e.target.value >= parseInt(number) || e.target.value === "")){
      onChange(e);
    }
    if(!number){
      onChange(e);

    }
  };

  //COMPONENTE REUTILIZABLE PARA LA PAGINA DE NUEVOS PROSPECTOS.
  return (
    <div className={`custom-input`}>
      <div className="custom-container">
        <p className={`custom-input-title ${error && "custom-title-error"}`}>
          {title}:
        </p>
        <div className={`custom-input-container ${error && "custom-error"}`}>
          {dropdown ? <>
            <select 
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            id={id}
            name={id}
            className="custom-input-text">
              <option> Selecciona una </option>
              {dropdown.map((element,i) => <option key={i} value={element.key}> {element.content} </option>)}
              </select>
          </> :  <input
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            type={`${number ? "number" : "text" }`}
            id={id}
            name={id}
            placeholder={placeholder}
            className="custom-input-text"
          />}
        
        </div>
      </div>
    </div>
  );
}
