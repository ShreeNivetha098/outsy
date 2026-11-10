const express = require("express");
const { getUserPlans } = require("../controllers/planController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Itinerary generation and saving arrive with the new engine (Phases 3–4)

// 🔹 Get logged-in user's plans
router.get("/", protect, getUserPlans);

module.exports = router;
