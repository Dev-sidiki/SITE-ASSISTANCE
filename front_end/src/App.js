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

          <Route exact path="/dashboard">
            <DefaultLayout children={<Dashboard />} />
          </Route>
          <Route exact path="/ajout-ticket">
            <DefaultLayout children={<AddTicket />} />
          </Route>
          <Route exact path="/ticket/:tId">
            <DefaultLayout children={<Ticket />} />
          </Route>
          <Route exact path="/list-tickets">
            <DefaultLayout children={<ListTicket />} />
          </Route>

          <Route path="*">
            <h1>404 Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
