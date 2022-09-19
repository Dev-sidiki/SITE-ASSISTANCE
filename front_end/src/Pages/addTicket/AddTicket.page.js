import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddTicketComposant from "../../Components/addTicket/AddTicket.composant.js";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";

// le composant qui affiche le formulaire d'ajout d'un ticket
const AddTicket = () => {
  return (
    <Container>
      <Row>
        <Col>
          {/* indication de la page courante */}
          <CurrentPage page="Nouveau Ticket" />
        </Col>
      </Row>

      <Row>
        <Col>
          {/* formulaire d'ajout de ticket */}
          <AddTicketComposant />
        </Col>
      </Row>
    </Container>
  );
};

export default AddTicket;
