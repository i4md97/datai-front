import { useEffect } from "react";
import { useState } from "react";

import { Input, InputGroup, InputGroupText } from "reactstrap";

import "./ControlledInput.scss";

export const ControlledInput = ({
  id="",
  type = "text",
  readOnly = false,
  pattern,
  placeholder = "",
  className = "", 
  defaultValue = "",
  updatedValue, 
  mask = null,
  callback,
  isTriggered = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(()=>{
    if (isTriggered && callback) {
      callback(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if (updatedValue) {
      setValue(updatedValue);
    }
  },[updatedValue]);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (callback) {
      callback(inputValue, id);
    }
  }

  return (
    <InputGroup className="fe-controlled-input">
      {mask === "₡" && <InputGroupText className={"left "}>
        ₡
      </InputGroupText>}
      <Input 
        id={id} 
        type={type} 
        readOnly={readOnly} 
        pattern={pattern} 
        placeholder={placeholder} 
        className={className} 
        value={value} 
        onChange={onChangeHandler} 
      />
      {mask === "%" && <InputGroupText className={"right "}>
        %
      </InputGroupText>}
    </InputGroup>
  )
}