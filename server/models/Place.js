const mongoose = require("mongoose");
const pointSchema = require("./schemas/point");
const {
  AMBIENCES,
  PLACE_CATEGORIES,
  FOOD_CATEGORIES,
  FOOD_TYPES,
  TIMES_OF_DAY,
  DAYS,
  TIME_PATTERN,
} = require("../config/constants");

// One opening window, e.g. { days: ["mon", ..., "sat"], open: "09:00", close: "17:30" }
const openingWindowSchema = new mongoose.Schema(
  {
    days: {
      type: [{ type: String, enum: DAYS }],
      validate: {
        validator: (days) => days.length > 0,
        message: "an opening window needs at least one day",
      },
    },
    open: { type: String, match: TIME_PATTERN, required: true },
    close: {
      type: String,
      match: TIME_PATTERN,
      required: true,
      validate: {
        // "HH:MM" strings compare correctly as text
        validator: function (close) {
          return !this.open || close > this.open;
        },
        message: "close time must be after open time",
      },
    },
  },
  { _id: false }
);

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    category: {
      type: String,
      enum: PLACE_CATEGORIES,
      required: true,
    },

    ambience: {
      type: [{ type: String, enum: AMBIENCES }],
      validate: {
        validator: (list) => list.length > 0,
        message: "at least one ambience is required",
      },
    },

    location: {
      type: pointSchema,
      required: true,
    },

    visitMinutes: {
      type: Number,
      required: true,
      min: 10,
    },

    // Rupees per person
    entryFeePerPerson: { type: Number, default: 0, min: 0 },
    extraSpendPerPerson: { type: Number, default: 0, min: 0 }, // rides, boating, safari...

    // Empty list = open at all hours
    openingHours: [openingWindowSchema],

    bestTimes: [{ type: String, enum: TIMES_OF_DAY }],

    // How worth visiting, 1-5; used to rank places
    interestScore: { type: Number, min: 1, max: 5, default: 3 },

    // Only for restaurants and cafes
    foodType: {
      type: String,
      enum: FOOD_TYPES,
      required: [
        function () {
          return FOOD_CATEGORIES.includes(this.category);
        },
        "foodType is required for restaurants and cafes",
      ],
    },
    avgMealCostPerPerson: { type: Number, min: 0 },

    // Practical notes shown to the user, e.g. "forest permit needed"
    notes: String,

    // false until a person has checked fees, hours and coordinates
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

placeSchema.index({ location: "2dsphere" });

placeSchema.virtual("isFoodStop").get(function () {
  return FOOD_CATEGORIES.includes(this.category);
});

module.exports = mongoose.model("Place", placeSchema);
