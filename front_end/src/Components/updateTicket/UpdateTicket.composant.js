import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleTicketInfo,
  updateStatusResponse,
} from "../../Actions/ticketAction.js";
import { REPLY_TICKETS } from "../../Actions/ticketAction.js";

// ce composant retourne le formulaire pour reponse a un ticket
const UpdateTicket = ({ _id }) => {
  //on recupere les info sur le user connecté
  const { user } = useSelector((state) => state.userReducer);
  console.log(user.role);

  // la variable qui dechenche une action
  const dispatch = useDispatch();

  // on affecte le nom du user a la varaiable expediteur
  // de façon automatique
  const expediteur = user.nom;

  // la variable qui contient la reponse de l'expéditeur
  const [message, setMessage] = useState("");
  // la variable qui contient le fichier image de l'expediteur
  const [file, setFile] = useState("");

  // Fonction asynchrone qui permet de repondre a un ticket
  const getResponseTicketApi = async (data) => {
    if (_id !== null) {
      const ticketId = _id;
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/ticket/${ticketId}`,
        withCredentials: true,
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        // on lui passe les data pour repondre a un ticket
        data: data,
      })
        .then((res) => {
          console.log(res.data);
          // on dispact le type REPLY_TICKETS pour recuperer les info du payload
          // et le stocker dans le reducer
          dispatch({
            type: REPLY_TICKETS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
    dispatch(getSingleTicketInfo(_id));
    // pour vider le champs input message
    setMessage("");
    // pour vider le champs input file
    setFile("");
    // fonction pour vider le formulaire après soumission
    // le mot form est le name dans le formulaire
    await document.form.reset();
  };

  // fonction qui permet de changer le contenu de l'input
  const handleFileInput = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    console.log(fileObj);
    setFile(fileObj);

    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);
  };

  // console.log("fichier image:", file.name);

  //fonction qui met à jour le contenu du champ de message
  const handleOnChange = (e) => {
    setMessage(e.target.value);
    console.log("message:" + message);
  };

  // la fonction qui sera exécuté lorsque le formulaire sera soumis
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    //on soumet pas le message à l'abscence d'une reponse
    if (!message) {
      return;
    }

    // variable contenant notre image
    // ainsi que les informations liée a l'image
    const data = new FormData();
    // les informations liée à l'image
    data.append("message", message);
    data.append("expediteur", expediteur);

    if (file) {
      data.append("image", file);
    }

    if (user.role === "client") {
      await getResponseTicketApi(data);
    }

    if (user.role === "admin") {
      await getResponseTicketApi(data);
      dispatch(updateStatusResponse(_id));
    }
  };

  return (
    <div>
      <Form autoComplete="off" onSubmit={handleOnSubmit} name="form">
        <br />
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Reponse
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            name="message"
            onChange={handleOnChange}
            value={message}
          ></textarea>
        </div>

        {/* bouton de soumission de la reponse */}
        <div className="text-right mt-3 mb-3 d-flex">
          {user.role === "client" ? (
            <Button variant="info" type="submit">
              soumettre
            </Button>
          ) : (
            <Button variant="info" type="submit">
              Repondre
            </Button>
          )}
          <div className="form-group">
            <input
              type="file"
              name="image"
              className="form-control"
              id="formFile"
              onChange={handleFileInput}
            />
          </div>
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
