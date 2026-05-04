import Crypto from "../models/Crypto.js";

// @route   GET /api/crypto
// @desc    Get all cryptocurrencies
// @access  Public
export const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    console.error("Get all crypto error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// @route   GET /api/crypto/gainers
// @desc    Get top gainers (highest 24h % increase), sorted highest to lowest
// @access  Public
export const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({
      change24h: -1,
    });
    return res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    console.error("Get gainers error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// @route   GET /api/crypto/new
// @desc    Get newest listings, sorted newest to oldest
// @access  Public
export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(20);
    return res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    console.error("Get new listings error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// @route   POST /api/crypto
// @desc    Add a new cryptocurrency
// @access  Public (or protect with middleware if needed)
export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h, mktCap, volume, tradable } =
      req.body;

    // Validate required fields
    if (!name || !symbol || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: "Name, symbol, price, and image are required.",
      });
    }

    // Check for duplicate symbol
    const existing = await Crypto.findOne({
      symbol: symbol.toUpperCase().trim(),
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A cryptocurrency with symbol "${symbol.toUpperCase()}" already exists.`,
      });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price: Number(price),
      image,
      change24h: change24h !== undefined ? Number(change24h) : 0,
      mktCap: mktCap || "N/A",
      volume: volume || "N/A",
      tradable: tradable !== undefined ? Boolean(tradable) : true,
    });

    return res.status(201).json({
      success: true,
      message: `${crypto.name} added successfully!`,
      data: crypto,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    console.error("Add crypto error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};
