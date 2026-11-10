const express = require("express");
const router = express.Router();

const {
  createPlan,
  getUserPlans,
} = require("../controllers/planController");

const { generatePlan } = require("../services/recommendationService");
const protect = require("../middleware/authMiddleware");

// 🔹 Generate recommendation plan (Protected)
router.post("/recommend", protect, async (req, res) => {
  try {
    const { hoursAvailable, budgetLevel, ambience } = req.body;

    if (!hoursAvailable || !budgetLevel || !ambience) {
      return res.status(400).json({
        message: "Please provide hoursAvailable, budgetLevel, and ambience",
      });
    }

    const plan = await generatePlan({
      hoursAvailable,
      budgetLevel,
      ambience,
    });

    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating plan" });
  }
});

// 🔹 Create a new plan
router.post("/", protect, createPlan);

// 🔹 Get logged-in user's plans
router.get("/", protect, getUserPlans);

// 🔹 Test protected route
router.get("/private", protect, (req, res) => {
  res.json({
    message: "Plan route is protected 🌿",
    user: req.user,
  });
});

module.exports = router;