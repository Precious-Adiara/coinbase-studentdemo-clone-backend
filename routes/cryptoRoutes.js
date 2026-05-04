import express from "express";
import {
  getAllCrypto,
  getTopGainers,
  getNewListings,
  addCrypto,
} from "../controllers/cryptoController.js";

const router = express.Router();

// GET  /api/crypto          → All cryptocurrencies
router.get("/", getAllCrypto);

// GET  /api/crypto/gainers  → Top gainers (sorted by 24h change desc)
router.get("/gainers", getTopGainers);

// GET  /api/crypto/new      → Newest listings (sorted by createdAt desc)
router.get("/new", getNewListings);

// POST /api/crypto          → Add new cryptocurrency
router.post("/", addCrypto);

export default router;
