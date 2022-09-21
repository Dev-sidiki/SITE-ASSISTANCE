import React, { useState } from "react";
import axios from "axios";
import { ADD_TICKET } from "../../Actions/ticketAction";
import { Form, Col, Button, Row, Alert } from "react-bootstrap";
import MessageIcon from "@material-ui/icons/Message";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";

import "../../Styles/addTicket/addTicket.css";

// on declare un objet vide avec les champ pour ajouter un ticket
const initialTicket = {
  sujet: "",
  message: "",
};
// le composant qui contient le formulaire d'ajout de ticket
const AddTicket = () => {
  // la variable qui déclenche une action
  const dispatch = useDispatch();

  // on recupère les donnés du user connecté
  const { user } = useSelector((state) => state.userReducer);
  // console.log(user.nom);

  // on attribut de façon automatique le nom du user connecté
  // à la variable expediteur
  const expediteur = user.nom;

  //on initialise un nouveau ticket vide
  const [newTicket, setNewTicket] = useState(initialTicket);

  // variable qui affiche le message d'ajout d'un ticket
  const [ajoutSuccess, setAjoutSuccess] = useState();

  //la fonction qui change le contenu du formulaire
  // selon les saisi utilisateur
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewTicket({
      ...newTicket,
      [name]: value,
    });
  };

  // fonction qui va s'excécuter lorsque le formulaire sera soumis
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // destructuring de notre notre ticket
    const { sujet, message } = newTicket;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/ticket/`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      // on lui passe les data pour ajouter un ticket
      data: { sujet, expediteur, message },
    })
      .then((res) => {
        // console.log(res.data);

        //si le user a été inscrit
        if (res.data.statut === "ticket crée") {
          setAjoutSuccess(res.data.message);

          // on dispact le type ADD_TICKET pour recuperer les info du payload
          // et le stocker dans le reducer
          dispatch({
            type: ADD_TICKET,
            payload: { sujet, expediteur, message },
          });
        }
      })
      .catch((err) => console.log(err));

    // on vide le formualaire
    setNewTicket(initialTicket);
  };
  return (
    <div className="add-new-ticket bg-light mt-4 p-5 bg-light text-white rounded">
      {/* titre de lapage */}
      <h1 className="text-dark text-center">Ajout de nouveau ticket</h1>
      <hr />
      <Row>
        <Col>
          {/* affichage de message de succès si ticket ajouté */}
          {ajoutSuccess && <Alert variant={"success"}>{ajoutSuccess}</Alert>}
        </Col>
      </Row>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group className="text-dark">
          {/* le sujet du ticket */}
          <FiberNewIcon />
          <Form.Label column sm={3}>
            Sujet
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="sujet"
              minLength="3"
              maxLength="100"
              placeholder="Sujet"
              onChange={handleOnChange}
              value={newTicket.sujet}
              required
            />
            <Form.Text className="text-danger"></Form.Text>
          </Col>
        </Form.Group>

        <br />
        <Form.Group className="text-dark">
          {/* le contenu du ticket */}
          <MessageIcon /> <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            value={newTicket.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <br />
        {/* le bouton d'ajout */}
        <Button type="submit" variant="dark" block>
          <AddIcon /> Ajouter
        </Button>
      </Form>
    </div>
  );
};

export default AddTicket;
