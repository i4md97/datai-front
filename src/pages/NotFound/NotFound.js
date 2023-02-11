import React from "react";
import { useHistory } from "react-router-dom";

// Components
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "reactstrap";

//Styles
import "react-toastify/dist/ReactToastify.css";

export const NotFound = () => {
  const history = useHistory();

  const backToHomeHandler = () => {
    history.push("/inicio/evolucion-semanal");
  }

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              <span className="account__logo">
                <span className="account__logo-accent">Ooops! </span>
              </span>
              Page Not found
            </h3>
          </div>
          <div className="text-center">
            <h3 className="account__title">
              <ExitToAppIcon style={{ fontSize: "150px" }} />
            </h3>
            <h4 style={{ fontSize: "30px", fontWeight: "700" }}>404</h4>
          </div>
          <div className="pt-4 d-flex justify-content-center">
            <Button className="btn-primary text-white" onClick={backToHomeHandler}>Back to Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;