import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterSerachTicket } from "../../Actions/ticketAction";
import SearchIcon from "@material-ui/icons/Search";
// le composant qui contient le formulaire de recherche
const SearchClientForm = () => {
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
          <Form.Label column sm="1">
            <SearchIcon />
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="recherche"
              onChange={handleOnChange}
              placeholder="Recherche client..."
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchClientForm;
