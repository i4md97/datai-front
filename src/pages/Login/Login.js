import React, { useEffect, useContext, useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";

import UsuarioContext from "../../context/usuario/UsuarioContext";

// Components
import { useFormik } from "formik";
import { Spinner } from "reactstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { toast } from "react-toastify";
import { Person, Lock } from "@material-ui/icons";

// Utils
import petition_post from "../../utils/petitions/petition_post";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

//Styles
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  toast.configure();

  const history = useHistory();

  // States
  const [loading, setLoading] = useState(false);
  const { changeUser } = useContext(UsuarioContext);
  const [data, setData] = useState(null);

  // Form Controller
  const formik = useFormik({
    initialValues: {
      username: "ejecutivo@banco.com",
      password: "ejecutivo",
    },

    validationSchema: yup.object({
      username: yup.string().required("Es Requerido el Usuario"),
      password: yup.string().required("Es Requerido la Contraseña"),
    }),

    onSubmit: (e) => {
      setData({
        active: ["999999997", "999999998", "999999998", "999999999", "999999999", "999999999", ""],
        can_save: false,
        country: "Costa Rica",
        country_c: "CRC",
        email: "ejecutivo@banco.com",
        firm: "Banco",
        firm_c: "Banco",
        last_name: "Parrales",
        name: "Tony",
        role: "Ejecutivo"
      })
      /* setLoading(true);
      petition_post("login", { body: { email: e.username, passw: e.password } })
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
            setData(result.data);

            // changeUser(result.data);
            // history.push("/inicio/evolucion-semanal");

            setLoading(false);
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

  const onChange = () => {
    if (captchaRef.current.getValue()) {
      changeUser(data);
      history.push("/inicio/evolucion-semanal");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    if (data) {
      changeUser(data);
      history.push("/inicio/evolucion-semanal");
    }
  }, [data]);

  const captchaRef = useRef();

  const useCaptcha = false;

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Bienvenido a
              <span className="account__logo">
                <span className="account__logo-accent"> FRONT</span>
              </span>
            </h3>
          </div>
          <div className="text-center">
            <h3 className="account__title">
              <ExitToAppIcon style={{ fontSize: "150px" }} />
            </h3>
            <h4 style={{ fontSize: "30px", fontWeight: "700" }}>FRONT</h4>
          </div>

          {data && useCaptcha ? (
            <div
              className="login-recaptcha pt-4"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 0",
              }}
            >
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6Ld0Fj0eAAAAALKyppZzaJxXC5SrdcDB2Snohzjx"
                onChange={onChange}
              />
            </div>
          ) : (
            <>
              {" "}
              <form className="pt-4" /* onSubmit={formik.handleSubmit} */>
                <label htmlFor="username">Username</label>
                <div
                  className={`login-group${
                    formik.touched.username && formik.errors.username
                      ? " login-error"
                      : ""
                  }`}
                >
                  <div className="input-group d-flex align-items-center">
                    <div className="icon p-2">
                      <Person />
                    </div>
                    <input
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="username"
                      id="username"
                      component="input"
                      type="text"
                      placeholder="USUARIO"
                      className="login-input"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <label htmlFor="password">Contraseña</label>
                <div
                  className={`login-group ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "login-error"
                  } `}
                >
                  <div className="input-group d-flex align-items-center">
                    <div className="icon p-2">
                      <Lock />
                    </div>
                    <input
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                      id="password"
                      component="input"
                      type="password"
                      placeholder="CONTRASEÑA"
                      className="login-input"
                    />
                  </div>
                </div>
                <div className="text-right pb-3">
                  <NavLink to="/forgot">¿Olvidaste tu Contraseña? </NavLink>
                </div>

                <div className="text-center">
                  <button
                    disabled={loading}
                    className="btn btn-outline-primary account__btn"
                    onClick={submitHandler}
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
                </div>
              </form>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
