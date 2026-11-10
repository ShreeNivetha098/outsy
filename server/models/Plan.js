const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: String,
    budget: Number,
    days: Number,
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);