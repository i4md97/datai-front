import { useEffect } from "react";
import { useState } from "react";
import { Input } from "reactstrap";

export const ControlledInput = ({
  type = "text", 
  pattern,
  className = "", 
  defaultOption = "", 
  dbValue, 
  callback 
}) => {
  const [value, setValue] = useState(defaultOption);

  useEffect(()=>{
    if (dbValue) {
      setValue(dbValue);
    }
  },[dbValue]);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (callback) {
      callback(inputValue);
    }
  }

  return (
    <Input type={type} pattern={pattern} className={className} value={value} onChange={onChangeHandler} />
  )
}