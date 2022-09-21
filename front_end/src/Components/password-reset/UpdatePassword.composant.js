import React, { useState } from "react";
import axios from "axios";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MailIcon from "@material-ui/icons/Mail";
import { UPDATE_PASSWORD_USER } from "../../Actions/userAction";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

// le composant qui affiche le formulaire de modification du mot de passe
const UpdatePassword = () => {
  // on declare un objet vide contenant les champs
  // necessaire pour la modification du mot de passe
  const initialState = {
    email: "",
    codepin: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  //la variable qui declenche une action
  const dispatch = useDispatch();

  // variable contenant l'objet vide au depart
  const [newPasswordUser, setNewPasswordUser] = useState(initialState);

  // variable qui
  const [modifSuccess, setModifSuccess] = useState("");

  //les variables pour verifier la validité des différents champs
  const [controlPassword, setControlPassword] = useState("");
  const [controlMail, setControlMail] = useState("");
  const [controlCodepin, setControlCodepin] = useState("");
  const [controlcodepinValidity, setControlCodepinValidity] = useState("");

  // la fonction qui change le contenu du formulaire
  // selon la valeur saisi par le user
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewPasswordUser({ ...newPasswordUser, [name]: value });
    // console.log(newPasswordUser);
  };

  // la fonction qui rénitialise le formulaire
  // si le changement à été effectué
  const cancelUpdateNewPassword = () => {
    setNewPasswordUser({});
    document.getElementById("form").reset();
  };

  //la fonction qui sera déclenché lorsque le formulaire sera soumis
  const handleOnSubmit = (e) => {
    // on empêche le comportement par defaut
    e.preventDefault();

    // on recupere le contenu de notre formulaire
    const { email, codepin, newPassword, confirmNewPassword } = newPasswordUser;

    // on verifie la corresponce des nouveau mot de passe
    if (newPassword !== confirmNewPassword) {
      // on vide les messages sur la page au ou il en a
      setModifSuccess("");
      setControlCodepin("");
      setControlMail("");
      setControlCodepinValidity("");
      // on affiche le message au cas ou ils correspondent pas
      setControlPassword("Les mots de passe ne correspondent pas");
    } else {
      // si tous les champs sont remplir on fait nos requête
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/user/reset-password`,
        withCredentials: true,
        data: { email, codepin, newPassword },
      })
        .then((res) => {
          console.log(res.data);
          // si erreur lors de la requête
          if (res.data.errors) {
            setControlPassword("");
            setControlCodepinValidity("");
            // on recupere l'erreur dans la variable en question
            // pour pouvoir l'afficher
            setControlMail(res.data.errors.email);
            setControlCodepin(res.data.errors.codepin);
          }

          if (res.data.statut === "erreur") {
            setControlPassword("");
            setControlMail("");
            setControlCodepin("");
            setControlCodepinValidity(res.data.message);
          }

          // si la modification a réussi
          if (res.data.statut === "modification éffectué") {
            // on vide le contenu des autres message
            setControlPassword("");
            setControlMail("");
            setControlCodepin("");
            setControlCodepinValidity("");
            // on affiche un message de confirmation
            setModifSuccess("Modification de mot de passe effectué");
            // on vide le formulaire
            cancelUpdateNewPassword();

            // on stocke le resultat dans le store dans la variable UPDATE_PASSWORD_USER du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({
              type: UPDATE_PASSWORD_USER,
              payload: { email, codepin, newPassword },
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-dark">Modification de mot de passe</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {/* affichage des message selon l'erreur */}
          {controlPassword && (
            <Alert variant={"danger"}>{controlPassword}</Alert>
          )}
          {controlCodepin && <Alert variant={"danger"}>{controlCodepin}</Alert>}
          {controlcodepinValidity && (
            <Alert variant={"danger"}>{controlcodepinValidity}</Alert>
          )}
          {controlMail && <Alert variant={"danger"}>{controlMail}</Alert>}
          {/* affichage du message de confimation en cas de succes */}
          {modifSuccess && <Alert variant={"success"}>{modifSuccess}</Alert>}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit} id="form">
            {/* creation du champ mail */}
            <Form.Group className="text-dark">
              <MailIcon /> <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre Email"
                value={newPasswordUser.email}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <br />
            {/* creation du champs codepin */}
            <Form.Group className="text-dark">
              <VerifiedUserIcon /> <Form.Label>Codepin</Form.Label>
              <Form.Control
                type="number"
                name="codepin"
                placeholder="Entrez le codepin"
                value={newPasswordUser.codepin}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <br />
            {/* creation du champ du nouveau mot de passe */}
            <Form.Group className="text-dark">
              <VpnKeyIcon /> <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                minLength={6}
                placeholder="Entrez le nouveau mot de passe"
                value={newPasswordUser.newPassword}
                onChange={handleOnChange}
                required
              />
            </Form.Group>
            <br />
            {/* creation du champ de confirmation du nouveau mot de passe */}
            <Form.Group className="text-dark">
              <VpnKeyIcon />{" "}
              <Form.Label>Confimez votre mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="confirmNewPassword"
                minLength={6}
                placeholder="Saisissez à nouveau le même mot de passe"
                value={newPasswordUser.confirmNewPassword}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <br />
            {/* bouton de soumission */}
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
