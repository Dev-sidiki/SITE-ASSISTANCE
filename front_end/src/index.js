import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import "./Styles/index.css";
import App from "./App";
// outil de developpement
//affichage dans redux-dev-tool
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer.js";
// on importe bootstrap dans notre app
import "bootstrap/dist/css/bootstrap.min.css";

// la fonction qui contient toutes les actions
// liées a notre application
const store = createStore(
  rootReducer,
  // pour pouvoir travailler avec nos outils de developpement
  // pas obligatoire de le mettre
  // surtout ne pas oublier de les retirer avant la mise en prod
  composeWithDevTools(applyMiddleware(thunk))
);
// cette page permet d'afficher le contenu de notre application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* on passe le contenu de la variable a notre app */}
    {/* grace au provider qui est un fournisseur */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
