import React, {useContext, useState} from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useHistory} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import petition_post from "../../utils/petitions/petition_post";
import UsuarioContext from "../../context/usuario/UsuarioContext";
import {Spinner} from "reactstrap";

//toast
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecoverPassword() {
  toast.configure();

  //Redirect
  const history = useHistory();


  //States
  const [loading, setLoading] = useState(false);
  const {changeUser} = useContext(UsuarioContext);


 //Controller of Form 
  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    validationSchema: yup.object({
      confirmPassword: yup.string().required("Es Requerido la Contraseña"),
      password: yup.string().required("Es Requerido la Confirmacion"),
    }),
    onSubmit: (e) => {
        if(e.password === e.confirmPassword){
            
            
           
            toast.success("Contraseña Actualizada", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
           history.push("/")
        }else{
            toast.error("Las Contraseñas no son iguales", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
   /*    setLoading(true);
      petition_post("login", {body: {email: e.username, passw: e.password}})
        .then((result) => {
          if (result.data === 404) {
            toast.error("Credenciales Invalidas", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return setLoading(false);
          }

          if (result.data) {
            changeUser(result.data);
            setLoading(false);

            history.push("/inicio/evolucion-semanal");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error en la peticion", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        }); */
    },
  });

  return (
    <div className="row  d-flex m-0 login">
      <div className="login-container m-auto">
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

        <form className="pt-4" onSubmit={formik.handleSubmit}>
        

          <div
            className={`login-group mt-2 ${
              formik.touched.password && formik.errors.password && "login-error"
            } `}
          >
            <label htmlFor="password" className="login-label d-none d-sm-block">
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              component="input"
              type="password"
              placeholder="CONTRASENA"
              className="login-input"
            />
          </div>

          <div
            className={`login-group  ${
              formik.touched.confirmPassword && formik.errors.confirmPassword && "login-error"
            } `}
          >
            <label htmlFor="confirmPassword" className="login-label d-none d-sm-block">
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
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              id="confirmPassword"
              component="input"
              type="password"
              placeholder="CONFIRMAR"
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
              "ENTRAR"
            )}
          </button>

          <p className="text-right" style={{color:"rgba(255,255,255,.7)", cursor:"pointer"}} onClick={()=>{history.push("/forgot")}} > ¿Olvidaste tu Contraseña? </p>
        </form>
      </div>
    </div>
  );
}
