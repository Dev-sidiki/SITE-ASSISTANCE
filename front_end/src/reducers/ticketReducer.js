import {
  GET_ALL_TICKETS,
  GET_TICKET,
  SEARCH_TICKET,
  CLOSE_TICKET,
  ADD_TICKET,
  DELETE_TICKET,
  REPLY_TICKETS,
} from "../Actions/ticketAction";

// qui va evoluer selon l'action
// et stocker le contenu du resultat
const initialeState = {
  // tableau de tous les ticket
  listeTickets: [],
  //
  isLoading: false,
  // tableau contenant un ticket selectionné
  selectedTicket: [],
  // le tableau contenant la liste des ticket recherché
  // via le formulaire de recherche
  searchListeTickets: [],
};

// la fonction qui va gerer notre initialeState
// elle permet de faire evoluer notre state selon l'action
// et nous le retourne
export default function ticketReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_ALL_TICKETS:
      // on retourne les tickets recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable
        listeTickets: action.payload,
        searchListeTickets: action.payload,
      };

    case GET_TICKET:
      // on retourne le ticket recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable
        selectedTicket: action.payload,
      };

    case SEARCH_TICKET:
      return {
        ...state,
        // on stocke le resultat le la liste filtrés dans la variable
        searchListeTickets: state.listeTickets.filter((row) => {
          if (!action.payload) return row;

          return row.sujet.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };

    case CLOSE_TICKET:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
      };
    case DELETE_TICKET:
      // on parcourt notre objet post pour retourner tous les post sauf
      // l'id du post passé en paramètre
      return {
        ...state,
        // on stocke le resultat le la liste filtrés dans la variable
        searchListeTickets: state.listeTickets.filter((row) => {
          return row._id !== action.payload._id;
        }),
      };

    case ADD_TICKET:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat du message de notre requete dans la variable
        // on stocke le resultat le la liste filtrés dans la variable
        // searchListeTickets: [...state.searchListeTickets, action.payload],
      };

    case REPLY_TICKETS:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat du message de notre requete dans la variable
        // on stocke le resultat le la liste filtrés dans la variable
        // searchListeTickets: [...state.searchListeTickets, action.payload],
      };
    default:
      return state;
  }
}
