import React from "react";
import logoDsi from "../../Assets/image/logoDsi.png";
import { Link } from "react-router-dom";
import { userLogout } from "../../Actions/userAction";
import { useDispatch } from "react-redux";

// le composant qui contient l'entetede de notre page
const Header = () => {
  const dispatch = useDispatch();

  //fonction pour la deconnexion
  const logMeOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    // en cas de confirmation on appel la fonction de supression
    dispatch(userLogout());
    window.location = "/";
  };

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
          <Link
            to={"/"}
            onClick={logMeOut}
            className="text-dark p-5 font-monospace fs-5"
          >
            Se deconnecter
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
