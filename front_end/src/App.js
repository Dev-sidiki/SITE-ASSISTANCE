import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/home/Home.page.js";
import InscriptionPage from "./Pages/inscription/Inscription.page.js";
import UpdatePasswordPage from "./Pages/password-rest/UpdatePassword.page";
import Dashboard from "./Pages/dashboard/Dashboard.page";
import AddTicket from "./Pages/addTicket/AddTicket.page";
import Ticket from "./Pages/ticket/Ticket.page";
import ListTicket from "./Pages/listeTicket/ListTicket.page";
import DefaultLayout from "./layout/DefaultLayout.js";

// Ce composant contient toute la logique de notre application
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/inscription">
            <InscriptionPage />
          </Route>
          <Route exact path="/modif-password">
            <UpdatePasswordPage />
          </Route>
          {/* creation de la mise en page de nos composant route*/}
          <DefaultLayout>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/ajout-ticket">
              <AddTicket />
            </Route>
            <Route exact path="/ticket/:tId">
              <Ticket />
            </Route>
            <Route exact path="/list-tickets">
              <ListTicket />
            </Route>
          </DefaultLayout>

          <Route path="*">
            <h1>404 Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
