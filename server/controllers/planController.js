const Plan = require("../models/Plan");

exports.getUserPlans = async (req, res) => {
  const plans = await Plan.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("itinerary.stops.place");
  res.json(plans);
};
