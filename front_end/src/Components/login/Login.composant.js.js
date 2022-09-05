import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MailIcon from "@material-ui/icons/Mail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

// composant de creation de notre formulaire de connexion
const Login = ({ typeForm }) => {
  // les variables necessaire a la connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //fonction qui met a jou le champ de connexion
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  //   la fonction qui s'execute
  // lorque on soumet le formulaire
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // les variable de gestions des erreurs des different champs
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    // on reinjecte des string vite si y'a pas d'erreur
    passwordError.innerHTML = "";
    emailError.innerHTML = "";

    if (!password || !email) {
      if (!email) {
        emailError.innerHTML = "Le champ email est obligatoire";
        return;
      }

      if (!password) {
        passwordError.innerHTML = "Le champ mot de passe est obligatoire";
        return;
      }
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark text-center">Authentification Client</h1>
          <hr />
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form autoComplete="off" onSubmit={handleOnSubmit}>
            {/* on creé le champ email */}
            <Form.Group className="text-dark ">
              <MailIcon /> <Form.Label> Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => handleOnChange(e)}
                placeholder="Saisissez votre email"
                required
              />
            </Form.Group>
            <br />
            {/* on cree le champ password */}
            <Form.Group className="text-dark ">
              <VpnKeyIcon /> <Form.Label> Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => handleOnChange(e)}
                value={password}
                placeholder="Entrez votre mot de passe"
                required
              />
            </Form.Group>
            <br />
            {/* on creer le bouton pour soumettre */}
            <Button
              className="d-grid gap-2 col-6 mx-auto"
              type="submit"
              variant="dark"
            >
              Se Connecter
            </Button>
            {/* {isLoading && <Spinner variant="primary" animation="border" />} */}
          </Form>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <span className="text-dark">Mot de passe oublié ?</span>
          <br />
          <a href="/modif-password" className="text-dark">
            {" "}
            cliquez ici?
          </a>
        </Col>
      </Row>
      <Row className="py-4">
        <Col className="text-center">
          <span className="text-dark"> Êtes-vous nouveau sur ce site?</span>
          <br />
          <a href="/inscription" className="text-dark">
            Inscrivez-vous Maintenant
          </a>
        </Col>
      </Row>
    </Container>
  );
};

// pour etre sur que on n'envoi une fonction en prop
// cela evite a app de planter
Login.propTypes = {
  typeForm: PropTypes.func.isRequired,
};

export default Login;
