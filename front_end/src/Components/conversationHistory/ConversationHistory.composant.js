import React from "react";
import PropTypes from "prop-types";
import { timestampParser } from "../../utils/dateParser";

// le composant qui traite l'historique des conversations
// il prend en parametre le tableau de conversation
const ConversationHistory = ({ message }) => {
  // on retourne rien si ya pas de conversation
  if (!message) return null;

  //sinon on retourne les conversation(client, date et message)
  return message.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        <div className="sender text-dark">{row.expediteur} </div>
        <div className="sender text-dark">
          {timestampParser(row.timestamp)}{" "}
        </div>
      </div>
      <div className="message">{row.message}</div>
      {row.picture ? (
        <div className="">
          {/* <span>{row.picture}</span> */}
          <br />
          <img
            style={{ width: "100%", height: "180px" }}
            src={row.picture}
            alt="img"
            crossOrigin=""
          />
        </div>
      ) : null}
    </div>
  ));
};

// on s'assure que le props passé en paramètre est un tableau
ConversationHistory.propTypes = {
  message: PropTypes.array.isRequired,
};

export default ConversationHistory;
