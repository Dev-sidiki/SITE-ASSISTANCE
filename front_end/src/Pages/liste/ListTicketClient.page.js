import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchTicketForm from "../../Components/searchForm/SearchTicketForm.composant";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant";
import TicketTable from "../../Components/table/TicketTable.composant";
import { getTicketClients } from "../../Actions/ticketAction";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";

// le composant qui contient la liste des tickets
const ListTicketClient = () => {
  //la variable qui declenche l'action
  const dispatch = useDispatch();

  // cette fonction sera lancé dès que nous sommes sur la page
  useEffect(() => {
    dispatch(getTicketClients());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {/* indication de la page courante */}
        <Col>
          <CurrentPage page="Liste de vos tickets" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {/* lien vers la page d'ajout de ticket */}
          <Link to="/ajout-ticket">
            <Button variant="dark">
              <AddIcon /> Ajouter un nouveau ticket
            </Button>
          </Link>
        </Col>
        {/* le formulaire de recherche */}
        <Col className="text-right">
          <SearchTicketForm />
        </Col>
      </Row>
      <hr />
      <Row>
        {/* la table contenant les tickets */}
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};

export default ListTicketClient;
