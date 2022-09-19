import express from "express";

import {
  CreateUserController,
  loginUserController,
  logoutUserController,
  getUserInfoController,
  recupPinController,
  updatePasswordController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

//initialisation de la variable de gestion des routes
const router = express.Router();

// ==========
// AUTHENTIFICATION
// ==========

// route de creation d'un nouveau utlisateur
router.post("/inscription", CreateUserController);
// route de  connection d'un utilisateur existant
router.post("/login", loginUserController);
// route de  deconnection d'un user
router.delete("/logout", authMiddleware, logoutUserController);

// ==========
// USERS DATABASE
// ==========

//route  d'affichage des info d'un user connecté
router.get("/", authMiddleware, getUserInfoController);
//route de creation du codepin d'un user
router.post("/reset-password", recupPinController);
//route de modification du password
router.patch("/reset-password", updatePasswordController);

// pour pouvoir importer nos routes
// sous n'importe quel nom a cause du mot cle default
export default router;
