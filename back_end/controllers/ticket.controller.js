import mongoose from "mongoose";
import { ticketModel } from "../models/ticket.modele.js";

export async function createTicketController(req, res) {
  // on recupère les saisie du user
  const { sujet, expediteur, message } = req.body;

  // on recupere l'id du user connecté depuis notre entete
  const decodedId = req.user.id;
  console.log(decodedId);

  // variable de gestion des erreurs
  let errors = {
    sujet: "",
    expediteur: "",
    message: "",
  };

  // les differentes contrôle a faire avant la creation d'un user
  // cela evite que le serveur il crache
  if (!sujet) {
    errors.sujet = "le sujet du message est obligatoire";
    return res.json({ errors });
  }

  if (!expediteur) {
    errors.expediteur = "le nom de l'expediteur du message est obligatoire";
    return res.json({ errors });
  }

  if (!message) {
    errors.message = "le texte du message est obligatoire";
    res.json({ errors });
    return;
  }

  // un objet de ticket à creer
  const newTicket = new ticketModel({
    // les data à envoyer pour creer un ticket
    // id du client généré selon le user connecté
    clientId: decodedId,
    sujet: sujet,
    conversations: [
      {
        expediteur,
        message,
      },
    ],
  });

  try {
    // on enregistre notre data dans la collection
    const post = await newTicket.save();
    // si tout va bien on renvoi notre data
    return res.status(200).json({
      status: "réussi",
      message: "Un nouveau ticket a été crée!",
      post,
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

    if (tickets.length == 0) {
      return res.status(200).json({
        status: "vide",
        message: "Vous n'avez aucun ticket en ce moment",
      });
    }
    return res.status(200).json({
      status: "réussi",
      message: "Vous verrez ci-dessous la liste des tickets",
      tickets,
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// fonction d'affichage d'un ticket unique associés à un user
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
    // on recherche le ticket depuis la base de donnée
    const tickets = await ticketModel.getTicketById(_id, clienId);
    return res.status(200).json({
      status: "réussi",
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
    // on recupère les saisie du sender
    const { expediteur, message } = req.body;
    // on recupere l'id du ticket
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }
    // variable de gestion des erreurs
    let errors = {
      expediteur: "",
      message: "",
    };

    // les differentes contrôle a faire avant la creation d'un user
    // cela evite que le serveur il crache
    if (!expediteur) {
      errors.expediteur = "le nom de l'expediteur du message est obligatoire";
      return res.json({ errors });
    }

    if (!message) {
      errors.message = "le texte du message est obligatoire";
      res.json({ errors });
      return;
    }
    // on modifie la conversation depuis la base de donnée
    const reponse = await ticketModel.updateSenderReply({
      _id,
      message,
      expediteur,
    });
    // reponse si tout se passe bien
    if (reponse._id) {
      return res.status(200).json({
        status: "reussi",
        message: "votre message a été ajouté",
      });
    }
    // reponse en cas d'erreur
    res.json({
      status: "erreur",
      message: "impossible d'ajouter votre message",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}

// fonction de mise a jour du statut du ticket
// on cloture le ticket si
export async function updateStatusCloseController(req, res) {
  try {
    // on recupere l'id du user connecté depuis notre entete
    const clienId = req.user.id;
    // on recupere l'id du ticket
    const { _id } = req.params;

    // on vérifie si le paramètre qui est passé existe dans la base de donnée
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.send("ID inconnu :" + _id);
    }
    // on cloture le ticket depuis la base de donnée
    const reponse = await ticketModel.updateStatusClose({ _id, clienId });
    // reponse si tout se passe bien
    if (reponse._id) {
      return res.status(200).json({
        status: "réussi",
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
    // on supprime le ticket le ticket depuis la base de donnée
    await ticketModel.deleteTicket(_id, clienId);
    // reponse si tout se passe bien
    return res.status(200).json({
      status: "réussi",
      message: "Le ticket a été supprimé",
    });
  } catch (err) {
    // sinon on retourne le message d'erreur
    return res.send(err.message);
  }
}
