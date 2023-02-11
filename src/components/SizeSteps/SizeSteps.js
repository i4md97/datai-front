import React, { useContext } from "react";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import PreaprobadoContext from "../../context/preaprobados/PreaprobadoContext";
export default function StepTen({name, className}) {
 const {sizeSteps,changeSizeStep,size} = useContext(PreaprobadoContext)


 const findAndUpdateSize = () => {
     if(sizeSteps[name]){
         const value = sizeSteps[name] + 1
         changeSizeStep({name, value})
     }
     else{
         const value= parseInt(size) + 1
        changeSizeStep({name, value})
     }
 }

 const findAndUpdateSizeRest = () => {
     
     if(sizeSteps[name]){
         const value = sizeSteps[name] - 1
         changeSizeStep({name, value})
     }
     else{
         const value= parseInt(size) - 1
        changeSizeStep({name, value})
     }
 }

  return (
    <div
      className={`font-size-widget ${className ? className : ""}`}
      style={{
        position: "absolute",
        right: "10px",
        top: "10px",
      }}
    >
       <div
        style={{ width: "40px",zIndex:"1", cursor:'pointer', height: "40px" }}
        onClick={findAndUpdateSizeRest}
      >
        <RemoveSharpIcon />
      </div>
      <div
        style={{ width: "40px",zIndex:"1", cursor: "pointer", height: "40px" }}
        onClick={findAndUpdateSize}
      >
        <AddSharpIcon />
      </div>
     
    </div>
  );
}
