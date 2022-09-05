import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import UpdateTicket from "../../Components/updateTicket/UpdateTicket.composant.js";

// le composant qui m'affiche le contenu d'un ticket
const Ticket = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CurrentPage page="Ticket" />
        </Col>
      </Row>

      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">Sujet: a completer</div>
          <div className="date">Date d'ouverture: a completer</div>
          <div className="status">Statut: a completer </div>
        </Col>
        <Col className="text-right">
          <Button variant="outline-info">Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col></Col>
      </Row>
      <hr />

      <Row className="mt-4">
        <Col>
          <UpdateTicket />
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;
