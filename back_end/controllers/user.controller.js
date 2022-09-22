import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.modele.js";
import { updatePinModel } from "../models/updatepin.modele.js";
import { randomPinNumber } from "../utils/randomNumber.js";
import { emailProcess } from "../utils/sendMail.js";
import { hashPassword } from "../utils/hashCode.js";

// fonction pour la creation d'un user
export async function CreateUserController(req, res) {
  // on recupere les saisie
  const { nom, email, password, societe, adresse, telephone } = req.body;

  // console.log(pseudo, email, password);

  // pour verifier la valider de notre mail
  const expressionReguliere =
    /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  // variable de gestion des erreurs sur les champs saisis
  let errors = {
    nom: "",
    societe: "",
    email: "",
    password: "",
    telephone: "",
    adresse: "",
  };

  // les differentes contrôle a faire avant la creation d'un user
  // cela evite que le serveur il crache
  // ci-dessous on verifie si les differents champs ne sont pas vide

  if (!nom) {
    // message d'erreur si champ vide
    errors.nom = "le champs nom est obligatoire";
    res.json({ errors });
    return;
  }

  if (!email) {
    // message d'erreur si champ vide
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!societe) {
    // message d'erreur si champ vide
    errors.societe = "le champs societe est obligatoire";
    res.json({ errors });
    return;
  }

  if (!adresse) {
    // message d'erreur si champ vide
    errors.adresse = "le champs adresse est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    // message d'erreur si champ vide
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  // ci-dessous on verifie si les differents champs sont correctes

  if (!expressionReguliere.test(email)) {
    // message si email incorrect
    errors.email = "email incorrect";
    res.json({ errors });
    return;
  }

  if (isNaN(telephone)) {
    // message si telephone incorrect
    errors.telephone = "le champs telephone doit être des chiffres";
    res.json({ errors });
    return;
  }

  if (password.length < 6) {
    // message si mot de passe trop court(donc incorrect)
    errors.password = "mot de passe trop court";
    res.json({ errors });
    return;
  }

  // on verifie si le mail n'existe pas deja avant de faire la requête
  const loggedUserByEmail = await userModel.getUserByEmail(email);
  if (loggedUserByEmail) {
    errors.email = "Cet email existe déjà";
    res.json({ errors });
    return;
  }

  // si tous les contrôle sont vérifiés,
  // on crée un utilisateur dans la base de donnée
  const newUser = await userModel.createUser(
    nom,
    email,
    hashPassword(password),
    societe,
    adresse,
    telephone
  );

  // on affiche un message de succes depuis notre postman
  if (newUser) {
    res.status(200).json({
      statut: "inscrit",
      message: "un utilisateur à été crée",
      userId: newUser._id,
    });
  }
}

// fonction pour la connection d'un user
export async function loginUserController(req, res) {
  // on recupere les donnée saisi
  const { email, password } = req.body;

  // console.log(req.body);

  // on fait appel à la variable d'environnement depuis le fichier .env
  // pour la creation de notre token
  const { APP_TOKEN_SECRET } = process.env;

  // variable de gestion des erreurs sur les champs saisis
  let errors = { email: "", password: "", message: "" };

  // fonction de creation de jeton pour l'authentification
  // en utilisant L'id du user et la clé secrète de APP_TOKEN_SECRET
  const createToken = (id) => {
    return jwt.sign({ id }, APP_TOKEN_SECRET, {
      // durer de vie du jeton
      expiresIn: "45m",
    });
  };

  // les differentes contrôle a faire avant la connexion d'un user
  // cela evite que le serveur il crache

  if (!email) {
    // message d'erreur si champ vide
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    // message d'erreur si champ vide
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  // ci-dessous on verifie si les differents champs sont correctes

  const loggedUser = await userModel.getUserByEmail(email);
  if (!loggedUser) {
    // message si email ne se trouve pas dans la base de donnée
    errors.email = "Email incorrect";
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    res.json({ errors });
    return;
  }

  // on compare le mot de passe saisi par l'utilisateur et le mot de passe haché
  const auth = await bcrypt.compare(password, loggedUser.password);

  if (!auth) {
    // message si le mot de passe ne correspond pas a celui de la base de donnée
    errors.password = "Le mot de passe ne correspond pas";
    errors.message = " Votre mot de passe n'existe pas dans la base de donnée";
    res.json({ errors });
    return;
  }

  //si tout les contrôles on été vérifiés
  if (auth && loggedUser) {
    // on creer un token unique pour l'utilisateur
    // en utilisant son _id
    // on peut decoder le token pour voir id du user connecté via ce site:https://jwt.io/#debugger-io
    const token = createToken(loggedUser._id);

    // on met a jour le token du user depuis la base de donnée
    const refreshToken = await userModel.refreshToken(loggedUser._id, token);
    //  message si tout se passe bien
    if (refreshToken) {
      res.status(200).json({
        statut: "connecté",
        message: "Connexion réussie!",
        loggedUser: loggedUser.tokens,
        token: token,
      });
    }
  }
}

// fonction de déconnection d'un utilisateur
export async function logoutUserController(req, res) {
  // console.log(req.headers);

  // on recupere l'id depuis notre entete pour le passer en parametre
  const _id = req.user.id;

  // console.log(_id);

  // on modifie le contenu du token de utilisateur(_id) depuis la base de donnée
  // ce qui rend le token invalid et donc impossible de naviguer sur le site
  const deleteUser = await userModel.refreshToken(_id, "");

  // pour verifier que il ya plus de token(optionnel)
  const verifyLogOut = await userModel.getUserById(_id);

  // message en cas de deconnection réussi
  if (deleteUser._id) {
    return res.json({
      status: "déconnexion",
      message: "Vous êtes déconnecté",
      // on affiche info user sans token
      verifyLogOut, //optionnel
    });
  }

  // message en cas d'erreur
  res.json({
    status: "error",
    message: "Unable to logg you out, plz try again later",
  });
}

// la fonction qui retourne le profil d'un user
export async function getUserInfoController(req, res) {
  // on recupere l'id depuis notre entete pour le passer en parametre
  const _id = req.user.id;
  // on recupere les info du user via son _id recupéré
  const userInfo = await userModel.getUserById(_id);
  res.send(userInfo);
}

// la fonction qui permet au user de recuperer son code pin
// pour la modification de son mot de passe
export async function recupPinController(req, res) {
  // on recupere l'email du user
  const { email } = req.body;
  // gestion erreur mail
  let errors = { message: "" };
  // longueur du code pin
  const pinLength = 6;

  // les differentes contrôle a faire avant la recuperation du codepin d'un user
  // cela evite que le serveur il crache

  if (!email) {
    // message si champ mail vide
    errors.message = "l'email est obligatoire";
    res.json({ errors });
    return;
  }

  // on verifie si le mail existe dans la base de donnée
  const loggedUser = await userModel.getUserByEmail(email);
  if (!loggedUser) {
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    res.json({ errors });
    return;
  }

  // on genere un codepin de longueur 6 aleatoirement
  const randPin = randomPinNumber(pinLength);

  // on prepare une variable pour la recuperation du codepin
  const newPin = new updatePinModel({
    // pour recuperer les data envoyé
    email: email,
    // code pin generer aleatoirement
    codepin: randPin,
  });

  // si le mail existe dans la base de donnée
  if (loggedUser && loggedUser._id) {
    // on enregistre le code pin et le mail dans notre base de donnée
    const setPin = await newPin.save();

    // on envoie un mail de confirmation a notre user
    emailProcess({
      email,
      pin: setPin.codepin,
      type: "recup-code-pin",
    });

    // important  de mettre le return a l'interieur du if
    // si on n'as plusieur res.json pour eviter de faire cracher le serveur
    return res.json({
      statut: "code réçu",
      // message en cas de code envoyé
      message:
        "Le code pin de réinitialisation vous sera envoyé sous peu via le mail renseigné",
    });
  }
  // message en cas d'erreur
  res.json({
    statut: "error",
    message: " Veuillez ressayer plustard",
  });
}

// la fonction qui permet au user de modifier son mot de passe
// après la recupération du code pin
export async function updatePasswordController(req, res) {
  // recuperation des données saisie par le user
  const { email, codepin, newPassword } = req.body;

  // variable de gestion des erreurs sur les champs saisis
  let errors = { email: "", codepin: "", newPassword: "" };

  // les differentes contrôle a faire avant la modification du mot de passe d'un user
  // cela evite que le serveur il crache

  if (!email) {
    // message d'erreur si champ vide
    errors.email = "l'email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!codepin) {
    // message d'erreur si champ vide
    errors.codepin = "le code pin est obligatoire";
    res.json({ errors });
    return;
  }

  if (!newPassword) {
    // message d'erreur si champ vide
    errors.password = "le nouveau mot de passe est obligatoire";
    res.json({ errors });
    return;
  }

  // on recupere le codepin du user depuis la base de donnée
  const getPin = await updatePinModel.getPinByEmailPin(email, codepin);

  // on verifie la validité du mail saisie
  if (email !== getPin.email) {
    errors.email = " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    return res.json({ errors });
  }

  // on verifie la validité du code pin saisie
  if (codepin !== getPin.codepin) {
    errors.codepin = "le code pin est incorrect";
    return res.json({ errors });
  }

  // on verifie la longueur du nouveau mot de passe
  if (newPassword.length < 6) {
    errors.newPassword = "mot de passe trop court";
    return res.json({ errors });
  }

  // si on n'as le codepin
  if (getPin?._id) {
    // on recupere la date de creation du code pin
    const dbDate = getPin.createdAt;

    // on definir une date d'expiration
    const expiresIn = 1;

    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);

    // console.log(expDate);

    // on recupere la date d'aujourdhui

    const today = new Date();

    // o verifie si le code a expiré ou pas
    if (today > expDate) {
      return res.json({
        statut: "erreur",
        message:
          "le delai du code pin est expiré, veuillez demander un autre code pin",
      });
    }

    // on chiffre le mot de passe
    const hashedPass = hashPassword(newPassword);

    // on met a jour le mot de passe du user
    const user = await userModel.updatePassword(email, hashedPass);

    //on envoi un mail de confirmation en cas de succès
    if (user._id) {
      // mail de notification
      emailProcess({ email, type: "modification-mot-de-passe" });

      // important  de mettre le return a l'interieur du if
      return res.json({
        statut: "modification éffectué",
        // message en cas de succès
        message: "mot de passe changé avec succes",
      });
    }
  }
  res.json({
    statut: "erreur",
    // message en cas d'erreur
    message: "impossible de modifier le mot de passe. Essayez plus tard",
  });
}
