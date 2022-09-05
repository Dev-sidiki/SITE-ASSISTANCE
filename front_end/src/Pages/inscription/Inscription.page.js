import React from "react";
import InscriptionForm from "../../Components/Inscription/Inscription.composant.js";
import "../../Styles/inscription/inscription.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

const InscriptionPage = () => {
  return (
    <div>
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
        <div className="bg-secondary text-center fs-4">
          Bienvenu sur le site d'assistance de Demandside Instrument <br />
          Votre préocupation est notre priorité
        </div>
      </header>
      <div className="registration-page bg-secondary">
        <div className="mt-5">
          <div class="mt-4 p-5 bg-light text-white rounded form-box">
            <InscriptionForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InscriptionPage;
