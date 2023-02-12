import {useState} from "react";

// Bootstrap
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

// Icons
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

// Styles
import "./CustomDropdown.scss";
import { useEffect } from "react";

const CustomDropdown = ({
  id = "", 
  className = "", 
  disabled = false, 
  classNameButton = "", 
  options = [], 
  defaultOption = "",
  selectedOption = "",
  callback = () => {}}
) => {

  const [optionSelected, setOptionSelected] = useState(defaultOption);

  useEffect(() => {
    if (selectedOption) {
      const optionFound = options.find(option => option === selectedOption);
      if (optionFound) {
        setOptionSelected(selectedOption);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setOptionSelected(defaultOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedOption]);

  const onChangeHandler = (option) => {
    return () => {
      console.log('!!!');
      setOptionSelected(option);
      if (callback) {
        callback(option);
      }
    }
  }
  
  return (
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
        <DropdownItem disabled>{defaultOption}</DropdownItem>
        {options.map((element, index) => (
          <DropdownItem key={`profesion-oficio-option-${index}`} onClick={onChangeHandler(element)}>{element}</DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default CustomDropdown;