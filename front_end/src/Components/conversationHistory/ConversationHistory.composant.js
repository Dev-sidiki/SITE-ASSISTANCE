import React from "react";
import PropTypes from "prop-types";

const ConversationHistory = ({ message }) => {
  if (!message) return null;

  return message.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        <div className="sender">{row.expediteur}</div>
        <div className="date">
          {row.msgAt && new Date(row.dateEnvoi).toLocaleString()}
        </div>
      </div>
      <div className="message">{row.message}</div>
    </div>
  ));
};

// on s'assure que le propre passé en paramètre est un tableau
ConversationHistory.propTypes = {
  message: PropTypes.array.isRequired,
};

export default ConversationHistory;
