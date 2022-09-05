import React from "react";
import logoDsi from "../../Assets/image/logoDsi.png";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const logMeOut = () => {
    history.push("/");
  };
  return (
    <nav className="navbar navbar-light bg-secondary">
      <a className="navbar-brand" href=" ">
        <img src={logoDsi} alt="logo" width="50px" />
        DSI
      </a>

      <ul className="nav navbar-nav flex-row ">
        <li>
          <a href="/dashboard" className="text-dark p-4 font-monospace fs-5 ">
            Tableau de bord
          </a>
        </li>
        <li>
          <a href="/list-tickets" className="text-dark p-5 font-monospace fs-5">
            Tickets
          </a>
        </li>

        <li>
          <a
            href="/"
            onClick={logMeOut}
            className="text-dark p-5 font-monospace fs-5"
          >
            Se deconnecter
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
