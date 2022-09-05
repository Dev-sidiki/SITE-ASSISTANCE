import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark">Modification de mot de passe</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col></Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group className="text-dark">
              <VerifiedUserIcon /> <Form.Label>Codepin</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder="Entrez le codepin"
                required
              />
            </Form.Group>
            <br />

            <Form.Group className="text-dark">
              <VpnKeyIcon /> <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Entrez le nouveau mot de passe"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="text-dark">
              <VpnKeyIcon />{" "}
              <Form.Label>Confimez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                placeholder="Saisissez à nouveau le même mot de passe"
                required
              />
            </Form.Group>

            <br />
            <Button
              className="d-grid gap-2 col-3 mx-auto"
              variant="dark"
              type="submit"
            >
              Changer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePassword;
