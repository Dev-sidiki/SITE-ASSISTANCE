import React, { useEffect } from "react";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllTicketClients } from "../../Actions/ticketAction.js";
import { getAllUsers } from "../../Actions/userAction.js";
import { Spinner } from "react-bootstrap";
import { LinearProgress } from "@material-ui/core";

// le composant qui affiche le tableau de bord du user connecté
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { listeClients, user, isConnect } = useSelector(
    (state) => state.userReducer
  );
  const { isLoading } = useSelector((state) => state.ticketReducer);
  const { searchListeAllTickets } = useSelector((state) => state.ticketReducer);
  // console.log(listeTicketsClient);
  // console.log(users);
  useEffect(() => {
    if (!searchListeAllTickets.length && !listeClients.length) {
      dispatch(getAllTicketClients());
      dispatch(getAllUsers());
    }

    // dispatch(getAllUsers());
  }, [searchListeAllTickets, listeClients, isLoading, dispatch]);

  // ticket en entente de traitement
  const pendingTickets = searchListeAllTickets.filter(
    (row) => row.statut !== "Clôturé"
  );
  // nombre total de ticket
  const totaltTickets = searchListeAllTickets;

  return (
    <div>
      {/* {!isLoading && !isConnect ? (
        <div>
          <LinearProgress />
          <Spinner variant="primary" animation="border" />
        </div>
      ) : ( */}
      <div>
        <Container>
          <div> Bienvenue {user.nom}</div>
          <Row>
            {/* on met en valeur la page actuel */}
            <Col>
              <CurrentPage page="Tableau de bord" />
            </Col>
          </Row>
          <Row></Row>
          {/* info sur les ticket du clients */}
          <Row>
            <Col className="text-center  m-5">
              <div>Nombre total de client: {listeClients.length}</div>
              <br />
              <div>Nombre total de ticket: {totaltTickets.length}</div>
              <br />
              <div>
                Nombre total de ticket en attente: {pendingTickets.length}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* )} */}
    </div>
  );
};

export default AdminDashboard;
