import mongoose from "mongoose";

// creation du des champs de la collection tickets
const TicketSchema = new mongoose.Schema(
  {
    // client associé a ce ticket
    userId: {
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
    // pour inserer une image pendant la creation du ticket
    // picture: {
    //   type: String,
    //   required: true,
    //   //   schema par defaut
    //   default: "",
    // },

    //l'historique des concersations
    conversations: [
      {
        // celui ou celle qui envoi le message (client ou operateur)
        expediteur: {
          type: String,
          maxlength: 50,
          default: "",
        },
        //le message en question
        message: {
          type: String,
          maxlength: 1000,
          default: "",
        },
        // pour inserer une image durant la conversation
        picture: {
          type: String,
          default: "",
        },
        // date de reponse du message
        timestamp: {
          type: Date,
          required: true,
          // affiche la date a laquelle tu envoie le ticket ou la reponse
          default: Date.now,
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
TicketSchema.static("getAllTickets", getAllTickets);
TicketSchema.static("getTicketById", getTicketById);
TicketSchema.static("getTicketByAdmin", getTicketByAdmin);
TicketSchema.static("ajoutSenderReply", ajoutSenderReply);
TicketSchema.static("updateStatusResponseClient", updateStatusResponseClient);
TicketSchema.static("updateStatusClose", updateStatusClose);
TicketSchema.static("deleteTicket", deleteTicket);

// ==================================
// LES REQUÊTES DE LA BASE DE DONNÉE
// ==================================

// fonction qui recherche dans la base de donné
// les ticket spécifique a un user via son id du client
async function getTickets(userId) {
  const ticket = await this.find({ userId }).sort({ createdAt: -1 });
  if (!ticket) return false;
  return ticket;
}

// la fonction qui cherche la liste de tous les utilisateurs pour nous les afficher
// depuis la base de donnée vers le front
async function getAllTickets() {
  // n'affiche pas le password en front
  const AllUsers = await this.find().sort({ createdAt: -1 }).select();
  return AllUsers;
}

// fonction qui recherche dans la base de donné
// un ticket unique associé a un user via  idClient et l'id du ticket
async function getTicketById(_id, userId) {
  const ticket = await this.find({ _id, userId });
  if (!ticket) return false;
  return ticket;
}

// fonction qui recherche dans la base de donné
// un ticket unique associé a un user via  idClient et l'id du ticket
async function getTicketByAdmin(_id) {
  const ticket = await this.find({ _id }).select();
  if (!ticket) return false;
  return ticket;
}

// on ajoute la reponse à un ticket pour un client
async function ajoutSenderReply({ _id, message, expediteur, picture }) {
  const newReponse = await this.findOneAndUpdate(
    // recherche via id ticket
    { _id },
    // on met a jour la conversation
    {
      statut: "En cours de traitement par l'operateur",
      $push: {
        conversations: { message, expediteur, picture },
      },
    },
    // option supplementaire pour valider le changement de notre bd
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newReponse;
}

//on rend le ticket invalide
// client satisfait
async function updateStatusResponseClient({ _id }) {
  const closedStatut = await this.findOneAndUpdate(
    // recherche via id ticket  et id utilisateur
    // on recherche le ticket associe a un user
    { _id },
    // on met à jour la valeur du statut
    {
      statut: "En entente d'une reponse du client",
    },
    // option supplementaire pour valider le changement de notre bd
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return closedStatut;
}

async function updateStatusClose({ _id }) {
  const closedStatut = await this.findOneAndUpdate(
    // recherche via id ticket  et id utilisateur
    // on recherche le ticket associe a un user
    { _id },
    // on met à jour la valeur du statut
    // { $set: { statut: "Clôturé" } },
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
async function deleteTicket(_id) {
  const deleteTicket = await this.findOneAndDelete({ _id }).exec();
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
