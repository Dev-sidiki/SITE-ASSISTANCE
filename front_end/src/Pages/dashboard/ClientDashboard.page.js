import React, { useEffect } from "react";
import TicketTable from "../../Components/table/TicketTable.composant.js";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { getTicketClients } from "../../Actions/ticketAction.js";
import { Spinner } from "react-bootstrap";
import { LinearProgress } from "@material-ui/core";

// le composant qui affiche le tableau de bord du user connecté
const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { user, isConnect } = useSelector((state) => state.userReducer);
  const { isLoading } = useSelector((state) => state.ticketReducer);
  const { searchListeTicketsClients } = useSelector(
    (state) => state.ticketReducer
  );
  // console.log(listeTicketsClient);
  console.log(user._id);
  useEffect(() => {
    if (!searchListeTicketsClients.length) {
      dispatch(getTicketClients());
    }
  }, [searchListeTicketsClients, user, isLoading, dispatch]);

  // ticket en entente de traitement
  const pendingTickets = searchListeTicketsClients.filter(
    (row) => row.statut !== "Clôturé"
  );
  // nombre total de ticket
  const totaltTickets = searchListeTicketsClients;

  return (
    <div>
      {!isLoading && !isConnect ? (
        <div>
          <LinearProgress />
          <Spinner variant="primary" animation="border" />
        </div>
      ) : (
        <div>
          <Container>
            <div> Bienvenue {user.nom}</div>
            <Row>
              {/* on met en valeur la page actuel */}
              <Col>
                <CurrentPage page="Tableau de bord" />
              </Col>
            </Row>
            <Row>
              {/* ajout d'un bouton de creation de ticket */}
              {/* il nous redirige vers la page d'ajout du ticket */}
              <Col className="text-center mt-5 mb-4">
                <Link to="/ajout-ticket">
                  <Button
                    variant="dark"
                    style={{ fontSize: "1rem", padding: "10px 30px" }}
                  >
                    <AddIcon /> Ajouter un nouveau ticket
                  </Button>
                </Link>
              </Col>
            </Row>
            {/* info sur les ticket du clients */}
            <Row>
              <Col className="text-center  mb-3">
                <div>Nombre total de ticket: {totaltTickets.length}</div>
                <br />
                <div>
                  Nombre total de ticket en attente: {pendingTickets.length}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">Ticket récemment ajouté</Col>
            </Row>
            <hr />
            <Row>
              {/* affichage de la table des tickets */}
              <Col className="recent-ticket">
                <TicketTable />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
