import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SearchTicketForm = () => {
  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Recherche:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="recherche"
              //   onChange={handleOnChange}
              placeholder="Recherche ..."
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchTicketForm;
