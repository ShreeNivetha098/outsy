const express = require("express");
const { getPlaces, createPlace } = require("../controllers/placeController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPlaces);
router.post("/", protect, createPlace);

module.exports = router;