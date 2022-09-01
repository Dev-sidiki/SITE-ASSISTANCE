import { userModel } from "../models/user.modele.js";
import { updatePinModel } from "../models/updatepin.modele.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { randomPinNumber } from "../utils/randomNumber.js";
import { emailProcess } from "../utils/sendMail.js";
import { hashPassword } from "../utils/hashCode.js";
// token valable 3 jours à cause du chiffre 30 devant
const maxAge = 3 * 24 * 60 * 60 * 1000;

// fonction pour la creation d'un user
export async function CreateUserController(req, res) {
  // on recupere les saisie
  const { nom, societe, addresse, telephone, email, password } = req.body;
  // console.log(pseudo, email, password);

  // pour verifier la valider de notre mail
  const expressionReguliere =
    /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  // variable de gestion des erreurs
  let errors = {
    nom: "",
    societe: "",
    email: "",
    password: "",
    telephone: "",
    addresse: "",
  };

  // les differentes contrôle a faire avant la creation d'un user
  // cela evite que le serveur il crache
  if (!nom) {
    errors.nom = "le champs nom est obligatoire";
    res.json({ errors });
    return;
  }

  if (!email) {
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!societe) {
    errors.email = "le champs societe est obligatoire";
    res.json({ errors });
    return;
  }

  if (!addresse) {
    errors.addresse = "le champs addresse est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  if (!expressionReguliere.test(email)) {
    errors.email = "email incorrect";
    res.json({ errors });
    return;
  }

  if (isNaN(telephone)) {
    errors.telephone = "le champs telephone doit être des chiffres";
    res.json({ errors });
    return;
  }

  if (password.length < 6) {
    errors.password = "mot de passe trop court";
    res.json({ errors });
    return;
  }

  // on verifie si le mail n'existe pas deja
  const loggedUserByEmail = await userModel.getUserByEmail(email);
  if (loggedUserByEmail) {
    errors.email = "Cet email existe déjà";
    res.json({ errors });
    return;
  }

  // on crée un utilisateur dans la base de donnée
  const newUser = await userModel.createUser(
    nom,
    societe,
    addresse,
    telephone,
    email,
    hashPassword(password)
  );

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
  // on fait appel au variable d'environnement depuis le fichier .env
  const { APP_TOKEN_SECRET } = process.env;
  // console.log(req.body);
  let errors = { email: "", password: "", message: "" };

  // fonction de creation de jeton pour l'authentification
  // en utilisant L'is du user et la clé secrète de APP_TOKEN_SECRET
  const createToken = (id) => {
    return jwt.sign({ id }, APP_TOKEN_SECRET, {
      // durer de vie
      expiresIn: "15m",
    });
  };

  // les differentes contrôle a faire avant la connexion d'un user
  // cela evite que le serveur il crache
  if (!email) {
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  // on verifie si le mail existe dans la base de donnée
  const loggedUser = await userModel.getUserByEmail(email);
  if (!loggedUser) {
    errors.email = "Email incorrect";
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    res.json({ errors });
    return;
  }
  // on compare le mot de passe saisi par l'utilisateur et le mot de passe haché
  const auth = await bcrypt.compare(password, loggedUser.password);
  if (!auth) {
    errors.password = "Le mot de passe ne correspond pas";
    errors.message = " Votre mot de passe n'existe pas dans la base de donnée";
    res.json({ errors });
    return;
  }

  //   si on n'as l'utilisateur et  le mot de passe que
  if (auth && loggedUser) {
    // si tout va bien on creer un token unique pour l'utilisateur
    // en utilisant son _id
    // on peut decoder le token pour voir id du user connecté via ce site:https://jwt.io/#debugger-io
    const token = createToken(loggedUser._id);
    console.log(token);

    // on met a jour le token du user
    const refreshToken = await userModel.refreshToken(loggedUser._id, token);
    if (refreshToken) {
      res.status(200).json({
        statut: "connecté",
        message: "Connexion réussie!",
        loggedUser: loggedUser._id,
      });
    }
  }
}

// fonction de deconnection d'un utilisateur
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
  const userInfo = await userModel.getUserById(_id);
  res.send(userInfo);
}

// la fonction qui permet au user de recuperer son code pin
// pour la modification de son mot de passe
export async function recupPinController(req, res) {
  // on recupere l'email du user connecté
  const { email } = req.body;
  // gestion erreur mail
  let errors = { message: "" };
  // longueur du code pin
  const pinLength = 6;
  // on genere le codepin aleatoirement
  const randPin = await randomPinNumber(pinLength);

  // on prepare une variable pour la recuperation du codepin
  const newPin = new updatePinModel({
    // pour recuperer les data envoyé
    email: email,
    // code pin generer aleatoirement
    codepin: randPin,
  });
  // les differentes contrôle a faire avant la connexion d'un user
  // cela evite que le serveur il crache

  // on vérifie si y'a un mail saisie
  if (!email) {
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

  // si les données d'authentification du user sont correcte
  if (loggedUser && loggedUser._id) {
    // on enregistre le code pin et le mail dans notre base de donnée
    const setPin = await newPin.save();
    await emailProcess({
      email,
      pin: setPin.codepin,
      type: "recup-code-pin",
    });

    // important  de mettre le return a l'interieur du if
    return res.json({
      status: "success",
      message:
        "If the email is exist in our database, the password reset pin will be sent shortly.",
    });
  }

  res.json({
    status: "error",
    message: " Veuillez ressayer plustard",
  });
}

// la fonction qui permet au user de modifier son mot de passe
// après la recupération du code pin
export async function updatePasswordController(req, res) {
  // recuperation des données saisie par le user
  const { email, codepin, newPassword } = req.body;
  let errors = { message: "" };

  // les differentes contrôle a faire avant la connexion d'un user
  // cela evite que le serveur il crache

  // on verifie si l'utilisateur a saisi un mail
  if (!email) {
    errors.message = "l'email est obligatoire";
    res.json({ errors });
    return;
  }

  // on verifie si l'utilisateur a saisi un code pin
  if (!codepin) {
    errors.message = "le code pine est obligatoire";
    res.json({ errors });
    return;
  }

  // on verifie si l'utilisateur a saisi un nouveau mot de passe
  if (!newPassword) {
    errors.message = "le nouveau mot de passe est obligatoire";
    res.json({ errors });
    return;
  }

  // on recupere le code pin du user depuis la base de donnée
  const getPin = await updatePinModel.getPinByEmailPin(email, codepin);

  // on verifie la validité du mail saisie
  if (email !== getPin.email) {
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    return res.json({ errors });
  }

  // on verifie la validité du code pin saisie
  if (codepin !== getPin.codepin) {
    errors.message = " code pin introuvable ou expiré";
    return res.json({ errors });
  }

  // on verifie la longueur dut mot de passe
  if (newPassword.length < 6) {
    errors.message = "mot de passe trop court";
    return res.json({ errors });
  }

  // 2. validate pin
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
        message: "token invalid or code pin expiré.",
      });
    }
    // on hashe le mot de passe
    const hashedPass = await hashPassword(newPassword);

    // on met a jour le mot de passe du user
    const user = await userModel.updatePassword(email, hashedPass);
    // si tout se passe bien on lui envoi un mail
    if (user._id) {
      // send email notification
      await emailProcess({ email, type: "modification-mot-de-passe" });
      // important  de mettre le return a l'interieur du if
      return res.json({
        status: "success",
        message: "mot de passe changé avec succes",
      });
    }
  }
  res.json({
    status: "erreur",
    message: "impossible de modifier le mot de passe. Essayez plus tard",
  });
}
