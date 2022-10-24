import {
  LOGIN_USER,
  GET_USER,
  GET_ALL_USERS,
  LOG_OUT,
  INSCRIPTION_USER,
  RECUPIN_USER,
  SEARCH_CLIENT,
  DELETE_USER,
  UPDATE_PASSWORD_USER,
} from "../Actions/userAction";

// qui va evoluer selon l'action
// et stocker le contenu du post
const initialeState = {
  user: [],
  listeClients: [],
  SearchListeClient: [],
  isLoading: false,
  isConnect: false,
};

// la fonction qui va gerer notre initialeState
// elle permet de faire evoluer notre state selon l'action effectué
// et nous le retourne
export default function userReducer(state = initialeState, action) {
  switch (action.type) {
    // si user est authentifié
    case LOGIN_USER:
      return {
        // on retourne le state initial
        ...state,
        // on change la valeur de isconnect
        isConnect: true,
      };
    case LOG_OUT:
      return {
        // on retourne le state initial
        ...state,
      };
    // si profil user
    case GET_USER:
      // on retourne le state initial
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable user
        user: action.payload,
        // on change la valeur de isconnect
        isConnect: true,
      };
    // si profil user
    case GET_ALL_USERS:
      // on retourne le state initial
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable user
        listeClients: action.payload,
        SearchListeClient: action.payload,
        // on change la valeur de isconnect
        isConnect: true,
      };
    // si profil user
    case DELETE_USER:
      // on retourne le state initial
      return {
        ...state,
      };

    case SEARCH_CLIENT:
      return {
        ...state,
        // on stocke le resultat le la liste filtrés dans la variable
        SearchListeClient: state.listeClients.filter((row) => {
          if (!action.payload) return row;

          return row.nom.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };
    // si inscription user
    case INSCRIPTION_USER:
      // on retourne le state initial
      return {
        ...state,
      };
    // si user veut recuperer son codepin
    case RECUPIN_USER:
      // on retourne le state initial
      return {
        ...state,
      };
    // si user veut changer de mot de passe
    case UPDATE_PASSWORD_USER:
      // on retourne le state initial
      return {
        ...state,
      };
    default:
      return state;
  }
}
