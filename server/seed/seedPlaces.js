const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const mongoose = require("mongoose");
const Place = require("../models/Place");
const places = require("./data/places");

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Place.deleteMany();
    // Drop indexes from the old schema and build the current ones (incl. 2dsphere)
    await Place.syncIndexes();
    await Place.insertMany(places);

    const unverified = places.filter((p) => !p.verified).length;
    console.log(`Seeded ${places.length} places (${unverified} still to verify)`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedData();
