import { combineReducers } from "redux";
import ticketReducer from "./ticketReducer.js";
import userReducer from "./userReducer.js";

// la fonction qui contient toutes les actions
// liées a notre application, c'est la carte maitresse de l'app
export default combineReducers({
  userReducer,
  ticketReducer,
});
