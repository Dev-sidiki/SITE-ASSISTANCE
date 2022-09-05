import React from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MailIcon from "@material-ui/icons/Mail";

const RecupCodePin = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark text-center">Recevoir son code pin</h1>
          <hr />

          <Form autoComplete="off">
            <Form.Group className="text-dark">
              <MailIcon /> <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre Email"
                required
              />
            </Form.Group>
            <br />
            <Button
              className="d-grid gap-2 col-3 mx-auto"
              type="submit"
              variant="dark"
            >
              Envoyez
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default RecupCodePin;
