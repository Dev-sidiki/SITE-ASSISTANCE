import React from "react";
import Login from "../../Components/login/Login.composant.js.js";
import "../../Styles/home/home.css";
import logoDsi from "../../Assets/image/logoDsi.png";
import Footer from "../../layout/partials/Footer.composant.js";

// le composant qui affiche la page d'accueil de notre site
const Home = () => {
  return (
    <div>
      {/* l'entête de la page */}
      <header className="header bg-secondary">
        {" "}
        <img src={logoDsi} alt="logo" width="150px" />
      </header>
      {/* le message de bienvenu */}
      <div className="bg-secondary text-center fs-4">
        Bienvenu sur DSI HELP CUSTOMERS <br />
        Votre préocupation est notre priorité
      </div>
      <div className="accueil-page text-bg-secondary">
        {/* le formulaire de connexion */}
        <div className="mt-4 p-5 bg-light text-white rounded form-box">
          <Login />
        </div>
      </div>
      {/* le pied de page */}
      <Footer />
    </div>
  );
};

export default Home;
