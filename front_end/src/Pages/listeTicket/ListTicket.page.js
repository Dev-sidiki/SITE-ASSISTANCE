import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchTicketForm from "../../Components/searchTicketForm/SearchTicketForm.composant";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant";
import TicketTable from "../../Components/tableTicket/TicketTable.composant";

const ListTicket = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CurrentPage page="Liste des ticket" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/ajout-ticket">
            <Button variant="dark">Ajouter un nouveau ticket</Button>
          </Link>
        </Col>
        <Col className="text-right">
          <SearchTicketForm />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default ListTicket;
