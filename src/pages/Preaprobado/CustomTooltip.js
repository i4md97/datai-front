import { useState } from "react";

import { Tooltip } from "reactstrap";

const CustomTooltip = ({ id, tooltipText, className }) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip 
        className={`datai-tooltip ${className}`}
        target={`#${id}`}
        isOpen={open}
        toggle={ () => setOpen(prev => !prev) }
      >
        {tooltipText}
      </Tooltip>
    </>
  )
}

export default CustomTooltip;