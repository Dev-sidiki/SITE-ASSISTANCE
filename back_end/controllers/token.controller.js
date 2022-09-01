import jwt from "jsonwebtoken";
import { userModel } from "../models/user.modele.js";

// la fonction qui retourne le nouveau token de rafraichement du user
//  au cas ou son token est expiré
export async function getTokenController(req, res, next) {
  // on fait appel a notre variable d'environnement depuis le fichier .env
  const { APP_TOKEN_SECRET, APP_REFRESH_TOKEN_EXP_DAY } = process.env;

  const createRefreshToken = (id) => {
    return jwt.sign({ id }, APP_TOKEN_SECRET, {
      // durer de vie
      expiresIn: "30d",
    });
  };
  // on recupere notre jeton JWT dans l'entete
  const token =
    req.body.tokens || req.query.token || req.headers["authorization"];

  // condition si pas de token
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  // si y'a un token on verifie le token
  const decoded = await jwt.verify(token, APP_TOKEN_SECRET);
  // on crée une varibale user dans req pour lui affecter le contenu du token decode
  req.user = decoded;

  //   on verifie si on retrouve l'id dans le code decodé
  if (decoded.id) {
    // on recherche les info du user via son id
    const userProfil = await userModel.getUserById(decoded.id);
    // console.log(userProfil);
    if (userProfil[0]._id) {
      //   //on recupere la date de creation du jeton
      let tokenExp = userProfil[0].tokens.dateCreation;
      //   //on recupere le token du user
      const dBrefreshToken = userProfil[0].tokens.token;
      //   console.log(tokenExp, dBrefreshToken);
      //   //on fixe la date d'expiration du token
      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +APP_REFRESH_TOKEN_EXP_DAY //le + devant APP_REFRESH_TOKEN_EXP_DAY pour le changer en nombre
      );

      //   console.log(tokenExp);
      //   //on recupere la date de connexion du user
      const today = new Date();
      //   console.log(today);
      //   //on verifie si le token est invalide et que la date d'expiration est passé
      if (dBrefreshToken !== token && tokenExp < today) {
        return res.status(403).json({
          satut: "invalide token",
          message: "Vous devez vous reconnecter",
        });
      }
      //   on creer un nouveau token utilsateur
      const Refreshtoken = createRefreshToken(userProfil[0]._id);
      console.log(Refreshtoken);

      // on met a jour le token du user valable 30 jours
      const newRefreshToken = await userModel.refreshToken(
        userProfil[0]._id,
        Refreshtoken
      );
      //   si on a le nouveau token affiche le message de confirmation
      if (newRefreshToken) {
        res.status(200).json({
          statut: "nouveau token",
          message: "token changé avec succès!",
          newRefreshToken,
        });
      }
    }
  }
}
