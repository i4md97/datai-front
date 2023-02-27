import { useEffect } from "react";
import { useState } from "react";
import { Input } from "reactstrap";

export const ControlledInput = ({
  id="",
  type = "text", 
  pattern,
  placeholder = "",
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
      callback(inputValue, id);
    }
  }

  return (
    <Input id={id} style={{fontSize: "14px"}} type={type} pattern={pattern} placeholder={placeholder} className={className} value={value} onChange={onChangeHandler} />
  )
}