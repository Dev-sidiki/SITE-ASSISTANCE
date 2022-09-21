import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterSerachTicket } from "../../Actions/ticketAction";

// le composant qui contient le formulaire de recherche
const SearchTicketForm = () => {
  // la variable qui declenche l'action
  const dispatch = useDispatch();

  // la fonction qui filtre la liste des ticket
  // selon la valeur de l'input
  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterSerachTicket(value));
  };

  return (
    <div>
      <Form>
        {/* champ de recherche */}
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Recherche:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="recherche"
              onChange={handleOnChange}
              placeholder="Recherche par sujet..."
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchTicketForm;
