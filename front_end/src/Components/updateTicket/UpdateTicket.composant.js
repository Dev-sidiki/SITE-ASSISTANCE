import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleTicketInfoByAdmin,
  ResponseTicket,
  updateStatusResponse,
} from "../../Actions/ticketAction.js";

// ce composant retourne le formulaire pour reponse a un ticket
const UpdateTicket = ({ _id }) => {
  //on recupere les info sur le user connecté
  const { user } = useSelector((state) => state.userReducer);
  console.log(user.role);

  // on recupere les données du ticket du user connecté
  const { selectedTicket } = useSelector((state) => state.ticketReducer);
  // console.log(selectedTicket._id);

  // la variable qui dechenche une action
  const dispatch = useDispatch();

  // on affecte le nom du user a la varaiable expediteur
  // de façon automatique
  const expediteur = user.nom;

  // la variable qui contient la reponse de l'expéditeur
  const [message, setMessage] = useState("");

  //fonction qui met à jour le champ de connexion
  const handleOnChange = (e) => {
    setMessage(e.target.value);
    console.log("message:" + message);
  };

  // la fonction qui sera exécuté lorsque le formulaire sera soumis
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (user.role === "client") {
      message &&
        expediteur &&
        dispatch(ResponseTicket(_id, message, expediteur));
      dispatch(getSingleTicketInfoByAdmin(selectedTicket._id));
      setMessage("");
    }

    if (user.role === "admin") {
      message &&
        expediteur &&
        dispatch(ResponseTicket(_id, message, expediteur));
      dispatch(getSingleTicketInfoByAdmin(selectedTicket._id));
      dispatch(updateStatusResponse(selectedTicket._id));
      setMessage("");
    }
  };

  return (
    <div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <br />
        <Form.Label>Reponse</Form.Label>
        <br />
        {/* texte d'indication */}
        <Form.Text>
          Veillez saisir votre reponse dans le champ ci-dessous
        </Form.Text>
        {/* champ de saisi du message*/}
        <Form.Control
          as="textarea"
          row="5"
          name="message"
          onChange={handleOnChange}
          value={message}
        />
        {/* bouton de soumission de la reponse */}
        <div className="text-right mt-3 mb-3">
          {user.role === "client" ? (
            <Button variant="info" type="submit">
              soumettre
            </Button>
          ) : (
            <Button variant="info" type="submit">
              Repondre
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

// pour préciser que notre prop(_id) est obligatoirement un string
UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};

export default UpdateTicket;
