import React, { useEffect } from "react";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllTicketClients } from "../../Actions/ticketAction.js";
import { getAllUsers } from "../../Actions/userAction.js";

// le composant qui affiche le tableau de bord du user connecté
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { listeClients, user } = useSelector((state) => state.userReducer);
  const { isLoading } = useSelector((state) => state.ticketReducer);
  const { searchListeAllTickets } = useSelector((state) => state.ticketReducer);
  // console.log(listeTicketsClient);
  // console.log(users);
  // console.log(listeClients);
  useEffect(() => {
    // on lance la fonctio qui affiche le nombre total de client et de ticket
    // des que nous sommes sur la page
    if (!searchListeAllTickets.length) {
      dispatch(getAllTicketClients());
      dispatch(getAllUsers());
    }
  }, [searchListeAllTickets, listeClients, isLoading, dispatch]);

  // ticket en entente de traitement
  const pendingTickets = searchListeAllTickets.filter(
    (row) => row.statut !== "Clôturé"
  );
  // nombre total de ticket
  const totaltTickets = searchListeAllTickets;

  const totalClients = listeClients.filter((client) => client.role !== "admin");
  return (
    <div>
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
              <div>Nombre total de client: {totalClients.length}</div>
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
    </div>
  );
};

export default AdminDashboard;
