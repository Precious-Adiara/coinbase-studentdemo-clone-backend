import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register  → Create new account
router.post("/register", register);

// POST /api/auth/login     → Log in & receive JWT cookie
router.post("/login", login);

// POST /api/auth/logout    → Clear JWT cookie
router.post("/logout", protect, logout);

// GET  /api/auth/profile   → Protected — get current user's profile
router.get("/profile", protect, getProfile);

export default router;
