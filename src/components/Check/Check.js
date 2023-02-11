import React from 'react'

import { CustomInput } from "reactstrap"
export default function Check({ className, setCheckForm, checkForm, id }) {
    return (
        <div onClick={() => { setCheckForm(id) }}>
            <CustomInput type="checkbox" className={`${checkForm === id ? "custom-check" : "custom-check-active"} ${className ? className : ""}`} id={id} />
        </div>
    )
}
