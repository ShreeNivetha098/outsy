const Plan = require("../models/Plan");
const recommendationService = require("../services/recommendationService");

exports.createPlan = async (req, res) => {
  try {
    const { city, budget, days } = req.body;

    const recommendedPlaces =
      await recommendationService.generatePlan(city, budget, days);

    const plan = await Plan.create({
      user: req.user._id, // ✅ store only user ID
      city,
      budget,
      days,
      places: recommendedPlaces,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user._id }).populate("places");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};