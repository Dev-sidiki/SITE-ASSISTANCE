import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import {
  createTicketController,
  deleteTicketController,
  getTicketUserByIdParamController,
  getTicketUserByAdminController,
  getTicketUserController,
  getAllTicketsController,
  updateSenderReplyController,
  updateStatusResponseClientController,
  updateStatusCloseController,
} from "../controllers/ticket.controller.js";

//initialisation de la variable de gestion des routes
const router = express.Router();

// ==========
// TICKETS DATABASE
// ==========

// route de creation d'un ticket
router.post("/", authMiddleware, createTicketController);

// route d'affichage des tickets associés à un user
router.get("/", authMiddleware, getTicketUserController);

router.get("/all-tickets", getAllTicketsController);

// route d'affichage des détails d'un ticket associé à un user(effectué par le client)
router.get("/:_id", authMiddleware, getTicketUserByIdParamController);

// route d'affichage des détails d'un ticket associé à un user(effectué par l'admin)
router.post("/:_id", getTicketUserByAdminController);

// route de mise a jour des conversation client-operateur
// put est utiliser normalement pour un remplacement total de tous les champs
router.put("/:_id", authMiddleware, updateSenderReplyController);

// route de mise a jour des conversation client-operateur
// patch est utiliser normalement pour un remplacement partiel, on peut donc envoyer le champs que l'on souhaite modifier
router.patch("/close-ticket/:_id", authMiddleware, updateStatusCloseController);

// route de mise a jour des conversations client-operateur
// patch est utiliser normalement pour un remplacement partiel, on peut donc envoyer le champs que l'on souhaite modifier
router.patch(
  "/admin-response/:_id",
  authMiddleware,
  updateStatusResponseClientController
);

// route de suppression d'un ticket
router.delete("/:_id", authMiddleware, deleteTicketController);

export default router;
