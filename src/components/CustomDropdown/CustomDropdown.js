import {useState} from "react";

// Bootstrap
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Input } from "reactstrap";

// Icons
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

// Styles
import "./CustomDropdown.scss";
import { useEffect } from "react";

export const CustomDropdown = ({
  id = "", 
  className = "", 
  disabled = false, 
  classNameButton = "", 
  options = [], 
  defaultOption = "",
  selectedOption = "",
  name = "",
  setter = null,
  property = "",
  callback = () => {}}
) => {

  const [optionSelected, setOptionSelected] = useState(defaultOption);

  useEffect(() => {
    if (selectedOption) {
      const optionFound = options.find(option => option === selectedOption);
      if (optionFound) {
        setOptionSelected(selectedOption);
      } else {
        setOptionSelected(defaultOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedOption]);

  const onChangeHandler = (option) => {
    return () => {
      setOptionSelected(option);
      if (callback) {
        if (setter) {
          callback(setter, option, property);
        } else {
          callback(option, id);
        }
      }
    }
  }
  
  return (
    <>
    <UncontrolledDropdown 
      className={`sw-datai-dropdown ${className} ${disabled ? "disabled" : ""}`}
      id={id}
      disabled={disabled}
    >
      <DropdownToggle className={`custom-dropdown icon icon--right w-100 d-flex justify-content-between ${classNameButton}`} outline>
        <p>{optionSelected}</p>
        <ChevronDownIcon />
      </DropdownToggle>
      <DropdownMenu className="dropdown__menu w-100">
        <DropdownItem disabled>{"SELECCIONAR"}</DropdownItem>
        {options.map((element, index) => (
          <DropdownItem key={`profesion-oficio-option-${index}`} onClick={onChangeHandler(element)}>{element}</DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
    {name && <Input type="hidden" name={name} value={optionSelected} onChange={() => {}} />}
    </>
  )
}