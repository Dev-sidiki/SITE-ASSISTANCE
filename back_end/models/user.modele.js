import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
// import bcrypt from "bcrypt";

// une fonction qui contient les champs de la table users de notre base de donnée
const userSchema = new mongoose.Schema(
  {
    nom: {
      //type chaine de caractere
      type: String,
      //obligatoire
      required: true,
      //longueur minimal
      minLength: 3,
      //longueur maximum
      maxLength: 55,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },
    email: {
      // chaine de caractere
      type: String,
      //   obliatoire
      required: true,
      //pour valider le mail
      validate: [isEmail],
      //pour toujours mettre en minuscule
      lowercase: true,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },
    password: {
      // chaine de caractere
      type: String,
      //   obligatoire
      required: true,
      //taille max pour mot de passe cripter
      max: 1024,
      //taille min
      minlength: 6,
    },
    societe: {
      // chaine de caractere
      type: String,
      // taille max
      maxlength: 50,
      // obligatoire
      required: true,
    },
    addresse: {
      // chaine de caractere
      type: String,
      // taille max
      maxlength: 100,
      // obligatoire
      required: true,
    },

    telephone: {
      // des nombres
      type: Number,
      maxlength: 150,
    },

    // le jeton
    tokens: {
      token: {
        // string
        type: String,
        // longueur max
        maxlength: 500,
        // vide par defaut
        default: "",
      },
      dateCreation: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
    // verifie si un user est inscrit
    estMembre: {
      // soit vrai ou soit faux
      type: Boolean,
      // obligatoire
      required: true,
      // personne n'est inscrit par defaut
      default: false,
    },
  },
  //   pour connaitre la date a laquelle un utilsateur s'enregistre
  {
    timestamps: true,
  }
);

// creation de fontions statique pour les donnée (CRUD users)
userSchema.static("createUser", createUser);
userSchema.static("getUserByEmail", getUserByEmail);
userSchema.static("getUserById", getUserById);
userSchema.static("refreshToken", refreshToken);
userSchema.static("updatePassword", updatePassword);
userSchema.static("verifyUser", verifyUser);
userSchema.static("deleteUser", deleteUser);

//fonction qui permet de cripter le mot de passe
// avant de le mettre dans la base de donnée grace à la methdode pre
// userSchema.pre("save", async function (next) {
//   // genere un code secret pour le crypatge
//   const salt = await bcrypt.genSalt();
//   //   remplace le mot de passe par un mot de passe crypter
//   this.password = await bcrypt.hash(this.password, salt);
//   // pour passer à la suite
//   next();
// });

// ==================================
// LES REQUÊTES DE LA BASE DE DONNÉE
// ==================================

// fonction appelé par le controller pour l'inscription d'un nouveau utilisateur dans la base de donneé
async function createUser(nom, email, password, societe, addresse, telephone) {
  // methode pour la creation d'un modele
  return await this.create({
    nom,
    email,
    password,
    societe,
    addresse,
    telephone,
  });
}

// fonction appelé par le controller pour rechercher dans la base de donné un utilisateur via son mail
//  et nous le retourne
async function getUserByEmail(email) {
  const user = await this.findOne({ email });
  if (!user) return false;
  return user;
}

// fonction appelé par le controller pour rechercher dans la base de donné un utilisateur via son id
//  et nous le retourne
async function getUserById(_id) {
  const user = await this.find({ _id }).select("-password");
  if (!user) return false;
  return user;
}

// fonction appelé par le controller pour actualiser le token pour un utilisateur
async function refreshToken(_id, token) {
  const newToken = await this.findOneAndUpdate(
    // recherche via id utilisateur
    { _id },
    // on met a jour la valeur du token ainsi que la date de mise a jour
    { $set: { "tokens.token": token, "tokens.dateCreation": Date.now() } },
    // option supplementaire
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newToken;
}

// fonction appelé par le controller pour modifier le mot de passe d'un utilisateur
// depuis la base de donnée
async function updatePassword(email, newhashedPass) {
  const newPassword = await this.findOneAndUpdate(
    // recherche via son mail
    { email },
    // on modifie le mot de passe utiisateur
    // par le nouveau mot de passe haché
    { $set: { password: newhashedPass } },
    // pour valider le changement
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newPassword;
}

// fonction appelé par le controller pour verifier l'authentification d'un utilisateur
// depuis la base de donnée
async function verifyUser(_id, email) {
  const newUser = await this.findOneAndUpdate(
    // recherche via son id et mail
    { _id, email, isVerified: false },
    // on ajoute comme membre
    { $set: { estMembre: true } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newUser;
}

// la fonction qui supprime les info d'un utilisateur
// depuis la base de donnée
async function deleteUser(_id) {
  const deleteUserInfo = await this.deleteOne({ _id }).exec();
  return deleteUserInfo;
}

// Creation d'un Model(exemple) mongoose sur la base du Schéma
// Au cas ou je ne m'étais pas le nom de la collection alors on aura Users comme le nom de collection par defaut
const collectionName = "users";
export const userModel = mongoose.model("User", userSchema, collectionName);
