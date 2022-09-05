import React from "react";
import Login from "../../Components/login/Login.composant.js.js";
import "../../Styles/home/home.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

const Home = () => {
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
          <Login />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
