import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import MailIcon from "@material-ui/icons/Mail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { getUserProfil } from "../../Actions/userAction.js";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../Actions/userAction.js";

// composant qui contient notre formulaire de connexion
const Login = () => {
  // les variables necessaire a la connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // variable de gestion des erreurs lors de la connexion
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // la variable qui declenche une action
  const dispatch = useDispatch();

  // variable de navigation
  const history = useHistory();

  const { isLoading, isConnect, user } = useSelector(
    (state) => state.userReducer
  );

  // cette fonction sera lancé après la soumission du formulaire
  useEffect(() => {
    // on vérifie si le user est connecté et que on nas un token
    if (localStorage.getItem("token") && isConnect && user.role === "client") {
      // on recupere le profil client si user=client et se redirige au tableau de bord client
      dispatch(getUserProfil());
      window.location = "/client-dashboard";
    } else if (
      localStorage.getItem("token") &&
      isConnect &&
      user.role === "admin"
    ) {
      // on recupere le profil client si user=admin et se redirige au tableau de bord admin
      dispatch(getUserProfil());
      window.location = "/admin-dashboard";
    }
  }, [isConnect, dispatch, user.role, history]);

  //fonction qui met a jour le champ de connexion
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
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!password || !email) {
      // message si tous les champs sont vides
      setErrorMail("Veuillez remplir tous les champs s'il vous plaît");
    } else {
      // on fait la requete si on remplir les champs
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        // withCredentials: true,
        data: { email, password },
      })
        .then((res) => {
          console.log(res.data);

          // si erreur d'exécution de la requête
          if (res.data.errors) {
            // on stocke l'erreur dans la variable de gestion
            // des erreurs selon l'erreur en question
            setErrorMail(res.data.errors.email);
            setErrorPassword(res.data.errors.password);
          }

          // si la requête a été effectué
          if (res.data.statut === "connecté") {
            // on efface les message d'erreur au cas ou il en a
            setErrorMail("");
            setErrorPassword("");

            //on crée un token dans nos bases de donnée local
            localStorage.setItem("token", res.data.token);
            // console.log(res.data.token);
            sessionStorage.setItem("token", res.data.token);
            // console.log(res.data.loggedUser.token);

            // on stocke le resultat dans le store dans la variable GET_TICKET du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({
              type: LOGIN_USER,
              payload: { email, password },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark text-center">CONNEXION</h1>
          <hr />
          {/* on affiche les messages d'erreur si il en a */}
          {errorMail && <Alert variant="danger">{errorMail}</Alert>}
          {errorPassword && <Alert variant="danger">{errorPassword}</Alert>}

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
              />
            </Form.Group>
            <br />
            {/* on creer le bouton pour se connecter */}
            <Button
              className="d-grid gap-2 col-6 mx-auto"
              type="submit"
              variant="dark"
            >
              Se Connecter
            </Button>
            {isLoading && <Spinner variant="primary" animation="border" />}
          </Form>
          <hr />
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <span className="text-dark">Mot de passe oublié ?</span>
          <br />
          {/* lien pour changer son mot de passe en cas d'oublie */}
          <Link to={"/recup-pin"} className="text-dark">
            {" "}
            cliquez ici?
          </Link>
        </Col>
      </Row>
      <Row className="py-4">
        <Col className="text-center">
          <span className="text-dark"> Êtes-vous nouveau sur ce site?</span>
          <br />
          {/* lien pour aller s'inscrire sur notre site */}
          <Link to={"/inscription"} className="text-dark">
            Inscrivez-vous Maintenant
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
