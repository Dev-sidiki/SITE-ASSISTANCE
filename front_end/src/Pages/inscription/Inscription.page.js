import React from "react";

import InscriptionForm from "../../Components/Inscription/Inscription.composant.js";
import "../../Styles/inscription/inscription.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

// le composant qui contient notre page d'inscription
const InscriptionPage = () => {
  return (
    <div>
      {/* l'entête de la page */}
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
        {/* le message de bienvenu */}
        <div className="bg-secondary text-center fs-4">
          Bienvenu sur DSI HELP CUSTOMERS <br />
          Votre préocupation est notre priorité
        </div>
      </header>
      <div className="registration-page bg-secondary">
        <div className="mt-5">
          {/* le formulaire d'inscription */}
          <div className="mt-4 p-5 bg-light text-white rounded form-box">
            <InscriptionForm />
          </div>
        </div>
      </div>
      {/* le pied de page */}
      <Footer />
    </div>
  );
};

export default InscriptionPage;
