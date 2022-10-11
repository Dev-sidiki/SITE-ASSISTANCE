import axios from "axios";

// les variables qui stocke le contenu de nos actions
// ils changent le contenu de notre state initial
// depuis le reducer selon l'action effectué par le user
export const INSCRIPTION_USER = "INSCRIPTION_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOG_OUT = "LOG_OUT";
export const GET_USER = "GET_USER";
export const RECUPIN_USER = "RECUPIN_USER";
export const UPDATE_PASSWORD_USER = "UPDATE_PASSWORD_USER";
export const DELETE_USER = "DELETE_USER";

// fonction qui affiche le profil d'un user
export const getUserProfil = () => {
  return (dispatch) => {
    // on recupere le token depuis notre base de donnée local
    const accessToken = localStorage.getItem("token");

    // message affiche si pas de token
    if (!accessToken) {
      console.log("Token not found!");
    }
    // si token, on fait la requête a la base de donnée
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/`,
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res.data);

        // on stocke le resultat dans le store dans la variable GET_USER du reducer
        // grace au payload afin de les traités dans le reducer
        // selon nos besoin
        dispatch({ type: GET_USER, payload: res.data[0] });
      })
      .catch((err) => console.log(err));
  };
};

// fonction de mise a jour du token du user connecté
export const getNewAccesUserProfil = () => {
  return (dispatch) => {
    // on recupere le token du user connecté
    const accessToken = localStorage.getItem("token");

    // message affiche si pas de token
    if (!accessToken) {
      console.log("Token not found!");
    }

    // si token, on fait la requête a la base de donnée
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/token/`,
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        // si on n'as le nouveau token
        if (res.data.statut === "nouveau token") {
          console.log("token");
          // on le stocke dans notre base de donnée local
          sessionStorage.setItem("token", res.data.token);

          // on stocke le resultat dans le store dans la variable GET_USER du reducer
          // grace au payload afin de les traités dans le reducer
          // selon nos besoin
          dispatch({ type: GET_USER, payload: res.data[0] });
        }
      })
      .catch((err) => {
        // message en cas d'erreur
        if (err.message === "Vous devez vous reconnecter") {
          localStorage.removeItem("token");
        }

        console.log(err);
      });
  };
};

// fonction de déconnection d'un user
export const userLogout = () => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/logout/`,
      withCredentials: true,
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data);

        // on stocke le resultat dans le store dans la variable GET_USER du reducer
        // grace au payload afin de les traités dans le reducer
        // selon nos besoin
        dispatch({ type: LOG_OUT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
  // on fait la requête a la base de donnée
};
