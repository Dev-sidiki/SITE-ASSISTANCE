import React, { useState } from "react";
import Login from "../../Components/login/Login.composant.js.js";
import RecupCodePin from "../../Components/password-reset/RecupCodePin.composant.js";
import "../../Styles/home/home.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

const Home = () => {
  // le state qui permet au client de changer de formulaire
  const [formLoading, setFormLoading] = useState("login");

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
  };

  // la fonction qui affiche le formulaire
  // demandé par le client
  const formSwitcher = (frmType) => {
    setFormLoading(frmType);
  };

  return (
    <div>
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
      </header>

      <div className="bg-secondary text-center fs-4">
        Bienvenu sur le site d'assistance de Demandside Instrument <br />
        Votre préocupation est notre priorité
      </div>
      <div className="accueil-page text-bg-secondary">
        <div class="mt-4 p-5 bg-light text-white rounded form-box">
          {/* le formulaire affiché par defaut */}
          {formLoading === "login" && <Login typeForm={formSwitcher} />}
          {/* le formulaire affiché lorsque on veut modifier le mot de passe */}
          {formLoading === "modifPassword" && (
            <RecupCodePin
              handleOnResetSubmit={handleOnResetSubmit}
              formSwitcher={formSwitcher}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
