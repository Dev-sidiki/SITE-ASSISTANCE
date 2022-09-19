import React, { useEffect } from "react";
import logoDsi from "../../Assets/image/logoDsi.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLogout } from "../../Actions/userAction";
import { useSelector } from "react-redux";

// le composant qui contient l'entetede de notre page
const Header = () => {
  const { isConnect } = useSelector((state) => state.userReducer);

  // variable de navigation
  const history = useHistory();

  //fonction pour la deconnexion
  const logMeOut = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    userLogout() && history.push("/");
  };

  // cette fonction sera lancé pendant la deconnection
  useEffect(() => {
    if (!isConnect) {
      logMeOut();
    }
  }, [isConnect, history]);

  return (
    <nav className="navbar navbar-light bg-secondary">
      <a className="navbar-brand" href=" ">
        {/* logo du site */}
        <img src={logoDsi} alt="logo" width="50px" />
        DSI
      </a>

      <ul className="nav navbar-nav flex-row ">
        {/* lien vers le tablaeu de bord */}
        <li>
          <Link
            to={"/dashboard"}
            className="text-dark p-4 font-monospace fs-5 "
          >
            Tableau de bord
          </Link>
        </li>
        <li>
          {/* lien vers la liste des tickets */}
          <Link
            to={"/list-tickets"}
            className="text-dark p-5 font-monospace fs-5"
          >
            Tickets
          </Link>
        </li>

        <li>
          {/* liens de deconnexion */}
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
