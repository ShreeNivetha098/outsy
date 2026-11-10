const mongoose = require("mongoose");
const pointSchema = require("./schemas/point");
const {
  AMBIENCES,
  FOOD_PREFERENCES,
  TRANSPORT_MODES,
  MEALS,
  PACES,
  TIME_PATTERN,
} = require("../config/constants");

// What the user asked for, stored exactly as given
const requestSchema = new mongoose.Schema(
  {
    start: {
      label: { type: String, required: true }, // "Current location" or a searched place name
      location: { type: pointSchema, required: true },
    },
    date: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true }, // YYYY-MM-DD
    startTime: { type: String, match: TIME_PATTERN, required: true },
    endTime: {
      type: String,
      match: TIME_PATTERN,
      required: true,
      validate: {
        validator: function (endTime) {
          return !this.startTime || endTime > this.startTime;
        },
        message: "end time must be after start time",
      },
    },
    groupSize: { type: Number, min: 1, max: 30, required: true },
    budget: { type: Number, min: 0, required: true }, // rupees, whole group
    transport: { type: String, enum: TRANSPORT_MODES, required: true },
    ambience: { type: String, enum: AMBIENCES, required: true },
    foodPreference: { type: String, enum: FOOD_PREFERENCES, required: true },
    meals: {
      mode: { type: String, enum: ["auto", "custom"], default: "auto" },
      selected: [{ type: String, enum: MEALS }], // used when mode is "custom"
    },
    pace: { type: String, enum: PACES, default: "relaxed" },
  },
  { _id: false }
);

// Travel from the previous stop to this one
const legSchema = new mongoose.Schema(
  {
    distanceKm: { type: Number, min: 0 },
    minutes: { type: Number, min: 0 },
    cost: { type: Number, min: 0 },
  },
  { _id: false }
);

const stopSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["start", "place", "meal", "end"], required: true },
    name: { type: String, required: true },
    location: { type: pointSchema, required: true },
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" }, // curated place, if any
    osmId: String, // restaurant found on OpenStreetMap, if any
    meal: { type: String, enum: MEALS },
    arriveAt: { type: String, match: TIME_PATTERN },
    departAt: { type: String, match: TIME_PATTERN },
    stayMinutes: { type: Number, min: 0, default: 0 },
    cost: { type: Number, min: 0, default: 0 }, // entry/food for the whole group
    leg: legSchema,
  },
  { _id: false }
);

const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, trim: true },
    request: { type: requestSchema, required: true },
    itinerary: {
      stops: [stopSchema],
      routeGeometry: {
        type: { type: String, enum: ["LineString"] },
        coordinates: [[Number]],
      },
    },
    costs: {
      travel: { type: Number, default: 0 },
      entry: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    warnings: [String],
    engineVersion: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
