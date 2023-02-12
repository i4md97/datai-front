import {useState} from "react";

// Bootstrap
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

// Icons
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

// Styles
import "./CustomDropdown.scss";

const CustomDropdown = ({id = "", className, classNameButton, options, defaultOption, callback = () => {}}) => {

  const [optionSelected, setOptionSelected] = useState(defaultOption);

  const onChangeHandler = (option) => {
    return () => {
      setOptionSelected(option);
      callback(option);
    }
  }
  
  return (
    <UncontrolledDropdown 
      className={`sw-datai-dropdown ${className}`}
      id={id}
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