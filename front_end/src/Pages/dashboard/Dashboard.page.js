import React from "react";
import TicketTable from "../../Components/tableTicket/TicketTable.composant.js";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";

// le composant qui affiche le tableau de bord du user connecté
const Dashboard = () => {
  return (
    <Container bg-dark>
      <Row>
        {/* on met en valeur la page actuel */}
        <Col>
          <CurrentPage page="Tableau de bord" />
        </Col>
      </Row>
      <Row>
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
      <Row>
        <Col className="text-center  mb-3">
          <div>Nombre total de ticket: a completer</div>
          <br />
          <div>Nombre total de ticket en entente: a completer</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">Ticket récemment ajouté</Col>
      </Row>
      <hr />

      <Row>
        <Col className="recent-ticket">
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
