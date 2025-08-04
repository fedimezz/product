import express from "express";
import { protectRouter } from "../middleware/user.middleware.js";
import {  validateOrderItem } from "../middleware/check.js";
import { findProduit } from "../middleware/order.middleware.js";
import {
  createOrder,
  createOrderItem,
} from "../controllers/orderitem.controller.js";

const router = express.Router();

router.post("/createOrder/:id",protectRouter,findProduit,createOrderItem,createOrder);

export default router;
