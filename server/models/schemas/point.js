const mongoose = require("mongoose");

// GeoJSON Point. Note the order: [longitude, latitude]
const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: ([lng, lat] = []) =>
          Number.isFinite(lng) && Number.isFinite(lat) &&
          lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
        message: "coordinates must be [longitude, latitude]",
      },
    },
  },
  { _id: false }
);

module.exports = pointSchema;
