import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const Chargement = () => {
  useEffect(() => {
    setTimeout(() => {
      setShowTimeout(true);
    }, 250);
  }, []);

  const [showTimeout, setShowTimeout] = useState(false);
  const { isConnect } = useSelector((state) => state.userReducer);
  return (
    <div>
      {!isConnect && !showTimeout ? (
        <>
          <div>
            <Spinner variant="primary" animation="border" />
          </div>
          <div> Chargement...</div>
        </>
      ) : (
        <div>
          <h1>
            Page introuvable <SentimentVeryDissatisfiedIcon />
          </h1>
        </div>
      )}
    </div>
  );
};

export default Chargement;
