import express from "express";
import { protectRouter } from "../middleware/user.middleware.js";
import { produitValidation } from "../middleware/check.js";
import {
  createProduit,
  updateProduit,
  deleteProduit,
  getProduits,
} from "../controllers/produit.controllers.js";

const router = express.Router();

router.get("/", getProduits);
router.post("/create", protectRouter, produitValidation, createProduit);
router.put("/:id", protectRouter, produitValidation, updateProduit);
router.delete("/:id/delete", protectRouter, deleteProduit);

export default router;
