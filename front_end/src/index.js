import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
// on importe bootstrap dans notre app
import "bootstrap/dist/css/bootstrap.min.css";

// cette page permet d'afficher le contenu de notre application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
