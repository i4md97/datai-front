import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import PreaprobadoContext from "../../context/preaprobados/PreaprobadoContext";
import UsuarioContext from "../../context/usuario/UsuarioContext";

//Styles for FontSize - Gestiona el cambio de el tamano y estilos muy precisos que no permite css
const PdfHeaderStyle = styled.div`
  .text {
    font-weight: 600;
    color: black;
    font-size: 13px;
    margin: 0;
  }
  span {
    font-weight: 500;
  }
  .titulo {
    color: black;
  }
`;

export default function PdfHeader({ title, pagination }) {
  const { cedula } = useContext(PreaprobadoContext);
  const { user } = useContext(UsuarioContext);
  return (
    <PdfHeaderStyle className="row pb-2">
      <div className="col-5">
        <img
          className="img-fluid"
          style={{ width: "200px" }}
          src={logo}
          alt="Logo Datai"
        />
      </div>
      <div
        className="col-7 d-flex"
        style={{ paddingTop: "1rem", justifyContent: "flex-end" }}
      >
        <div className=" border p-2">
          <p className="  text">
            Banco: <span> BancoABC</span>
          </p>
          <p className=" text">
            Fecha: <span> {new Date().toLocaleDateString()}</span>
          </p>
          <p className=" text">
            No. Pag: <span> {pagination} de 9</span>
          </p>
        </div>
        <div className="border p-2">
          <p className=" text">
            Usuario:
            <span>
              {" "}
              {user && user.name} {user && user.last_name}
            </span>
          </p>
          <p className=" text">
            Cedula: <span> {cedula && cedula.cedula}</span>
          </p>
          <p className=" text">
            Correo: <span> {user && user.email}</span>
          </p>
        </div>
      </div>
      <h3 className="col-12 text-center titulo mt-5 mb-0"> {title}</h3>
    </PdfHeaderStyle>
  );
}
