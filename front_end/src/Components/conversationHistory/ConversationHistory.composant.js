import React from "react";
import { useSelector } from "react-redux";
import { timestampParser } from "../../utils/dateParser";
import PropTypes from "prop-types";

// le composant qui traite l'historique des conversations
// il prend en parametre le tableau de conversation
const ConversationHistory = ({ message }) => {
  const { selectedTicket } = useSelector((state) => state.ticketReducer);
  console.log(selectedTicket);
  // on retourne rien si ya pas de conversation
  if (!message) return null;

  //sinon on retourne les conversation(expediteur, date et message)
  return message.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        <div className="sender text-dark">{row.expediteur} </div>
        <div className="sender text-dark">
          {timestampParser(new Date().getTime())}{" "}
        </div>
        {/* {selectedTicket.updatedAt && timestampParser(selectedTicket.updatedAt)} */}
      </div>
      <div className="message">{row.message}</div>
    </div>
  ));
};

// on s'assure que le props passé en paramètre est un tableau
ConversationHistory.propTypes = {
  message: PropTypes.array.isRequired,
};

export default ConversationHistory;
