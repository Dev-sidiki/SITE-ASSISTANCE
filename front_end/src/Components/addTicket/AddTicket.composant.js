import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import TodayIcon from "@material-ui/icons/Today";
import MessageIcon from "@material-ui/icons/Message";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import AddIcon from "@material-ui/icons/Add";

import "../../Styles/addTicket/addTicket.css";

const AddTicket = () => {
  return (
    <div className="add-new-ticket bg-light mt-4 p-5 bg-light text-white rounded">
      <h1 className="text-dark text-center">Ajout de nouveu ticket</h1>
      <hr />

      <Form autoComplete="off">
        <Form.Group className="text-dark">
          <FiberNewIcon />{" "}
          <Form.Label column sm={3}>
            Sujet
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="sujet"
              minLength="3"
              maxLength="100"
              placeholder="Sujet"
              required
            />
            <Form.Text className="text-danger"></Form.Text>
          </Col>
        </Form.Group>

        <Form.Group className="text-dark">
          <TodayIcon />{" "}
          <Form.Label column sm={3}>
            Date de creation
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="date" name="issueDate" required />
          </Col>
        </Form.Group>
        <br />
        <Form.Group className="text-dark">
          <MessageIcon /> <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" rows="5" required />
        </Form.Group>
        <br />
        <Button type="submit" variant="dark" block>
          <AddIcon /> Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddTicket;
