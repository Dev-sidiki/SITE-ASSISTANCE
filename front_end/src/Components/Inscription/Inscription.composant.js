import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import BusinessIcon from "@material-ui/icons/Business";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const Inscription = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark">Page d'inscription</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )} */}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group className="text-dark">
              <PermIdentityIcon /> <Form.Label>Nom et Prenom</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                placeholder="Entrez votre nom et prénom"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="text-dark">
              <PhoneIcon /> <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="number"
                name="telephone"
                placeholder="Entrez votre numéro de téléphone"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="text-dark">
              <MailIcon /> <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre email"
                required
              />
            </Form.Group>

            <br />
            <Form.Group className="text-dark">
              <BusinessIcon /> <Form.Label>Societe</Form.Label>
              <Form.Control
                type="text"
                name="societe"
                placeholder="Entrez le nom de votre société"
                required
              />
            </Form.Group>

            <br />
            <Form.Group className="text-dark">
              <LocationCityIcon /> <Form.Label>Addresse</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Entrez votre adresse"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="text-dark">
              <VpnKeyIcon /> <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="text-dark">
              <VpnKeyIcon />{" "}
              <Form.Label>Confirmez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                placeholder="Saisissez à nouveau votre mot de passe"
                required
              />
            </Form.Group>

            <br />
            {/* Boutton d'inscription */}
            <Button
              className="d-grid gap-2 col-6 mx-auto"
              variant="dark"
              type="submit"
            >
              S'inscrire
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="py-4 text-center">
        <Col>
          <div className="text-dark ">Avez-vous déja un compte?</div>

          <a href="/" className="text-dark text-center">
            se connecter
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Inscription;
