import React, { useEffect } from "react";
import ClientDefaultLayout from "./layout/ClientDefaultLayout.js";
import AdminDefaultLayout from "./layout/AdminDefaultLayout.js";
import Home from "./Pages/home/Home.page.js";
import InscriptionPage from "./Pages/inscription/Inscription.page.js";
import UpdatePasswordPage from "./Pages/password-rest/UpdatePassword.page";
import ClientDashboard from "./Pages/dashboard/ClientDashboard.page";
import AdminDashboard from "./Pages/dashboard/AdminDashboard.page.js";
import AddTicket from "./Pages/addTicket/AddTicket.page";
import Ticket from "./Pages/ticket/Ticket.page";
import ListClients from "./Pages/liste/ListClients.page.js";
import ListTicketClient from "./Pages/liste/ListTicketClient.page";
import ListAllTickets from "./Pages/liste/ListAllTickets.page.js";
import Chargement from "./Pages/logout/Chargement.js";
import RecupPinPage from "./Pages/password-rest/RecupPinPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfil, getNewAccesUserProfil } from "./Actions/userAction.js";

import "./Styles/App.css";

// Ce composant contient toute la logique de notre application
function App() {
  const { user, isConnect } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  // la fnction qui sera lancé quand on raffraichir la
  useEffect(() => {
    !user._id && dispatch(getUserProfil());

    !sessionStorage.getItem("token") &&
      !isConnect &&
      localStorage.getItem("token") &&
      dispatch(getNewAccesUserProfil());
  }, [dispatch, isConnect, user._id]);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* route pour accéder à la page d'accueil du site*/}
          <Route exact path="/">
            <Home />
          </Route>
          {/* route pour accéder à la page d'inscription du site */}
          <Route exact path="/inscription">
            <InscriptionPage />
          </Route>
          {/* route pour accéder à la page de récuperation de codepin */}
          <Route exact path="/recup-pin">
            <RecupPinPage />
          </Route>
          {/* route pour accéder à la page de modification de mot de passe */}
          <Route exact path="/modif-password">
            <UpdatePasswordPage />
          </Route>

          {isConnect && user._id && user.role === "admin" && (
            <AdminDefaultLayout>
              {/* route pour accéder au tableau de bord de l'admin*/}
              <Route exact path="/admin-dashboard">
                <AdminDashboard />
              </Route>
              accéder{" "}
              <Route exact path="/list-clients">
                <ListClients />
              </Route>
              {/* route pour accéder à la liste de tous les tickets clients*/}
              <Route exact path="/list-tickets">
                <ListAllTickets />
              </Route>
              {/* route pour accéder à la page de visualisation d'un ticket*/}
              <Route exact path="/ticket/:tId">
                <Ticket />
              </Route>
            </AdminDefaultLayout>
          )}
          {/* creation de la mise en page de nos composant route*/}
          {user && user._id && isConnect && user.role === "client" && (
            <div>
              <ClientDefaultLayout>
                {/* route pour acceder au tableau de bord du client*/}
                <Route exact path="/client-dashboard">
                  <ClientDashboard />
                </Route>

                {/* route pour acceder à la page d'ajout du ticket du client*/}
                <Route exact path="/ajout-ticket">
                  <AddTicket />
                </Route>
                {/* route pour acceder à la page de visualisation d'un ticket du client*/}
                <Route exact path="/ticket/:tId">
                  <Ticket />
                </Route>
                {/* route pour acceder à la liste des ticket du client*/}
                <Route exact path="/list-tickets-clients">
                  <ListTicketClient />
                </Route>
              </ClientDefaultLayout>
            </div>
          )}
          {/* route pour acceder à la page de chargement*/}
          <Route path="*">
            <Chargement />
          </Route>
          {/* )} */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
