const Place = require("../models/Place");
const { AMBIENCES, PLACE_CATEGORIES } = require("../config/constants");

const badRequest = (res, error) => res.status(400).json({ error });

// GET /api/places?category=temple&ambience=family&near=11.01,76.96&radiusKm=10
// With `near`, results are sorted nearest first (uses the 2dsphere index).
exports.getPlaces = async (req, res) => {
  const { category, ambience, near, radiusKm } = req.query;
  const filter = {};

  if (category) {
    if (!PLACE_CATEGORIES.includes(category)) {
      return badRequest(res, `category must be one of: ${PLACE_CATEGORIES.join(", ")}`);
    }
    filter.category = category;
  }

  if (ambience) {
    if (!AMBIENCES.includes(ambience)) {
      return badRequest(res, `ambience must be one of: ${AMBIENCES.join(", ")}`);
    }
    filter.ambience = ambience; // matches if the array contains it
  }

  if (near) {
    const [lat, lng] = near.split(",").map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return badRequest(res, "near must be 'lat,lng', e.g. near=11.0168,76.9558");
    }

    const radius = radiusKm === undefined ? 25 : Number(radiusKm);
    if (!Number.isFinite(radius) || radius <= 0) {
      return badRequest(res, "radiusKm must be a positive number");
    }

    filter.location = {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radius * 1000, // metres
      },
    };
  }

  const places = await Place.find(filter);
  res.json(places);
};

exports.createPlace = async (req, res) => {
  const place = await Place.create(req.body);
  res.status(201).json(place);
};
