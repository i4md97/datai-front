import React from 'react'

import { Spinner } from "reactstrap"

export default function LoadingPage() {
    return (
        <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner style={{ width: "10vh", height: "10vh" }} className="spinner" children="" />
        </div>
    )
}
