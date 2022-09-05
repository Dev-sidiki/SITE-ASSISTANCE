import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddTicketComposant from "../../Components/addTicket/AddTicket.composant.js";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";

const AddTicket = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CurrentPage page="Nouveau Ticket" />
        </Col>
      </Row>

      <Row>
        <Col>
          <AddTicketComposant />
        </Col>
      </Row>
    </Container>
  );
};

export default AddTicket;
