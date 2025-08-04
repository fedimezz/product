import express from "express";
const router = express.Router();

import { protectRouter, refreshToken } from "../middleware/user.middleware.js";
import { Usercheck } from "../middleware/check.js";
import {
  createUser,
  ChangePassword,
  logoutUser,
  loginUser,
  UpdateUser,
} from "../controllers/user.controller.js";

// Public routes
router.post("/register", Usercheck, createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);

// Protected routes
router.put("/:id/changepassword", protectRouter, ChangePassword);
router.put("/:id/giveRole", protectRouter, UpdateUser);

export default router;
