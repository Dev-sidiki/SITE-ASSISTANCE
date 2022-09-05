import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const UpdateTicket = ({ _id }) => {
  return (
    <div>
      <Form>
        <Form.Label>Reply</Form.Label>
        <Form.Text>
          Please reply your message here or update the ticket
        </Form.Text>
        <Form.Control
          //   value={message}
          //   onChange={handleOnChange}
          as="textarea"
          row="5"
          name="detail"
        />
        <div className="text-right mt-3 mb-3">
          <Button variant="info" type="submit">
            Reply
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