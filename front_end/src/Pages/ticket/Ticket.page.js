import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import CurrentPage from "../../Components/currentPage/CurrentPage.composant.js";
import ConversationHistory from "../../Components/conversationHistory/ConversationHistory.composant.js";
import UpdateTicket from "../../Components/updateTicket/UpdateTicket.composant.js";
import {
  getSingleTicketInfoByAdmin,
  updateTicketStatusClosed,
  deleteTicket,
} from "../../Actions/ticketAction.js";
import { timestampParser } from "../../utils/dateParser.js";

// le composant qui m'affiche le contenu d'un ticket
const Ticket = () => {
  // recuperation du parametre
  const { tId } = useParams();
  // console.log(tId);

  // la variable qui declenche une action
  const dispatch = useDispatch();

  const [deleteSuccess, setDeleteSucces] = useState("");
  const [closedSuccess, setCloseSucces] = useState("");
  const { selectedTicket, isLoading } = useSelector(
    (state) => state.ticketReducer
  );

  useEffect(() => {
    dispatch(getSingleTicketInfoByAdmin(tId));
  }, [dispatch, tId]);

  return (
    <Container>
      <Row>
        {/* pour préciser la page courante */}
        <Col>
          <CurrentPage page="Ticket" />
        </Col>
      </Row>

      <Row>
        <Col>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {closedSuccess && <Alert variant="success">{closedSuccess}</Alert>}
          {deleteSuccess && <Alert variant="success">{deleteSuccess}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div>
            <div className="subject">
              Sujet:{selectedTicket.sujet && selectedTicket.sujet}{" "}
            </div>
            <div className="date">
              Date d'ouverture:
              {selectedTicket.createdAt &&
                timestampParser(selectedTicket.createdAt)}
            </div>
            <div className="status">
              Statut: {selectedTicket.statut && selectedTicket.statut}
            </div>
          </div>
        </Col>

        <Col className="text-right">
          <Button
            variant="outline-info"
            onClick={() =>
              dispatch(updateTicketStatusClosed(tId)) &&
              setCloseSucces("Le ticket à été cloturé") &&
              setDeleteSucces("")
            }
            disabled={selectedTicket.statut === "Clôturé"}
          >
            Clôturer Ticket
          </Button>
          <Button
            variant="outline-info"
            onClick={() =>
              dispatch(deleteTicket(tId)) &&
              setDeleteSucces(
                "Suppression effectuée, ce ticket n'existe plus dans la liste des tickets"
              ) &&
              setCloseSucces("")
            }
          >
            Supprimer Ticket
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {selectedTicket.conversations && (
            <ConversationHistory message={selectedTicket.conversations} />
          )}
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col>
          <UpdateTicket _id={tId} />
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;
