import React from "react";
import UpdatePassword from "../../Components/password-reset/UpdatePassword.composant.js";
import "../../Styles/updatePassword/updatePassword.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";
import { Link } from "react-router-dom";

// le composant qui affiche la page de modification du mot de passe
const UpdatePasswordPage = () => {
  return (
    <div>
      {" "}
      {/* l'entête de notre page */}
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
        {/* le message de bienvenu */}
        <div className="bg-secondary text-center fs-4">
          Bienvenu sur DSI HELP CUSTOMERS <br />
          Votre préocupation est notre priorité
        </div>
      </header>
      <div className="entry-page bg-secondary">
        {/* le formulaire de modification du mot de passe */}
        <div className="mt-4 p-5 bg-light text-white rounded form-box">
          <UpdatePassword />
          <br />
          <div className="text-center text-dark">
            Pour vous connecter à nouveau?
            <br />
            {/* le lien pour aller a la page d'accueil(page de connexion) */}
            {/* après la modification du mot de passe */}
            <Link to={"/"} className="text-dark">
              Cliquez ici
            </Link>
          </div>
          <br />
        </div>
      </div>
      {/* pied de page */}
      <Footer />
    </div>
  );
};

export default UpdatePasswordPage;
