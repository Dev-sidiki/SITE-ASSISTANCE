import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchTicketForm from "../../Components/searchForm/SearchTicketForm.composant";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant";
import ListAllTicketTable from "../../Components/table/ListAllTicketTable.composant";
import { getAllTicketClients } from "../../Actions/ticketAction";
import { useDispatch } from "react-redux";

// le composant qui contient la liste des tickets
const ListAllTickets = () => {
  //la variable qui declenche l'action
  const dispatch = useDispatch();

  // cette fonction sera lancé dès que nous sommes sur la page
  useEffect(() => {
    dispatch(getAllTicketClients());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {/* indication de la page courante */}
        <Col>
          <CurrentPage page="Liste des tickets" />
        </Col>
      </Row>
      <Row className="mt-4">
        {/* le formulaire de recherche */}
        <Col className="text-right">
          <SearchTicketForm />
        </Col>
      </Row>
      <hr />
      <Row>
        {/* la table contenant les tickets */}
        <Col>
          <ListAllTicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default ListAllTickets;
