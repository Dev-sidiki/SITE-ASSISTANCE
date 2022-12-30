import mongoose from "mongoose";
import { ticketModel } from "../models/ticket.modele.js";
// import { getSingleTicketInfo } from "../../front_end/src/Actions/ticketAction.js";

// fonction de création d'un ticket
export async function createTicketController(req, res) {
  console.log(req);
  // on recupère les saisie du user
  const { sujet, expediteur, message } = req.body;

  // on recupere l'id du user connecté depuis notre entete
  const decodedId = req.user.id;

  // console.log(decodedId);

  // variable de gestion des erreurs
  let errors = {
    sujet: "",
    expediteur: "",
    message: "",
  };

  // les differentes contrôle a faire avant la creation d'un user
  // cela evite que le serveur il crache

  if (!sujet) {
    // message d'erreur en cas de champ vide
    errors.sujet = "le sujet du message est obligatoire";
    return res.json({ errors });
  }

  if (!expediteur) {
    // message d'erreur en cas de champ vide
    errors.expediteur = "le nom de l'expediteur du message est obligatoire";
    return res.json({ errors });
  }

  if (!message) {
    // message d'erreur en cas de champ vide
    errors.message = "le texte du message est obligatoire";
    res.json({ errors });
    return;
  }

  //on declare un objet de ticket à creer
  // si tous les champs sont remplis
  const newTicket = new ticketModel({
    // les data à envoyer pour creer un ticket
    // id du client généré selon le user connecté
    userId: decodedId,
    sujet: sujet,
    conversations: [
      {
        expediteurId: decodedId,
        expediteur,
        message,
      },
    ],
  });

  try {
    // on enregistre notre data dans la collection
    const postTicket = await newTicket.save();

    // reponse de notre serveur en cas de ticket crée
    return res.status(200).json({
      statut: "ticket crée",
      message: "Un nouveau ticket a été ajoué à la liste des tickets!",
      postTicket,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err);
  }
}

// fonction d'affichage des tickets associés à un user
export async function getTicketUserController(req, res) {
  try {
    // on recupere l'id du user connecté depuis notre entete
    const userId = req.user.id;
    // on recherche le ticket depuis la base de donnée
    const tickets = await ticketModel.getTickets(userId);

    // si le user ne dispose pas encore de ticket
    if (tickets.length == 0) {
      // la reponse du serveur
      return res.status(200).json({
        statut: "vide",
        message: "Vous n'avez aucun ticket en ce moment",
      });
    }
    //sinon si il y'a des ticket, on retourne la liste des ticket
    return res.status(200).json({
      statut: "réussi",
      message: "Vous verrez ci-dessous la liste de vos tickets",
      tickets,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// la fonction qui retourne la liste de tous les utilisateurs
export async function getAllTicketsController(req, res) {
  try {
    // on recherche le ticket depuis la base de donnée
    const tickets = await ticketModel.getAllTickets();

    // si le user ne dispose pas encore de ticket
    if (tickets.length == 0) {
      // la reponse du serveur
      return res.status(200).json({
        statut: "vide",
        message: "Vous n'avez aucun ticket en ce moment",
      });
    }
    //sinon si il y'a des ticket, on retourne la liste des ticket
    return res.status(200).json({
      statut: "réussi",
      message: "Vous verrez ci-dessous la liste des tickets",
      tickets,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

//fonction d'affichage d'un ticket unique associés à un user
export async function getTicketUserByIdParamController(req, res) {
  try {
    // on recupere l'id du user connecté depuis notre entete
    const clienId = req.user.id;

    // on recupere l'id du ticket à afficher
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === clienId) {
      return res.send("parametre ticket incorrect:" + _id);
    }
    // on recherche le ticket depuis la base de donnée
    const tickets = await ticketModel.getTicketById(_id, clienId);

    // réponse si le ticket a été trouvé
    return res.status(200).json({
      statut: "réussi",
      message: "Vous verrez ci-dessous les details sur le ticket",
      tickets,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

//fonction d'affichage d'un ticket unique associés à un user
export async function getTicketUserByAdminController(req, res) {
  try {
    // on recupere l'id du ticket à afficher
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on recherche le ticket depuis la base de donnée
    const tickets = await ticketModel.getTicketByAdmin(_id);

    // réponse si le ticket a été trouvé
    return res.status(200).json({
      statut: "réussi",
      message: "Vous verrez ci-dessous les details sur le ticket",
      tickets,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// fonction de mise a jour des conversation client-operateur
export async function updateSenderReplyController(req, res) {
  try {
    // console.log(req);
    // on recupère les saisie du sender
    const { expediteur, message, expediteurId } = req.body;

    // on recupere l'id du user connecté depuis notre entete
    const userId = req.user.id;

    // on recupere l'id du ticket
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === userId) {
      return res.send("parametre ticket incorrect:" + _id);
    }
    // variable de gestion des erreurs
    let errors = {
      expediteurId: "",
      expediteur: "",
      message: "",
    };

    // les differentes contrôle a faire avant la creation d'un user
    // cela evite que le serveur il crache

    if (!expediteur) {
      // message d'erreur si champ vide
      errors.expediteur = "le nom de l'expediteur du message est obligatoire";
      return res.json({ errors });
    }

    if (!message) {
      // message d'erreur si champ vide
      errors.message = "le texte du message est obligatoire";
      res.json({ errors });
      return;
    }

    if (!expediteurId) {
      // message d'erreur si champ vide
      errors.expediteurId = "l'id de l'expediteur est obligatoire";
      res.json({ errors });
      return;
    }

    if (!req.file) {
      const reponse = await ticketModel.ajoutSenderReply({
        _id,
        expediteurId: userId,
        message,
        expediteur,
      });
      if (reponse._id) {
        return res.status(200).json({
          statut: "message ajouté",
          message: "votre message a été ajouté sans une image",
          reponse,
        });
      }
    } else {
      const reponse = await ticketModel.findByIdAndUpdate(
        _id,
        {
          $push: {
            conversations: {
              expediteurId: userId,
              message,
              expediteur,
              picture: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            },
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      if (reponse._id) {
        return res.status(200).json({
          statut: "message et image ajoutés",
          message: "votre message a été ajouté avec une image",
          dataImage: {
            name: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
          },
        });
      }
    }

    // reponse en cas d'erreur
    return res.json({
      statut: "erreur",
      message: "impossible d'ajouter votre message",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

export async function editSenderReplyController(req, res) {
  try {
    // console.log(req);
    // on recupère les saisie du sender
    const { newMessage, message_id } = req.body;

    // on recupere l'id du user connecté depuis notre entete
    const userId = req.user.id;

    // on recupere l'id du ticket en parametre
    const { _id } = req.params;

    // variable de gestion des erreurs
    let errors = {
      message_idError: "",
      newMessagError: "",
    };

    if (!message_id) {
      // message d'erreur si champ vide
      errors.message_idError = "l'id du message est obligatoire";
      res.json({ errors });
      return;
    }

    if (!newMessage) {
      // message d'erreur si champ vide
      errors.newMessagError = "le nouveau message est obligatoire";
      res.json({ errors });
      return;
    }

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === userId) {
      return res.send("parametre ticket incorrect:" + _id);
    }

    ticketModel.find({ _id }, (err, docs) => {
      const findSentenceInConversationTab = docs[0].conversations.find(
        (conversation) => {
          return conversation._id == message_id;
        }
      );

      if (!findSentenceInConversationTab)
        return res.status(404).send("conversation not found");
      // console.log(findConversationInConversationTab);

      findSentenceInConversationTab.message = newMessage;

      return docs[0].save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
      // return res.status(200).send(docs);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function deleteSenderReplyController(req, res) {
  try {
    // console.log(req);
    // on recupère l'id du message
    const { message_id } = req.body;

    // variable de gestion des erreurs
    let errors = {
      message_idError: "",
    };

    if (!message_id) {
      // message d'erreur si champ vide
      errors.message_idError = "l'id du message est obligatoire";
      res.json({ errors });
      return;
    }
    // on recupere l'id du user connecté depuis notre entete
    const userId = req.user.id;

    // on recupere l'id du ticket en parametre
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === userId) {
      return res.send("parametre ticket incorrect:" + _id);
    }

    ticketModel.findByIdAndUpdate(
      _id,
      {
        $pull: {
          conversations: {
            _id: message_id,
          },
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
}

// fonction de mise a jour du statut du ticket
// on cloture le ticket si solution trouvée
export async function updateStatusResponseClientController(req, res) {
  try {
    // on recupere l'id du ticket
    const { _id } = req.params;

    // on recupère l'id du user connecté
    const userId = req.user.id;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === userId) {
      return res.send("parametre ticket incorrect:" + _id);
    }

    // si l'id est correcte,
    // on cloture le ticket depuis la base de donnée
    const reponse = await ticketModel.updateStatusResponseClient({ _id });

    // reponse si tout se passe bien
    if (reponse._id) {
      return res.status(200).json({
        statut: "répondu",
        message: "Vous avez réçu une reponse",
      });
    }
    // reponse en cas de soucis
    res.json({
      status: "erreur",
      message: "le ticket n'a pas encore été répondu",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// fonction de mise a jour du statut du ticket
// on cloture le ticket si solution trouvée
export async function updateStatusCloseController(req, res) {
  try {
    // on recupere l'id du ticket
    const { _id } = req.params;

    // on recupère l'id du user connecté
    const userId = req.user.id;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === userId) {
      return res.send("parametre ticket incorrect:" + _id);
    }

    // si l'id est correcte,
    // on cloture le ticket depuis la base de donnée
    const reponse = await ticketModel.updateStatusClose({ _id });

    // reponse si tout se passe bien
    if (reponse._id) {
      return res.status(200).json({
        statut: "clôturé",
        message: "Le ticket a été cloturé",
      });
    }
    // reponse en cas de soucis
    res.json({
      status: "erreur",
      message: "le ticket n'a pas pu être cloturé",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// fonction de suppression d'un ticket
export async function deleteTicketController(req, res) {
  try {
    // on recupere l'id du user connecté depuis notre entete
    const clienId = req.user.id;

    // on recupere l'id du ticket
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }

    // on verifie si le parametre est exactement l'id du ticket
    if (_id === clienId) {
      return res.send("parametre ticket incorrect:" + _id);
    }

    // on supprime le ticket le ticket depuis la base de donnée
    await ticketModel.deleteTicket(_id);

    // reponse si tout se passe bien
    return res.status(200).json({
      statut: "supprimé",
      message:
        "Le ticket a été supprimé, il ne se trouve plus dans la liste de vos tickets",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}
