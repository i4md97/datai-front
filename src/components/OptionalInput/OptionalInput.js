import { useState } from "react"
import { Input, InputGroup, InputGroupText } from "reactstrap"

export const OptionalInput = ({
  className,
  name,
  setter = null,
  property = "",
  callback = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState("");

  const changeCheckHandler = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (!checked) {
      setValue("");
      if (callback) {
        setTimeout(() => {
          callback(setter, "", property);
        });
      }
    }
  }

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
    if (callback) {
      callback(setter, value, property);
    }
  }

  return (
    <InputGroup className="mb-4">
      <InputGroupText>
        <Input
          addon
          aria-label="Checkbox for following text input"
          type="checkbox"
          checked={isChecked}
          onChange={changeCheckHandler}
        />
      </InputGroupText>
      <Input 
        className={className}
        disabled={!isChecked}
        type="text"
        name={name}
        value={value}
        onChange={handleChangeValue}
      />
    </InputGroup>
  )
}