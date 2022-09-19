import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

//une fonction qui contient les champs de la table codepins de notre base de donnée
// c'est notre modele de reinitialisation
const updatePinSchema = new mongoose.Schema(
  {
    codepin: {
      //type chaine de caractere
      type: String,
      //longueur minimal
      minLength: 6,
      //longueur maximum
      maxLength: 6,
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
  },
  //   pour connaitre la date a laquelle le l'objet a été crée
  {
    timestamps: true,
  }
);

// creation de fontions statique pour les donnée (updatePinSchema.static("getPinById", getPinById);
updatePinSchema.static("getPinByEmailPin", getPinByEmailPin);
updatePinSchema.static("deletePin", deletePin);

// fonction qui recherche dans la base de donné
// le codepin spécifique a un user via son email et le code généré
async function getPinByEmailPin(email, pin) {
  const codepin = await this.findOne({ email, pin });
  if (!codepin) return false;
  return codepin;
}

// fonction qui supprime dans la base de donné
// le codepin spécifique a un user via son email et le code généré
async function deletePin(email, pin) {
  const codepin = await this.findOneAndDelete({ email, pin });
  if (!codepin) return false;
  return codepin;
}

// Creation d'un Model(exemple) mongoose sur la base du Schéma
// Au cas ou je ne m'étais pas le nom de la collection alors on aura Users comme le nom de collection par defaut
const collectionName = "codepins";
export const updatePinModel = mongoose.model(
  "Codepin",
  updatePinSchema,
  collectionName
);
