import React, { useState } from "react";
import axios from "axios";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import BusinessIcon from "@material-ui/icons/Business";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { INSCRIPTION_USER } from "../../Actions/userAction";

// le composant qui contient le formulaire d'inscription
const Inscription = () => {
  const [show, setShow] = useState(true);

  //declaration d'un obet vide
  const initialeUser = {
    nom: "",
    email: "",
    password: "",
    societe: "",
    adresse: "",
    telephone: "",
    confirmPass: "",
  };

  // la variable qui declenche une action
  const dispatch = useDispatch();

  // creation d'un nouveau user qui prend l'objet vide
  // comme contenu par defaut
  const [newUser, setNewUser] = useState(initialeUser);

  // variable contenant le message de succès
  // au cas ou un user est inscrit
  const [inscriptionSucces, setInscriptionSucces] = useState("");

  //variable pour verifier si les mot de passe correspond
  const [controlPassword, setControlPassword] = useState("");

  // variable de gestion des message d'erreurs
  const [errorMail, setErrorMail] = useState("");
  const [errorChecked, setErrorChecked] = useState("");

  // fonction qui permet de mettre a jour le contenu du formulaire
  // selon les saisi du user
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };

  // fonction qui sera exécuté après la soumission du formulaire
  const handleOnSubmit = (e) => {
    // pour empecher le comportement par defaut
    e.preventDefault();

    // console.log(newUser);

    // on pointe sur l'id de notre checkbox
    const terms = document.getElementById("custom-switch");

    // destructuring de notre newuser
    const { nom, email, password, societe, adresse, telephone, confirmPass } =
      newUser;

    if (password !== confirmPass || !terms.checked) {
      // on verifie si les mots de passe correspondent
      if (password !== confirmPass) {
        // on efface les autres messages d'erreurs
        // au cas ou il y'en a
        setErrorChecked("");
        setInscriptionSucces("");
        setErrorMail("");
        // message si les mot de passe ne corespondent pas
        setControlPassword("Les mots de passe ne correspondent pas");
      }

      // on verifie si la case a été coché
      if (!terms.checked) {
        // on efface les autres messages d'erreurs
        // au cas ou il y'en a
        setInscriptionSucces("");
        setErrorMail("");
        setControlPassword("");
        // message si la case n'a pas été coché
        setErrorChecked("Veuillez Acceptez les condtions d'utilisation");
      }
    } else {
      // on fait la requête après les contrôles
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/inscription`,
        withCredentials: true,
        // bien inscrit les données dans l'ordre comme dans le modele
        // pour eviter choisi les erreurs d'affectation des données
        data: { nom, email, password, societe, adresse, telephone },
      })
        .then((res) => {
          console.log(res.data);
          //si on n'as une erreur
          if (res.data.errors) {
            // on efface les autres messages d'erreurs
            // au cas ou il y'en a
            setControlPassword("");
            setErrorChecked("");
            setInscriptionSucces("");

            // message d'erreur si le mail existe deja
            setErrorMail(res.data.errors.email);
          }

          //si le user a été inscrit
          if (res.data.statut === "inscrit") {
            // on efface les autres messages d'erreurs
            // au cas ou il y'en a
            setErrorMail("");
            setErrorChecked("");
            setControlPassword("");
            // message en cas d'inscription réussite
            setInscriptionSucces("Merci pour votre inscription sur notre site");
            // on vide le formulaire
            setNewUser(initialeUser);

            // on stocke le resultat dans le store dans la variable INSCRIPTION_USER du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({
              type: INSCRIPTION_USER,
              payload: { nom, societe, adresse, telephone, email, password },
            });

            setShow(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {show ? (
        <Container>
          <Row>
            <Col>
              <h1 className="text-dark text-center">INSCRIPTION</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              {/* affichage des messages d'erreur au cas ou il en a */}
              {errorMail && <Alert variant={"danger"}>{errorMail}</Alert>}

              {controlPassword && (
                <Alert variant={"danger"}>{controlPassword}</Alert>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form onSubmit={handleOnSubmit}>
                {/*on crée le champ pour saisir son nom et prenom */}
                <Form.Group className="text-dark">
                  <PermIdentityIcon /> <Form.Label>Nom et Prenom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    placeholder="Entrez votre nom et prénom"
                    required
                    value={newUser.nom}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champs pour saisir son mail */}
                <Form.Group className="text-dark">
                  <MailIcon /> <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    required
                    value={newUser.email}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour saisir son entreprise */}
                <Form.Group className="text-dark">
                  <BusinessIcon /> <Form.Label>Sociéte</Form.Label>
                  <Form.Control
                    type="text"
                    name="societe"
                    placeholder="Entrez le nom de votre société"
                    required
                    value={newUser.societe}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour saisir son numero de téléphone */}
                <Form.Group className="text-dark">
                  <PhoneIcon /> <Form.Label>Numéro de téléphone</Form.Label>
                  <Form.Control
                    type="number"
                    name="telephone"
                    placeholder="Entrez votre numéro de téléphone"
                    required
                    value={newUser.telephone}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour saisir son adresse */}
                <Form.Group className="text-dark">
                  <LocationCityIcon /> <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    name="adresse"
                    placeholder="Entrez votre adresse"
                    required
                    value={newUser.adresse}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour saisir son mot de passe */}
                <Form.Group className="text-dark">
                  <VpnKeyIcon /> <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    required
                    minLength={6}
                    value={newUser.password}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour confirmer son mot de passe */}
                <Form.Group className="text-dark">
                  <VpnKeyIcon />{" "}
                  <Form.Label>Confirmez votre mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPass"
                    placeholder="Saisissez à nouveau votre mot de passe"
                    required
                    value={newUser.confirmPass}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <br />
                {/* champ pour accepter les conditions d'utilisation */}
                <Form.Group
                  className="text-dark "
                  controlId="formBasicCheckbox"
                >
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    className="form-check-inline"
                  />
                  J'accepte les <Link to="/">conditions générales</Link>
                </Form.Group>
                <br />
                {/*message d'erreur si la case n'a pas été coché  */}
                {errorChecked && (
                  <Alert variant={"danger"}>{errorChecked}</Alert>
                )}{" "}
                <br />
                {/* bouton pour s'inscrire */}
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
          <Link to="/" className="text-dark">
            <NavigateBeforeIcon />
            retour
          </Link>
        </Container>
      ) : (
        <div>
          {/* affichage de message de succès si user inscrit */}
          {inscriptionSucces && (
            <Alert variant={"success"}>{inscriptionSucces}</Alert>
          )}
          <Row className="py-4 text-center">
            <Col>
              <div className="text-dark ">Pour vous connectez,maintenant</div>
              {/* lien pour revenir à la page d'accueil après inscription */}
              <Link to={"/"} className="text-dark text-center">
                se connecter
              </Link>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Inscription;
