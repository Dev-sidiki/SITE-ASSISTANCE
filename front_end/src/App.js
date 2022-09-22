import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/home/Home.page.js";
import InscriptionPage from "./Pages/inscription/Inscription.page.js";
import UpdatePasswordPage from "./Pages/password-rest/UpdatePassword.page";
import Dashboard from "./Pages/dashboard/Dashboard.page";
import AddTicket from "./Pages/addTicket/AddTicket.page";
import Ticket from "./Pages/ticket/Ticket.page";
import ListTicket from "./Pages/listeTicket/ListTicket.page";
import DefaultLayout from "./layout/DefaultLayout.js";
import RecupPinPage from "./Pages/password-rest/RecupPinPage";
import { useSelector } from "react-redux";
import "./Styles/App.css";
// import { getNewAccesUserProfil, getUserProfil } from "./Actions/userAction.js";
// Ce composant contient toute la logique de notre application
function App() {
  const { user, isConnect } = useSelector((state) => state.userReducer);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* route pour acceder à la page d'accueil */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* route pour acceder à la page d'inscription */}
          <Route exact path="/inscription">
            <InscriptionPage />
          </Route>
          {/* route pour acceder à la page de recuperation de codepin */}
          <Route exact path="/recup-pin">
            <RecupPinPage />
          </Route>
          {/* route pour acceder à la page de modif de mot de passe */}
          <Route exact path="/modif-password">
            <UpdatePasswordPage />
          </Route>
          {/* creation de la mise en page de nos composant route*/}
          {user && user._id && isConnect && (
            <DefaultLayout>
              {/* route pour acceder au tableau de bord*/}
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              {/* route pour acceder à la page d'ajout du ticket */}
              <Route exact path="/ajout-ticket">
                <AddTicket />
              </Route>
              {/* route pour acceder à la page de visualisation d'un ticket*/}
              <Route exact path="/ticket/:tId">
                <Ticket />
              </Route>
              {/* route pour acceder à la liste des ticket */}
              <Route exact path="/list-tickets">
                <ListTicket />
              </Route>
            </DefaultLayout>
          )}

          <Route path="*">
            <h1>404 Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
