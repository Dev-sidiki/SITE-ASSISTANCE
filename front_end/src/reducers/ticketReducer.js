import {
  GET_ALL_TICKETS,
  GET_TICKETS,
  GET_TICKET,
  SEARCH_TICKET,
  CLOSE_TICKET,
  RESPONSE_TICKET_BY_ADMIN,
  ADD_TICKET,
  DELETE_TICKET,
  REPLY_TICKETS,
} from "../Actions/ticketAction";

// qui va evoluer selon l'action
// et stocker le contenu du resultat
const initialeState = {
  // tableau de tous les ticket d'un client connecté
  listeTicketsClient: [],

  // tableau de tous les ticket pour tous les clients
  listeAllTickets: [],

  //
  isLoading: false,

  // le tableau contenant le ticket recherché par le client parmi ces tickets
  //recherche via le formulaire de recherche
  searchListeTicketsClients: [],

  // le tableau contenant le ticketrecherché par l'admin parmi les tickets de tous les clients
  //recherche via le formulaire de recherche
  searchListeAllTickets: [],

  // tableau contenant un ticket selectionné
  selectedTicket: [],

  result: "",
};

// la fonction qui va gerer notre initialeState
// elle permet de faire evoluer notre state selon l'action
// et nous le retourne
export default function ticketReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_TICKETS:
      // contient la liste des tickets d'un client  (resultat recuperé depuis la base de donne)
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable
        listeTicketsClient: action.payload,
        searchListeTicketsClients: action.payload,
      };

    case GET_ALL_TICKETS:
      // contient la liste des tickets d'un client  (resultat recuperé depuis la base de donne)
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable
        listeAllTickets: action.payload,
        searchListeAllTickets: action.payload,
      };

    case GET_TICKET:
      // contient un ticket selectionné (resultat recuperé depuis la base de donne)
      return {
        ...state,
        // on stocke le resultat de notre requete dans la variable
        selectedTicket: action.payload,
      };

    case SEARCH_TICKET:
      return {
        ...state,
        // on stocke le resultat le la liste filtrés dans la variable
        searchListeTicketsClients: state.listeTicketsClient.filter((row) => {
          if (!action.payload) return row;

          return row.sujet.toLowerCase().includes(action.payload.toLowerCase());
        }),
      };

    case CLOSE_TICKET:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
      };

    case RESPONSE_TICKET_BY_ADMIN:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
        result: action.payload,
      };
    case DELETE_TICKET:
      // on parcourt notre objet post pour retourner tous les post sauf
      // l'id du post passé en paramètre
      return {
        ...state,
        // on stocke le resultat le la liste filtrés dans la variable
        searchListeTicketsClients: state.listeTicketsClient.filter((row) => {
          return row._id !== action.payload._id;
        }),
      };

    case ADD_TICKET:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat du message de notre requete dans la variable
        // on stocke le resultat le la liste filtrés dans la variable
        // searchListeTicketsClients: [...state.searchListeTicketsClients, action.payload],
      };

    case REPLY_TICKETS:
      // on retourne la data recuperer depuis la base de donne
      return {
        ...state,
        // on stocke le resultat du message de notre requete dans la variable
        // on stocke le resultat le la liste filtrés dans la variable
        // searchListeTicketsClients: [...state.searchListeTicketsClients, action.payload],
      };
    default:
      return state;
  }
}
