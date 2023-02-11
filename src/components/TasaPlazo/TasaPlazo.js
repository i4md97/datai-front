import React from 'react'

export default function TasaPlazo({ setTasa, tasa, setPlazo, plazo, pdf }) {
    return (
        <>
            <td className="table-custom-input">
                <div>
                    {pdf ? tasa : <input
                        disabled={true}
                        value={tasa}
                        onChange={(e) => {
                            setTasa(e.target.value);
                        }}
                        type="number"
                        className="mt-0 text-center form-cedula-input"
                    />
                    }
                    <p className="m-0" > %</p>
                </div>
            </td>
            <td className="table-custom-input">
                <div>
                    {pdf ? plazo : <input
                        disabled={true}
                        value={plazo}
                        onChange={(e) => {
                            setPlazo(e.target.value);
                    }}
                        type="number"
                        className="mt-0 text-center form-cedula-input"
                    />
                    }
                    <p className="m-0"> Meses</p>
                </div>
            </td>

        </>
    )
}
