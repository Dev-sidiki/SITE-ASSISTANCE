import mongoose from "mongoose";

// creation du des champs de la collection tickets
const TicketSchema = new mongoose.Schema(
  {
    // client associé a ce ticket
    clientId: {
      // string
      type: mongoose.Schema.Types.ObjectId,
      // obligatoire
      required: true,
    },
    // le probleme en question
    sujet: {
      type: String,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
      // longueur max
      maxlength: 200,
      // obligatoire
      required: true,
      // aucun sujet par defaut
      default: "",
    },
    // l'etat actuel du ticket
    statut: {
      // string
      type: String,
      // longueur max
      maxlength: 500,
      // obligaoire
      required: true,
      // le message par defaut
      default: "En cours de traitement par l'operateur",
    },

    //l'historique des concersations
    conversations: [
      {
        // celui ou celle qui envoi le message (client ou operateur)
        expediteur: {
          type: String,
          maxlength: 50,
          required: true,
          default: "",
        },
        //le message en question
        message: {
          type: String,
          maxlength: 1000,
          required: true,
          default: "",
        },
        // date de reponse du message
        dateEnvoi: {
          type: Date,
          required: true,
          // affiche la date a laquelle tu envoie le ticket ou la reponse
          default: new Date().getTime(),
        },
      },
    ],
  },
  {
    // met la date d'ajout et de modification automatiqment
    timestamps: true,
  }
);

// creation de fontions statique pour les donnée (CRUD users)
TicketSchema.static("getTickets", getTickets);
TicketSchema.static("getTicketById", getTicketById);
TicketSchema.static("updateSenderReply", updateSenderReply);
TicketSchema.static("updateStatusClose", updateStatusClose);
TicketSchema.static("deleteTicket", deleteTicket);

// ==================================
// LES REQUÊTES DE LA BASE DE DONNÉE
// ==================================

// fonction qui recherche dans la base de donné
// les ticket spécifique a un user via son id du client
async function getTickets(clientId) {
  const ticket = await this.find({ clientId });
  if (!ticket) return false;
  return ticket;
}

// fonction qui recherche dans la base de donné
// un ticket unique associé a un user via  idClient et l'id du ticket
async function getTicketById(_id, clientId) {
  const ticket = await this.find({ _id, clientId });
  if (!ticket) return false;
  return ticket;
}

// on ajoute la reponse pour un utilisateur
async function updateSenderReply({ _id, message, expediteur }) {
  const newReponse = await this.findOneAndUpdate(
    // recherche via id ticket
    { _id },
    // on met a jour la conversation
    {
      statut: "En cours de traitement par l'operateur",
      $push: {
        conversations: { message, expediteur },
      },
    },
    // option supplementaire pour valider le changement de notre bd
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newReponse;
}

//on rend le ticket invalide
// client satisfait
async function updateStatusClose({ _id }) {
  const closedStatut = await this.findOneAndUpdate(
    // recherche via id ticket  et id utilisateur
    // on recherche le ticket associe a un user
    { _id },
    // on met à jour la valeur du statut
    // { $set: { statut: newhashedPass } },
    {
      statut: "Clôturé",
    },
    // option supplementaire pour valider le changement de notre bd
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return closedStatut;
}

// la fonction qui cherche et supprime un ticket utilisateur
// depuis la base de donnée
async function deleteTicket(_id, clientId) {
  const deleteTicket = await this.findOneAndDelete({ _id, clientId }).exec();
  return deleteTicket;
}

// Récupération d'un Model(exemple) mongoose sur la base du Schéma
// Au cas ou je ne m'étais pas le nom de la collection alors on aura Posts comme le nom de collection par defaut
const collectionName = "tickets";
export const ticketModel = mongoose.model(
  "Tickets",
  TicketSchema,
  collectionName
);
