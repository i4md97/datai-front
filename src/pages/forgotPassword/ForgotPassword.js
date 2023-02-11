import React, {useContext, useState} from "react";
import {useHistory, NavLink} from "react-router-dom";

// Components
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Spinner} from "reactstrap";
import {ContactMail} from "@material-ui/icons";

// Helpers
import {useFormik} from "formik";
import UsuarioContext from "../../context/usuario/UsuarioContext";
import * as yup from "yup";

// Services
import petition_post from "../../utils/petitions/petition_post";

//toast
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  toast.configure();

  //Redirect
  const history = useHistory();


  //States
  const [loading, setLoading] = useState(false);
  const {changeUser} = useContext(UsuarioContext);
  const [send,setSend] = useState(false)


 //Controller of Form 
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Es Requerido el Usuario"),
    }),
    onSubmit: (e) => {
     setSend(true)
    },
  });

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">Recuperar 
              <span className="account__logo">
                <span className="account__logo-accent"> Contraseña</span>
              </span>
            </h3>
          </div>
          <div className="text-center">
            <h3 className="account__title">
              <ExitToAppIcon style={{fontSize: "150px"}} />
            </h3>
            <h4 style={{fontSize: "30px", fontWeight: "700"}} >BRISK FINANCING</h4>
          </div>
          {send 
          ? <h3 className="pt-4 text-center" style={{color:"rgba(255,255,255,.7)"}}>Hemos enviando un Email de Confirmacion a tu correo.</h3>   
          : <form className="pt-4" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="login-label d-none d-sm-block">
              Correo Electrónico
            </label>
            <div
              className={`login-group mt-2 ${
                formik.touched.email && formik.errors.email && "login-error"
              } `}
            >
              <div className="input-group">
                <div className="icon p-2">
                  <ContactMail />
                </div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  id="email"
                  component="input"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="login-input"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="btn btn-outline-primary account__btn"
              type="submit"
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
                "ENVIAR"
              )}
            </button>
          </form> 
        }
        <div className="account__or">
          <p>¿Quieres iniciar sesion?</p>
          <NavLink to="/">
            Iniciar Sesión
          </NavLink>
        </div>
        </div>
      </div>
      {/* <div className="login-container m-auto">
        <h3 className="account__title text-center pb-3">
          <ExitToAppIcon
            style={{color: "white", fontSize: "150px"}}
          ></ExitToAppIcon>
        </h3>
        <h4
          className="text-center"
          style={{color: "white", fontSize: "30px", fontWeight: "700"}}
        >
          {" "}
          BRISK FINANCING
        </h4>

        {send 
          ? <h3 className="pt-4 text-center" style={{color:"rgba(255,255,255,.7)"}}>Hemos enviando un Email de Confirmacion a tu correo.</h3>   
          : <form className="pt-4" onSubmit={formik.handleSubmit}>
            <div
              className={`login-group mt-2 ${
                formik.touched.email && formik.errors.email && "login-error"
              } `}
            >
              <label htmlFor="email" className="login-label d-none d-sm-block">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.83333 9.16667V5.83333C5.83333 4.72827 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 9.99999 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83333V9.16667"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                id="email"
                component="input"
                type="email"
                placeholder="INGRESA TU CORREO ELECTRONICO"
                className="login-input"
              />
            </div>

            <button
              disabled={loading}
              className="login-submit mt-3"
              style={{
                background: "white",
                color: "rgb(33,72,192)",
                fontWeight: "700",
              }}
              type="submit"
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
                "ENVIAR"
              )}
            </button>
            <p className="text-right" style={{color:"rgba(255,255,255,.7)", cursor:"pointer"}} onClick={()=>{history.push("/")}} > ¿Quieres iniciar sesion?</p>
          </form> 
        }
      </div> */}
    </div>
  );
}
