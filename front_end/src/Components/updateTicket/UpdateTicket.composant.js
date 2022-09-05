import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

// ce composant retourne le formulaire de reponse a un ticket
const UpdateTicket = ({ _id }) => {
  return (
    <div>
      <Form>
        <Form.Label>Reponse</Form.Label>
        <Form.Text>
          Veillez saisir votre reponse dans le champ ci-dessous
        </Form.Text>
        <Form.Control as="textarea" row="5" name="detail" />
        <div className="text-right mt-3 mb-3">
          <Button variant="info" type="submit">
            Repondre
          </Button>
        </div>
      </Form>
    </div>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};

export default UpdateTicket;
