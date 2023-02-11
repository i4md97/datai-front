import React,{useContext} from "react";
import { Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import UsuarioContext from "../../context/usuario/UsuarioContext"

import "react-toastify/dist/ReactToastify.css";
export default function FinalStepModal({ modal, setModal, handleSave, loading }) {

 const {user} = useContext(UsuarioContext)

  return (
    <Modal centered  isOpen={modal}>
      <ModalBody>
          <div style={{textAlign:"center",padding:"2rem 0", fontSize:"23px",lineHeight:"25px"}}> 
       Hola, <strong>{user.name} {user.last_name}</strong> ¿Desea finalizar y tramitar esta venta?
          </div>
      </ModalBody>
      <ModalFooter
        className=" row m-0"
        style={{ justifyContent: "space-around" }}
      >
        <button
          disabled={ loading}
          className=" form-cedula-submit col-12 col-md-5 m-0 btn-modal"
          style={{ width: "49%", height:"55px",fontSize:"16px" }}
          color="secondary"
          onClick={() => {
            setModal(false)
          }}
        >
          No, necesito revisar detalles
        </button>
        <button
          disabled={ loading}
          className=" form-cedula-submit col-12 col-md-5 m-0 mt-3 mt-md-0 btn-modal form-cedula-modal"
          style={{ width: "50%",height:"55px",fontSize:"16px" }}
          onClick={handleSave}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Si, quiero tramitar esta venta"
          )}
        </button>
      </ModalFooter>
    </Modal>
  );
}
