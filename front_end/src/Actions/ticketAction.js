import axios from "axios";

// les variable qui stocke les actions
// ils changent le contenu de notre state initial
// depuis le reducer selon l'action choisi
export const ADD_TICKET = "ADD_TICKET";
export const GET_TICKET = "GET_TICKET";
export const SEARCH_TICKET = "SEARCH_TICKET";
export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GET_TICKETS = "GET_TICKETS";
export const REPLY_TICKETS = "REPLY_TICKETS";
export const CLOSE_TICKET = "CLOSE_TICKET";
export const RESPONSE_TICKET_BY_ADMIN = "RESPONSE_TICKET_BY_ADMIN";
export const DELETE_TICKET = "DELETE_TICKET";

//fonction pour recuperer  les tickets depuis la base de donnée
export const getTicketClients = () => {
  return (dispatch) => {
    return (
      axios
        // on fait une requete a la base de donée
        .get(`${process.env.REACT_APP_API_URL}api/ticket/`, {
          //le token d'autorisation
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        // le resultat a afficher si la requete se passe bien
        .then((res) => {
          // console.log(res.data.tickets);

          if (res.data.tickets) {
            // console.log(res.data.tickets[0].sujet);

            // on stocke le resultat dans le store dans la variable GET_TICKETS du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({ type: GET_TICKETS, payload: res.data.tickets });
          }
        })
        .catch((err) => console.log(err)) //on affiche l'erreur au cas ou
    );
  };
};

//fonction pour recuperer  les tickets depuis la base de donnée
export const getAllTicketClients = () => {
  return (dispatch) => {
    return (
      axios
        // on fait une requete a la base de donée
        .get(`${process.env.REACT_APP_API_URL}api/ticket/all-tickets`, {
          //le token d'autorisation
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        // le resultat a afficher si la requete se passe bien
        .then((res) => {
          // console.log(res.data.tickets);

          if (res.data.tickets) {
            console.log(res.data.tickets);
            // on stocke le resultat dans le store dans la variable GET_ALL_TICKETS du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({ type: GET_ALL_TICKETS, payload: res.data.tickets });
          }
        })
        .catch((err) => console.log(err)) //on affiche l'erreur au cas ou
    );
  };
};

//fonction pour recuperer les info sur un ticket
export const getSingleTicketInfo = (_id) => {
  return (dispatch) => {
    return (
      // on fait une requete a la base de donée
      axios
        // on passe en parametre le _id comme dans le back
        .get(`${process.env.REACT_APP_API_URL}api/ticket/${_id}`, {
          headers: {
            // token
            Authorization: sessionStorage.getItem("token"),
          },
        })
        // la reponse au cas ou la requete se passe bien
        .then((res) => {
          console.log(res.data);

          if (res.data.tickets) {
            // console.log(res.data.tickets[0].sujet);

            //   on stocke le resultat dans le store dans la variable GET_TICKET du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({ type: GET_TICKET, payload: res.data.tickets[0] });
          }
        })
        .catch((err) => console.log(err)) //on affiche l'erreur au cas ou
    );
  };
};
//fonction pour recuperer les info sur un ticket
export const getSingleTicketInfoByAdmin = (_id) => {
  return (dispatch) => {
    return (
      // on fait une requete a la base de donée
      axios
        // on passe en parametre le _id comme dans le back
        .post(`${process.env.REACT_APP_API_URL}api/ticket/${_id}`, {
          headers: {
            // token
            Authorization: sessionStorage.getItem("token"),
          },
        })
        // la reponse au cas ou la requete se passe bien
        .then((res) => {
          console.log(res.data);

          if (res.data.tickets) {
            // console.log(res.data.tickets[0].sujet);

            //   on stocke le resultat dans le store dans la variable GET_TICKET du reducer
            // grace au payload afin de les traités dans le reducer
            // selon nos besoin
            dispatch({ type: GET_TICKET, payload: res.data.tickets[0] });
          }
        })
        .catch((err) => console.log(err)) //on affiche l'erreur au cas ou
    );
  };
};

//fonction pour filtrer ma liste de ticket
// il prend parametre la valeur du input
export const filterSearchTicket = (search) => {
  return (dispatch) => {
    // on stocke le resultat dans le store dans la variable SEARCH_TICKET du reducer
    // grace au payload afin de les traités dans le reducer
    // selon nos besoin
    return dispatch({ type: SEARCH_TICKET, payload: search });
  };
};

//fonction pour cloturer le ticket
// lorsque le client est satisfait
export const updateTicketStatusClosed = (_id) => {
  return (dispatch) => {
    // on fait la requête a la base de donnée
    return axios({
      method: "patch",
      // on passe en parametre le _id comme dans le back
      url: `${process.env.REACT_APP_API_URL}api/ticket/close-ticket/${_id}`,
      // le token
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        // console.log(res.data);

        // on stocke le resultat dans le store dans la variable CLOSE_TICKET du reducer
        // grace au payload afin de les traités dans le reducer
        // selon nos besoin
        dispatch({ type: CLOSE_TICKET, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateStatusResponse = (_id) => {
  return (dispatch) => {
    // on fait la requête a la base de donnée
    return axios({
      method: "patch",
      // on passe en parametre le _id comme dans le back
      url: `${process.env.REACT_APP_API_URL}api/ticket/admin-response/${_id}`,
      // le token
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);

        // on stocke le resultat dans le store dans la variable CLOSE_TICKET du reducer
        // grace au payload afin de les traités dans le reducer
        // selon nos besoin
        dispatch({ type: RESPONSE_TICKET_BY_ADMIN, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

//fonction qui permet de supprimer un ticket
export const deleteTicket = (_id) => {
  return (dispatch) => {
    // on fait la requête de supression
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/ticket/${_id}`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);

        // on dispact le type DELETE_TICKET pour recuperer les info du payload
        // et le stocker dans le reducer
        dispatch({ type: DELETE_TICKET, payload: { _id } });
      })
      .catch((err) => console.log(err));
  };
};

// fonction qui permet de repondre a un ticket
export const ResponseTicket = (_id, message, expediteur) => {
  return (dispatch) => {
    // on fait la requete a la base de donée
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/ticket/${_id}`,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      // on lui passe les data pour repondre a un ticket
      data: { message, expediteur },
    })
      .then((res) => {
        console.log(res.data);

        // on dispact le type REPLY_TICKETS pour recuperer les info du payload
        // et le stocker dans le reducer
        dispatch({
          type: REPLY_TICKETS,
          payload: { _id, message, expediteur },
        });
      })
      .catch((err) => console.log(err));
  };
};
