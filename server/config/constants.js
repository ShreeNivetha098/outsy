// Shared lists used by models, seed data and (later) request validation

const AMBIENCES = ["family", "friends", "couple", "girls", "boys"];

const PLACE_CATEGORIES = [
  "nature",
  "waterfall",
  "dam",
  "lake",
  "viewpoint",
  "park",
  "temple",
  "museum",
  "mall",
  "amusement",
  "adventure",
  "restaurant",
  "cafe",
];

// Categories that can also serve as a meal stop
const FOOD_CATEGORIES = ["restaurant", "cafe"];

const FOOD_TYPES = ["veg", "non-veg", "both"];
const FOOD_PREFERENCES = ["veg", "non-veg"];

const TIMES_OF_DAY = ["morning", "afternoon", "evening"];

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const TRANSPORT_MODES = ["bike", "car", "cab", "auto", "bus"];

const MEALS = ["breakfast", "lunch", "snacks", "dinner"];

const PACES = ["relaxed", "packed"];

// "HH:MM", 24-hour; 24:00 allowed as an end-of-day closing time
const TIME_PATTERN = /^(([01]\d|2[0-3]):[0-5]\d|24:00)$/;

module.exports = {
  AMBIENCES,
  PLACE_CATEGORIES,
  FOOD_CATEGORIES,
  FOOD_TYPES,
  FOOD_PREFERENCES,
  TIMES_OF_DAY,
  DAYS,
  TRANSPORT_MODES,
  MEALS,
  PACES,
  TIME_PATTERN,
};
