import React from "react";
import RecupCodePin from "../../Components/password-reset/RecupCodePin.composant.js";
import "../../Styles/updatePassword/updatePassword.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

// le composant qui contient la page de recuperation du codepin
const RecupPinPage = () => {
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
        {/* le formulaire de recupertion du codepin */}
        <div className="mt-4 p-5 bg-light text-white rounded form-box">
          <RecupCodePin />
          <br />
        </div>
      </div>
      {/* le pied de page */}
      <Footer />
    </div>
  );
};

export default RecupPinPage;
