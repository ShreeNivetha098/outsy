const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["restaurant", "cafe", "mall", "park", "temple", "adventure", "movie", "nature"],
      required: true,
    },

    budgetLevel: {
      type: Number,
      enum: [1, 2, 3], // 1 = low, 2 = medium, 3 = high
      required: true,
    },

    ambience: [
      {
        type: String,
        enum: ["family", "friends", "couple", "girls", "boys"],
      },
    ],

    avgTimeSpent: {
      type: Number, // in hours
      required: true,
    },

    latitude: Number,
    longitude: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);