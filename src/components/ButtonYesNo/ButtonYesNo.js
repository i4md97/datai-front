import { useState } from "react";

export const ButtonYesNo = ({
  callback = () => {},
  setter = null,
  parameter = ""
}) => {
  const [isChekced, setIsChecked] = useState(false);

  const toggleHandler = () => {
    let newValue = isChekced;
    setIsChecked(prev => {
      newValue = !prev;
      return !prev;
    });
    if (callback) {
      if (setter) {
        setTimeout(() => {
          callback(setter, parameter, newValue);
        });
      }
    }
  }

  return (
    <button
      onClick={toggleHandler}
      className={`${isChekced ? "checkButtonActive" : "checkButton"}`}
    >
      {isChekced ? "Si" : "No"}
    </button>
  )
}