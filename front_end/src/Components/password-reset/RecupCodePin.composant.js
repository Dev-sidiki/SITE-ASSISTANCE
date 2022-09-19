import React, { useState } from "react";
import axios from "axios";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch } from "react-redux";
import { RECUPIN_USER } from "../../Actions/userAction";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

//composant qui affiche le formulaire pour recuperer le codepin
const RecupCodePin = () => {
  // la variable qui declenche une action
  const dispatch = useDispatch();

  // variable pour la recuperation du codepin
  const [email, setEmail] = useState("");

  // variable contenant le message de succès
  // au cas ou le codepin a été envoyé
  const [codepinSent, setCodepinSent] = useState("");

  // variable de gestion des erreur sur le mail
  const [errorMail, setErrorMail] = useState("");

  // la fonction qui met à jour le contenu du chmap mails
  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  // fonction qui sera declenché après la soumission du codepin
  const handleOnRecupPinSubmit = (e) => {
    // on empêche le comportement par defaut
    e.preventDefault();
    // on fait la requête depuis la base de donnée
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/reset-password`,
      withCredentials: true,
      data: { email },
    })
      .then((res) => {
        console.log(res.data);
        // si erreur pendant la requête
        if (res.data.errors) {
          setCodepinSent("");
          // on affiche le message d'erreur
          setErrorMail(res.data.errors.message);
        }

        //  si le code a été envoyé
        if (res.data.statut === "code réçu") {
          // On vide les different champs
          setEmail("");
          setErrorMail("");

          // on affiche un message de confirmation
          setCodepinSent(res.data.message);

          // on stocke le resultat(le mail) dans le store dans la variable RECUPIN_USER du reducer
          // grace au payload afin de les traités dans le reducer
          // selon nos besoin
          dispatch({ type: RECUPIN_USER, payload: { email } });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark text-center">Recevoir son code pin</h1>
          <hr />

          {/* message en cas d'erreur sur le mail */}
          {errorMail && <Alert variant="danger">{errorMail}</Alert>}

          {/* message si le codepin a été envoyé */}
          {codepinSent && <Alert variant="success">{codepinSent}</Alert>}

          <Form autoComplete="off " onSubmit={handleOnRecupPinSubmit}>
            {/* champ de saisi du mail */}
            <Form.Group className="text-dark">
              <MailIcon /> <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre Email"
                value={email}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <br />
            {/* bouton de soumission du mail */}
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
