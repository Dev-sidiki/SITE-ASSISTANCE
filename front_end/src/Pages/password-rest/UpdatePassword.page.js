import React from "react";
import RecupCodePin from "../../Components/password-reset/RecupCodePin.composant.js";
import "../../Styles/updatePassword/updatePassword.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";
const UpdatePasswordPage = () => {
  return (
    <div>
      {" "}
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
        <div className="bg-secondary text-center fs-4">
          Bienvenu sur le site d'assistance de Demandside Instrument <br />
          Votre préocupation est notre priorité
        </div>
      </header>
      <div className="entry-page bg-secondary">
        <div class="mt-4 p-5 bg-light text-white rounded form-box">
          <RecupCodePin />
          {/* <UpdatePassword /> */}
          <br />
          <div className="text-center text-dark">
            Pour vous connectez à nouveau?
            <br />
            <a href="/" className="text-dark">
              Cliquez ici
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePasswordPage;
